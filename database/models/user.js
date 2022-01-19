const {Schema, model} = require('mongoose');

const User = new Schema({
    username:{
        type:Schema.Types.String,
        required:true,
        minlength:6,
        maxlength:120
    },
    password:{
        type:Schema.Types.String,
        required:true,
        minlength:6,
        maxlength:120
    },
    alias:{
        type:Schema.Types.String,
        required:true,
        minlength:6,
        maxlength:120
    },
    rol:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Rol'
    }
}, {
    timestamps:true
});

module.exports = model('User', User);