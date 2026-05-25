import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

import logger from './config/logger';
import { serverConfig } from './config/serverConfig';
import sequelize from './db/models/sequelize';
import { attactCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { genericErrorHandler } from './middlewares/ErrorMiddleware';
import apiRouter from './routes';

// Load environment variables
dotenv.config();

const app = express();

app.use(attactCorrelationIdMiddleware);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRouter);

/**
 * Add the error handler middleware
 */
app.use(genericErrorHandler);

// Start server
app.listen(serverConfig.PORT, async () => {
    logger.info('Server is running on port', { PORT: serverConfig.PORT });
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
});

export default app;
