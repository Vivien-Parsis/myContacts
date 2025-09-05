# Handi'Map

Application web avec serveur frontend React et serveur backend en node et express

## Fonctionnalités principales

- Interface utilisateur avec React et Vite
- API REST avec Node.js & Express
- Connexion à une base de données mongodb externe

## Configuration requise

- git
- node (>=22) et npm, ou Docker
- Base de données mongodb externe

## Instruction d'installation

### Option 1 : En local avec Node.js

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

## Adresse

Frontend : `http://votre-domaine-ou-ip`

Backend : `http://votre-domaine-ou-ip:4000`

## Auteur

- Vivien PARSIS
