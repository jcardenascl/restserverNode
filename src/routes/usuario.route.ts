import { Usuario } from './../models/usuario.model';
import { Request, Router, Response } from "express";
import { IUsuario } from '../interfaces/usuario.interface';
import bcrypt from 'bcryptjs';
import _ from 'underscore';
import { NativeError } from 'mongoose';
import { IUserModel } from '../models/usuario.model';

const UsuarioRouter = Router();

UsuarioRouter.get('/usuario', (req: Request, res: Response) => {
    let desde: number = Number(req.query.desde || 0);
    let limite: number = Number(req.query.limite || 5);

    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((err: NativeError, usuarios: IUserModel) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            Usuario.countDocuments({}, (err, total) => {
                res.json({
                    ok: true,
                    usuario: usuarios,
                    total
                })
            })
        })
});

UsuarioRouter.post('/usuario', (req: Request, res: Response) => {
    let body: IUsuario = req.body;
    const usuario: IUsuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioDB
        })
    })
});

UsuarioRouter.put('/usuario/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err: any, usuarioDB: any) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
});

UsuarioRouter.delete('/usuario', (req: Request, res: Response) => {
    res.json('delete usuario');
});
UsuarioRouter.get('/about', (req: Request, res: Response) => {
    res.render('about');
})

export default UsuarioRouter;