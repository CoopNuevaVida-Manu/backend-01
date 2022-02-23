const { Router } = require('express');
const { t_s_cGet, 
        t_s_cGetID, 
        t_s_cPost,
        t_s_cDelete,
        t_s_cPut} = require('../controllers/transacciones_sin_comprobantes');

const router = Router();

router.get('/', t_s_cGet);

router.get('/:id', t_s_cGetID);

router.post('/', t_s_cPost);

router.delete('/:id', t_s_cDelete);

router.put('/', t_s_cPut)

module.exports = router;