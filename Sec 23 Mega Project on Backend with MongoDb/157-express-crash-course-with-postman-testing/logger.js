import { createLogger, format, transports } from 'winston';
const {combine, timestamp, json, colorize} = format;

const consoleLogFormat = format.combine(
    format.colorize(),
    format.printf(({level, message, timestamp}) => {
        return `${timestamp} ${level}: ${message}`;
    })
);

const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp(),
        json()
    ),
    transports: [
        new transports.Console({
        format: consoleLogFormat
    }),
    new transports.File({
        filename: 'combined.log',
        format: json()
    }),
    new transports.File({
        filename: 'error.log',
        level: 'error',
        format: json()
    })
    ]
});

export default logger;