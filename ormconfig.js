
module.exports =   {
  "name": "default",
  "type": "postgres",
  "host": "10.1.0.30",
  "port": 5432,
  "username": "docker",
  "password": "docker",
  "database": "agristar",
  "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
