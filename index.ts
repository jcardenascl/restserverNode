import Server from "./server/server";

const port = process.env.PORT || 3000;
const server = Server.init(port);

server.start(() => {
    console.log('Servidor corriendo en el puerto 3000');

    server.app.get('/usuario', (req, res) => {
        res.json('get usuario');
    });
    server.app.post('/usuario', (req, res) => {
        let body = req.body;

        if (body.nombre === undefined) {
            res.status(400).json({
                ok: false,
                mensaje: 'El nombre es necesario'
                // err: errors
            });
        } else {
            res.status(200).json({
                persona: body
            });

        }
    });
    server.app.put('/usuario/:id', (req, res) => {
        let id = req.params.id;
        res.json({ id });
    });
    server.app.delete('/usuario', (req, res) => {
        res.json('delete usuario');
    });
    server.app.get('/about', (req, res) => {
        res.render('about');
    })


})