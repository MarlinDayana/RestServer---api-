const { Router }=require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controller/user');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('correo', 'el valor ingresado no tiene el aspecto de un correo').isEmail(),
    check('contraseña', 'la contraseña debe tener minimo 6 caracteres').isLength({min: 6}),
    check('rol', 'no es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuariosPost );

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch );



module.exports = router;