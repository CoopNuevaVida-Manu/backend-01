const { Router } = require('express');
const { chequesTerGet, 
        chequesTerGetId, 
        chequesTerPost,
        chequesTerDelete,
        chequesTerPut} = require('../controllers/cheques_terceros');

const route = Router();

route.get('/', chequesTerGet);

route.get('/:id', chequesTerGetId);

route.post('/', chequesTerPost);

route.delete('/:id', chequesTerDelete);

route.put('/', chequesTerPut);

module.exports = route;