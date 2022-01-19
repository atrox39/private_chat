const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const rol = require('./models/rol');
const user = require('./models/user');

mongoose.connect('mongodb://localhost:27017/private_chat');

const connection = mongoose.connection;

connection.on('open', ()=>{
    console.log('Success database connection');
    // Create default rols and administrator account
    /*
        username: administrator
        password: administrator
    */
    rol.find().then((data)=>{
        if(data.length===0){
            rol.insertMany([{
                name:"root",
                level:1
            },{
                name:"user",
                level:2
            }]).then((d)=>{
                user.create({
                    username:"administrator",
                    password:bcrypt.hashSync("administrator", bcrypt.genSaltSync(10)),
                    alias:"administrator",
                    rol:d[1]._id
                }).then((t)=>{});
            });
        }
    });
});

connection.on('error', (err)=>{
    if(err) throw err;
});

module.exports = connection;