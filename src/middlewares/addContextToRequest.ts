import context from '../context';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/CustomRequest';
import { Connection } from 'typeorm';

export default (connection: Connection) =>
    (req: CustomRequest, res: Response, next: NextFunction) =>
        context(req, res, {
            connection,
        })
            .then((context) => {
                req.context = context;
                next();
            })
            .catch(next);
