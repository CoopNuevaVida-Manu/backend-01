const { Router } = require('express');
const { getAfiliadoID, getAfiliadoCuentas, getAfiliadoCli } = require('../controllers/Afiliados');

const router = Router();

router.get('/:id', getAfiliadoID);

router.get('/cuenta/:idSuc/:idCli', getAfiliadoCuentas);

router.get('/Cli/:idSuc/:idCli', getAfiliadoCli);

module.exports = router;