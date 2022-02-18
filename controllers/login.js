const { response } = require('express');



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
                const { id_colaborador, colaborador_usuario, colaborador_password, id_estado} = res.rows[0]
                
                if(id_estado > 1 ){
                    return resp.json({
                        msg : "Este usuario actualmente se encuentra desactivado"
                    })
                }else{
                    if(password === colaborador_password){
                        if(password.length < 50){
                            return resp.json({
                                msg: "Contraseña correcta",
                                cryp: false
                            });
                        }else{
                            return resp.json({
                                msg: "Contraseña correcta",
                                cryp: true
                            })
                        }
                        
                    }else{
                        return resp.json({
                            msg: "Contraseña incorrecta"
                        })
                    }
                }
            }
        }
    })
}

module.exports = login;