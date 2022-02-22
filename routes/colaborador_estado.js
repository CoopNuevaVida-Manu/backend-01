const { Router } = require('express');
const colab_estadoGET = require('../controllers/colaborador_estado');

const router = Router();

router.get('/', colab_estadoGET);

module.exports = router;