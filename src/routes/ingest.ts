import express from 'express';
import runAsync from '../services/runAsync';
import validateJoi from '../services/validateJoi';
import Joi from 'joi';
import { Transaction } from '../entities/Transaction';
import { TransactionRequest } from '../entities/TransactionRequest';

const { Router } = express;

export default () => {
    const router = Router();

    router.post(
        '/v1/ingest',
        runAsync(async (req, res) => {
            const data = validateJoi(
                req.body,
                Joi.object({
                    transactionId: Joi.string().required().uuid(),
                    requestId: Joi.string().required().uuid(),
                    trace: Joi.array().items(Joi.any()).min(1).required(),
                })
            );
            let transaction = await Transaction.findOne(data.transactionId);
            if (!transaction) {
                transaction = await Transaction.create({
                    id: data.transactionId,
                }).save();
            }

            let transactionRequest = await TransactionRequest.findOne({
                where: {
                    transactionId: data.transactionId,
                    requestId: data.requestId,
                },
            });
            if (!transactionRequest) {
                transactionRequest = await TransactionRequest.create({
                    transactionId: data.transactionId,
                    requestId: data.requestId,
                }).save();
            }

            res.json({
                transaction,
                transactionRequest,
            });
        })
    );

    return router;
};
