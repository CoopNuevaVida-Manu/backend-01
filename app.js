const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const conexion = require('./DB-pg/db')


app.listen(3000, (req, res)=>{
    console.log('El servidor esta activo en http://localhost:3000')
});


//todos los departamentos
app.get('/departamento', (req, rest)=>{
    conexion.query('select * from departamento', (err, res)=>{
        if(err){
            console.log('Error de consulta: ', err);
            return
        }
        console.log(res.rows);
        rest.send(res.rows)
    })
});

//un solo departamento
app.get('/departamento/:id', (req, rest)=>{
    conexion.query(`select * from departamento where id_departamento = ${req.params.id}`, (err, res)=>{
        if(err){
            console.log('Error de consulta: ', err);
            return
        }
        console.log(res.rows);
        rest.send(res.rows)
    })
});


