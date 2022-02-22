const { response } = require("express");

const conexion = require('../DB/db');


const afiliado_estadoGET = (req, resp = response) =>{
    conexion.query(`SELECT * FROM afiliado_estado`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            resp.json(res.rows);
        }
    })
}


module.exports = afiliado_estadoGET;