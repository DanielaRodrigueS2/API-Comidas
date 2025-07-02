const { admin } = require('./firestore');
const logger = require('./logger');

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
      logger.error('Token não fornecido ou encontrado')
      return res.status(401).json({erro: 'Token não foi forncecido ou encotnrado'})
    }

    const token = authHeader.split(' ')[1];


    try{
      logger.info('Token recebido');
      const decodedToken = await admin.auth().verifyIdToken(token);
      logger.info('Token validado');
      req.user = decodedToken;
      
      next();

    }
    catch(error){ 
      console.log(error.code)
      logger.error(`Erro ao entrar com esse token ${error}`);
      return res.status(401).json({erro: 'token não é valido'});

    }
}

module.exports = authMiddleware;