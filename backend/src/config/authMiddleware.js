const admin = require('./firestore')

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
      return res.status(401).json({erro: 'Token não foi forncecido ou encotnrado'})
    }

    const token = authHeader.split(' ')[1];

    try{
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();


    }
    catch(error){ 
      return res.status(401).json({erro: 'token não é valido'});


    }
}

module.exports = authMiddleware;