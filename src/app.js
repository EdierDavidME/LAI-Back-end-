const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const { createRoles } = require('./services/initialSetup');

const app = express();
createRoles(); // creación de roles
app.use(cors()); // Seguridad API rest Baneo

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
app.use('/api', require('./routes/index.routes'));
app.use('/api/words', require('./routes/word.routes'));
app.use('/api/signup', require('./routes/signup.routes'));
app.use('/api/login', require('./routes/login.routes'));
app.use('/api/config', require('./routes/user.routes'));

// Formato paginas
app.use(bodyParser.json());


// 404 handler
app.use((req, res, next) =>{
    res.status(404).send('Error 404 page not found!');
});

module.exports = app;