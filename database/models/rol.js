const {Schema, model} = require('mongoose');

const Rol = new Schema({
    name:{
        type:Schema.Types.String,
        required:true
    },
    level:{
        type:Schema.Types.Number,
        required:true
    }
}, {
    timestamps:false
});

module.exports = model('Rol', Rol);