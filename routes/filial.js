const {Router} = require('express');
const { filialGet, 
        filialGetID, 
        filialPOST,
        filialDelete,
        filialPut} = require('../controllers/filial');


const router =  Router()

router.get('/', filialGet);

router.get('/:id' , filialGetID);

//Agregar un destino
router.post('/', filialPOST);

//Eliminar un destino
router.delete('/:id' , filialDelete);

//actualizar un destino 
router.put('/', filialPut)


module.exports = router;