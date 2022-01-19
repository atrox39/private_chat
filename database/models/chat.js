const {Schema, model} = require('mongoose');

const Chat = new Schema({
    title:{
        type:Schema.Types.String,
        required:true
    }
}, {
    timestamps:true
});

module.exports = model('Chat', Chat);