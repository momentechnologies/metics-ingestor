import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import createRouter from './routes';
import appConfig from './config/app';
import dbConfig from './config/db';
import endpointNotFoundHandler from './middlewares/endpointNotFoundHandler';
import exceptionHandler from './middlewares/exceptionHandler';
import { createConnection } from 'typeorm';

export default async () => {
    const connection = await createConnection(dbConfig);

    const app = express();
    app.enable('trust proxy');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(await createRouter(connection));
    app.use(endpointNotFoundHandler);
    app.use(exceptionHandler);

    app.listen(appConfig.port, () => {
        console.info(`Metics Ingestor listening on ${appConfig.port}`);
    });
};
