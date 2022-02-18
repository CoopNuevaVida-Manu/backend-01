const { response } = require("express");

const conexion = require('../DB/db');


//GET
const destGet = (req, resp = response)=>{
    conexion.query(`SELECT * FROM destino`, (err, res)=>{
        if(err){
            throw err
        }else{
            resp.json(res.rows);
        }
    })
}


//GET ID
const destGetId = (req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`SELECT * FROM destino WHERE id_destino = ${id}`, (err, res)=>{
        if(err){
            throw err
        }
        resp.json(res.rows)
    })
};

//POST
const destPOST = (req, resp = response)=>{

    const {destino} = req.body;

    conexion.query( `INSERT INTO destino( destino ) VALUES('${destino}')` , (err, res)=>{
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
const destDelete = (req, resp = response)=>{

    const {id} = req.params;

    conexion.query(`DELETE FROM destino WHERE id_destino = ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                delete: false
            })
        }else{
            resp.json({
                delete: true
            })
        }
    })
}

//PUT
const destPut = (req, resp = response) =>{
    
    const { id, destino } = req.body;

    conexion.query( `UPDATE destino SET destino='${destino}' WHERE id_destino = ${id}` , (err, res)=>{
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
    destGet,
    destGetId,
    destPOST,
    destDelete,
    destPut
}