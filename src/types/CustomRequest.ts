import { Request } from 'express';
import { Context } from '../context';

export interface CustomRequest extends Request {
    context: Context;
}
