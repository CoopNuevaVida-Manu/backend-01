const { response } = require('express');

const conexion = require('../DB/db');

const allColab = (req, resp = response)=>{
    conexion.query('select id_colaborador, colaborador_nombre, colaborador_usuario, id_oficiona, id_estado from colaborador order by colaborador_nombre ASC', (err, res)=>{
        if(err){
            return resp.json({
                msg: "Error al cargar los u¿colaboradores"
            })
        }
        resp.json(res.rows)
    })
}

//GET
const colabGetActivo = (req, resp = response)=>{
    conexion.query('select id_colaborador, colaborador_nombre, colaborador_usuario, id_oficiona, id_estado from colaborador WHERE id_estado = 1 order by colaborador_nombre ASC;', (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

//GET
const colabGetInactivo = (req, resp = response)=>{
    conexion.query('select id_colaborador, colaborador_nombre, colaborador_usuario, id_oficiona, id_estado from colaborador WHERE id_estado = 2 order by colaborador_nombre ASC;', (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

const colabEnd = (req, resp = response)=>{
    conexion.query('select id_colaborador, colaborador_nombre, colaborador_usuario, id_oficiona, id_estado from colaborador order by id_colaborador DESC limit 1;', (err, res)=>{
        if(err){
            return resp.json({
                msg: "Error al capturar el ID del nuevo colaborador"
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
                meg: "No se pudo crear el nuevo colaborador",
                insert: false
            })
        }else{
            resp.json({
                meg: "Se ha creado un nuevo colaborador exitosamente",
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
    
    const { id_colaborador, 
            colaborador_nombre,
            colaborador_usuario,
            id_oficiona,
            id_estado } = req.body;

    conexion.query( `UPDATE colaborador SET colaborador_nombre='${colaborador_nombre}',
                                            colaborador_usuario='${colaborador_usuario}',
                                            id_oficiona=${id_oficiona},
                                            id_estado=${id_estado} 
                                                WHERE id_colaborador = ${id_colaborador}` , (err, res)=>{
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

const colabPutPass = (req, resp = response) =>{
    
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
    allColab,
    colabGetActivo,
    colabGetInactivo,
    colabEnd,
    colabGetId,
    colabPost,
    colabPutPass,
    colabDelete,
    colabPut
}