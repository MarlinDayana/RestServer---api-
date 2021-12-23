const {response}= require('express');
const bcryptjs=require('bcryptjs');


const Usuario= require('../models/usuario');


const usuariosGet = async (req, res= response) => {

  const {limite = 5, desde= 0 }=req.query
  const query = {estado:true};
  // const {q, nombre= 'no name', apikey, page=1, limit}= req.query;
  // const usuarios = await Usuario.find()
  // .skip(Number(desde))
  // .limit(Number(limite));

  // const total = await Usuario.countDocuments();

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
  .skip(Number(desde))
  .limit(Number(limite))

  ])
    res.json({
      total,
      usuarios
    })
  }


  const usuariosPost = async (req, res= response) => {

     
      const {nombre, correo, contraseña, rol}= req.body;
      const usuario = new Usuario({nombre, correo, contraseña, rol});

      // verficar si el correo existe 

      // const existeEmail= await Usuario.findOne({correo});

      // if (existeEmail){
      //   return res.status(400).json({
      //     message:'ese correo ya esta registrado'
      //   })
      // }


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

  const usuariosPut = async (req, res= response) => {

    const id = req.params.id;
    const {_id, contraseña, google, correo, ...resto}= req.body;

    //TODO validar contra la base de datos 

    if (contraseña){
      // encriptar contraseña 
      const salt = bcryptjs.genSaltSync();
      resto.contraseña= bcryptjs.hashSync(contraseña, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json({
        message:'put API- desde el controlador',
        usuario
    })
  }

  const usuariosDelete = async (req, res= response) => {
    const id = req.params.id;

    // fisicamente lo borramos 
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json({
        usuario
    })
  }

  const usuariosPatch = (req, res= response) => {
    
    res.json({
      message:'Patch API- desde el controlador',
    })
  }





  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch

}