const {response} = require('express');

const conexion = require('../DB/db');


//GET
const origenGet = (req, resp = response)=>{
    conexion.query(`SELECT * FROM origen_fondos`, (err, res)=>{
        if(err){
            throw err
        }else{
            resp.json(res.rows);
        }
    })
}


//GET ID
const origenGetID = (req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`SELECT * FROM origen_fondos WHERE id_origen_fondos = ${id}`, (err, res)=>{
        if(err){
            throw err
        }
        resp.send(res.rows)
    })
};

//POST
const origenPOST = (req, resp = response)=>{

    const {origen_fondos} = req.body;

    conexion.query( `INSERT INTO origen_fondos( origen_fondos ) VALUES('${origen_fondos}')` , (err, res)=>{
        if(err){
            throw err
        }else{
            resp.json({
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
            resp.json({
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
            throw err
        }else{
            resp.json({
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