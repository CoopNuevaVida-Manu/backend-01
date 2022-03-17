const { Router } = require('express');
const { getColabDep,
        getColabDepID, 
        postColabDep,
        deleteColabDep} = require('../controllers/colaboradores_Departamento');

const router = Router();

//get
router.get('/', getColabDep);

//get id
router.get('/:id', getColabDepID);

//post
router.post('/',postColabDep);

//delete
router.delete('/', deleteColabDep);

module.exports = router;