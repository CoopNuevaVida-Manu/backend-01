const { Router } = require("express");
const { destGet, destGetId, destPOST, destDelete } = require("../controllers/destino");


const router = Router();

//Todas los destinos
router.get('/', destGet);

//un solo destino
router.get('/:id' , destGetId);

//Agregar un destino
router.post('/', destPOST);

//Eliminar un destino
router.delete('/:id' , destDelete)

module.exports = router;