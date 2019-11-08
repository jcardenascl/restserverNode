
/**
 * Verificar Token
 */
import { Request, NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { environment } from '../server/config.ts/config';

class AuthMiddlewares {
    constructor() { }
    verificaToken(req: Request, res: Response, next: NextFunction) {
        let token = req.get('token') || ''; //Authorization
        if (!token) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'token no válido'
                }
            })
        }
        jwt.verify(token, environment.SEED, (err: any, decode: any) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'token no válido'
                    }
                })
            }

            req.body.usuario = decode.usuario;
        })
        next();
    }


    /**
     * Verificar admin role
     */

    verificaAdmin_Role(req: Request, res: Response, next: NextFunction) {
        let usuario = req.body.usuario;
        // console.log('verificaAdmin_Role', usuario.role);
        if (usuario.role !== 'ADMIN_ROLE') {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no es administrador'
                }
            })
        }
        next();
    }

}

export const AuthM = new AuthMiddlewares();