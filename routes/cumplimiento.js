const { Router } = require('express');
const { getTransaccionesSinComprobante, 
        getDiligenciaNoAfiliados, 
        getChequesTerceros, 
        getFirmasTerceros} = require('../controllers/cumplimiento');

const router = Router();

//get
router.get('/TSC', getTransaccionesSinComprobante);

router.get('/DD', getDiligenciaNoAfiliados);

router.get('/CT', getChequesTerceros);

router.get('/FT', getFirmasTerceros);


module.exports = router;