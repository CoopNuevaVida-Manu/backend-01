const { Router } = require('express');
const { exporDiligenciaNoAfiliados, exporChequesTerceros, exportTransaccionesSinComprobante, exporFirmasTerceros } = require('../controllers/Excel-export');

const router = Router();

router.get('/TSC', exportTransaccionesSinComprobante);

router.get('/DD', exporDiligenciaNoAfiliados);

router.get('/CT', exporChequesTerceros);

router.get('/FT', exporFirmasTerceros);

module.exports= router;