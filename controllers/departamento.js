const { response } = require('express');

const conexion = require('../DB/db');


//GET
const depGet = (req, resp = response)=>{
    conexion.query('select * from departamento', (err, res)=>{
        if(err){
            throw err
        }
        resp.send(res.rows)
    })
}

//GetId
const depGetId =(req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`select * from departamento where id_departamento = ${id}`, (err, res)=>{
        if(err){
            throw err
        }
        resp.send(res.rows)
    })
}

//POST
const depPost = (req, resp = response) =>{
    
    const { departamento } = req.body;

    conexion.query( `INSERT INTO departamento( departamento ) VALUES('${departamento}')` , (err, result)=>{
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
const depDelete =(req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`DELETE FROM departamento WHERE id_departamento = ${id}`, (err, res)=>{
        if(err){
            throw err
        }
        resp.json({
            delete: true
        })
    })
}

//PUT
const depPut = (req, resp = response) =>{
    
    const { id, departamento } = req.body;

    conexion.query( `UPDATE public.departamento SET departamento='${departamento}' WHERE id_departamento = ${id}` , (err, result)=>{
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
    depGet,
    depGetId,
    depPost,
    depDelete,
    depPut
}