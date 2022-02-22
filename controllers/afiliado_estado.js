const { response } = require("express");

const conexion = require('../DB/db');


const afiliado_estadoGET = (req, resp = response) =>{
    conexion.query(`SELECT * FROM afiliado_estado`, (err, res)=>{
        if(err){
            throw err
        }else{
            resp.json(res.rows);
        }
    })
}


module.exports = afiliado_estadoGET;