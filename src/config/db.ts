import { ConnectionOptions } from 'typeorm';

export default {
    type: 'postgres',
    host: process.env.CONFIG_DB_HOST || 'postgres',
    username: process.env.CONFIG_DB_USER || 'postgres',
    password: process.env.CONFIG_DB_PASSWORD || 'postgres',
    database: process.env.CONFIG_DB_DATABASE || 'ingestor',
    port: 5432,
    synchronize: false,
    logging: false,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: ['src/subscribers/**/*.ts'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers',
    },
} as ConnectionOptions;
