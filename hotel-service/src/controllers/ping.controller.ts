import { Request, Response } from 'express';

import logger from '../config/logger';
import { InternalServerError } from '../utils/errors/app.error';

export const pingController = async (req: Request, res: Response) => {
    try {
        logger.info('Ping request recieved');
        res.status(200).json({
            message: 'Server is up and running',
            success: true,
        });
    } catch (error: any) {
        throw new InternalServerError(error.message);
    }
};
