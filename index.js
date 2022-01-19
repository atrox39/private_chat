const handlebars = require('express-handlebars');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const HTTP_PORT = process.env.PORT || 80;
const operations = require('./controllers/operations');
const moment = require('moment');
const passport = require('passport');
const passportLocal = require('passport-local');
const jwt = require('jsonwebtoken');
const { json } = require('express');
require('./database/database');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(flash());
app.use(methodOverride('_method'));
app.use(cors());

// EXPRESS SESSION
app.use(session({
    secret:'private_chat_server',
    resave:true,
    saveUninitialized:true
}));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// LOGIN

passport.use(new passportLocal((username, password, done)=>{
    operations.Login(username, password).then((user)=>{
        if(user!==null){
            let token = jwt.sign({user}, 'private_chat_server');
            return done(null, {data:user, token:token});
        }else{
            return done(null, false);
        }
    });
}));

passport.serializeUser((user, done)=>{
    done(null, user.data.id);
});

passport.deserializeUser((id, done)=>{
    operations.UserByID(id).then(user=>{
        done(null, user);
    });    
});

// HANDLEBARS CONFIG
app.set('views', 'views');
app.engine('hbs', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    extname: '.hbs',
    helpers:{
        dateFormat: function(date){
            let f = "DD/MM/YYYYY HH:mm";
            return moment(date).format(f);
        }
    }
}));
app.set('view engine', 'hbs');

// ROUTES
app.use('/api', require('./routes/api'));

// SERVER INIT
app.listen(HTTP_PORT, ()=>{
    console.log(`HTTP SERVER LISTEN ON http://localhost:${HTTP_PORT}`);
});