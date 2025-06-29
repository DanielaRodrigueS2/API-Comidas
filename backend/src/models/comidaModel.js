const admin = require('firebase-admin');
const db = admin.firestore();

const collection = db.collection('comidas');

const validaString = (str) =>{
    if (typeof str === 'string' && str.trim().length > 0 && str.length <= 100){
        return true;
    }
    else return false;

}

module.exports = {
    async getAll(){
        try{
            const snapshot = await collection.get();
            const comidas = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            return comidas;
        }
        catch(eroor){
            throw new Error(`Erro ao encontrrar todas as comidas  ${eroor}`);
        }
    },

    async getById(id){
        console.log('entrou aqui getByID');
        try{
            const doc = await collection.doc(id).get();
            if (!doc.exists) throw new Error('Comida Inexistente');

            return{id: doc.id, ...doc.data()}
        }
        catch(error){
            throw new Error(`Comida não encontrada  ${error}`);
        }
    },

    async getAllAreas(){
        try{
            const snapshot = await collection.get();
            const areasSet = new Set();
            

            snapshot.forEach(doc =>{
                const data = doc.data();
                if (data.area){
                    areasSet.add(data.area)
                }

            })

            return Array.from(areasSet);
        }
        catch(error){
            throw new Error(`Erro ao retonar areas  ${error}`)
        }
    },

    async getAllTipos(){
        try{
            const snapshot = await collection.get();
            const tiposSet = new Set();
            

            snapshot.forEach(doc =>{
                const data = doc.data();
                if (data.tipo){
                    tiposSet.add(data.tipo)
                }

            })

            return Array.from(tiposSet);
        }
        catch(error){
            throw new Error(`Erro ao retonar tipos  ${error}`)
        }
    },

    async getAllIngredientes(){
        try{
            console.log('Entrei aqui em getAllingredientes');
            const snapshot = await collection.get();
            const ingredienteSet = new Set();
            

            snapshot.forEach(doc =>{
                const data = doc.data();
                if (data.ingrediente){
                    data.ingrediente.forEach(ingrediente => {ingredienteSet.add(ingrediente)})
                }

            })

            return Array.from(ingredienteSet);
        }
        catch(error){
            throw new Error(`Erro ao retonar ingredientes  ${error}`)
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
            throw new Error(`Erro ao encontrrar comidas por area  ${eroor}`);
        }
    },

    async getByTipo(tipo){
        if(!validaString(tipo)) throw new Error('String inválida')
        try{
            const snapshot = await collection.where('tipo', '==', tipo).get();
            const comidas = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            return comidas;
        }
        catch(eroor){
            throw new Error(`Erro ao encontrrar todos os tipos ${eroor} `);
        }
    },

    async getByIngrediente(ingrediente){  
        if(!validaString(ingrediente)) throw new Error('String inválida');
        try{
            const snapshot = await collection.where('ingrediente', 'array-contains', ingrediente).get();
            const comidas = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            return comidas;
        }
        catch(eroor){
            throw new Error(`Erro ao encontrrar comidas com esse ingrediente ${eroor}`);
        }
    },

    async create(dados){
        if(typeof(dados) != 'object' || dados === null) throw new Error('Deve ser um objeto');

        const {area, ingrediente, nome, preparo, tipo} = dados;
        
        if(!validaString(area) || !validaString(preparo) || !validaString(nome) || !validaString(tipo)) throw new Error('Aera, preparo, nome e tipo devem ser Strings');
        if(!Array.isArray(ingrediente) || ingrediente.some(i => !validaString(i))) throw new Error('Ingrediente deve ser uma array de strings');

        try{
            const docRef = await collection.add(dados);
            const newDoc = await docRef.get();
            return {id: docRef.id, ...newDoc.data()};
        }
        catch(eroor){
            throw new Error(`Erro criar comida ${eroor}`);
        }
    },


};
