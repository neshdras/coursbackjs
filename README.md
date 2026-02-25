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

## Rôle de chaque dossiers

### Les routes : Le standard téléphonique/L'aiguilleur

- **C'est quoi ?**
    C'est le point d'entrée de votre API. Les routes définnissent les URL ou endpoints accéssible par les utilisateurs (ex: `GET /api/auth/login`).
-**Leurs rôle :** 
    Lorsqu'une personne (ou le frontend) fait une requête vers votre API, la route reçoit cet appel, comprend ce que l'utillisateur veut faire, et dirige l'appel vers le bon **Controller**. Une route ne contient aucune logique complexe, elle se contente de transférer la demande à la bonne personne.

### Les models

-**C'est quoi?**
    Le model est la representation structurelle de vos données en code. Il fait le lien (grâce à mongoose) avec la base données MongoDB.
-**Son rôle**:
    il définit le schéma de vos données. C'est lui qui décide qu'un utilisateur doit avoir un email, par example (de type chaine de caractères, defini comme obligatoire et unique). C'est le modèle qu se charge de faire toutes les actions d'écriture et de lecture directes dans la base de données (le fameux CRUD).

### Les controllers : Le cerveau/Le manager

- **C'est quoi?**
    C'est ici que se trouve la logiques métiers de votre application.
- **Son rôles**
    Le controller reçoit la demande transmises par la route. c'est lui qui fait le travail. Il lit les informations envoyées par l'utilisateur (le body), il demande au modele d'interagir avec la base données, puis **prepare et renvoie la réponse** final à l'utilisateur au format JSON en gérant les différents cas de succès ou d'erreurs.

### Les middlewares : La douane / le vigile

- **C'est quoi ?**
    C'ets une fonction qui s'execute au milieu de la requête. Elle a lieu juste après que la route ait été appelée, ùais juste avant que la requête n'arrive finalement dans le controller.
- **Son rôle**:
    Il effectue des vérifications à la volée. L'exempkle le plus courant en API est le middleware d'autehtification : il vérifie qu'un utilisateur possède un token valide (la carte d'identité) avant de le laisser accéder à des informations privées.
    S'il n'a pas son ticket, la douane bloque tout et renvoie une erreur (401 - Accès refusé).
    Si tout va bien, il appel une fonction `next()` qui laisse passer la requête vers le controller.

## Résumé des commandes pour un nouveau projet et configuration

```bash
npm init
npm i express
npm i mongoose
npm i jsonwebtoken
npm i bcriptjs
npm i dotenv
```

Vous pouvez tout installer en une fois, après `npm init` : 
`npm i express mongoose jsonwebtoken bcriptjs dotenv` .

### Configuration

ouvrir le fichier package.json, et faire en sorte d'avoir la ligne `"type": "module"`.

### Petite astuce

Lorque que vous allez démarré votre serveur avec la commande `node server` ou `npm run dev` si vous avez configuré le script.
Votre serveur sera lancé et figé à l'état du lancement.

Ce qui signifie, que si vous effectuez une modification sur votre code, vous allez devoir couper le serveur et le relancer. Ce qui peut être pénible.

Pour eviter cela, vous le faite UNE SEULE FOIS sur votre machine : `npm i -g nodemon`.

Cette fois-ci, au lieu de lancer votre serveur avec `node server`, vous allez le lancer avec `nodemon server`. Ce qui aura pour effet, qu'à chaque modification de votre code, que le serveur se recharge automatiquement.
    