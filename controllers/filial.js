const { response } = require('express');

const conexion = require('../DB/db');

//GET
const filialGet = (req, resp = response)=>{
    conexion.query(`SELECT * FROM filial`, (err, res)=>{
        if(err){
            throw err
        }else{
            resp.json(res.rows);
        }
    })
}


//GET ID
const filialGetID = (req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`SELECT * FROM filial WHERE id_filial = ${id}`, (err, res)=>{
        if(err){
            throw err
        }
        resp.send(res.rows)
    })
};

//POST
const filialPOST = (req, resp = response)=>{

    const {filial} = req.body;

    conexion.query( `INSERT INTO filial( filial ) VALUES('${filial}')` , (err, res)=>{
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
const filialDelete = (req, resp = response)=>{

    const {id} = req.params;

    conexion.query(`DELETE FROM filial WHERE id_filial = ${id}`, (err, res)=>{
        if(err){
            throw err
        }else{
            resp.json({
                delete: true
            })
        }
    })
}

//PUT
const filialPut = (req, resp = response) =>{
    
    const { id, filial } = req.body;

    conexion.query( `UPDATE filial SET filial='${filial}' WHERE id_filial = ${id}` , (err, res)=>{
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
    filialGet,
    filialGetID,
    filialPOST,
    filialDelete,
    filialPut
}