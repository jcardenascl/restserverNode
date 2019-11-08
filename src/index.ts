import Server from "./server/server";
import appRoutes from "./routes/index.route";
import { environment } from "./server/config.ts/config";

const port = environment.puerto;
const server = Server.init(port);

server.start(() => {
    console.log('Servidor corriendo en el puerto 3000');
    // server.app.use(router);
    // Configuracion global de rutas
    server.app.use('/', appRoutes);
});