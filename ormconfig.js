module.exports =   {
    "name": "default",
    "type": "postgres",
    "host": process.env.POSTGRES_URL || 'localhost',
    "port": process.env.POSTGRES_PORT || 5432,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASS,
    "database": process.env.POSTGRES_DB,
    "entities": [
      "./dist/modules/*/infra/typeorm/entities/*.js"
    ],
    "migrations": [
      "./dist/shared/infra/typeorm/migrations/*.js"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  }
