import { NextFunction, Request, Response } from 'express';

import { AppError } from '@/utils/errors/app.error';

export const genericErrorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    console.log('Error caught by generic error handler:', err);
    res.status(statusCode).json({
        message,
        success: false,
        statusCode,
    });
};
