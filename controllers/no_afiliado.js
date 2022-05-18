const { response } = require('express');

const conexion = require('../DB/db');


const no_afiliadoGet = (req, resp = response) =>{
    conexion.query(`SELECT * FROM no_afiliado`, (err,res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            }) 
        }else{
            return resp.json(res.rows)
        }
    })
}

const no_afiliadoGetID = (req, resp = response) =>{

    const {id} = req.params;

    conexion.query(`SELECT * FROM no_afiliado WHERE identidad = '${id}'`, (err,res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            }) 
        }else{
            return resp.json(res.rows)
        }
    })
}

const no_afiliadoPost = (req, resp = response)=>{

    const { identidad, 
            nombre, 
            apellido } = req.body;

    conexion.query(`INSERT INTO public.no_afiliado(
                        identidad, nombre, apellido)
                            VALUES ('${identidad}', 
                                    '${nombre}', 
                                    '${apellido}');`, (err,res)=>{
        if(err){
            return resp.json({
                insert: false
            })
        }else{
            return resp.json({
                insert: true
            })
        }
    })
}

const no_afiliadoDelete = (req, resp = response) =>{

    const {id} = req.params;

    conexion.query(`DELETE FROM no_afiliado WHERE id_no_afiliado = ${id}`, (err,res)=>{
        if(err){
            return resp.json({
                delete : false
            })
        }else{
            return resp.json({
                delete : true
            })
        }
    })
}

const no_afiliadoPut = (req, resp = response) =>{

    const { id,
            identidad, 
            nombre, 
            apellido } = req.body;
    
    conexion.query(`UPDATE no_afiliado
	                    SET identidad='${identidad}', 
                            nombre='${nombre}}', 
                            apellido='${apellido}'
	                        WHERE id_no_afiliado = ${id}`, (err,res)=>{
        if(err){
            return resp.json({
                put : false
            })
        }else{
            return resp.json({
                put : true
            })
        }
    })
}


module.exports = {
    no_afiliadoGet,
    no_afiliadoGetID,
    no_afiliadoPost,
    no_afiliadoDelete,
    no_afiliadoPut
}