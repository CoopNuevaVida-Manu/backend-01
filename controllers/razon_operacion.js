const {response} = require('express');

const conexion = require('../DB/db');


//GET
const razopGet = (req, resp = response)=>{
    conexion.query(`SELECT * FROM razon_operacion`, (err, res)=>{
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
const razopGetID = (req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`SELECT * FROM razon_operacion WHERE id_razon_operacion = ${id}`, (err, res)=>{
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
const razopPOST = (req, resp = response)=>{

    const {razon_operacion} = req.body;

    conexion.query( `INSERT INTO razon_operacion( razon_operacion ) VALUES('${razon_operacion}')` , (err, res)=>{
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
const razopDelete = (req, resp = response)=>{

    const {id} = req.params;

    conexion.query(`DELETE FROM razon_operacion WHERE id_razon_operacion = ${id}`, (err, res)=>{
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
const razopPut = (req, resp = response) =>{
    
    const { id, razon_operacion } = req.body;

    conexion.query( `UPDATE razon_operacion SET razon_operacion='${razon_operacion}' WHERE id_razon_operacion = ${id}` , (err, res)=>{
        if(err){
            return resp.json({
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
    razopGet,
    razopGetID,
    razopPOST,
    razopDelete,
    razopPut
}