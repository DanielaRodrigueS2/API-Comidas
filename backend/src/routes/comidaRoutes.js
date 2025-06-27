const express = require('express');
const router = express.Router();
const auth = require('../config/firestore')
const {getAll, getByArea, getByIngrediente, getByTipo, create} = require('../models/comidaModel')

router.get('/comidas', auth, async (req, res) => {
    try{
        const comidas = await getAll()
        res.json(comidas); 
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});

router.get('/comidas/area/:area', auth, async (req, res) => {
    const {area} = req.params;
    try{
        const comidas = await getByArea(area)
        res.json(comidas)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }

});

router.get('/comidas/tipo/:tipo',auth, async (req, res) => {
    const {tipo} = req.params;
    try{
        const comidas = await getByTipo(tipo)
        res.json(comidas); 
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
    
});

router.get('/comidas/ingrediente/:ingrediente', auth, async (req, res) => {
    const {ingrediente} = req.params
    try{
        const comidas = await getByIngrediente(ingrediente)
        res.json(comidas); 
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
    
});

router.post('/comidas', auth, async(req, res) => {
    const dados = req.body;
    try{
        const comidas = await create(dados)
        res.status(201).json(comida)
    }
    catch(error){
        res.status(500).json({error: error.message});
    }

});

modulde.exports = router