const exerciseBank = {
  metadata: {
    version: '1.0.0',
    lastUpdated: '2024-01-20',
  },

  levels: {
    niveau1: {
      metadata: {
        id: 'niv1',
        title: 'Séances 1 étoile',
        description: 'Programme adapté aux débutants',
        difficulty: 1,
      },
      sessions: [
        // Séance 1
        {
          id: 'n1s1',
          order: 1,
          title: 'Séance 1',
          description: 'Première séance découverte',
          duration: '20min',
          exercises: [
            {
              id: 'n1s1e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s1e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s1e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s1e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s1e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s1e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        //Séance 2 :
        {
          id: 'n1s2',
          order: 1,
          title: 'Séance 2',
          description: 'Deuxième séance découverte',
          duration: '25min',
          exercises: [
            {
              id: 'n1s2e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s2e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s2e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s2e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s2e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s2e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]          
        }

      ],
    },
    niveau2: {
      metadata: {
        id: 'niv2',
        title: 'Séances 2 étoiles',
        description: 'Programme adapté aux habitués',
        difficulty: 2,
      },
      sessions: [
        // Séance 1
        {
          id: 'n2s1',
          order: 1,
          title: 'Séance 1',
          description: 'Première séance découverte',
          duration: '20min',
          exercises: [
            {
              id: 'n2s1e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },
      ],
    },
    niveau3: {
      metadata: {
        id: 'niv3',
        title: 'Séances 3 étoiles',
        description: 'Programme adapté aux experts',
        difficulty: 3,
      },
      sessions: [
        // Séance 1
        {
          id: 'n3s1',
          order: 1,
          title: 'Séance 1',
          description: 'Première séance découverte',
          duration: '20min',
          exercises: [
            {
              id: 'n3s1e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },
      ],  
    },
  },
};

export default exerciseBank;