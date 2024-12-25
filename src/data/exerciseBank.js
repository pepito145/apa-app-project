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
          resume: "Cette première séance de niveau 1 est une introduction douce à l'activité physique.\n\nElle se compose d'exercices simples de mobilité articulaire et d'étirements légers, parfaits pour débuter ou reprendre une activité physique en douceur.",
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
          resume: "Cette deuxième séance introduit des mouvements de renforcement très doux.\n\nL'accent est mis sur la posture et la respiration, avec des exercices qui peuvent être réalisés assis ou debout selon votre confort.",
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
          resume: "La troisième séance se concentre sur la mobilité des membres inférieurs.\n\nDes exercices doux pour les jambes et les hanches sont proposés, accompagnés de périodes de repos adaptées à votre rythme.",
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
          order: 4,
          title: 'Séance 4',
          description: 'Quatrième séance découverte',
          duration: '20min',
          resume: "Cette séance se concentre sur la coordination et l'équilibre.\n\nDes exercices simples pour améliorer votre stabilité et votre confiance dans les mouvements quotidiens.",
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
          order: 5,
          title: 'Séance 5',
          description: 'Cinquième séance découverte',
          duration: '20min',
          resume: "Une séance douce de renforcement musculaire.\n\nDes exercices adaptés pour tonifier vos muscles en douceur, avec une attention particulière à la respiration.",
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
          order: 6,
          title: 'Séance 6',
          description: 'Sixième séance découverte',
          duration: '20min',
          resume: "Cette séance introduit des mouvements d'étirement plus approfondis.\n\nUn travail en douceur pour améliorer votre souplesse et votre amplitude articulaire.",
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
          order: 7,
          title: 'Séance 7',
          description: 'Septième séance découverte',
          duration: '20min',
          resume: "Une séance axée sur la mobilité générale.\n\nDes exercices variés pour entretenir la souplesse de vos articulations et prévenir les raideurs.",
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
          order: 8,
          title: 'Séance 8',
          description: 'Huitième séance découverte',
          duration: '20min',
          resume: "Cette séance combine équilibre et renforcement léger.\n\nUn mélange d'exercices pour améliorer votre stabilité tout en renforçant vos muscles en douceur.",
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
          order: 9,
          title: 'Séance 9',
          description: 'Neuvième séance découverte',
          duration: '20min',
          resume: "Une séance focalisée sur la posture et l'alignement.\n\nDes exercices simples pour améliorer votre maintien et réduire les tensions musculaires.",
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
          order: 10,
          title: 'Séance 10',
          description: 'Dixième séance découverte',
          duration: '20min',
          resume: "Cette séance propose un travail doux de coordination.\n\nDes mouvements simples pour améliorer la synchronisation de vos gestes et votre agilité.",
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
              image: require('../../assets/exercises/level1/session10/ex4.png'),
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
          order: 11,
          title: 'Séance 11',
          description: 'Onzième séance découverte',
          duration: '20min',
          resume: "Une séance complète de mobilité et renforcement.\n\nUn programme varié qui combine tous les aspects travaillés jusqu'à présent de manière progressive.",
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
          id: 'n1s12',
          order: 12,
          title: 'Séance 12',
          description: 'Douzième séance découverte',
          duration: '20min',
          resume: "La dernière séance du niveau 1 consolide vos acquis.\n\nUn programme complet qui reprend les exercices clés pour préparer la transition vers le niveau suivant.",
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
          resume: "Cette première séance de niveau intermédiaire met l'accent sur le renforcement musculaire modéré.\n\nVous découvrirez des exercices plus dynamiques qui sollicitent plusieurs groupes musculaires, tout en restant accessibles.",
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
          resume: "Cette séance se concentre sur l'amélioration de l'équilibre et la coordination.\n\nLes exercices combinent travail proprioceptif et renforcement musculaire pour une meilleure stabilité globale.",
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
          resume: "Une séance axée sur le cardio-training adapté.\n\nAlternance d'exercices dynamiques et de récupération active pour améliorer votre endurance tout en préservant vos articulations.",
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
          resume: "Cette séance cible le renforcement du haut du corps.\n\nDes exercices variés pour les épaules, les bras et le dos, avec une attention particulière à la posture et à la respiration.",
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
          resume: "Une séance dédiée au renforcement des membres inférieurs.\n\nTravail progressif des jambes et des hanches pour améliorer votre force et votre stabilité au quotidien.",
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
          resume: "Cette séance combine mobilité et renforcement.\n\nUn mélange équilibré d'exercices pour améliorer votre souplesse tout en maintenant un travail musculaire efficace.",
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
          resume: "Une séance complète de cardio-renforcement.\n\nAlternance d'exercices cardiovasculaires et de renforcement musculaire pour un entraînement complet et stimulant.",
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
          resume: "Cette séance se concentre sur le gainage et la stabilité centrale.\n\nDes exercices ciblés pour renforcer vos abdominaux et votre dos, essentiels pour une bonne posture.",
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
          resume: "Une séance d'entraînement fonctionnel adaptée.\n\nDes exercices inspirés des mouvements quotidiens pour améliorer votre force et votre agilité dans vos activités journalières.",
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
          resume: "Cette séance met l'accent sur la coordination et la précision.\n\nDes exercices qui combinent mouvements complexes pour améliorer votre contrôle corporel et votre équilibre.",
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
          resume: "Une séance de renforcement global progressive.\n\nDes exercices qui sollicitent l'ensemble du corps avec une intensité croissante pour améliorer votre endurance musculaire.",
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
          resume: "Cette dernière séance du niveau 2 combine tous les aspects travaillés.\n\nUn programme complet qui intègre cardio, renforcement et équilibre pour consolider vos progrès.",
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
          resume: "Cette première séance de niveau avancé propose un travail cardio-musculaire intense.\n\nVous découvrirez des exercices complexes qui demandent plus d'endurance et de coordination.",
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
          resume: "Une séance focalisée sur le renforcement musculaire avancé.\n\nDes exercices qui sollicitent plusieurs groupes musculaires simultanément pour un travail plus intense.",
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
          resume: "Cette séance combine cardio intense et exercices de force.\n\nUn programme exigeant qui alterne entre phases cardiovasculaires soutenues et renforcement musculaire.",
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
          resume: "Une séance dédiée au renforcement avancé du haut du corps.\n\nDes exercices complexes pour les épaules, les bras et le dos, nécessitant force et endurance.",
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
          resume: "Cette séance cible le renforcement intense des membres inférieurs.\n\nUn travail approfondi des jambes et des hanches avec des exercices demandant plus de puissance.",
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
          resume: "Une séance de gainage et stabilité de niveau avancé.\n\nDes exercices complexes de gainage dynamique pour renforcer en profondeur vos muscles posturaux.",
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
          resume: "Cette séance propose un entraînement fonctionnel avancé.\n\nDes mouvements complexes qui combinent force, équilibre et coordination pour un travail global intense.",
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
          resume: "Une séance intensive de cardio-training.\n\nDes exercices à haute intensité alternant avec des phases de récupération active pour améliorer votre capacité cardiovasculaire.",
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
          resume: "Cette séance met l'accent sur la puissance et l'explosivité.\n\nDes exercices dynamiques qui demandent force et vitesse d'exécution pour améliorer vos performances.",
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
          resume: "Une séance de renforcement global de haute intensité.\n\nUn programme complet qui sollicite tous les groupes musculaires avec des exercices complexes et intenses.",
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
          resume: "Cette séance combine tous les aspects du niveau avancé.\n\nUn mélange exigeant de cardio intense, de force et de coordination pour un entraînement complet.",
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
          resume: "La dernière séance du niveau 3 pousse vos limites.\n\nUn programme final qui intègre les exercices les plus challengeants pour tester votre progression.",
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