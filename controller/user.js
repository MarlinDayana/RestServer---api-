const {response}= require('express');
const bcryptjs=require('bcryptjs');


const Usuario= require('../models/usuario');


const usuariosGet = (req, res= response) => {

  const {q, nombre= 'no name', apikey, page=1, limit}= req.query;
    res.json({
        message:'get API- desde el controlador',
        q,
        nombre, 
        apikey,
        page,
        limit
    })
  }


  const usuariosPost = async (req, res= response) => {

     
      const {nombre, correo, contraseña, rol}= req.body;
      const usuario = new Usuario({nombre, correo, contraseña, rol});

      // verficar si el correo existe 

      const existeEmail= await Usuario.findOne({correo});

      if (existeEmail){
        return res.status(400).json({
          message:'ese correo ya esta registrado'
        })
      }


      // Encriptar la contraseña 
      const salt = bcryptjs.genSaltSync();
      usuario.contraseña= bcryptjs.hashSync(contraseña, salt);


      // grardar en base de datos 
      await usuario.save();

    res.json({
        message:'post API- desde el controlador',
        usuario
    })
  }

  const usuariosPut = (req, res= response) => {

    const id = req.params.id;
    res.json({
        message:'put API- desde el controlador',
        id
    })
  }

  const usuariosDelete = (req, res= response) => {
    res.json({
        message:'delete API- desde el controlador'
    })
  }

  const usuariosPatch = (req, res= response) => {
    res.json({
        message:'patch API- desde el controlador'
    })
  }





  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch

}