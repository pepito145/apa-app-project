# apa-app-project

Exemple d'arborescense : 

project-root/
├── App.js                    # Point d'entrée principal de l'application
├── assets/                   # Ressources statiques comme les images, icônes
│   ├── images/
│   └── icons/
├── components/               # Composants réutilisables
│   ├── StatCard.js           # Affiche les cartes de stats sur la page principale
│   ├── Graph.js              # Composant de graphique réutilisable
│   ├── ActivityCard.js       # Carte pour les activités proposées
│   └── Header.js             # En-tête de l'application
├── screens/                  # Écrans de l'application
│   ├── AuthScreen.js         # Écran unique pour connexion/inscription
│   ├── HomeScreen.js         # Écran d'accueil avec statistiques
│   ├── StatsScreen.js        # Écran avec les statistiques détaillées
│   ├── GraphDetailScreen.js  # Écran qui affiche un graphe détaillé (à ajouter plus tard)
│   ├── ActivitiesScreen.js   # Écran pour proposer les séances de sport
│   └── SettingsScreen.js     # Écran des paramètres
├── navigation/               # Navigation de l'application
│   ├── AppNavigator.js       # Navigation principale, incluant la barre de navigation en bas
│   └── AuthNavigator.js      # Navigation spécifique pour l'authentification (si nécessaire)
├── services/                 # Services pour l'API ou logique métier
│   └── userService.js        # Gestion des utilisateurs (login, signup, etc.)
├── context/                  # Contexte global pour la gestion d'état
│   ├── AuthContext.js        # Contexte d'authentification
│   └── UserContext.js        # Contexte pour gérer l'état utilisateur (par ex., stats, activités)
├── styles/                   # Fichiers de styles globaux ou spécifiques
│   └── globalStyles.js
└── utils/                    # Fonctions utilitaires
    └── formatDate.js         # Exemple de fonction utilitaire