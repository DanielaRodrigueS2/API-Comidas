const admin = require('firebase-admin');
const db = admin.firestore();

const collection = db.collection('comidas');

const validaString = (str) =>{
    if (typeof str === 'string' && str.trim().length > 0 && str.length <= 100){
        return true;
    }
    else return false;

}

const ComidaModel = {
    async getAll(){
        if(!validaString(area)) throw new Error('String inválida');
        try{
            const snapshot = await collection.get();
            const comidas = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            return comidas;
        }
        catch(eroor){
            throw new Error('Erro ao encontrrar todas as comidas', eroor);
        }
    },
    
    async getByArea(area){
        if(!validaString(area)) throw new Error('String inválida');
        try{    
            const snapshot = await collection.where('area', '==', area).get();
            const comidas = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            return comidas;
        }
        catch(eroor){
            throw new Error('Erro ao encontrrar comidas por area', eroor);
        }
    },

    async getByTipo(tipo){
        if(!validaString(area)) throw new Error('String inválida')
        try{
            const snapshot = await collection.where('tipo', '==', tipo).get();
            const comidas = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            return comidas;
        }
        catch(eroor){
            throw new Error('Erro ao encontrrar todos os tipos', eroor);
        }
    },

    async getByIngrediente(ingrediente){  
        if(!validaString(area)) throw new Error('String inválida');
        try{
            const snapshot = await collection.where('ingrediente', 'array-contains', ingrediente).get();
            const comidas = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            return comidas;
        }
        catch(eroor){
            throw new Error('Erro ao encontrrar comidas com esse ingrediente', eroor);
        }
    },

    async create(dados){
        if(typeof(dados) != 'object' || dados === null) throw new Error('Deve ser um objeto');

        const {area, ingrediente, nome, preparo, tipo} = dados;
        
        if(!validaString(area) || !validaString(preparo) || !validaString(nome) || !validaString(tipo)) throw new Error('Aera, preparo, nome e tipo devem ser Strings');
        if(!Array.isArray(ingrediente) || ingrediente.some(i => !validaString(i))) throw new Error('Ingrediente deve ser uma array de strings');

        try{
            const docRef = await collection.add(dados);
            const newDoc = docRef.get();
            return {id: docRef.id, ...newDoc.data()};
        }
        catch(eroor){
            throw new Error('Erro criar comida', eroor);
        }
    },


};

module.exports = ComidaModel;