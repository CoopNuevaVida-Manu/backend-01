const { response } = require('express');

const conexion = require('../DB/db');

const diligenciaGet = (req, resp = response) =>{
    conexion.query(`SELECT * FROM public.diligencia_no_afiliados ORDER BY fecha_operacion DESC `, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows);
        }
    })
}

const diligenciaGetId = (req, resp = response) =>{
    const {id} = req.params;
    conexion.query(`SELECT * FROM public.diligencia_no_afiliados where id_diligencia = ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows);
        }
    })
}


const diligenciaPost = (req, resp = response) =>{

    const { id_no_afiliado, 
            id_parentesco, 
            id_filial, 
            codigo_afiliado, 
            cuenta_afectada, 
            id_origen_fondos, 
            id_razon_operacion, 
            id_transaccion, 
            monto_transaccion, 
            fecha_operacion, 
            id_cajero_operacion, 
            observaciones} = req.body;

    conexion.query(`INSERT INTO public.diligencia_no_afiliados(
                                        id_no_afiliado, 
                                        id_parentesco, 
                                        id_filial, 
                                        codigo_afiliado, 
                                        cuenta_afectada, 
                                        id_origen_fondos, 
                                        id_razon_operacion, 
                                        id_transaccion, 
                                        monto_transaccion, 
                                        fecha_operacion, 
                                        id_cajero_operacion, 
                                        observaciones)
                                                VALUES ('${id_no_afiliado}', 
                                                        ${id_parentesco}, 
                                                        ${id_filial}, 
                                                        '${codigo_afiliado}', 
                                                        ${cuenta_afectada}, 
                                                        ${id_origen_fondos}, 
                                                        ${id_razon_operacion}, 
                                                        ${id_transaccion}, 
                                                        ${monto_transaccion}, 
                                                        '${fecha_operacion}', 
                                                        ${id_cajero_operacion}, 
                                                        '${observaciones}')`, (err, res)=>{
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

const diligenciaDelete = (req, resp = response) =>{
    const {id} = req.params;
    conexion.query(`DELETE FROM public.diligencia_no_afiliados WHERE id_diligencia = ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                delete : false
            });
        }else{
            return resp.json({
                delete : true
            });
        }
    })
}

const diligenciaPut = (req, resp = response) =>{
    
    const { id,
            id_no_afiliado, 
            id_parentesco, 
            id_filial, 
            codigo_afiliado, 
            cuenta_afectada, 
            id_origen_fondos, 
            id_razon_operacion, 
            id_transaccion, 
            monto_transaccion, 
            fecha_operacion, 
            id_cajero_operacion, 
            observaciones} = req.body;

    conexion.query(`UPDATE public.diligencia_no_afiliados
	                    SET id_no_afiliado= '${id_no_afiliado}', 
                            id_parentesco= ${id_parentesco}, 
                            id_filial= ${id_filial}, 
                            codigo_afiliado= '${codigo_afiliado}', 
                            cuenta_afectada= ${cuenta_afectada}, 
                            id_origen_fondos= ${id_origen_fondos}, 
                            id_razon_operacion= ${id_razon_operacion}, 
                            id_transaccion= ${id_transaccion}, 
                            monto_transaccion= ${monto_transaccion}, 
                            fecha_operacion= '${fecha_operacion}', 
                            id_cajero_operacion= ${id_cajero_operacion}, 
                            observaciones= '${observaciones}'
	                            WHERE id_diligencia = ${id}`, (err, res)=>{
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
    diligenciaGet,
    diligenciaGetId,
    diligenciaPost,
    diligenciaDelete,
    diligenciaPut
}