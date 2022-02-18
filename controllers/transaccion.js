const {response} = require('express');

const conexion = require('../DB/db');


//GET
const transGet = (req, resp = response)=>{
    conexion.query(`SELECT * FROM transaccion`, (err, res)=>{
        if(err){
            throw err
        }else{
            resp.json(res.rows);
        }
    })
}


//GET ID
const transGetID = (req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`SELECT * FROM transaccion WHERE id_transaccion = ${id}`, (err, res)=>{
        if(err){
            throw err
        }
        resp.send(res.rows)
    })
};

//POST
const transPOST = (req, resp = response)=>{

    const {transaccion} = req.body;

    conexion.query( `INSERT INTO transaccion( transaccion ) VALUES('${transaccion}')` , (err, res)=>{
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
const transDelete = (req, resp = response)=>{

    const {id} = req.params;

    conexion.query(`DELETE FROM transaccion WHERE id_transaccion = ${id}`, (err, res)=>{
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
const transPut = (req, resp = response) =>{
    
    const { id, transaccion } = req.body;

    conexion.query( `UPDATE transaccion SET transaccion='${transaccion}' WHERE id_transaccion = ${id}` , (err, res)=>{
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
    transGet,
    transGetID,
    transPOST,
    transDelete,
    transPut
}