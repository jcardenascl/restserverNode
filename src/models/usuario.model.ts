import { IUsuario } from '../interfaces/usuario.interface';
import { Schema, Model, model, Document } from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator')
export interface IUserModel extends IUsuario, Document {
    fullName(): string;
}

let rolesValidos = {
    values: [
        'ADMIN_ROLE',
        'USER_ROLE'
    ],
    message: '{VALUE} no es un rol válido'
}

export let UserSchema: Schema = new Schema({
    createdAt: Date,
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: [false, 'La imagen no es obligatoria']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
UserSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}
//   UserSchema.pre("save", function(next) {
//     let now = new Date();
//     if (!this.createdAt) {
//       this.createdAt = now;
//     }
//     next();
//   });

UserSchema.methods.fullName = function (): string {
    return (this.nombre.trim() + " " + this.email.trim());
};

export const Usuario: Model<IUserModel> = model<IUserModel>("Usuario", UserSchema);
