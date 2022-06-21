const { response } = require('express');
const conexion = require('../DB/db');
const XLSX = require('xlsx')

const exportTransaccionesSinComprobante_P = (req, resp = response)=>{

    const { fechai, fechaf } = req.params;
    
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
                    WHERE fecha_operacion >= '${fechai}' AND fecha_operacion <= '${fechaf}'
                    ORDER BY fecha_operacion DESC`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        const convertJsonToExcel = () => {

            const workSheet = XLSX.utils.json_to_sheet(res.rows);
            const workBook = XLSX.utils.book_new();
        
            XLSX.utils.book_append_sheet(workBook, workSheet, "RET sin comprobantes")
            // Generate buffer
            XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        
            // Binary string
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        
            XLSX.writeFile(workBook, "RTE_P.xlsx")

            resp.download('./RTE_P.xlsx')    
        
        }
        convertJsonToExcel()
    })
}

const exporDiligenciaNoAfiliados_P = (req, resp = response)=>{
    
    const { fechai, fechaf } = req.params;

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
                    WHERE DD.fecha_operacion >= '${fechai}' AND DD.fecha_operacion <= '${fechaf}'
                    ORDER BY DD.fecha_operacion DESC`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        const convertJsonToExcel = () => {

            const workSheet = XLSX.utils.json_to_sheet(res.rows);
            const workBook = XLSX.utils.book_new();
        
            XLSX.utils.book_append_sheet(workBook, workSheet, "DD de no afiliados")
            // Generate buffer
            XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        
            // Binary string
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        
            XLSX.writeFile(workBook, "Diligencia_No_Afiliados_P.xlsx")

            resp.download('./Diligencia_No_Afiliados_P.xlsx')    
        
        }
        convertJsonToExcel()
    })
}

const exporChequesTerceros_P = (req, resp = response)=>{

    const { fechai, fechaf } = req.params;

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
                    FROM public.ct
                    WHERE fecha_emision >= '${fechai}' AND fecha_emision <= '${fechaf}'
                    ORDER BY fecha_emision DESC `, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        const convertJsonToExcel = () => {

            const workSheet = XLSX.utils.json_to_sheet(res.rows);
            const workBook = XLSX.utils.book_new();
        
            XLSX.utils.book_append_sheet(workBook, workSheet, "Cheques a Terceros")
            // Generate buffer
            XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        
            // Binary string
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        
            XLSX.writeFile(workBook, "Cheques_Terceros_P.xlsx")

            resp.download('./Cheques_Terceros_P.xlsx')    
        
        }
        convertJsonToExcel()
    })
}

const exporFirmasTerceros_P = (req, resp = response)=>{
    
    const { fechai, fechaf } = req.params;

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
                    WHERE apertura_actualizacion >= '${fechai}' AND apertura_actualizacion <= '${fechaf}'
                    ORDER BY apertura_actualizacion DESC`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }
        const convertJsonToExcel = () => {

            const workSheet = XLSX.utils.json_to_sheet(res.rows);
            const workBook = XLSX.utils.book_new();
        
            XLSX.utils.book_append_sheet(workBook, workSheet, "Firmas a Terceros")
            // Generate buffer
            XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
        
            // Binary string
            XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        
            XLSX.writeFile(workBook, "Firmas_Terceros_P.xlsx")

            resp.download('./Firmas_Terceros_P.xlsx')    
        
        }
        convertJsonToExcel()
    })
}

module.exports = { exportTransaccionesSinComprobante_P,
                   exporDiligenciaNoAfiliados_P,
                   exporChequesTerceros_P,
                   exporFirmasTerceros_P}