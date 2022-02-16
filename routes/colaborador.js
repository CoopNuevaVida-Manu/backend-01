const { Router } = require('express');
const { colabGet, 
        colabGetId, 
        colabPost, 
        colabDelete, 
        colabPut } = require('../controllers/colaborador');


const router = Router();

//todos los departamentos
router.get('/', colabGet);

//un solo departamento
router.get('/:id', colabGetId);

//crear un departamento nuevo
router.post('/', colabPost);

//Eliminar un departamento
router.delete('/:id', colabDelete);

//actualizar
router.put('/', colabPut);

module.exports = router;