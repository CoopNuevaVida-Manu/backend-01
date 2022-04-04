const { Router } = require('express');
const { colab_estadoGET ,
        colab_estadoGETID} = require('../controllers/colaborador_estado');

const router = Router();

router.get('/', colab_estadoGET);

router.get('/:id', colab_estadoGETID);

module.exports = router;