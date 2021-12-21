
// {
// nombre:'mayo',
// correo:'@jshjdhakdk',
// contraseña:'fjhfjghf',
// image:'sidaoduasd',
// rol:'jshldhadjh',
// estado:false,
// google:false

// }

const {Schema, model}= require('mongoose')


const UsuarioSchema = Schema ({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique:true
    },
    contraseña:{
        type:String,
        required:[true, 'La contraseña es obligatorio']
    },
    imagen:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        emun:['ADMIN_ROLE, USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false,
    }

});

module.exports=model('Usuario', UsuarioSchema);