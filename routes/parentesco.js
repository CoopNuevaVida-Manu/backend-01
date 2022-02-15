const { Router } = require('express');
const { parentGet, parentGetID, parentPOST, parentDelete, parentPut } = require('../controllers/parentesco');


const router = Router();

//todos los origenes de fondos
router.get('/', parentGet);

//un origen de fondo predeterminado
router.get('/:id' , parentGetID);

//Agregar un destino
router.post('/', parentPOST);

//Eliminar un destino
router.delete('/:id' , parentDelete);

//actualizar un parentesco 
router.put('/', parentPut)

module.exports= router;