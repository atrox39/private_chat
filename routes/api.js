const router = require('express').Router();
const passport = require('passport');
const deauth = require('../controllers/deauth').deauth;
const auth = require('../controllers/auth').auth;
const auth_mobile = require('../controllers/auth_mobile').auth_mobile;
const operations = require('../controllers/operations');
const rol = require('../database/models/rol');

router.post('/register', deauth, (req, res)=>{
    let newUser = req.body;
    rol.findOne({name:"user"}).then((data)=>{
        
        newUser.rol = data._id;
        console.log(newUser);
        operations.createUser(newUser).then((user)=>{
            if(user !== null)
                res.json({message:"Usuario creado con exito"});
            else
                res.json({message:"El usuario ya existe"});
        });
    }).catch((err)=>{
        if(err) res.json({message:"El usuario ya existe"});
    })
});

router.post('/login', deauth, passport.authenticate('local'), (req, res)=>{
    if(req.user) res.json({token:req.user.token});
    else res.json({message:"error user or password"});
});

router.get('/user', auth_mobile, (req, res)=>{
    res.json({text:"Hello"});
});

module.exports = router;