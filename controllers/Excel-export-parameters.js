const { response } = require('express');
const conexion = require('../DB/db');
const XLSX = require('xlsx')

const exportTransaccionesSinComprobante = (req, resp = response)=>{
    conexion.query(`SELECT  tsc.codigo_afiliado as "Codigo de Afiliado", 
                            tsc.cuenta_afectada as "Cuenta afectada", 
                            fl.filial as "Filial Pertenece",
                            tsc.id_cliente as "Identidad Cliente",
                            UPPER(concat(na.nombre,' ',na.apellido)) as "Nombre",
                            o.origen_fondos as "Origen de fondos",
                            tr.transaccion as "Tipo de transaccion",
                            tsc.fecha_operacion as "Fecha de Operacion", 
                            tsc.monto_transaccion as "Monto de transaccion",
                            f.filial as "Filial Operacio",
                            cb.colaborador_usuario as "Colaborador Usuario",
                            tsc.observaciones as "Observaciones"
                    FROM public.transacciones_sin_comprobantes AS tsc
                    inner join origen_fondos as o on o.id_origen_fondos = tsc.id_origen_fondos
                    inner join transaccion as tr on tr.id_transaccion = tsc.id_transaccion
                    inner join filial as f on f.id_filial = tsc.id_filial_realizo_transaccion
                    inner join filial as fl on fl.id_filial = tsc.id_filial_ac
                    inner join colaborador as cb on cb.id_colaborador = tsc.id_colaborador
                    inner join no_afiliado as na on tsc.id_cliente = na.identidad

                    UNION ALL

                    SELECT  tsc.codigo_afiliado as "Codigo de Afiliado", 
                            tsc.cuenta_afectada as "Cuenta afectada",
                            fl.filial as "Filial Pertenece",
                            tsc.id_cliente as "Identidad Cliente",
                            UPPER(af."OUTAFF_NAME") as "Nombre",
                            o.origen_fondos as "Origen de fondos",
                            tr.transaccion as "Tipo de transaccion",
                            tsc.fecha_operacion as "Fecha de Operacion", 
                            tsc.monto_transaccion as "Monto de transaccion",
                            f.filial as "Filial Operacio",
                            cb.colaborador_usuario as "Colaborador Usuario",
                            tsc.observaciones as "Observaciones"
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
        
            XLSX.writeFile(workBook, "RTE.xlsx")

            resp.download('./RTE.xlsx')    
        
        }
        convertJsonToExcel()
    })
}

const exporDiligenciaNoAfiliados = (req, resp = response)=>{
    conexion.query(`SELECT  UPPER(concat(na.nombre, ' ', na.apellido)) AS "Nombre",
                            DD.id_no_afiliado AS "Identidad no afiliado",
                            ps.parentesco AS "Parentesco",
                            f.filial AS "Filial",
                            DD.codigo_afiliado AS "Codigo de Afiliado",
                            DD.cuenta_afectada AS "Cuenta Afectada",
                            o.origen_fondos AS "Origen de Fondo",
                            rp.razon_operacion AS "Razon de Operacion",
                            ts.transaccion AS "Transaccion",
                            DD.monto_transaccion AS "Monto de Transaccion",
                            DD.fecha_operacion AS "Fecha de Operacion",
                            cb.colaborador_usuario AS "Colaborador Usuario",
                            DD.observaciones AS "Observaciones"
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
        const convertJsonToExcel = () => {

            const workSheet = XLSX.utils.json_to_sheet(res.rows);
            const workBook = XLSX.utils.book_new();
        
            XLSX.utils.book_append_sheet(workBook, workSheet, "students")
            // Generate buffer
            XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        
            // Binary string
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        
            XLSX.writeFile(workBook, "Diligencia_No_Afiliados.xlsx")

            resp.download('./Diligencia_No_Afiliados.xlsx')    
        
        }
        convertJsonToExcel()
    })
}

const exporChequesTerceros = (req, resp = response)=>{
    conexion.query(`SELECT  ct.codigo_de_afiliado AS "Codigo de Afiliado", 
                            f.filial AS "Filial", 
                            ct.n_cheque AS "N° de Cheque", 
                            ct.fecha_emision AS "Fecha de emision", 
                            UPPER(af."OUTAFF_NAME") AS "Nombre",
                            ct.id_persona AS "Identidad",
                            ae.afiliado_estado AS "Estado",
                            pt.parentesco AS "Parentesco",
                            ct.monto AS "Monto", 
                            o.origen_fondos AS "Origen de Fondos",
                            d.destino AS "Destino",
                            UPPER(cb.colaborador_nombre) AS "Nombre Colaborador",
                            ct.observaciones AS "Observaciones"
                    FROM public.cheques_terceros AS ct
                    INNER JOIN filial AS f ON f.id_filial = ct.id_filial
                    INNER JOIN colaborador AS cb ON cb.id_colaborador = ct.id_colaborador
                    INNER JOIN parentesco AS pt ON pt.id_parentesco = ct.id_parentesco
                    INNER JOIN origen_fondos AS o ON o.id_origen_fondos = ct.id_origen_fondos
                    INNER JOIN destino AS d ON d.id_destino = ct.id_destino
                    INNER JOIN afiliado_estado AS ae ON ae.id_afiliado_estado = ct.id_afililiado_estado
                    INNER JOIN "Afiliados" AS af ON af."OUTAFF_ID" = ct.id_persona

                    UNION ALL

                    SELECT  ct.codigo_de_afiliado AS "Codigo de Afiliado", 
                            f.filial AS "Filial", 
                            ct.n_cheque AS "N° de Cheque", 
                            ct.fecha_emision AS "Fecha de emision", 
                            UPPER(concat(na.nombre, ' ', na.apellido)) AS "Nombre",
                            ct.id_persona AS "Identidad",
                            ae.afiliado_estado AS "Estado",
                            pt.parentesco AS "Parentesco",
                            ct.monto AS "Monto",
                            o.origen_fondos AS "Origen de Fondos",
                            d.destino AS "Destino",
                            UPPER(cb.colaborador_nombre) AS "Nombre Colaborador",
                            ct.observaciones AS "Observaciones"
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
        const convertJsonToExcel = () => {

            const workSheet = XLSX.utils.json_to_sheet(res.rows);
            const workBook = XLSX.utils.book_new();
        
            XLSX.utils.book_append_sheet(workBook, workSheet, "students")
            // Generate buffer
            XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        
            // Binary string
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        
            XLSX.writeFile(workBook, "Cheques_Terceros.xlsx")

            resp.download('./Cheques_Terceros.xlsx')    
        
        }
        convertJsonToExcel()
    })
}

const exporFirmasTerceros = (req, resp = response)=>{
    conexion.query(`SELECT  UPPER(af."OUTAFF_NAME") AS "Nombre",
                            ft.id_cliente AS "Identidad", 
                            ae.afiliado_estado AS "Estado",
                            pt.parentesco AS "Parentesco",
                            frm.firma AS "Firma",
                            ft.codigo_afiliado AS "Codigo de Afiliado", 
                            ft.cuenta_afiliado AS "Cuenta Afectada", 
                            f.filial AS "Filial Pertenece Afiliado", 
                            ft.apertura_actualizacion AS "Fecha de Operacion", 
                            UPPER(cb.colaborador_nombre) AS "Colaborador Nombre",
                            ft.observaciones AS "Observaciones"
                    FROM public.firmas_autorizadas_terceros AS ft 
                    INNER JOIN afiliado_estado AS ae ON ae.id_afiliado_estado = ft.id_afiliado_estado
                    INNER JOIN parentesco AS pt ON pt.id_parentesco = ft.id_parentesco
                    INNER JOIN firma AS frm ON frm.id_firma = ft.id_firma
                    INNER JOIN filial AS f ON f.id_filial = ft.id_filial_pertenece
                    INNER JOIN colaborador AS cb ON cb.id_colaborador = ft.id_colaborador
                    INNER JOIN "Afiliados" AS af ON af."OUTAFF_ID" = ft.id_cliente

                    UNION ALL

                    SELECT  UPPER(concat(na.nombre, ' ', na.apellido)) AS "Nombre",
                            ft.id_cliente AS "Identidad",
                            ae.afiliado_estado AS "Estado",
                            pt.parentesco AS "Parentesco",
                            frm.firma AS "Firma",
                            ft.codigo_afiliado AS "Codigo de Afiliado", 
                            ft.cuenta_afiliado AS "Cuenta Afectada", 
                            f.filial AS "Filial Pertenece Afiliado", 
                            ft.apertura_actualizacion AS "Fecha de Operacion", 
                            cb.colaborador_nombre AS "Colaborador Nombre",
                            ft.observaciones AS "Observaciones"
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
        console.log(res.rows)
        const convertJsonToExcel = () => {

            const workSheet = XLSX.utils.json_to_sheet(res.rows);
            const workBook = XLSX.utils.book_new();
        
            XLSX.utils.book_append_sheet(workBook, workSheet, "students")
            // Generate buffer
            XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        
            // Binary string
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        
            XLSX.writeFile(workBook, "Firmas_Terceros.xlsx")

            resp.download('./Firmas_Terceros.xlsx')    
        
        }
        convertJsonToExcel()
    })
}

module.exports = { exportTransaccionesSinComprobante,
                   exporDiligenciaNoAfiliados,
                   exporChequesTerceros,
                   exporFirmasTerceros}