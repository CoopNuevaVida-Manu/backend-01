const { response } = require('express');
const bcryp = require('bcryptjs');


const conexion = require('../DB/db');


const login = (req, resp= response)=>{

    const { usuario, password } = req.body;

    conexion.query(`SELECT * FROM colaborador WHERE colaborador_usuario = '${usuario}' `, (err, res)=>{
        if(err){
            throw err
        }else{
            if(res.rows.length == 0){
                return resp.json({
                    msg : 'Usuario no encontrado'
                })
            }else{
                const { id_colaborador, id_departamento, colaborador_password, id_estado} = res.rows[0]
                
                if(id_estado > 1 ){
                    return resp.json({
                        msg : "Este usuario actualmente se encuentra desactivado",
                        login: false,
                        cryp: false,
                        id: 0,
                        dep : 0
                    })
                }else{
                    if(colaborador_password.length > 50){
                        if(bcryp.compareSync(password, colaborador_password)){
                            return resp.json({
                                msg: "Contraseña correcta",
                                login: true,
                                cryp: true,
                                id: id_colaborador,
                                dep : id_departamento

                            })
                        }else{
                            return resp.json({
                                msg: "Contraseña incorrecta",
                                login: false,
                                cryp: false,
                                id: 0,
                                dep : 0
                            })
                        }
                    }else{
                        if(password === colaborador_password){
                            return resp.json({
                                msg: "Contraseña correcta",
                                login: true,
                                cryp: false,
                                id: id_colaborador,
                                dep : id_departamento
                            });
                        }else{
                            return resp.json({
                                msg: "Contraseña incorrecta",
                                login: false,
                                cryp: false,
                                id: 0,
                                dep : 0
                            })
                        }                          
                    }   
                }
            }
        }
    })
}



const loginPut = (req, resp)=>{
    const { id, password} = req.body;

    const salt = bcryp.genSaltSync();
    const passwordCryp = bcryp.hashSync(password, salt)

    conexion.query(`UPDATE public.colaborador SET colaborador_password='${passwordCryp}' WHERE id_colaborador= ${id}`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas",
                cryp: false
            })
        }else{
            resp.json({
                msg: "Actualización de contraseña exitoso",
                cryp : true
            })
        }
    })
}

module.exports = {
                    login,
                    loginPut}