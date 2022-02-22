const { response } = require('express');

const conexion = require('../DB/db');

const colab_estadoGET = (req, resp = response)=>{
    conexion.query(`SELECT * FROM colaborador_estado`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows)
        }
    })
}

module.exports = colab_estadoGET;