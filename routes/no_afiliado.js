const { Router } = require('express');
const { no_afiliadoGet, 
        no_afiliadoGetID, 
        no_afiliadoPost,
        no_afiliadoDelete,
        no_afiliadoPut} = require('../controllers/no_afiliado');

const router = Router();

router.get('/', no_afiliadoGet);

router.get('/:id', no_afiliadoGetID);

router.post('/', no_afiliadoPost);

router.delete('/:id', no_afiliadoDelete);

router.put('/', no_afiliadoPut)

module.exports = router;