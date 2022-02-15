const { response } = require('express');

const conexion = require('../DB/db');


//GET
const colabGet = (req, resp = response)=>{
    conexion.query('select * from colaborador', (err, res)=>{
        if(err){
            throw err
        }
        resp.json(res.rows)
    })
}

//GetId
const colabGetId =(req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`select * from colaborador where id_colaborador = ${id}`, (err, res)=>{
        if(err){
            throw err
        }
        resp.json(res.rows)
    })
}

//POST
const colabPost = (req, resp = response) =>{
    
    const { colaborador_nombre,
            colaborador_usuario,
            id_departamento,
            id_oficiona,
            colaborador_password} = req.body;

    conexion.query( `INSERT INTO public.colaborador(colaborador_nombre,
                                        colaborador_usuario, id_departamento,
                                        id_oficiona, 
                                        colaborador_password) VALUES ( '${colaborador_nombre}', 
                                                                        '${colaborador_usuario}',
                                                                         ${id_departamento}, 
                                                                         ${id_oficiona}, 
                                                                         '${colaborador_password}');` , (err, res)=>{
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
const colabDelete =(req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`DELETE FROM colaborador WHERE id_departamento = ${id}`, (err, res)=>{
        if(err){
            throw err
        }
        resp.json({
            delete: true
        })
    })
}

//PUT
const colabPut = (req, resp = response) =>{
    
    const { id, departamento } = req.body;

    conexion.query( `UPDATE colaborador SET departamento='${departamento}' WHERE id_departamento = ${id}` , (err, res)=>{
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
    colabGet,
    colabGetId,
    colabPost,
    colabDelete,
    colabPut
}