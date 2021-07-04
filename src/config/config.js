module.exports = {
    // PUERTO DE CONEXION
    PORT: process.env.PORT || 3000,

    // CONEXION BASE DE DATOS
    BD: process.env.BD || 'mongodb://localhost:27017/Language_apprentices_island',

    // CADUCAR TOKEN
    TVENCE: process.env.TVENCE = '2',
    BVENCE: process.env.BVENCE = 'hours',

    // Auth
    SECRET_TOKEN: process.env.SEED_AUTENTICATION || '_esta_esunasuperllaveSecretaTotalMenteseguña_'
}