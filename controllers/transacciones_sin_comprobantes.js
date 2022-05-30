const { response } = require('express');

const conexion = require('../DB/db');

const t_s_cGet = (req, resp = response) =>{

    conexion.query(`SELECT * FROM transacciones_sin_comprobantes ORDER BY fecha_operacion DESC `, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows)
        }
    })
}

const t_s_cGetID = (req, resp = response) =>{

    const {id} = req.params;

    conexion.query(`SELECT * FROM transacciones_sin_comprobantes WHERE id_transaccion_sc = ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows)
        }
    })
}

const t_s_cPost = (req, resp = response) =>{

    const { codigo_afiliado,
            cuenta_afectada,
            id_filial_ac,
            id_cliente,
            id_origen_fondos,
            id_transaccion,
            fecha_operacion,
            monto_transaccion,
            id_filial_realizo_transaccion,
            id_colaborador,
            observaciones} = req.body;

    conexion.query(`INSERT INTO transacciones_sin_comprobantes(
                        codigo_afiliado, 
                        cuenta_afectada, 
                        id_filial_ac, 
                        id_cliente, 
                        id_origen_fondos, 
                        id_transaccion, 
                        fecha_operacion, 
                        monto_transaccion, 
                        id_filial_realizo_transaccion, 
                        id_colaborador, 
                        observaciones)
                            VALUES ('${codigo_afiliado}', 
                                    ${cuenta_afectada}, 
                                    ${id_filial_ac}, 
                                    '${id_cliente}', 
                                    ${id_origen_fondos}, 
                                    ${id_transaccion}, 
                                    '${fecha_operacion}', 
                                    ${monto_transaccion}, 
                                    ${id_filial_realizo_transaccion}, 
                                    ${id_colaborador}, 
                                    '${observaciones}') `, (err, res)=>{
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

const t_s_cDelete = (req, resp = response) =>{

    const {id} = req.params;

    conexion.query(`DELETE FROM transacciones_sin_comprobantes WHERE id_transaccion_sc = ${id}`, (err, res)=>{
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

const t_s_cPut = (req, resp = response) =>{

    const { id,
            codigo_afiliado,
            cuenta_afectada,
            id_filial_ac,
            id_cliente,
            id_origen_fondos,
            id_transaccion,
            fecha_operacion,
            monto_transaccion,
            id_filial_realizo_transaccion,
            id_colaborador,
            observaciones} = req.body;

    conexion.query(`UPDATE public.transacciones_sin_comprobantes
	                    SET codigo_afiliado= '${codigo_afiliado}', 
                            cuenta_afectada= ${cuenta_afectada}, 
                            id_filial_ac= ${id_filial_ac}, 
                            id_cliente= '${id_cliente}', 
                            id_origen_fondos= ${id_origen_fondos}, 
                            id_transaccion= ${id_transaccion}, 
                            fecha_operacion= '${fecha_operacion}', 
                            monto_transaccion= ${monto_transaccion}, 
                            id_filial_realizo_transaccion= ${id_filial_realizo_transaccion}, 
                            id_colaborador= ${id_colaborador}, 
                            observaciones= '${observaciones}'
	                            WHERE id_transaccion_sc= ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                put : false
            })
        }else{
            return resp.json({
                put: true
            })
        }
    })
}

module.exports = {
    t_s_cGet,
    t_s_cGetID,
    t_s_cPost,
    t_s_cDelete,
    t_s_cPut
}