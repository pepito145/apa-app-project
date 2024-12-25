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
              image: require('../../assets/exercises/level1/session2/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s2e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session2/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s2e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session2/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s2e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session2/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s2e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session2/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s2e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session2/ex6.png'),
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
              image: require('../../assets/exercises/level1/session3/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s3e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session3/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s3e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session3/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s3e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session3/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s3e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session3/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s3e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session3/ex6.png'),
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
              image: require('../../assets/exercises/level1/session4/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s4e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session4/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s4e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session4/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s4e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session4/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s4e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session4/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s4e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session4/ex6.png'),
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
              image: require('../../assets/exercises/level1/session5/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s5e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session5/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s5e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session5/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s5e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session5/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s5e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session5/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s5e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session5/ex6.png'),
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
              image: require('../../assets/exercises/level1/session6/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s6e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session6/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s6e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session6/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s6e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session6/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s6e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session6/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s6e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session6/ex6.png'),
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
              image: require('../../assets/exercises/level1/session7/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s7e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session7/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s7e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session7/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s7e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session7/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s7e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session7/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s7e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session7/ex6.png'),
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
              image: require('../../assets/exercises/level1/session8/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s8e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session8/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s8e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session8/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s8e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session8/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s8e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session8/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s8e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session8/ex6.png'),
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
              image: require('../../assets/exercises/level1/session9/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s9e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session9/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s9e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session9/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s9e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session9/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s9e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session9/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s9e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session9/ex6.png'),
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
              image: require('../../assets/exercises/level1/session10/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s10e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session10/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s10e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session10/ex3.png'),
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
              image: require('../../assets/exercises/level1/session10/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s10e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session10/ex6.png'),
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
              image: require('../../assets/exercises/level1/session11/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s11e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session11/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s11e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session11/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s11e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session11/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s11e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session11/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s11e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session11/ex6.png'),
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
              image: require('../../assets/exercises/level1/session12/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s12e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level1/session12/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s12e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level1/session12/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s12e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level1/session12/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s12e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level1/session12/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n1s12e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level1/session12/ex6.png'),
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
          description: 'Première séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s1e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s1e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s1e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s1e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s1e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s1e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 2
        {
          id: 'n2s2',
          order: 2,
          title: 'Séance 2',
          description: 'Deuxième séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s2e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session2/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s2e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session2/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s2e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session2/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s2e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session2/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s2e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session2/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s2e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session2/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 3
        {
          id: 'n2s3',
          order: 3,
          title: 'Séance 3',
          description: 'Troisième séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s3e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session3/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s3e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session3/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s3e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session3/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s3e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session3/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s3e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session3/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s3e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session3/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 4
        {
          id: 'n2s4',
          order: 4,
          title: 'Séance 4',
          description: 'Quatrième séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s4e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session4/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s4e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session4/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s4e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session4/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s4e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session4/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s4e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session4/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s4e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session4/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 5
        {
          id: 'n2s5',
          order: 5,
          title: 'Séance 5',
          description: 'Cinquième séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s5e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session5/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s5e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session5/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s5e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session5/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s5e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session5/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s5e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session5/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s5e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session5/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 6
        {
          id: 'n2s6',
          order: 6,
          title: 'Séance 6',
          description: 'Sixième séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s6e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session6/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s6e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session6/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s6e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session6/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s6e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session6/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s6e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session6/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s6e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session6/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 7
        {
          id: 'n2s7',
          order: 7,
          title: 'Séance 7',
          description: 'Septième séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s7e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session7/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s7e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session7/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s7e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session7/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s7e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session7/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s7e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session7/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s7e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session7/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 8
        {
          id: 'n2s8',
          order: 8,
          title: 'Séance 8',
          description: 'Huitième séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s8e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session8/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s8e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session8/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s8e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session8/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s8e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session8/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s8e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session8/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s8e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session8/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 9
        {
          id: 'n2s9',
          order: 9,
          title: 'Séance 9',
          description: 'Neuvième séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s9e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session9/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s9e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session9/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s9e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session9/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s9e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session9/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s9e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session9/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s9e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session9/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 10
        {
          id: 'n2s10',
          order: 10,
          title: 'Séance 10',
          description: 'Dixième séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s10e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session10/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s10e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session10/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s10e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session10/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s10e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session10/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s10e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session10/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s10e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session10/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 11
        {
          id: 'n2s11',
          order: 11,
          title: 'Séance 11',
          description: 'Onzième séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s11e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session11/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s11e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session11/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s11e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session11/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s11e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session11/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s11e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session11/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s11e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session11/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 12
        {
          id: 'n2s12',
          order: 12,
          title: 'Séance 12',
          description: 'Douzième séance intermédiaire',
          duration: '25min',
          exercises: [
            {
              id: 'n2s12e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level2/session12/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s12e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level2/session12/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s12e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level2/session12/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s12e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level2/session12/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s12e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level2/session12/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n2s12e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level2/session12/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        }
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
          description: 'Première séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s1e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session1/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s1e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session1/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s1e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session1/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s1e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session1/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s1e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session1/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s1e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session1/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 2
        {
          id: 'n3s2',
          order: 2,
          title: 'Séance 2',
          description: 'Deuxième séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s2e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session2/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s2e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session2/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s2e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session2/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s2e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session2/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s2e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session2/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s2e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session2/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 3
        {
          id: 'n3s3',
          order: 3,
          title: 'Séance 3',
          description: 'Troisième séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s3e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session3/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s3e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session3/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s3e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session3/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s3e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session3/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s3e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session3/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s3e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session3/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 4
        {
          id: 'n3s4',
          order: 4,
          title: 'Séance 4',
          description: 'Quatrième séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s4e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session4/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s4e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session4/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s4e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session4/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s4e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session4/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s4e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session4/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s4e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session4/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 5
        {
          id: 'n3s5',
          order: 5,
          title: 'Séance 5',
          description: 'Cinquième séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s5e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session5/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s5e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session5/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s5e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session5/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s5e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session5/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s5e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session5/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s5e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session5/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 6
        {
          id: 'n3s6',
          order: 6,
          title: 'Séance 6',
          description: 'Sixième séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s6e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session6/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s6e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session6/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s6e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session6/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s6e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session6/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s6e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session6/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s6e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session6/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 7
        {
          id: 'n3s7',
          order: 7,
          title: 'Séance 7',
          description: 'Septième séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s7e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session7/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s7e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session7/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s7e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session7/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s7e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session7/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s7e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session7/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s7e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session7/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 8
        {
          id: 'n3s8',
          order: 8,
          title: 'Séance 8',
          description: 'Huitième séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s8e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session8/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s8e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session8/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s8e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session8/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s8e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session8/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s8e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session8/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s8e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session8/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 9
        {
          id: 'n3s9',
          order: 9,
          title: 'Séance 9',
          description: 'Neuvième séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s9e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session9/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s9e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session9/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s9e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session9/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s9e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session9/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s9e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session9/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s9e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session9/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 10
        {
          id: 'n3s10',
          order: 10,
          title: 'Séance 10',
          description: 'Dixième séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s10e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session10/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s10e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session10/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s10e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session10/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s10e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session10/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s10e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session10/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s10e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session10/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 11
        {
          id: 'n3s11',
          order: 11,
          title: 'Séance 11',
          description: 'Onzième séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s11e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session11/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s11e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session11/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s11e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session11/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s11e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session11/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s11e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session11/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s11e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session11/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        },

        // Séance 12
        {
          id: 'n3s12',
          order: 12,
          title: 'Séance 12',
          description: 'Douzième séance avancée',
          duration: '30min',
          exercises: [
            {
              id: 'n3s12e1',
              order: 1,
              name: 'Exercice 1',
              image: require('../../assets/exercises/level3/session12/ex1.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s12e2',
              order: 2,
              name: 'Exercice 2',
              image: require('../../assets/exercises/level3/session12/ex2.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s12e3',
              order: 3,
              name: 'Exercice 3',
              image: require('../../assets/exercises/level3/session12/ex3.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s12e4',
              order: 4,
              name: 'Exercice 4',
              image: require('../../assets/exercises/level3/session12/ex4.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s12e5',
              order: 5,
              name: 'Exercice 5',
              image: require('../../assets/exercises/level3/session12/ex5.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            },
            {
              id: 'n3s12e6',
              order: 6,
              name: 'Exercice 6',
              image: require('../../assets/exercises/level3/session12/ex6.png'),
              consigne: 'Phrase d\'aide pour guider l\'exercice'
            }
          ]
        }
      ],
    },
  },
};

export default exerciseBank;