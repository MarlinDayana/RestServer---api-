
const express = require('express');
const cors = require('cors')

const {dbConection}=require('../database/config')

const PORT= process.env.PORT


class Server {

    // dentro no van las propiedades porque se colocaan en el constructor 
    // el contructir es un metodo donde se definen las propiedades de la clase 
   constructor(){
    this.app = express()
    this.usuarioPath='/api/usuarios';

    // conextar a base de datos

    this.conectarDB();

    //middleware
    this.middleware();

    //lecturra y parseo del body porque
    
    this.app.use(express.json());

    // rutas 
    this.routes();
   }

   async conectarDB(){
        await dbConection();
   }


   middleware(){
       this.app.use(cors());
       this.app.use(express.static('public'));
   }

   routes (){
       this.app.use(this.usuarioPath, require('../routes/user'));
   }

   listen(){
     this.app.listen(PORT, () => {
     console.log('listening on port'+ ' '+ PORT);
    });
   }
}


module.exports=Server;