const admin = require('firebase-admin');
const db = admin.firestore();

const collection = db.collection('usuarios');

const UsuarioModel = {
    async getById(id){
        try{
            const doc = await collection.doc(id).get();
            if (!doc.exists) throw new Error('Usuário Inexistente');

            return{id: doc.id, ...doc.data()}

        }
        catch(error){
            throw new Error ('Erro ao encontrar o usuario')
        }
    },

    async getByEmail(email){
        if(!email) throw new Error('Email provavalemtne invalido')
        try{
            const snapshot = await collection.where('email', '==', email.trim().limit(1).get());
            if(snapshot === null) return null

            const doc = snapshot.docs[0]
            return { id: doc.id, ...data()
            }
        }
        catch(error){
            throw new Error('Eorro ao enconrtra usuario com esse email')
        }
    }
    
};

module.exports = UsuarioModel;