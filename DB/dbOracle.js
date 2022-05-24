const oracledb = require('oracledb');

const conexion = new oracledb.createPool({
    host: process.env.hostOracle,
    user: process.env.hostOracle,
    password: process.env.passwordOracle,
    database: process.env.databaseOracle 
});

// conexion.getConnection((error)=>{
//     if(error){
//         console.log('Error en la conexion DB: ', error)
//         return;
//     }
//     console.log('Conexion exitosa Oracle')
// })



module.exports = conexion; 