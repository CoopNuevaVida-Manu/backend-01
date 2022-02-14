const {Pool} = require ('pg');

const conexion = new Pool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database 
});

conexion.connect((error)=>{
    if(error){
        console.log('Error en la conexion DB: ', error)
        return;
    }
    console.log('Conexion exitosa')
})



module.exports = conexion; 