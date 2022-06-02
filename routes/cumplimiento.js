const { Router } = require('express');
const { getTransaccionesSinComprobante, getDiligenciaNoAfiliados } = require('../controllers/cumplimiento');
const router = Router();

//get
router.get('/TSC', getTransaccionesSinComprobante);

router.get('/DD', getDiligenciaNoAfiliados);


module.exports = router;