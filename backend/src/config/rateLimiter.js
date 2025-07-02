const rateLimit = require('express-rate-limit');
const logger = require('./logger')

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 12,
    message: 'Muitas requisições estão sendo feita para API_COMIDAS no momento tente novamente mais tarde por favor',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        const ip = req.ip || 'Ip não foi encontrado';
        logger.warn(`O rate limtier foi ultrapassado seu limite pelo seguinte ip: ${ip} na seguinte rota da api: ${req.originalUrl}`);
        res.status(options.statusCode).json({ message: options.message});
    }

});

module.exports = limiter;