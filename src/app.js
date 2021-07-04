const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');


var app = express();


app.use(cookieParser());
app.use(session({
    secret: "EstaLlaveEstaDiseñadaParaSerMuySegura",
    resave: false,
    saveUninitialized: false,
    cookie: {secure : !true}
}));

// flash message meddleware
app.use(require('flash')());
app.use((req, res, next) =>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

// Rutas
app.use('/', require('./routes/index'));
app.use('/words', require('./routes/word'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/config', require('./routes/user'));

// Formato paginas
app.use(bodyParser.json());


// 404 handler
app.use((req, res, next) =>{
    res.status(404).send('Error 404 page not found!');
});

module.exports = app;