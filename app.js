require('dotenv').config();

const Server = require('./models/server');


const server = new Server();


server.listen();




//  codigo fuente de la seccion 8 
// https://github.com/Klerith/curso-node-restserver/releases/tag/v1.0.0