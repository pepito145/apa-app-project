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
      name: `Séance ${seance.seance_id}`,
      date: new Date(seance.time).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      exercisesCompleted: seance.totalExercises, // 假设都完成了
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
        name: `Séance - ${session.title}`,
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
        await api.post('get_seance/', payload);
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
            };
            await api.post('get_seance/', payload);
            activity.upload = true;
          } catch (uploadError) {
            console.warn('⚠️ Upload failed for activity:', activity);
          }
        }
      }

      const response = await api.post('request_activity/',  { email });
      console.log('👉 request_activity response:', response.data);
      const backendActivities = transformBackendActivities(response.data.activities);

      for (let backendItem of backendActivities) {
        const exists = syncedActivities.find(item => {
          const t1 = new Date(item.time).getTime();
          const t2 = new Date(backendItem.time).getTime();
          //console.log(`🕒 Comparaison des timestamps:\n→ local: ${item.time} (${t1})\n→ backend: ${backendItem.time} (${t2})`);
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
              }
        }
      }

      setActivities(syncedActivities);
      await AsyncStorage.setItem('activitiesHistory', JSON.stringify(syncedActivities));
    } catch (e) {
      console.error('Erreur de synchronisation des activités:', e);
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
