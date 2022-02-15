const express = require('express');

class server{

    constructor(){
        this.app = express();

        this.middlewares();

        this.routes();

    }

    routes(){

        //departamento
        this.app.use('/departamento' , require('../routes/departamento'));
        
        //destino
        this.app.use('/destino', require('../routes/destino'));

        //filial
        this.app.use('/filial', require('../routes/filial'));

        //Origen de fondos
        this.app.use('/origen_fondos', require('../routes/origen_fondos'));

        //parentesco
        this.app.use('/parentesco', require('../routes/parentesco'));

        //razon de operacion
        this.app.use('/razon_parentesco', require('../routes/razon_operacion'));

        //transacciones
        this.app.use('/transaccion', require('../routes/transaccion'));


        
    }

    middlewares(){
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log(`Servidor corriendo en puerto http://localhost:${process.env.PORT}`)
        })
    }

}

module.exports = server;