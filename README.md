# 📝 Projet ToDo-List en React

Une application de gestion de tâches (ToDo-List) riche en fonctionnalités, développée avec React. Ce projet permet de gérer des tâches et des dossiers avec un système avancé de tri, de filtrage et de statistiques.

## ✨ Fonctionnalités Principales

* **Initialisation au choix :** Démarrez l'application à partir d'un fichier de sauvegarde (`backup.json`) ou repartez de zéro avec une liste vide.
* **Tableau de bord et Statistiques :** Affichage en temps réel du nombre total de tâches, des tâches non terminées, et un graphique en camembert (pur CSS) répartissant les tâches par statut.
* **Gestion des Tâches :** * Création et édition de tâches via une interface modale.
  * Deux modes d'affichage : "Simple" (titre, date, 2 dossiers max) et "Complet" (description, équipe, liste complète des dossiers).
* **Filtres et Tris avancés :**
  * Tri par date d'échéance, date de création ou ordre alphabétique (croissant/décroissant).
  * Masquage automatique des tâches terminées (désactivable).
  * Option pour masquer les tâches échues depuis plus d'une semaine.
* **Catégorisation :** Association des tâches à différents dossiers (catégories) avec gestion des couleurs et icônes.


## 🚀 Installation et Démarrage

Pour lancer ce projet sur votre machine locale, suivez ces étapes :

1. **Cloner le dépôt :**
   ```bash
   git clone [https://github.com/adam-KUROPATWA-BUTTE/ToDo-List.git](https://github.com/adam-KUROPATWA-BUTTE/ToDo-List.git)
   cd ToDo-List

2. Installer les dépendances :
    ```bash
    npm install

3. Lancer le serveur de développement :
    
    ```bash
    npm start
    
L'application s'ouvrira automatiquement dans votre navigateur à l'adresse http://localhost:3000.

## 📂 Architecture du Projet
Le code source est organisé de manière modulaire pour faciliter la maintenance :

Plaintext
src/
├── constants/       # Constantes globales (ex: les statuts de tâches)
├── data/            # Fichier de sauvegarde JSON
└── components/      # Composants React isolés
    ├── App/         # Composant racine, gestion de l'état global
    ├── Header/      # Tableau de bord et statistiques
    ├── FilterBar/   # Barre de recherche et filtres
    ├── TaskList/    # Affichage de la liste des tâches
    ├── TaskItem/    # Affichage d'une tâche individuelle (Simple/Complet)
    ├── TaskForm/    # Formulaire de création/édition
    ├── Modal/       # Composant popup générique
    └── Footer/      # Bouton d'ajout


CSS GENERER PAR IA CAR CELA ME PARRAISSAIT MOINS IMPORTANT QUE LE CODE


Ce README a été généré avec l'aide d'une IA.
