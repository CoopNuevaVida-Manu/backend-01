const {response} = require('express');
const pool = require('../DB/dbOracle');
const oracledb = require('oracledb');

const getciudad = (req, resp = response)=>{
        

    async function run() {
    let pool;

    try {
        pool = await oracledb.createPool({
            user          : "NvidaApp",
            password      : "NVIDAAPP",
            connectString : "nvidaop"
        //   user          : process.env.userOracle.toString(),
        //   password      : process.env.passwordOracle.toString(),
        //   connectString : process.env.databaseOracle.toString()
        });

        let connection;
        try {
        connection = await pool.getConnection();
        result = await connection.execute(`SELECT * FROM NVIDAAPP.CIUDAD`);
        resp.json(result)
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

module.exports = { 
    getciudad
}