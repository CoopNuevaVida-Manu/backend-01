const {response} = require('express');

const conexion = require('../DB/db');


//GET
const origenGet = (req, resp = response)=>{
    conexion.query(`SELECT * FROM origen_fondos`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows);
        }
    })
}


//GET ID
const origenGetID = (req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`SELECT * FROM origen_fondos WHERE id_origen_fondos = ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows)
        }
    })
};

//POST
const origenPOST = (req, resp = response)=>{

    const {origen_fondos} = req.body;

    conexion.query( `INSERT INTO origen_fondos( origen_fondos ) VALUES('${origen_fondos}')` , (err, res)=>{
        if(err){
            return resp.json({
                insert: false
            })
        }else{
            return resp.json({
                insert : true
            });
        }
    } )
}

//DELETE    
const origenDelete = (req, resp = response)=>{

    const {id} = req.params;

    conexion.query(`DELETE FROM origen_fondos WHERE id_origen_fondos = ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                delete : false
            })
        }else{
            return resp.json({
                delete: true
            })
        }
    })
}

//PUT
const origenPut = (req, resp = response) =>{
    
    const { id, origen_fondos } = req.body;

    conexion.query( `UPDATE origen_fondos SET origen_fondos='${origen_fondos}' WHERE id_origen_fondos = ${id}` , (err, res)=>{
        if(err){
            return resp.json({
                put : false
            })
        }else{
            return resp.json({
                put : true
            });
        }
    } )
}

module.exports = {
    origenGet,
    origenGetID,
    origenPOST,
    origenDelete,
    origenPut
}