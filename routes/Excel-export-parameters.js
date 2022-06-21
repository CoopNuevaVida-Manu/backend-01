const { Router } = require('express');
const { exportTransaccionesSinComprobante_P, 
        exporDiligenciaNoAfiliados_P, 
        exporChequesTerceros_P, 
        exporFirmasTerceros_P } = require('../controllers/Excel-export-parameters');


const router = Router();

router.get('/TSC/:fechai/:fechaf', exportTransaccionesSinComprobante_P);

router.get('/DD/:fechai/:fechaf', exporDiligenciaNoAfiliados_P);

router.get('/CT/:fechai/:fechaf', exporChequesTerceros_P);

router.get('/FT/:fechai/:fechaf', exporFirmasTerceros_P);

module.exports= router;