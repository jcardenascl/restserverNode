import { Request, Router, Response } from "express";
import { Usuario } from '../models/usuario.model';
import { IUsuario } from '../interfaces/usuario.interface';
import { environment } from "../server/config.ts/config";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginRouter = Router();


loginRouter.post('/', (req: Request, res: Response) => {
    let body: IUsuario = req.body;

    Usuario.findOne({
        email: body.email,
    },
        (err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrectos'
                    }
                })
            }

            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrectos'
                    }
                })
            }
            let token = jwt.sign({
                usuario: usuarioDB
            }, environment.SEED, {
                expiresIn: 60 * 60
            })
            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token
            })


        })
    // if (!body.password.replace(/\s/g, '').length) {
    //     return res.status(400).json({
    //         ok: false,
    //         err: 'La contraseña no puede ser solo de espacios en blanco.'
    //     })
    // }
    // const usuario: IUsuario = new Usuario({
    //     nombre: body.nombre,
    //     email: body.email,
    //     password: bcrypt.hashSync(body.password, 10),
    //     role: body.role
    // });
    // usuario.save((err, usuarioDB) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }
    // })
});

export default loginRouter;