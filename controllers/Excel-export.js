const { response } = require('express');
const conexion = require('../DB/db');
const XLSX = require('xlsx')

const exportTransaccionesSinComprobante = (req, resp = response)=>{
    conexion.query(`SELECT  codigo_afiliado as "Codigo de Afiliado", 
                            cuenta_afectada as "Cuenta afectada", 
                            filialac as "Filial Pertenece", 
                            id_cliente as "Identidad Cliente", 
                            UPPER(name) as "Nombre Completo", 
                            origen_fondos as "Origen de fondos", 
                            transaccion as "Tipo de transaccion", 
                            fecha_operacion as "Fecha de Operacion", 
                            monto_transaccion as "Monto de transaccion", 
                            filial as "Filial Operacion", 
                            colaborador_usuario as "Colaborador Usuario", 
                            observaciones as "Observaciones"
                    FROM public.rte
                    ORDER BY fecha_operacion DESC`, (err, res)=>{
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
                    INNER JOIN no_afiliado AS na ON na.identidad = DD.id_no_afiliado
                    ORDER BY DD.fecha_operacion DESC`, (err, res)=>{
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
    conexion.query(`SELECT  codigo_de_afiliado AS "Codigo de Afiliado", 
                        filial AS "Filial",
                        n_cheque AS "N° de Cheque", 
                        fecha_emision AS "Fecha de emision",
                        UPPER(name) AS "Nombre",
                        id_persona AS "Identidad",
                        afiliado_estado AS "Estado",
                        parentesco AS "Parentesco",
                        monto AS "Monto",
                        origen_fondos AS "Origen de Fondos",
                        destino AS "Destino",
                        UPPER(colaborador_nombre) AS "Nombre Colaborador",
                        observaciones AS "Observaciones"
                    FROM public.ct;`, (err, res)=>{
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
    conexion.query(`SELECT  UPPER(name) AS "Nombre",
                        id_cliente AS "Identidad",
                        afiliado_estado AS "Estado",
                        parentesco AS "Parentesco",
                        firma AS "Firma",
                        codigo_afiliado AS "Codigo de Afiliado",
                        cuenta_afiliado AS "Cuenta Afectada",
                        filial "Filial Pertenece Afiliado",
                        apertura_actualizacion AS "Fecha de Operacion",
                        UPPER(colaborador_nombre) AS "Colaborador Nombre",
                        observaciones AS "Observaciones"
                    FROM public.ft
                    ORDER BY apertura_actualizacion DESC`, (err, res)=>{
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