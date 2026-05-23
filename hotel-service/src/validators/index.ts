import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

import logger from '../config/logger';

/**
 * @param Schema Zod schema to validate the request body
 * @returns middleware function to validate the request body
 */

export const validateRequestBody = (Schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('Validating request body');
            await Schema.parseAsync(req.body);
            logger.info('Request body validation successful');
            next();
        } catch (error) {
            // if the validation fails
            return res.status(400).json({
                message: 'Invalid request body',
                success: false,
                error: error,
            });
        }
    };
};

/**
 * @param query validate a query params
 * @returns middleware function to validate the query params
 */

export const validateQueryParams = (Schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('Validating query params', {
                correlatedId: req.headers['X-correlation-ID'],
            });
            await Schema.parseAsync(req.query);
            logger.info('Query params validation successful', {
                correlatedId: req.headers['X-correlation-ID'],
            });
            next();
        } catch (error) {
            // if the validation fails
            return res.status(400).json({
                message: 'Invalid query params',
                success: false,
                error: error,
            });
        }
    };
};
