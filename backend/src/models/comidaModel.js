const {admin, db} = require('../config/firestore');
const collection = db.collection('comidas');
const logger = require('../config/logger')


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
            
            const area = Array.from(areasSet);

            return area;
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

            const tipo = Array.from(tiposSet);

            return tipo;
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

            const ingrediente = Array.from(ingredienteSet);

            return ingrediente;
        }
        catch(error){
            throw new Error(`Erro ao retonar ingredientes  ${error}`)
        }
    },
    
    async getByArea(area){
        if(!validaString(area)) throw new Error('String inválida');
        try{    
            const snapshot = await collection.where('area', '==', area.toLowerCase()).get();
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
            const snapshot = await collection.where('tipo', '==', tipo.toLowerCase()).get();
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
            const snapshot = await collection.where('ingrediente', 'array-contains', ingrediente.toLowerCase()).get();
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

        const dadosProntos = {
            ...dados,
            area: dados.area.toLowerCase(),
            tipo: dados.tipo.toLowerCase(),
            ingrediente: dados.ingrediente.map(i => i.toLowerCase())
        }

        try{
            const docRef = await collection.add(dadosProntos);
            const newDoc = await docRef.get();


            logger.info(`Comida : ${nome}, criada com sucesso`);
            return {id: docRef.id, ...newDoc.data()};
        }
        catch(eroor){
            logger.error(`Erro ao criar comida : ${nome}, erro: ${eroor}`);
            throw new Error(`Erro criar comida ${eroor}`);
        }
    },


};
