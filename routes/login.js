const { Router } = require('express');
const {login, loginPut} = require('../controllers/login');


const router = Router();

router.post('/', login);

router.put('/', loginPut);

module.exports = router;