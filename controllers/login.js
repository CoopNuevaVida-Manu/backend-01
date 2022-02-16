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
                    respuest: res.rows,
                    msg : 'Usuario no encontrado'
                })
            }else{
                const { colaborador_usuario, colaborador_password} = res.rows[0]
                
                if(password === colaborador_password){
                    return resp.json({
                        msg: "Contraseña correcta"
                    });
                }else{
                    return resp.json({
                        msg: "Incorrecto"
                    })
                }
            }
        }
    })
}

module.exports = login;