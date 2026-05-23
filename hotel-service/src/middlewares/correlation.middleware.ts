import { NextFunction, Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';

import { asyncLocalStorage } from '../utils/helpers/request.helpers';

export const attactCorrelationIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const correlatedId = uuidV4();

    req.headers['X-correlation-ID'] = correlatedId;

    asyncLocalStorage.run(
        {
            correlationId: correlatedId,
        },
        () => {
            next();
        }
    );
};
