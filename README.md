# WeatherAppBeta_frontend

Frontend – Weather App (OpenWeatherMap API)
Description

This web interface was developed using HTML, CSS, and Vanilla JavaScript. It interacts with an Express backend to display current weather data for cities selected by the user, using the OpenWeatherMap API.

The site allows users to log in, add cities, view detailed weather information (temperature, description, icon), and delete previously saved cities.
Features

    Responsive interface built with native JavaScript

    Displays current weather based on browser geolocation

    Add cities using a search input field

    Delete saved cities

    User login and registration simulation

    Dynamic rendering of weather data fetched from the backend

    Integration of official OpenWeatherMap weather icons

Pages
index.html

    Home page of the app

    Displays saved cities

    Allows adding new cities

    Automatically detects user location and shows current weather

login.html

    Login and registration page

    User authentication simulated using localStorage

Technologies Used

    HTML5

    CSS3 (responsive and custom styles)

    JavaScript (ES6)

    OpenWeatherMap API

    Browser Geolocation API

    RESTful interaction with Node.js/Express backend

Project Structure

frontend/
│
├── index.html
├── login.html
├── style.css
├── login.js
├── script.js
├── env.js           # Backend URL configuration
└── images/
    ├── logo.svg
    ├── user.png
    ├── glass.png

Getting Started

    Clone the project

git clone <repository-url>
cd frontend

    Configure the backend URL in env.js

window.env = {
  URL_BACKEND: "http://localhost:3000"
};

    Open index.html in a browser

open index.html

    ⚠️ The backend must be started separately.

Notes

    This site works without any frontend frameworks or libraries.

    User authentication is simulated with localStorage and does not use secure tokens.

    The project structure and logic can easily be migrated to React or Vue.js if needed.

Frontend – Application météo (API OpenWeatherMap)
Description

Cette interface web a été développée avec HTML, CSS, et JavaScript Vanilla. Elle interagit avec un backend Express pour afficher la météo actuelle de villes sélectionnées par l'utilisateur, en se basant sur l’API OpenWeatherMap.
Le site permet à un utilisateur de se connecter, d’ajouter des villes, de visualiser la météo détaillée (températures, description, icône), et de supprimer des villes enregistrées.
Fonctionnalités

    Interface responsive en JavaScript natif

    Affichage de la météo actuelle selon la géolocalisation

    Ajout de villes via un champ de recherche

    Suppression de villes enregistrées

    Connexion et inscription utilisateur

    Affichage dynamique des données météo depuis le backend

    Intégration des icônes météo officielles OpenWeatherMap

Pages
index.html

    Accueil de l’application

    Affichage des villes enregistrées

    Ajout de nouvelles villes

    Détection automatique de la position pour afficher la météo actuelle

login.html

    Page de connexion et d’inscription

    Authentification via localStorage (simulée côté client)

Technologies utilisées

    HTML5

    CSS3 (avec styles responsive et personnalisés)

    JavaScript (ES6)

    API OpenWeatherMap

    API de géolocalisation du navigateur

    Interaction REST avec backend Node.js/Express

Structure du projet

frontend/
│
├── index.html
├── login.html
├── style.css
├── login.js
├── script.js
├── env.js (configuration URL backend)
└── images/
    ├── logo.svg
    ├── user.png
    ├── glass.png

Lancer le projet

    Cloner le projet :

git clone <lien-du-repo>
cd frontend

    Modifier env.js pour configurer l’URL du backend :

window.env = {
  URL_BACKEND: "http://localhost:3000"
};

    Ouvrir index.html dans un navigateur :

open index.html

    ⚠️ Le backend doit être lancé séparément.

Remarques

    Le site fonctionne sans framework ni librairie externe.

    Le stockage utilisateur est réalisé via localStorage, sans gestion sécurisée des tokens.

    L'intégration peut facilement être migrée vers React ou Vue.js si besoin.