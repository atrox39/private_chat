const {Schema, model} = require('mongoose');

const Message = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    chat: {
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Chat'
    },
    content:{
        type:Schema.Types.String,
        required:true
    },
}, {
    timestamps:true
});

module.exports = model('Message', Message);