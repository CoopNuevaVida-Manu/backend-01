const { Router } = require('express');
const { razopGet, 
        razopGetID, 
        razopPOST,
        razopDelete,
        razopPut} = require('../controllers/razon_operacion');


const router = Router();

//todos las razon de operacion
router.get('/', razopGet);

//una razon de operacion predeterminado
router.get('/:id' , razopGetID);

//Agregar una razon de operacion
router.post('/', razopPOST);

//Eliminar una razon de operacion
router.delete('/:id' , razopDelete);

//actualizar una razon de operacion
router.put('/', razopPut)


module.exports = router;