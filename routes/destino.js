const { Router } = require("express");
const { destGet, 
        destGetId, 
        destPOST, 
        destDelete, 
        destPut } = require("../controllers/destino");


const router = Router();

//Todas los destinos
router.get('/', destGet);

//un solo destino
router.get('/:id' , destGetId);

//Agregar un destino
router.post('/', destPOST);

//Eliminar un destino
router.delete('/:id' , destDelete);

//actualizar un destino 
router.put('/', destPut)

module.exports = router;