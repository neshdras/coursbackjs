# Cours création d'API REST avec Node et Express

JavaScript vous permet de faire des sites/app coté front.
Cependant il exist eun outil qui vous permet d'utiliser vos compétences JS
pour créer des projets BACK.

Cela signifie donc que le code est bien executé côté SERVEUR.
→ L'utilisateur n'a PAS accés à votre code, contrairement à JS côté FRONT

## Prérequis

- **Runtime** Node.js installé sur votre machine (on va utiliser les modules ES)
- **Framework** : Express.js
- **Base de données** : MongoDB (via Mongoose)
- **Authentification** : JSON Web Tokens (jsonwebtoken), bcryptjs pour le hachage
- **Variable d'environnement** : dotenv

## Mise en place de l'environnement de travail

### Initilisation du projet

Tout d'abord on doit initialiser le projet NODE.
Pour cela, sur le terminal, vous devez entrer la commande `npm init`

Cette commande va vous créer un fichier `package.json`.
Le package.json contient des information IMPORTANTE sur votre projet :

    - Le nom du projet
    - Le type de code utilisé (commonjs (CJS) ou ecma script (ES))
    - Les scripts du projet (pour pouvoir le lancer, effectué des test, le deployer, etc)
    - Les dépendances du projet

#### Les dépencances, c'est quoi ?

Pour fonctionner, votre projet a besoin certaines choses.
Dans le cas d'un projet avec express, il a besoin du framework express
Si vous avez besoin de hacher les mot de passe, vous allez avoir besoin de la dépendance bcriptjs, etc

Selon votre projet, vous n'allez pas forcément avoir les mêmes dépendances.
C'est le package.json qui s'occupe de gérer cela.

Vous en tant que developpeur, vous **installez** des dépendances grâce à la commande `npm install NomDeLaDependance` .

### Installation des dépendances nécessaires

```bash
npm install
npm i
```

Les deux commandes sont simmillaires. Vous pouvez utiliser l'une ou l'autre, sachant que `npm i`, c'est le raccoourci de `npm install`

- `npm i express` : Permet d'installer le framework express, pour pouvoir gérer directement un serveur back avec node
- `npm i mongoose` : Permet de faire la connexion à la base de données mongoDB et de gérer les requêtes (CRUD)
- `npm i jsonwebtoken` : Permet de gérer un token d'authentification
- `npm i bcriptjs` : Permet de gérer les hash de mot de passe
- `npm i dotenv` : Permet de gérer les variables d'environnement

#### Une variable d'environnement, c'est quoi ?

Une varible d'envirroment est une données potentiellemnt sensible.
En gros c'est un mot de passe, une phrase secréte, des accès à une base de données, etc
Ou tout simplement des variables qui servent à la configuration pour votre app

Sur nos webapp, les variables d'environnement sont créer dans un fichier `.env`

Exemple de contenu de varible d'environnement : 

```
HOST=localhost
DBNAME=masuperdb
DBUSER=userquitue
DBPASS=monpasspourri
```

**Important** : Le fichier de variable d'environnement DOIT ABSOLUMENT être noté dans le fichier `.gitignore`.

On envoie JAMAIS un fichier de variable d'envoronnement sur github.

Par contre, ce que vous pouvez faire pour votre projet, c'est créer un fichier `.env.example` que vous pouvez envoyer sur Github

Ce fichier doit contenir la structure attendue pour vos variables d'environnement.

Example:
```
HOST=# Nom d'hote pour la base de données
DBNAME=# Nom de la base de données
DBUSER=# Utillisateur de la base de données
DBPASS=# Le pass de la base de données.
```

### Structure des fichier et dossier

```text
    src/
        config/
            -db.js                  # Connexion à MongoDB
        controller/                 # La logique de code de votre app
            - authController.js
        middlewares/                # Tout ce qui s'execute avant un controller
            - authMiddleware.
        models/                     # Configuration des schemas de pas de données
            - authmodel.js
        routes/                     # Contient la logique des endpoints (url)
            - authRoutes.js
    - app.js                        # Configuration de Express
- .env                              # Variable d'environnement
- package.json
- serveur.js                        # Point d'entrée de l'app
```

