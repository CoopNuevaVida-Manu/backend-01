const { response } = require('express');

const conexion = require('../DB/db');


//GET
const colabGet = (req, resp = response)=>{
    conexion.query('select id_colaborador, colaborador_nombre, colaborador_usuario, id_oficiona, id_estado from colaborador', (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

//GetId
const colabGetId =(req, resp = response)=>{

    const { id } = req.params;

    conexion.query(`select id_colaborador, colaborador_nombre, colaborador_usuario, id_oficiona, id_estado from colaborador where id_colaborador = ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

//POST
const colabPost = (req, resp = response) =>{
    
    const { colaborador_nombre,
            colaborador_usuario,
            id_oficiona,
            colaborador_password,
            id_estado} = req.body;

    conexion.query( `INSERT INTO public.colaborador(colaborador_nombre,
                                        colaborador_usuario, 
                                        id_oficiona, 
                                        colaborador_password,
                                        id_estado) VALUES ( '${colaborador_nombre}', 
                                                                        '${colaborador_usuario}',
                                                                         ${id_oficiona}, 
                                                                         '${colaborador_password}',
                                                                         ${id_estado});` , (err, res)=>{
        if(err){
            return resp.json({
                insert: false
            })
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

    conexion.query(`DELETE FROM colaborador WHERE id_colaborador = ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                delete : false
            })
        }
        resp.json({
            delete: true
        })
    })
}

//PUT
const colabPut = (req, resp = response) =>{
    
    const { id, 
            colaborador_nombre,
            colaborador_usuario,
            id_oficiona,
            colaborador_password,
            id_estado } = req.body;

    conexion.query( `UPDATE colaborador SET colaborador_nombre='${colaborador_nombre}',
                                            colaborador_usuario='${colaborador_usuario}',
                                            id_oficiona=${id_oficiona},
                                            colaborador_password='${colaborador_password}',
                                            id_estado=${id_estado}
                                             WHERE id_colaborador = ${id}` , (err, res)=>{
        if(err){
            return resp.json({
                put: false
            })
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