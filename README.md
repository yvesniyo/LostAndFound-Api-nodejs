# Nodejs LostAndFoundApi

This project will allow users to get their lost items and also help those who found lost items to get rewards.

NB: this project uses BookShelf, knex for ORM and Awilix for Dependency Injection

## Installation

To get the latest version, simply clone this project on github [LostAndFoundRepository](https://github.com/yvesniyo/LostAndFound-Api-nodejs.git).

```bash
$ git clone https://github.com/yvesniyo/LostAndFound-Api-nodejs.git LostAndFoundApi
$ cd LostAndFoundApi
$ npm install
```

## Setup

Create .env and copy .env.example to it
change DATABASE_NAME to your created db name
and set password if not root

### Migration

If you are done setting up .env file, you can proceed with runing migrations.

```bash
$ npm run migrate:latest
```

### Seeds

Also after running migrations you have to run seeders for some datas like user roles,etc

```bash
$ npm run seed:run
```

### Run

```bash
$ npm run dev
```

This will run dev server on the port that you specified in .env
