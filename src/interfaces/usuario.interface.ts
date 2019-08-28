import { Document } from "mongoose";

export interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    img?: string;
    role?: string;
    estado?: string;
    google?: string;
}