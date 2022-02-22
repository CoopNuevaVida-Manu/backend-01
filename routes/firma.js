const { Router } = require('express');
const firmaGET = require('../controllers/firma');

const router = Router();

router.get('/', firmaGET);

module.exports = router;