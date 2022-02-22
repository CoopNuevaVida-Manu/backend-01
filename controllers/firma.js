const { response } = require('express');

const conexion = require('../DB/db');

const firmaGET = (req, resp = response)=>{
    conexion.query(`SELECT * FROM firma`, (err, res)=>{
        if(err){
            throw err
        }else{
            resp.json(res.rows);
        }
    })
}


module.exports = firmaGET;