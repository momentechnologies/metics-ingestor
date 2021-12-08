import express from 'express';
import addContextToRequest from '../middlewares/addContextToRequest';
import { Connection } from 'typeorm';
import ingest from './ingest';

const { Router } = express;

export default (connection: Connection) => {
    const router = Router();
    const apiRouter = Router();

    apiRouter.get('/', (req, res) => {
        res.json({
            message: 'Welcome to the Metics Ingestor API',
        });
    });

    apiRouter.use(ingest());

    router.use('/api', addContextToRequest(connection), apiRouter);

    return router;
};
