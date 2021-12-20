

const {response}= require('express');

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


  const usuariosPost = (req, res= response) => {
      const {nombre, edad}= req.body;
    res.json({
        message:'post API- desde el controlador',
        nombre, 
        edad
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