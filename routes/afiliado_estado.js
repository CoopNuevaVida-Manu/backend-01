const { Router } = require('express');
const afiliado_estadoGET = require('../controllers/afiliado_estado');

const router = Router();

router.get('/', afiliado_estadoGET)

module.exports = router;