const oracledb = require('oracledb');

let pool;

async function run (){

      try {
      pool =  oracledb.createPool({
            user          : "NvidaApp",
            password      : "NVIDAAPP",
            connectString : "nvidaop"
      });

      } catch (err) {
      console.error(err.message);
      }
}



// const result = pool.execute(`SELECT * FROM NVIDAAPP.CIUDAD`);
//       console.log("Result is:", result);


// const oracledb = require('oracledb');

// const conexion =  oracledb.getConnection(
//   {
//     user          : "NvidaApp",
//     password      : "NVIDAAPP",
//     connectString : "nvidaop"
//   }
//   // , (error, con) =>{
//   //     if(error){
//   //         console.log(error)
//   //     }else{
//   //         return con
//   //     }
//   // }
// )

// result = conexion.execute("SELECT * FROM NVIDAAPP.CIUDAD")

// console.log(result)

// // const conexion = new oracledb.createPool({
// //     host: process.env.hostOracle,
// //     user: process.env.hostOracle,
// //     password: process.env.passwordOracle,
// //     database: process.env.databaseOracle 
// // });

// // conexion.getConnection((error)=>{
// //     if(error){
// //         console.log('Error en la conexion DB: ', error)
// //         return;
// //     }
// //     console.log('Conexion exitosa Oracle')
// // })



 module.exports = pool; 