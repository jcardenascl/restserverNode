
import express = require('express');
import userRoutes from "./usuario.route";
import climaRoutes from "./clima.route";
import loginRouter from "./login.route";

const appRoutes: express.Application = express();

appRoutes.use('/user', userRoutes);
appRoutes.use('/clima', climaRoutes);
appRoutes.use('/login', loginRouter);

export default appRoutes;