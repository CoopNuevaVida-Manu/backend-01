const {response} = require('express');
const oracledb = require('oracledb');
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

module.exports= {getAfiliadoID,
                 getAfiliadoCuentas,
                 getAfiliadoCli}