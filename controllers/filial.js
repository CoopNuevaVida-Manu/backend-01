const { response } = require('express');

const conexion = require('../DB/db');

//GET
const filialGet = (req, resp = response)=>{
    conexion.query(`SELECT * FROM filial`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
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
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            resp.send(res.rows)
        }
    })
};

//POST
const filialPOST = (req, resp = response)=>{

    const {filial} = req.body;

    conexion.query( `INSERT INTO filial( filial ) VALUES('${filial}')` , (err, res)=>{
        if(err){
            return resp.json({
                insert : false
            })
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
const filialPut = (req, resp = response) =>{
    
    const { id, filial } = req.body;

    conexion.query( `UPDATE filial SET filial='${filial}' WHERE id_filial = ${id}` , (err, res)=>{
        if(err){
            resp.json({
                put : false
            })
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