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