const { response } = require('express');

const conexion = require('../DB/db');

const firmas_tercerosGet = (req, resp = response) =>{
    
    conexion.query(`SELECT * FROM public.firmas_autorizadas_terceros ORDER BY apertura_actualizacion DESC `, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows)
        }
    })
}


module.exports = {
    firmas_tercerosGet
}