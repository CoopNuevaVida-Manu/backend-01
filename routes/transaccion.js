const {Router} = require('express');
const { transGet, 
        transGetID, 
        transPOST,
        transDelete,
        transPut} = require('../controllers/transaccion');


const router = Router();


//todos las razon de operacion
router.get('/', transGet);

//una razon de operacion predeterminado
router.get('/:id' , transGetID);

//Agregar una razon de operacion
router.post('/', transPOST);

//Eliminar una razon de operacion
router.delete('/:id' , transDelete);

//actualizar una razon de operacion
router.put('/', transPut)


module.exports = router