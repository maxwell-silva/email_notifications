module.exports =   {
    "name": "default",
    "type": "postgres",
    "host": process.env.POSTGRES_URL || 'localhost',
    "port": process.env.POSTGRES_PORT || 5432,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASS,
    "database": process.env.POSTGRES_DB,
    "entities": [
      "./src/modules/*/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
      "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  }
