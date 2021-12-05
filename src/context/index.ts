import { CustomRequest } from '../types/CustomRequest';
import { Response } from 'express';
import { AsyncReturnType } from '../types/AsyncReturnType';
import { Connection } from 'typeorm';

export const buildRawContext = ({ connection }: { connection: Connection }) => {
    return {};
};

const getContext = async (
    req: CustomRequest,
    res: Response,
    helpers: { connection: Connection }
) => {
    const rawContext = buildRawContext(helpers);

    return {
        res,
        req,
        ...rawContext,
    };
};

export type Context = AsyncReturnType<typeof getContext>;
export default getContext;
