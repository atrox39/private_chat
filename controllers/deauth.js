exports.deauth = (req, res, next)=>{
    if(req.isAuthenticated() === false){
        next();
    }else{
        res.redirect('/api/user');
    }
}