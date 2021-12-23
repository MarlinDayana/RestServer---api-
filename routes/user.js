const { Router }=require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos');
const { esRolValido, esmailValido, existeUsuarioporID } = require('../helpers/db-validators');

const { usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../controller/user');




const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'el id ingresado no se encuentra en la base de datos').isMongoId(),
    check('id').custom(existeUsuarioporID),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);
    

router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('correo', 'el valor ingresado no tiene el aspecto de un correo').isEmail(),
    check('correo').custom(esmailValido),
    check('contraseña', 'la contraseña debe tener minimo 6 caracteres').isLength({min: 6}),
    //check('rol', 'no es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost );

router.delete('/:id', [
    check('id', 'el id ingresado no se encuentra en la base de datos').isMongoId(),
    check('id').custom(existeUsuarioporID),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch );



module.exports = router;