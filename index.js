const BD = require('./src/config/conexion');
const CONFIG = require('./src/config/config');
const app = require('./src/app');

BD.connect(); //mongoose.connect(uri, { useFindAndModify: false });

async function main(){
    await app.listen(CONFIG.PORT, (error)=>{
        if ( error ) return console.error();
        console.log(`Servidor encendido: ${CONFIG.PORT}`);
    });
}

main();