const {Pool} = require ('pg');

const conexion = new Pool({
    host: '192.168.26.128',
    user: 'postgres',
    password: 'Nvida2015*',
    database: 'CNV_PO' 
});

conexion.connect((error)=>{
    if(error){
        console.log('Error en la conexion DB: ', error)
        return;
    }
    console.log('Conexion exitosa')
})



module.exports = conexion; 