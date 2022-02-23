const { Router } = require('express');
const { firmas_tercerosGet, 
        firmas_tercerosGetID, 
        firmas_tercerosPost,
        firmas_tercerosDelete,
        firmas_tercerosPut} = require('../controllers/firmas_autorizadas_terceros');

const router = Router();

router.get('/', firmas_tercerosGet);

router.get('/:id', firmas_tercerosGetID);

router.post('/', firmas_tercerosPost);

router.delete('/:id', firmas_tercerosDelete);

router.put('/', firmas_tercerosPut )

module.exports = router