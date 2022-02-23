const { response } = require('express');

const conexion = require('../DB/db');

const firmas_tercerosGet = (req, resp = response) =>{
    
    conexion.query(`SELECT * FROM public.firmas_autorizadas_terceros ORDER BY apertura_actualizacion DESC `, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows)
        }
    })
}

const firmas_tercerosGetID = (req, resp = response) =>{

    const {id} = req.params;
    
    conexion.query(`SELECT * FROM public.firmas_autorizadas_terceros WHERE id_firma_autorizada =  ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows)
        }
    })
}


const firmas_tercerosPost = (req, resp = response)=>{

    const { id_cliente, 
            id_afiliado_estado, 
            id_parentesco, 
            id_firma, 
            codigo_afiliado, 
            cuenta_afiliado, 
            id_filial_pertenece, 
            apertura_actualizacion, 
            id_colaborador, 
            observaciones} = req.body;

    conexion.query(`INSERT INTO public.firmas_autorizadas_terceros(
                        id_cliente, 
                        id_afiliado_estado, 
                        id_parentesco, 
                        id_firma, 
                        codigo_afiliado, 
                        cuenta_afiliado, 
                        id_filial_pertenece, 
                        apertura_actualizacion, 
                        id_colaborador, 
                        observaciones)
                            VALUES ('${id_cliente}', 
                                    ${id_afiliado_estado}, 
                                    ${id_parentesco}, 
                                    ${id_firma}, 
                                    '${codigo_afiliado}', 
                                    ${cuenta_afiliado}, 
                                    ${id_filial_pertenece}, 
                                    '${apertura_actualizacion}', 
                                    ${id_colaborador}, 
                                    '${observaciones}');`, (err, res)=>{
        if(err){
            return resp.json({
                insert : false
            })
        }else{
            return resp.json({
                insert : true
            })
        }
    })
}

const firmas_tercerosDelete = (req, resp = response)=>{
    
    const {id} = req.params;

    conexion.query(`DELETE FROM public.firmas_autorizadas_terceros WHERE id_firma_autorizada = ${id}`, (err, res)=>{
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

const firmas_tercerosPut = (req, resp = response)=>{

    const { id, 
            id_cliente, 
            id_afiliado_estado, 
            id_parentesco, 
            id_firma, 
            codigo_afiliado, 
            cuenta_afiliado, 
            id_filial_pertenece, 
            apertura_actualizacion, 
            id_colaborador, 
            observaciones} = req.body;
    
    conexion.query(`UPDATE public.firmas_autorizadas_terceros
	                    SET id_cliente= '${id_cliente}', 
                        id_afiliado_estado= ${id_afiliado_estado}, 
                        id_parentesco= ${id_parentesco}, 
                        id_firma= ${id_firma}, 
                        codigo_afiliado= '${codigo_afiliado}', 
                        cuenta_afiliado= ${cuenta_afiliado}, 
                        id_filial_pertenece= ${id_filial_pertenece}, 
                        apertura_actualizacion= '${apertura_actualizacion}', 
                        id_colaborador= ${id_colaborador}, 
                        observaciones= '${observaciones}'
	                            WHERE id_firma_autorizada= ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                put: false
            })
        }else{
            return resp.json({
                put : true
            })
        }
    })
}

module.exports = {
    firmas_tercerosGet,
    firmas_tercerosGetID,
    firmas_tercerosPost,
    firmas_tercerosDelete,
    firmas_tercerosPut
}

