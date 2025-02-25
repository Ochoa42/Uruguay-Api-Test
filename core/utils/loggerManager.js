import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  name: "testing",
  transports: [
    new transports.Console(),
    new transports.File({ filename: "log/logger.log" })
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss", alias: "time" }),
    format.prettyPrint(),
    format.simple()
  ),
  level: "debug",
});

export const errorLogger = createLogger({
  name: "errors",
  transports: [
    new transports.Console(),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss", alias: "time" }),
    format.prettyPrint(),
    format.simple()
  ),
  level: "error", 
});