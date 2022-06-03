const { response } = require('express');

const conexion = require('../DB/db');

const getTransaccionesSinComprobante = (req, resp = response)=>{
    conexion.query(`SELECT tsc.id_transaccion_sc, 
                        tsc.codigo_afiliado, 
                        tsc.cuenta_afectada,
                        fl.filial as filialAC,
                        tsc.id_cliente,
                        concat(na.nombre,' ',na.apellido)as Name,
                        o.origen_fondos,
                        tr.transaccion,
                        tsc.fecha_operacion, 
                        tsc.monto_transaccion,
                        f.filial,
                        cb.colaborador_usuario,
                        tsc.observaciones
                    FROM public.transacciones_sin_comprobantes AS tsc
                    inner join origen_fondos as o on o.id_origen_fondos = tsc.id_origen_fondos
                    inner join transaccion as tr on tr.id_transaccion = tsc.id_transaccion
                    inner join filial as f on f.id_filial = tsc.id_filial_realizo_transaccion
                    inner join filial as fl on fl.id_filial = tsc.id_filial_ac
                    inner join colaborador as cb on cb.id_colaborador = tsc.id_colaborador
                    inner join no_afiliado as na on tsc.id_cliente = na.identidad

                    UNION ALL

                    SELECT tsc.id_transaccion_sc, 
                        tsc.codigo_afiliado, 
                        tsc.cuenta_afectada,
                        fl.filial as filialAC,
                        tsc.id_cliente,
                        af."OUTAFF_NAME" as Name,
                        o.origen_fondos,
                        tr.transaccion,
                        tsc.fecha_operacion, 
                        tsc.monto_transaccion,
                        f.filial,
                        cb.colaborador_usuario,
                        tsc.observaciones
                    FROM public.transacciones_sin_comprobantes AS tsc
                    inner join origen_fondos as o on o.id_origen_fondos = tsc.id_origen_fondos
                    inner join transaccion as tr on tr.id_transaccion = tsc.id_transaccion
                    inner join filial as f on f.id_filial = tsc.id_filial_realizo_transaccion
                    inner join filial as fl on fl.id_filial = tsc.id_filial_ac
                    inner join colaborador as cb on cb.id_colaborador = tsc.id_colaborador
                    inner join public."Afiliados" AS af ON af."OUTAFF_ID" = tsc.id_cliente`, (err, res)=>{
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
                    INNER JOIN no_afiliado AS na ON na.identidad = DD.id_no_afiliado`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

module.exports = { getTransaccionesSinComprobante,
                   getDiligenciaNoAfiliados}