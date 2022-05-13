const { response } = require('express');

const conexion = require('../DB/db');

const getColabDep = (req, resp = response)=>{
    conexion.query('SELECT * FROM colaborador_departamento order by id_departamento', (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

const getColabDepID = (req, resp = response)=>{
    const { id } = req.params;
    conexion.query(`SELECT * FROM public.colaborador_departamento  where id_colaborador = ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

const postColabDep = (req, resp = response) =>{
    
    const { id_departamento,
            id_colaborador } = req.body;

    conexion.query( `INSERT INTO colaborador_departamento(id_colaborador, id_departamento)VALUES (${id_colaborador}, ${id_departamento});` , (err, res)=>{
        if(err){
            resp.json({
                insert : false
            })
        }else{
            resp.json({
                insert : true
            });
        }
    } )
}

const deleteColabDep = (req, resp = response)=>{

    const { id_colaborador,
            id_departamento} = req.body;

    conexion.query(`DELETE FROM public.colaborador_departamento WHERE id_colaborador = ${id_colaborador}`, (err, res)=>{
        if(err){
            return resp.json({
                delete: false
            })
        }
        resp.json({
            delete: true
        })
    })
}



module.exports = {
    getColabDep,
    getColabDepID,
    postColabDep,
    deleteColabDep

}
