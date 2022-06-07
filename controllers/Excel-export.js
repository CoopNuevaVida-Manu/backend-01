const { response } = require('express');
const conexion = require('../DB/db');
const XLSX = require('xlsx')

const exportTransaccionesSinComprobante = (req, resp = response)=>{
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
        const convertJsonToExcel = () => {

            const workSheet = XLSX.utils.json_to_sheet(res.rows);
            const workBook = XLSX.utils.book_new();
        
            XLSX.utils.book_append_sheet(workBook, workSheet, "students")
            // Generate buffer
            XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        
            // Binary string
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        
            XLSX.writeFile(workBook, "studentsData.xlsx")
        
        }
        convertJsonToExcel()
    })
}

const exporDiligenciaNoAfiliados = (req, resp = response)=>{
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

const exporChequesTerceros = (req, resp = response)=>{
    conexion.query(`SELECT ct.id_cheque_tercero, 
                        ct.codigo_de_afiliado, 
                        f.filial, 
                        ct.n_cheque, 
                        ct.fecha_emision, 
                        cb.colaborador_nombre,
                        ct.id_persona,
                        af."OUTAFF_NAME" AS name,
                        pt.parentesco,
                        ct.monto, 
                        o.origen_fondos,
                        d.destino,
                        ct.observaciones, 
                        ae.afiliado_estado
                    FROM public.cheques_terceros AS ct
                    INNER JOIN filial AS f ON f.id_filial = ct.id_filial
                    INNER JOIN colaborador AS cb ON cb.id_colaborador = ct.id_colaborador
                    INNER JOIN parentesco AS pt ON pt.id_parentesco = ct.id_parentesco
                    INNER JOIN origen_fondos AS o ON o.id_origen_fondos = ct.id_origen_fondos
                    INNER JOIN destino AS d ON d.id_destino = ct.id_destino
                    INNER JOIN afiliado_estado AS ae ON ae.id_afiliado_estado = ct.id_afililiado_estado
                    INNER JOIN "Afiliados" AS af ON af."OUTAFF_ID" = ct.id_persona
                    
                    UNION ALL
                    
                    SELECT ct.id_cheque_tercero, 
                        ct.codigo_de_afiliado, 
                        f.filial, 
                        ct.n_cheque, 
                        ct.fecha_emision, 
                        cb.colaborador_nombre,
                        ct.id_persona,
                        concat(na.nombre, ' ', na.apellido) AS name,
                        pt.parentesco,
                        ct.monto, 
                        o.origen_fondos,
                        d.destino,
                        ct.observaciones, 
                        ae.afiliado_estado
                    FROM public.cheques_terceros AS ct
                    INNER JOIN filial AS f ON f.id_filial = ct.id_filial
                    INNER JOIN colaborador AS cb ON cb.id_colaborador = ct.id_colaborador
                    INNER JOIN parentesco AS pt ON pt.id_parentesco = ct.id_parentesco
                    INNER JOIN origen_fondos AS o ON o.id_origen_fondos = ct.id_origen_fondos
                    INNER JOIN destino AS d ON d.id_destino = ct.id_destino
                    INNER JOIN afiliado_estado AS ae ON ae.id_afiliado_estado = ct.id_afililiado_estado
                    INNER JOIN no_afiliado AS na ON na.identidad = ct.id_persona`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

const exporFirmasTerceros = (req, resp = response)=>{
    conexion.query(`SELECT ft.id_firma_autorizada, 
                        af."OUTAFF_NAME" AS name,
                        ft.id_cliente, 
                        ae.afiliado_estado,
                        pt.parentesco,
                        frm.firma,
                        ft.codigo_afiliado, 
                        ft.cuenta_afiliado, 
                        f.filial, 
                        ft.apertura_actualizacion, 
                        cb.colaborador_nombre,
                        ft.observaciones
                    FROM public.firmas_autorizadas_terceros AS ft 
                    INNER JOIN afiliado_estado AS ae ON ae.id_afiliado_estado = ft.id_afiliado_estado
                    INNER JOIN parentesco AS pt ON pt.id_parentesco = ft.id_parentesco
                    INNER JOIN firma AS frm ON frm.id_firma = ft.id_firma
                    INNER JOIN filial AS f ON f.id_filial = ft.id_filial_pertenece
                    INNER JOIN colaborador AS cb ON cb.id_colaborador = ft.id_colaborador
                    INNER JOIN "Afiliados" AS af ON af."OUTAFF_ID" = ft.id_cliente
                    
                    UNION ALL
                    
                    SELECT ft.id_firma_autorizada, 
                        concat(na.nombre, ' ', na.apellido) AS name,
                        ft.id_cliente, 
                        ae.afiliado_estado,
                        pt.parentesco,
                        frm.firma,
                        ft.codigo_afiliado, 
                        ft.cuenta_afiliado, 
                        f.filial, 
                        ft.apertura_actualizacion, 
                        cb.colaborador_nombre,
                        ft.observaciones
                    FROM public.firmas_autorizadas_terceros AS ft 
                    INNER JOIN afiliado_estado AS ae ON ae.id_afiliado_estado = ft.id_afiliado_estado
                    INNER JOIN parentesco AS pt ON pt.id_parentesco = ft.id_parentesco
                    INNER JOIN firma AS frm ON frm.id_firma = ft.id_firma
                    INNER JOIN filial AS f ON f.id_filial = ft.id_filial_pertenece
                    INNER JOIN colaborador AS cb ON cb.id_colaborador = ft.id_colaborador
                    INNER JOIN no_afiliado AS na ON na.identidad = ft.id_cliente`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        resp.json(res.rows)
    })
}

module.exports = { exportTransaccionesSinComprobante,
                   exporDiligenciaNoAfiliados,
                   exporChequesTerceros,
                   exporFirmasTerceros}