const mongoose = require('mongoose');
const CONFIG = require('./config');

module.exports = {
    connection: null,
    connect : function(){
        if(this.connection) return this.connection;
        return mongoose.connect(CONFIG.BD).then(connection =>{
            this.connection = this.connection;
            console.log("BD: Conexion exitosa");
        }).catch(error => console.error(error));
    }
}