const { Router } = require('express');
const { diligenciaGet, 
        diligenciaGetId, 
        diligenciaPost,
        diligenciaDelete,
        diligenciaPut} = require('../controllers/diligencia_no_afiliados');

const router = Router();

router.get('/', diligenciaGet);

router.get('/:id', diligenciaGetId);

router.post('/', diligenciaPost);

router.delete('/:id', diligenciaDelete);

router.put('/', diligenciaPut);

module.exports= router;