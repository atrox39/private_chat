const jwt = require('jsonwebtoken');

exports.auth_mobile = (req, res, next)=>{
    const authorization = req.headers['authorization'];
    if(typeof authorization !== 'undefined')
    {
        jwt.verify(authorization, 'private_chat_server', (err, data)=>{
            if(err) res.sendStatus(403);
            else next();
        });
    }
}