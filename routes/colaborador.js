const { Router } = require('express');
const { colabGetActivo, 
        colabGetId, 
        colabPost, 
        colabDelete, 
        colabPut, 
        colabGetInactivo,
        colabPutPass,
        colabEnd} = require('../controllers/colaborador');


const router = Router();

//todos los departamentos
router.get('/', colabGetActivo);

router.get('/inactivo', colabGetInactivo);

router.get('/colabEnd', colabEnd);

//un solo departamento
router.get('/:id', colabGetId);

//crear un departamento nuevo
router.post('/', colabPost);

//Eliminar un departamento
router.delete('/:id', colabDelete);

//actualizar
router.put('/', colabPut);

router.put('/Pass', colabPutPass);

module.exports = router;