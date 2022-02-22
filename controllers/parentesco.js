const {response} = require('express');

const conexion = require('../DB/db');


//GET
const parentGet = (req, resp = response)=>{
    conexion.query(`SELECT * FROM parentesco`, (err, res)=>{
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
const parentGetID = (req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`SELECT * FROM parentesco WHERE id_parentesco = ${id}`, (err, res)=>{
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
const parentPOST = (req, resp = response)=>{

    const {parentesco} = req.body;

    conexion.query( `INSERT INTO parentesco( parentesco ) VALUES('${parentesco}')` , (err, res)=>{
        if(err){
            return resp.json({
                insert : false
            })
        }else{
            return resp.json({
                insert : true
            });
        }
    } )
}

//DELETE    
const parentDelete = (req, resp = response)=>{

    const {id} = req.params;

    conexion.query(`DELETE FROM parentesco WHERE id_parentesco = ${id}`, (err, res)=>{
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
const parentPut = (req, resp = response) =>{
    
    const { id, parentesco } = req.body;

    conexion.query( `UPDATE parentesco SET parentesco='${parentesco}' WHERE id_parentesco = ${id}` , (err, res)=>{
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
    parentGet,
    parentGetID,
    parentPOST,
    parentDelete,
    parentPut
}