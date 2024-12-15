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
        },

        //Séance 3 :
        {
          id: 'n1s3',
          order: 1,
          title: 'Séance 3',
          description: 'Troisième séance découverte',
          duration: '20min',
          exercises: [
            {
              id: 'n1s3e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s3e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s3e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s3e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s3e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s3e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]          
        },

        //Séance 4 :
        {
          id: 'n1s4',
          order: 1,
          title: 'Séance 4',
          description: '4ème séance découverte',
          duration: '20min',
          exercises: [
            {
              id: 'n1s4e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s4e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s4e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s4e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s4e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s4e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]          
        },

        //Séance 5 :
        {
          id: 'n1s5',
          order: 1,
          title: 'Séance 5',
          description: '5ème séance découverte',
          duration: '25min',
          exercises: [
            {
              id: 'n1s5e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s5e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s5e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s5e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s5e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s5e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]          
        },

        //Séance 6 :
        {
          id: 'n1s6',
          order: 1,
          title: 'Séance 6',
          description: '6ème séance découverte',
          duration: '25min',
          exercises: [
            {
              id: 'n1s6e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s6e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s6e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s6e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s6e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s6e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]          
        },

        //Séance 7 :
        {
          id: 'n1s7',
          order: 1,
          title: 'Séance 7',
          description: 'Septième séance découverte',
          duration: '25min',
          exercises: [
            {
              id: 'n1s7e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s7e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s7e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s7e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s7e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s7e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]          
        },

        //Séance 8 :
        {
          id: 'n1s8',
          order: 1,
          title: 'Séance 8',
          description: 'Huitième séance découverte',
          duration: '25min',
          exercises: [
            {
              id: 'n1s8e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s8e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s8e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s8e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s8e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s8e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]          
        },

        //Séance 9 :
        {
          id: 'n1s9',
          order: 1,
          title: 'Séance 9',
          description: '9ème séance découverte',
          duration: '25min',
          exercises: [
            {
              id: 'n1s9e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s9e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s9e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s9e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s9e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s9e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]          
        },

        //Séance 10 :
        {
          id: 'n1s10',
          order: 1,
          title: 'Séance 10',
          description: 'Dixième séance découverte',
          duration: '25min',
          exercises: [
            {
              id: 'n1s10e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s10e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s10e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s10e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s10e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s10e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]          
        },

        //Séance 11 :
        {
          id: 'n1s11',
          order: 1,
          title: 'Séance 11',
          description: 'DeOnizième uxième séance découverte',
          duration: '25min',
          exercises: [
            {
              id: 'n1s11e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s11e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s11e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s11e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s11e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s11e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]          
        },

        //Séance 12 :
        {
          id: 'n112',
          order: 1,
          title: 'Séance 12',
          description: '12 séance découverte',
          duration: '25min',
          exercises: [
            {
              id: 'n1s12e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level1/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s12e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s12e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s12e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s12e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s12e6',
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

        // Séance 2
        {
          id: 'n2s2',
          order: 1,
          title: 'Séance 2',
          description: 'Deuxième séance intermédiaire',
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

        // Séance 2
        {
          id: 'n3s2',
          order: 1,
          title: 'Séance 2',
          description: 'Deuxième séance pro',
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