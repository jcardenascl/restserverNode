import express = require('express');
import mongoose = require('mongoose');
import path = require('path');
import bodyParser = require('body-parser');
import { environment } from "../server/config.ts/config";
import * as cors from "cors";
export default class Server {
    // public express = express;
    public app: express.Application;
    public port: number;
    constructor(puerto: any) {
        this.port = puerto;
        this.app = express();
    }
    static init(puerto: any) {
        return new Server(puerto)
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public')
        this.app.use(express.static(publicPath))
    }
    private enableCors() {
        const options: cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: '*',
            preflightContinue: false
        };

    }

    private connectDB() {
        mongoose.connect(environment.urlDB, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, (err: any) => {
            if (err) {
                throw err;

            }
            console.log('Base de Datos online');

        });

    }

    start(callback: () => void) {
        this.connectDB();
        this.app.listen(this.port, callback);
        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // parse application/json
        this.app.use(bodyParser.json());

        // const parcialPath = path.resolve(__dirname, '../views/parciales');
        // console.log(parcialPath);

        // hbs.registerPartials(parcialPath);
        // this.publicFolder();
        // Express HBS engine
        // this.app.set('view engine', 'hbs');
    }
}