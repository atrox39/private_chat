const bcrypt = require('bcrypt');
const User = require('../database/models/user');

// Check if user exist with username and address
exports.userExists = async (username) =>{
    return await User.findOne({$or:[{username}]}) === null;
}

// Create user
exports.createUser = async (user)=>{
    let notExists = await this.userExists(user.username);
    if(notExists){
        let newUser = {
            username:user.username,
            password: bcrypt.hashSync(user.password, 10),
            alias:user.alias,
            rol:user.rol
        };
        User.create(newUser).then((data)=>{
            return data;
        })
    }else{
        return null;
    }
}

// Get User by ID
exports.UserByID = async (id)=>{
    return await User.findById(id);
}

exports.Login = async (username, password)=>{
    let user_ = await User.findOne({username});
    if(user_!==null){
        let checkPass = bcrypt.compareSync(password, user_.password);
        if(checkPass) return user_;
        else return null;
    }else return null;
}