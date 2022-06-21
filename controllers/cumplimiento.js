const { response } = require('express');

const conexion = require('../DB/db');

const getTransaccionesSinComprobante = (req, resp = response)=>{
    conexion.query(`SELECT * FROM public.rte
                    order by fecha_operacion DESC`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

const getDiligenciaNoAfiliados = (req, resp = response)=>{
    conexion.query(`SELECT DD.id_diligencia,
                        concat(na.nombre, ' ', na.apellido) AS name,
                        DD.id_no_afiliado,
                        ps.parentesco,
                        f.filial,
                        DD.codigo_afiliado,
                        DD.cuenta_afectada,
                        o.origen_fondos,
                        rp.razon_operacion,
                        ts.transaccion,
                        DD.monto_transaccion,
                        DD.fecha_operacion,
                        cb.colaborador_usuario,
                        DD.observaciones
                    FROM public.diligencia_no_afiliados AS DD
                    INNER JOIN parentesco AS ps ON ps.id_parentesco = DD.id_parentesco
                    INNER JOIN filial AS f ON f.id_filial = DD.id_filial
                    INNER JOIN origen_fondos AS o ON o.id_origen_fondos = DD.id_origen_fondos
                    INNER JOIN razon_operacion AS rp ON rp.id_razon_operacion = DD.id_razon_operacion
                    INNER JOIN transaccion AS ts ON ts.id_transaccion = DD.id_transaccion
                    INNER JOIN colaborador AS cb ON cb.id_colaborador = DD.id_cajero_operacion
                    INNER JOIN no_afiliado AS na ON na.identidad = DD.id_no_afiliado
                    ORDER BY DD.fecha_operacion DESC `, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

const getChequesTerceros = (req, resp = response)=>{
    conexion.query(`SELECT * FROM public.ct
                    ORDER BY fecha_emision DESC`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

const getFirmasTerceros = (req, resp = response)=>{
    conexion.query(`SELECT * FROM public.ft
                    ORDER BY apertura_actualizacion DESC`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

module.exports = { getTransaccionesSinComprobante,
                   getDiligenciaNoAfiliados,
                   getChequesTerceros,
                   getFirmasTerceros}