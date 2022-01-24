const winston = require("winston");
const { format, transports } = winston;
const path = require("path");

const logger = winston.createLogger({
  level: "info", //Sets the default level
  format: format.combine(
    format.colorize(),
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.metadata({ fillExcept: ["message", "level", "timestamp"] }),
    format.prettyPrint(),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "fryzek" }, //Adds extra meta-data
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      eol: "\n\n"
    })
  ]
});

module.exports = logger;
