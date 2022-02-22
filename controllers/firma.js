const { response } = require('express');

const conexion = require('../DB/db');

const firmaGET = (req, resp = response)=>{
    conexion.query(`SELECT * FROM firma`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            resp.json(res.rows);
        }
    })
}


module.exports = firmaGET;