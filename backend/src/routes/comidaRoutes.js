const express = require('express');
const router = express.Router();
const cache = require('express-redis-cache')() 
const auth = require('../config/authMiddleware');
const {body, validationQuery, validationResult} = require('express-validator')
const {getAll, getById, getByArea, getByIngrediente, getByTipo, getAllAreas, getAllIngredientes, getAllTipos, create} = require('../models/comidaModel');


router.get('/comidas', auth, async (req, res) => {
    try{
        const comidas = await getAll()
        res.json(comidas); 
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});


router.get('/comidas/area', auth, cache.route({expire: 300}), async (req,res) => {
    try{
        const areas = await getAllAreas();
        res.json(areas);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});

router.get('/comidas/tipo', auth, cache.route({expire: 300}), async (req,res) => {
    try{
        const tipos = await getAllTipos();
        res.json(tipos);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});

router.get('/comidas/ingrediente', auth, cache.route({expire: 300}), async (req,res) => {
    console.log('entrei aqui')
    try{
        const ingredientes = await getAllIngredientes();
        if(!ingredientes || ingredientes.length ===0 ){
            return res.status(404).json({error: 'Nenhum ingrediente foi retornado'})
        }
        res.json(ingredientes);
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

router.get('/comidas/:id', auth, async (req,res) =>{
    const {id} = req.params
    try{
        const comida = await getById(id);
        res.json(comida);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});


//Validacao de entradas, mais a protecao contra injections com escape
router.post('/comidas', 
    [
        body('nome').trim().escape().isLength({min:1, max:60}),
        body('area').trim().escape().isLength({min:1, max: 20}),
        body('preparo').trim().escape().isLength({min:1, max:200}),
        body('tipo').trim().escape().isLength({min:1, max: 20}),
        body('ingrediente').isArray({min:1}),
        body('ingrediente.*').trim().escape().isLength({min:1, max: 25})
    ],
    
    auth, async(req, res) => {
    
    const erros = validationResult(req);

    if(!erros.isEmpty()) return res.status(400).json({erros: erros});


    const dados = req.body;
    try{
        const comidas = await create(dados)
        cache.flush();
        res.status(201).json(comidas)
    }
    catch(error){
        res.status(500).json({error: error.message});
    }

});


module.exports = router