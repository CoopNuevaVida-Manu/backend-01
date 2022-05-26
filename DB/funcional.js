const oracledb = require('oracledb');
const config = require('../configOracleDB')

async function run() {
  let pool;

  try {
    pool = await oracledb.createPool(config);

    let connection;
    try {
      connection = await pool.getConnection();
      result = await connection.execute(`SELECT * FROM NVIDAAPP.CIUDAD`);
      console.log(typeof(result))
      console.log("Result is:", result);
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