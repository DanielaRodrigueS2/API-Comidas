const {createLogger, format, transports} = require('winston')

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return ` tempo: ${timestamp}  level: ${level.toUpperCase()} : ${message}`
        })
    ),

    transports:[
        new transports.console(),
        new transports.File({ filename: 'erros.log', level: 'error'}),
        new transports.File({filename: 'todoslogs.log'})
    ],

});

module.exports = logger;