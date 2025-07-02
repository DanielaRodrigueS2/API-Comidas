const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 12,
    message: 'Muitas requisições estão sendo feita para API_COMIDAS no momento tente novamente mais tarde por favor',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = limiter;