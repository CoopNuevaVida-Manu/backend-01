const {response} = require('express');
const oracledb = require('oracledb');
const conexion = require('../DB/db');
const config = require('../configOracleDB')

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


const getAfiliadoID = (req, resp = response)=>{
    
    const { id } = req.params;

    async function run() {
        let pool;
    
        try {
            pool = await oracledb.createPool(config);
    
            let connection;
            try {
            connection = await pool.getConnection();
            result = await connection.execute(`SELECT * FROM NVIDAAPP.OUTCUST_AFFILIATE WHERE OUTAFF_ID = '${id}'`);
            resp.json(result.rows)
            } catch (err) {
            throw (err);
            } finally {
            if (connection) {
                try {
                await connection.close(); // Put the connection back in the pool
                } catch (err) {
                throw (err);
                }
            }
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            await pool.close();
        }
        }
    
        run();
}

const AfilidoIDPostgres = (req,resp = response) =>{

    const { id } = req.params;
    
    conexion.query(`SELECT "OUTAFF", "OUTAFF_IDCIA", "OUTAFF_IDSUC", "OUTAFF_CLI-NOCTA", "OUTAFF_NAME", "OUTAFF_ID", "OUTAFF_ACCOUNTTYPE", "OUTAFF_EMPLOYEE"
	FROM public."Afiliados" WHERE "OUTAFF_ID" = '${id}'`, (err, res)=>{
        if(err){
            return resp.json({
                msg: "Ha ocurrido un error, por favor contacte al departamente de Ingenieria en sistemas"
            })
        }else{
            return resp.json(res.rows)
        }
    })
};

const getAfiliadoCuentas = (req, resp = response)=>{
    
    const { idSuc, idCli } = req.params;

    async function run() {
        let pool;
    
        try {
            pool = await oracledb.createPool(config);
    
            let connection;
            try {
            connection = await pool.getConnection();
            result = await connection.execute(`SELECT * FROM NVIDAAPP.OUTCUST_SAVINGS WHERE OUTSAV_IDSUC = '${idSuc}' AND OUTSAV_CLI_NOCTA = '${idCli}'`);
            resp.json(result.rows)
            } catch (err) {
            throw (err);
            } finally {
            if (connection) {
                try {
                await connection.close(); // Put the connection back in the pool
                } catch (err) {
                throw (err);
                }
            }
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            await pool.close();
        }
        }
    
        run();
}

const getAfiliadoCli = (req, resp = response)=>{
    
    const { idSuc, idCli } = req.params;

    async function run() {
        let pool;
    
        try {
            pool = await oracledb.createPool(config);
    
            let connection;
            try {
            connection = await pool.getConnection();
            result = await connection.execute(`SELECT * FROM NVIDAAPP.OUTCUST_AFFILIATE WHERE OUTAFF_IDSUC = '${idSuc}' AND OUTAFF_CLI_NOCTA = '${idCli}'`);
            resp.json(result.rows)
            } catch (err) {
            throw (err);
            } finally {
            if (connection) {
                try {
                await connection.close(); // Put the connection back in the pool
                } catch (err) {
                throw (err);
                }
            }
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            await pool.close();
        }
        }
    
        run();
}

const postAfiliado = (req, resp = response) =>{
    const {OUTAFF_IDCIA,       
           OUTAFF_IDSUC,       
           OUTAFF_CLI_NOCTA,   
           OUTAFF_NAME,        
           OUTAFF_ID,          
           OUTAFF_ACCOUNTTYPE, 
           OUTAFF_EMPLOYEE} = req.body;
    conexion.query(`INSERT INTO public."Afiliados"("OUTAFF_IDCIA", 
                                                   "OUTAFF_IDSUC", 
                                                   "OUTAFF_CLI-NOCTA", 
                                                   "OUTAFF_NAME", 
                                                   "OUTAFF_ID", 
                                                   "OUTAFF_ACCOUNTTYPE", 
                                                   "OUTAFF_EMPLOYEE")
                                                        VALUES ('${OUTAFF_IDCIA}',       
                                                                '${OUTAFF_IDSUC}',       
                                                                '${OUTAFF_CLI_NOCTA}',   
                                                                '${OUTAFF_NAME}',        
                                                                '${OUTAFF_ID}',          
                                                                '${OUTAFF_ACCOUNTTYPE}', 
                                                                '${OUTAFF_EMPLOYEE}');`, (err, res)=>{
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


module.exports= {getAfiliadoID,
                 AfilidoIDPostgres,
                 getAfiliadoCuentas,
                 getAfiliadoCli,
                 postAfiliado}

                 