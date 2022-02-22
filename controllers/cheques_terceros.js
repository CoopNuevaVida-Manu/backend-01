const { response } = require('express');

const conexion = require('../DB/db');

const chequesTerGet = (req,resp = response) =>{
    conexion.query(`SELECT * FROM public.cheques_terceros ORDER BY fecha_emision DESC `, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows)
        }
    })
};

const chequesTerGetId = (req,resp = response) =>{

    const { id } = req.params;
    
    conexion.query(`SELECT * FROM cheques_terceros where id_cheque_tercero = ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows)
        }
    })
};

const chequesTerPost = (req, resp = response)=>{

    const {codigo_de_afiliado, 
        id_filial, 
        n_cheque, 
        fecha_emision, 
        id_colaborador, 
        id_persona, 
        id_parentesco, 
        monto, 
        id_origen_fondos, 
        id_destino, 
        observaciones, 
        id_afililiado_estado} = req.body;

    conexion.query(`INSERT INTO cheques_terceros(
                        codigo_de_afiliado, 
                        id_filial, n_cheque, 
                        fecha_emision, 
                        id_colaborador, 
                        id_persona, 
                        id_parentesco, 
                        monto, 
                        id_origen_fondos, 
                        id_destino, 
                        observaciones, 
                        id_afililiado_estado)
                                VALUES ('${codigo_de_afiliado}',
                                        ${id_filial}, 
                                        ${n_cheque}, 
                                        '${fecha_emision}', 
                                        ${id_colaborador}, 
                                        ${id_persona}, 
                                        ${id_parentesco}, 
                                        ${monto}, 
                                        ${id_origen_fondos}, 
                                        ${id_destino}, 
                                        '${observaciones}', 
                                        ${id_afililiado_estado});`, (err,res)=>{
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

const chequesTerDelete = (req, resp = response)=>{
    const {id} = req.params;

    conexion.query(`DELETE FROM public.cheques_terceros WHERE id_cheque_tercero = ${id}`, (err,res)=>{
        if(err){
            return resp.json({
                delete: false
            });
        }else{
            return resp.json({
                delete: true
            })
        }
    })
}

const chequesTerPut = (req, resp = response)=>{
    const { id,
            codigo_de_afiliado, 
            id_filial, 
            n_cheque, 
            fecha_emision, 
            id_colaborador, 
            id_persona, 
            id_parentesco, 
            monto, 
            id_origen_fondos, 
            id_destino, 
            observaciones, 
            id_afililiado_estado} = req.body;

    conexion.query(`UPDATE public.cheques_terceros
	                    SET codigo_de_afiliado= '${codigo_de_afiliado}', 
                        id_filial= ${id_filial}, 
                        n_cheque= ${n_cheque}, 
                        fecha_emision= '${fecha_emision}', 
                        id_colaborador= ${id_colaborador}, 
                        id_persona= '${id_persona}', 
                        id_parentesco= ${id_parentesco}, 
                        monto= ${monto}, 
                        id_origen_fondos= ${id_origen_fondos}, 
                        id_destino= ${id_destino}, 
                        observaciones= '${observaciones}', 
                        id_afililiado_estado= ${id_afililiado_estado}
	WHERE id_cheque_tercero= ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                put: false
            })
        }else{
            return resp.json({
                put: true
            })
        }
    })
}

module.exports = {
    chequesTerGet,
    chequesTerGetId,
    chequesTerPost,
    chequesTerDelete,
    chequesTerPut
}
