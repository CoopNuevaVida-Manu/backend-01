const { Router } = require('express');

const { afiliado_estadoGET, 
        afiliado_estadoGETID } = require('../controllers/afiliado_estado');

const router = Router();

router.get('/', afiliado_estadoGET);

router.get('/:id', afiliado_estadoGETID);

module.exports = router;