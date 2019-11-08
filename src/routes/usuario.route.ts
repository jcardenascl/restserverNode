import { Usuario } from './../models/usuario.model';
import { Request, Router, Response } from "express";
import { IUsuario } from '../interfaces/usuario.interface';
import bcrypt from 'bcryptjs';
import _ from 'underscore';
import { NativeError } from 'mongoose';
import { IUserModel } from '../models/usuario.model';
import cors from "cors";
import { environment } from "../server/config.ts/config";
import { AuthM } from '../middlewares/autenticacion';

const UsuarioRouter = Router();
//use cors middleware
UsuarioRouter.use(cors(environment.optionsCors));



UsuarioRouter.get('/', AuthM.verificaToken, (req: Request, res: Response) => {
    let desde: number = Number(req.query.desde || 0);
    let limite: number = Number(req.query.limite || 5);

    Usuario.find({ estado: true })
        .skip(desde)
        .limit(limite)
        .exec((err: NativeError, usuarios: IUserModel) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            Usuario.countDocuments({ estado: true }, (err, total) => {
                res.json({
                    ok: true,
                    usuario: usuarios,
                    total
                })
            })
        })
});

UsuarioRouter.post('/', [AuthM.verificaToken, AuthM.verificaAdmin_Role], (req: Request, res: Response) => {
    let body: IUsuario = req.body;

    if (!body.password.replace(/\s/g, '').length) {
        return res.status(400).json({
            ok: false,
            err: 'La contraseña no puede ser solo de espacios en blanco.'
        })
    }
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

UsuarioRouter.put('/:id', [AuthM.verificaToken, AuthM.verificaAdmin_Role], (req: Request, res: Response) => {
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

UsuarioRouter.delete('/:id', [AuthM.verificaToken, AuthM.verificaAdmin_Role], (req: Request, res: Response) => {
    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        return res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })

});
// UsuarioRouter.get('/about', (req: Request, res: Response) => {
//     res.render('about');
// })
//enable pre-flight
UsuarioRouter.options("*", cors(environment.optionsCors));


export default UsuarioRouter;