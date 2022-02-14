const {Router} = require('express');
const { depGet, 
        depGetId, 
        depPost,
        depDelete,  
        depPut} = require('../controllers/departamento');

const router = Router();
//todos los departamentos
router.get('/', depGet);

//un solo departamento
router.get('/:id', depGetId);

//crear un departamento nuevo
router.post('/', depPost);

//Eliminar un departamento
router.delete('/:id', depDelete);

//actualizar
router.put('/', depPut);

module.exports = router;