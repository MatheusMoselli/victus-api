module.exports = {
  "type": process.env.TYPEORM_CONNECTION,
  "host": process.env.TYPEORM_HOST,
  "username": process.env.TYPEORM_USERNAME,
  "password": process.env.TYPEORM_PASSWORD,
  "database": process.env.TYPEORM_DATABASE,
  "entities": process.env.TYPEORM_ENTITIES,
  "migrations": process.env.TYPEORM_MIGRATIONS,
  "cli": {
    "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR,
    "entitiesDir": process.env.TYPEORM_ENTITIES_DIR
  }
}
