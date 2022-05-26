const { Router } = require('express');
const { getciudad } = require('../controllers/prueba');

const router = Router();

router.get('/', getciudad);

module.exports = router;