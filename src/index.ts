import Server from "./server/server";
import router from "./routes/usuario.route";
import puerto from "./server/config.ts/config";

const port = puerto;
const server = Server.init(port);

server.start(() => {
    console.log('Servidor corriendo en el puerto 3000');
    server.app.use(router)
});