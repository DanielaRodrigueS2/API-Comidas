const admin = require('firebase-admin');
const db = admin.firestore();

const collection = db.collection('comidas');

const ComidaModel = {
    async getAll(){
        const snapshot = await collection.get();
        const comidas = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        return comidas;
    },
    
    async getByArea(area){
        const snapshot = await collection.where('area', '==', area).get();
        const comidas = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        return comidas;
    },

    async getByTipo(tipo){
        const snapshot = await collection.where('tipo', '==', tipo).get();
        const comidas = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        return comidas;
    },

    async getByIngrediente(ingrediente){
        const snapshot = await collection.where('ingrediente', '==', ingrediente).get();
        const comidas = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        return comidas;
    },

    async create(dados){
        const docRef = await collection.add(data);
        const newDoc = docRef.get();
        return {id: docRef.id, ...newDoc.data()}
    },


};

module.exports = ComidaModel;