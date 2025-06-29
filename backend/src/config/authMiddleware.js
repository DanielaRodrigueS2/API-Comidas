const { admin } = require('./firestore')
const { evento } = require('./loger')

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
      // console.log('deu ruim')
      evento('Token não recebido, não existe');
      return res.status(401).json({erro: 'Token não foi forncecido ou encotnrado'})
    }

    const token = authHeader.split(' ')[1];


    try{
      // console.log('token recebido: ', token) //teste
      const decodedToken = await admin.auth().verifyIdToken(token);
      // console.log('token validado pelo decodedToken') // teste
      req.user = decodedToken;
      evento(`Token validado e correto :`)
      next();

    }
    catch(error){ 
      console.log(error.code)
      evento(`Token invalido - erro gerado: ${error.message}`)
      return res.status(401).json({erro: 'token não é valido'});

    }
}

module.exports = authMiddleware;