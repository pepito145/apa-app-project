import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  //    REPLACED BY syncActivites
  const loadActivitiesFromBackend = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const response = await api.post('request_activity/', { email });


      const data = transformBackendActivities(response.data.activities);

      setActivities(data);
      await AsyncStorage.setItem('activitiesHistory', JSON.stringify(data));
    } catch (error) {
      console.error('Erreur chargement activités:', error);
    }
  };


  const transformBackendActivities = (seances) => {
    return (seances || []).map(seance => ({
      name: `Séance ${seance.private_id}`,
      date: new Date(seance.time).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      exercisesCompleted: seance.totalExercises,
      totalExercises: seance.totalExercises,
      difficulty: seance.difficulty,
      painLevel: seance.painLevel,
      time: seance.time,
      upload: true,
      intensity: seance.intensity,
      hr_average: seance.hr_average,
      hr_max: seance.hr_max,
      hr_min: seance.hr_min,
      calories: seance.calories,
      should_update: seance.should_update,
    }));
  };



  const addActivityFromSession = async (session, difficulty, pain, completedExercises, elapsedTime, start_time ) => {
    try {
      const email = await AsyncStorage.getItem('email');
      const minutesElapsed = Math.round(elapsedTime / 60);
      const currentDate = new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      const timestamp = new Date().toISOString(); 
  
      const newActivity = {
        name: null,
        date: currentDate,
        time: timestamp,
        start_time: start_time,
        duration: `${minutesElapsed} min`,

        exercisesCompleted: completedExercises,
        totalExercises: session.exercises?.length || completedExercises,
        painLevel: pain,
        difficulty: difficulty,
        frontend_id: session.id,
        upload: true
      };
  
      // 上传到后端
      const payload = {
        email: email,
        painLevel: pain,
        difficulty: difficulty,
        totalExercises: completedExercises,
        duration: elapsedTime,
        frontend_id: session.id,
        time: newActivity.time,
        start_time: start_time,
      };
  
      try {
        console.log("try upload");
        console.log(newActivity.time);
        const response = await api.post('get_seance/', payload);
        const data = response.data;
        newActivity.private_id = data.private_id; 
        newActivity.name = `Séance ${data.private_id}`; 
        newActivity.upload = true;
      } catch (err) {
        console.warn('❌ Upload failed, saving locally');
        newActivity.upload = false;
      }
  
      const stored = await AsyncStorage.getItem('activitiesHistory');
      const history = stored ? JSON.parse(stored) : [];
  
      // 避免重复（比如刚刚上传成功又收到后端返回）
      const exists = history.some(
        item => new Date(item.time).getTime() === new Date(newActivity.time).getTime()
      );
      if (!exists) {
        history.unshift(newActivity);
        await AsyncStorage.setItem('activitiesHistory', JSON.stringify(history));
        setActivities(history);
      }
    } catch (e) {
      console.error('Erreur addActivityFromSession:', e);
    }
  };

  // [Unused]
  const loadActivitiesFromStorage = async () => {
    try {
      const stored = await AsyncStorage.getItem('activitiesHistory');
      if (stored) {
        setActivities(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Erreur chargement local:', e);
    }
  };


  
  const syncActivities = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      if (!email) return;

      const stored = await AsyncStorage.getItem('activitiesHistory');
      const localActivities = stored ? JSON.parse(stored) : [];
      const syncedActivities = [...localActivities];

      for (let activity of localActivities) {
        if (activity.upload === false) {
          try {
            const payload = {
              email: email,
              painLevel: activity.painLevel,
              difficulty: activity.difficulty,
              totalExercises: activity.exercisesCompleted,
              duration: parseInt(activity.duration) * 60 || 0,
              frontend_id: activity.frontend_id || '',
              time: activity.time,
              start_time: activity.start_time,
            };
            const response = await api.post('get_seance/', payload);
            const data = response.data;
            activity.upload = true;
            activity.private_id = data.private_id; 
          } catch (uploadError) {
            console.warn('⚠️ Upload failed for activity:', activity);
          }
        }
      }
      const payload = new URLSearchParams();
      payload.append('email', email);

      const response = await api.post('request_activity/', payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log('👉 request_activity response:', response.data);
      const backendActivities = transformBackendActivities(response.data.activities);
      console.log('👉 backendActivities:', backendActivities);
      for (let backendItem of backendActivities) {
        console.log('👉 backendItem:', backendItem);
        const exists = syncedActivities.find(item => {
          const t1 = new Date(item.time).getTime();
          const t2 = new Date(backendItem.time).getTime();
          console.log(`🕒 Comparaison des timestamps:\n→ local: ${item.time} (${t1})\n→ backend: ${backendItem.time} (${t2})`);
          return t1 === t2;
        });
      
        if (!exists) {
          syncedActivities.unshift(backendItem);
        }
        else {
            console.log("should_update: ",backendItem)
            if (backendItem.should_update){
                console.log('🔁 Updating activities of existing seance');
                console.log('📦 backendItem.activities:', backendItem);
                console.log("更新前 syncedActivities：", JSON.stringify(syncedActivities, null, 2));
                Object.assign(exists, backendItem);
                console.log("更新后 syncedActivities：", JSON.stringify(syncedActivities, null, 2));
                console.log("开始更新下一等级")
                calculate_new__next_level(backendItem.avg_max,backendItem.time,backendItem.difficulty);
              }
        }
      }

      setActivities(syncedActivities);
      await AsyncStorage.setItem('activitiesHistory', JSON.stringify(syncedActivities));
    } catch (e) {
      console.error('Erreur de synchronisation des activités:', e);
    }
  };



  const calculate_new__next_level = async (avg_max, time, difficulty) => { 
    try {
      // 从 AsyncStorage 获取 profile
      const profileStr = await AsyncStorage.getItem('userProfile');
      const profile = profileStr ? JSON.parse(profileStr) : null;
  
      if (!profile || !profile.lastSessionFeedback || !profile.lastSessionFeedback.date) {
        console.log(profile.lastSessionFeedback);
        console.warn('⚠️ 日期信息缺失，跳过计算。');
        return { intensityRating: 1, metValue: 3.0 };
      }
  
      const sessionDate = new Date(profile.lastSessionFeedback.date);
      const backendTime = new Date(time);
  
      // 如果不是同一天，直接跳过计算
      //if (sessionDate.toDateString() !== backendTime.toDateString()) {
      //  console.log('⏩ 非当天活动，跳过 fc_max 计算。');
      //  return { intensityRating: 1, metValue: 3.0 };
      //}
  
      // 获取年龄
    // 从 AsyncStorage 获取 profile

      if (!profile || !profile.age) {
        console.warn('⚠️ 年龄信息缺失，跳过计算。');
        return { intensityRating: 1, metValue: 3.0 };
      }

      const age = profile.age;
  
      // 计算最大心率
      const fc_max = 220 - age;
      const actual_fc = fc_max * (avg_max / 100);
  
      let intensityRating = 1;
      if (actual_fc >= 180) {
        intensityRating = 5;
      } else if (actual_fc >= 150) {
        intensityRating = 4;
      } else if (actual_fc >= 120) {
        intensityRating = 3;
      } else if (actual_fc >= 90) {
        intensityRating = 2;
      }
  
      const METs = {
        1: 3.0,
        2: 4.0,
        3: 5.0,
        4: 6.0,
        5: 7.0
      };
  
      // 获取 last_level 和 backendItem.difficulty
      const lastLevel = await AsyncStorage.getItem('last_level');
  
      // 判断 intensityRating 和 difficulty 是否都为 1 或 2
      if ((intensityRating === 1 || intensityRating === 2) && (difficulty === 1 || difficulty === 2)) {
        if (lastLevel === 'niveau1' || lastLevel === 'niveau2') {
          const nextLevel = lastLevel === 'niveau1' ? 'niveau2' : 'niveau3';
          await AsyncStorage.setItem('recommendedLevel', nextLevel);
          console.log(`升一级：新的推荐级别是 ${nextLevel}`);
        }
      }
      // 判断 intensityRating 和 difficulty 是否都为 4 或 5
      else if ((intensityRating === 4 || intensityRating === 5) && (difficulty === 4 || difficulty === 5)) {
        if (lastLevel === 'niveau2' || lastLevel === 'niveau3') {
          const nextLevel = lastLevel === 'niveau2' ? 'niveau1' : 'niveau2';
          await AsyncStorage.setItem('recommendedLevel', nextLevel);
          console.log(`降一级：新的推荐级别是 ${nextLevel}`);
        }
      }
  
      return {
        intensityRating,
        metValue: METs[intensityRating]
      };
  
    } catch (err) {
      console.error('❌ 错误: calculate_new__next_level 出错', err);
      return { intensityRating: 1, metValue: 3.0 };
    }
  };



  const clearAllActivities = async () => {
    try {
      await AsyncStorage.removeItem('activitiesHistory');
      setActivities([]);
      console.log('✅ Activités supprimées localement');
    } catch (error) {
      console.error('❌ Erreur lors de la suppression des activités:', error);
    }
  };
  return (
    <ActivityContext.Provider value={{
      activities,
      setActivities,
      loadActivitiesFromBackend,
      loadActivitiesFromStorage,
      syncActivities,
      addActivityFromSession,
      clearAllActivities,
    }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);
