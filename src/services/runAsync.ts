import ApiException from '../exceptions/apiException';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/CustomRequest';

export default (
        callback: (
            req: CustomRequest,
            res: Response,
            next: NextFunction | undefined
        ) => Promise<any>,
        returnType = 'json'
    ) =>
    (req, res, next) =>
        callback(req, res, next)
            .then((json) => json && res.json(json))
            .catch((err) => {
                if (returnType === 'html') {
                    if (err instanceof ApiException) {
                        res.sendStatus(err.getStatus());
                        return;
                    }
                }
                next(err);
            });
