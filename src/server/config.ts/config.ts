/**
 * Puerto
 * Base de Datos
 */
const inDebug = process.env.NODE_ENV || 'dev';

export const environment = {
    puerto: process.env.PORT || '3000',
    urlDB: (inDebug === 'dev') ? 'mongodb://localhost:27017/cafe' : 'mongodb://danelcode:danelcode26@ds259207.mlab.com:59207/cafeudemy',
    optionsCors: {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: '*',
        preflightContinue: false
    }
};
