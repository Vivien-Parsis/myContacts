# Handi'Map

Application web avec serveur frontend React et serveur backend en node et express

## Fonctionnalités principales

- Interface utilisateur avec React et Vite
- API REST avec Node.js & Express
- Connexion à une base de données mongodb externe

## Configuration requise

- git
- node et npm, ou Docker
- Base de données mongodb externe

## Instruction d'installation

- cloner le dépot :

```bash
   git clone https://github.com/Vivien-Parsis/myContacts
   cd myContacts
```

- creer un fichier .env dans le backend :

```none
JWT_SECRET={your_secret_here}
DB_URL={your_secret_here}
HOST={your_secret_here}
```

- Installer et lancer le backend :

```bash
  cd backend
  npm install
  npm run start
```

- Installer et lancer le frontend :

```bash
  cd frontend
  npm install
  npm run preview
```

## Script

### Backend

- `npm run dev` lancer le serveur en mode devellopement avec nodemon
- `npm run start` lancer le serveur en mode production
- `npm run test` lancer les tests

### Frontend

- `npm run dev` lancer le serveur en mode devellopement
- `npm run build` lancer le build de l'application
- `npm run preview` lancer la prevusialisation du site

## Adresse

- Frontend : `http://votre-domaine-ou-ip`

- Backend : `http://votre-domaine-ou-ip:4000`

### Endpoint du Backend

#### Swagger

- `/api-docs`

#### Authentification

- POST `/auth/login` requete pour se connecter (attend un email et password dans le body et renvoie un jwt token)
- POST `/auth/register` requete pour s'inscrire (attend un lastName, firstName, email et password dans le body et renvoie un jwt token)

#### Contact

- GET `/contact/` recupère les contacts de l'utilisateur actuellement connecté
- POST `/contact/` rajoute un contact pour l'utilisateur actuellement connecté
- DELETE `/contact/` supprime un contact pour l'utilisateur actuellement connecté
- PUT `/contact/` modifie l'un des contacts de l'utilisateur actuellement connecté

## Auteur

- Vivien PARSIS
