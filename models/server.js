const express = require('express');
const cors = require('cors');

class server{

    constructor(){
        this.app = express();

        this.middlewares();

        this.routes();

    }

    routes(){

        //login
        this.app.use('/login', require('../routes/login'));

        //CRUD completos

        //colaboradores
        this.app.use('/colaborador', require('../routes/colaborador'));

        //colaboradores_Departamento o roles
        this.app.use('/colaborador_departamento', require('../routes/colaboradores_Departamento'));

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
        this.app.use('/razon_operacion', require('../routes/razon_operacion'));

        //transacciones
        this.app.use('/transaccion', require('../routes/transaccion'));

        //no afiliados
        this.app.use('/no_afiliado', require('../routes/no_afiliado'));


        //Tablas principales
        
        //cheques a terceros
        this.app.use('/cheques_terceros', require('../routes/cheques_terceros'));

        //diligencias no afiliados
        this.app.use('/diligencias_no_afiliados', require('../routes/diligencia_no_afiliados'));

        //firmas autorizadas a terceros
        this.app.use('/firmas_autorizadas_terceros', require('../routes/firmas_autorizadas_terceros'))

        //transacciones sin comprobantes
        this.app.use('/transacciones_sin_comprobantes' , require('../routes/transacciones_sin_comprobantes'));

        //GETS
        

        //afiliado estado
        this.app.use('/afiliado_estado', require('../routes/afiliado_estado'));

        //firma
        this.app.use('/firma', require('../routes/firma'));

        //colaborador estado
        this.app.use('/colaborador_estado', require('../routes/colaborador_estado'))

        //Prueba con Oracledb
        //Borrar mas adelante
        this.app.use('/pruebaOracledb', require('../routes/prueba'));

        //Afiliados
        this.app.use('/Afiliado', require('../routes/Afiliados'));
        

    }

    middlewares(){

        this.app.use( cors() ); 

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