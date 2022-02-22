const { Router } = require('express');
const { firmas_tercerosGet } = require('../controllers/firmas_autorizadas_terceros');

const router = Router();

router.get('/', firmas_tercerosGet)



module.exports = router