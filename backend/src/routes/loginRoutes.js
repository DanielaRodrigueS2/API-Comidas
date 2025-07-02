const express = require('express');
const router = express.Router();
const admin = require('firebase-admin')

router.post('/login', async (req,res) => {
    const {idToken} = req.body;

    if (!idToken) return res.status(400).json({error: 'Token não está presentes'})

    try{

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const userRecord = await admin.auth().getUser(uid);

        return res.json({
            message: 'Login realizado com sucesso',
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                name: userRecord.displayName
            }
        });

    }
    catch(error){
        return res.status(401).json({error: 'Token é inválido ou expirou'});

    }

})

module.exports = router;