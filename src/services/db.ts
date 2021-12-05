import PG from 'pg';
import dbConfig from '../config/db';
import knex, { Knex } from 'knex';
import chalk from 'chalk';
import moment from 'moment';
import path from 'path';
import logger from './logger';

const pool = new PG.Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

const queryBuilder = knex({
    client: 'pg',
    connection: {
        user: dbConfig.user,
        host: dbConfig.host,
        database: dbConfig.database,
        password: dbConfig.password,
        port: dbConfig.port,
    },
    pool: { min: 0, max: 10 },
    migrations: {
        directory: path.resolve('./src/migrations'),
        tableName: 'migrations',
        loadExtensions: ['.js'],
    },
});

const times = {};

queryBuilder
    .on('query', (query) => {
        times[query.__knexQueryUid] = moment();
    })
    .on('query-response', (response, query, builder) => {
        if (times[query.__knexQueryUid]) {
            const sql = builder.toString();
            logger.debug(
                chalk.blue(
                    `DB query - ${moment().diff(
                        times[query.__knexQueryUid],
                        'ms'
                    )}ms - ${sql}`
                )
            );

            delete times[query.__knexQueryUid];
        }
    });

export default queryBuilder;

export const dbHelpers = {
    create: async (db: Knex, tableName: string, data: any) => {
        const rows = await db(tableName).insert(data).returning('*');

        return rows[0];
    },
    updateId: async (db: Knex, tableName: string, id: number, data: any) => {
        const rows = await db(tableName)
            .where('id', id)
            .update(data)
            .returning('*');

        return rows[0];
    },
    isUniqueViolation: (error, uniqueKeyName: string) =>
        error &&
        error.code &&
        parseInt(error.code) === 23505 &&
        (!uniqueKeyName || error.constraint === uniqueKeyName),
};
