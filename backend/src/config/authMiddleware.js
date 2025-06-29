const { admin } = require('./firestore')

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader) //teste

    if(!authHeader || !authHeader.startsWith('Bearer ')){
      console.log('deu ruim')
      return res.status(401).json({erro: 'Token não foi forncecido ou encotnrado'})
    }

    const token = authHeader.split(' ')[1];


    try{
      console.log('token recebido: ', token) //teste
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log('token validado pelo decodedToken') // teste
      req.user = decodedToken;
      next();

    }
    catch(error){ 
      console.log(error.code)
      return res.status(401).json({erro: 'token não é valido'});

    }
}

module.exports = authMiddleware;