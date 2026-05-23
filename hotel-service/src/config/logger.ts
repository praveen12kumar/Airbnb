import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { getCorrelationId } from '../utils/helpers/request.helpers';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
        winston.format.json(), // format the log as JSON
        // define a custom print
        winston.format.printf(({ level, message, timestamp, ...data }) => {
            const output = {
                level,
                message,
                timestamp,
                correlatedId: getCorrelationId(),
                data,
            };
            return JSON.stringify(output);
        })
    ),
    // transport is kind of storing device for loggs
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '30d',
            maxSize: '20m',
        }),
    ],
});
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(
//         new winston.transports.Console({
//             format: winston.format.simple(),
//         })
//     );
// }

export default logger;
