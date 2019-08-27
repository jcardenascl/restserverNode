import express = require('express');
import path = require('path');
import bodyParser = require('body-parser')

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

    start(callback: () => void) {
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