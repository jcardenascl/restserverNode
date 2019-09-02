/**
 * Puerto
 * Base de Datos
 */
const inDebug = process.env.NODE_ENV || 'dev';
process.env.MONGO_URI = process.env.MONGO_URI || '';

export const environment = {
    puerto: process.env.PORT || '3000',
    urlDB: (inDebug === 'dev') ? 'mongodb://localhost:27017/cafe' : process.env.MONGO_URI,
    optionsCors: {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: '*',
        preflightContinue: false
    }
};
