const { Router } = require('express');
const { getAfiliadoID, getAfiliadoCuentas, getAfiliadoCli, postAfiliado, AfilidoIDPostgres } = require('../controllers/Afiliados');

const router = Router();

router.get('/:id', getAfiliadoID);

router.get('/PSQL/:id', AfilidoIDPostgres);

router.get('/cuenta/:idSuc/:idCli', getAfiliadoCuentas);

router.get('/Cli/:idSuc/:idCli', getAfiliadoCli);

router.post('/', postAfiliado)

module.exports = router;