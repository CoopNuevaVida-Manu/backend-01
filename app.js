require('dotenv').config();

const Server = require('./models/server');

const conexion = require('./DB/dbOracle')

const server = new Server();

server.listen();
