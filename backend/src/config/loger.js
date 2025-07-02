const {createLogger, format, transports} = require('winston')

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(() => {
            
        })

    )


})