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
                image: require('../../assets/exercises/niveau1/seance1/ex1.png'),
                consigne: 'Phrase d\'aide pour guider l\'exercice'
              },
              // Autres exercices...
            ]
          }
        ]
      }
      // Autres niveaux...
    }
  };