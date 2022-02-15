const {Router} = require('express');
const { origenGet, 
        origenGetID, 
        origenPOST,
        origenDelete,
        origenPut} = require('../controllers/origen_fondos');

const router = Router();

//todos los origenes de fondos
router.get('/', origenGet);

//un origen de fondo predeterminado
router.get('/:id' , origenGetID);

//Agregar un destino
router.post('/', origenPOST);

//Eliminar un destino
router.delete('/:id' , origenDelete);

//actualizar un destino 
router.put('/', origenPut)

module.exports= router;