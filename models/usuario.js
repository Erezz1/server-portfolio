/**
 * {
 * 		role: 'ADMIN_ROLE',
 * 		name: 'Ernesto Perez Martinez',
 * 		correo: 'correo@correo.com',
 * 		password: 'asdsad21312' - bcryptjs
 * 		img: 'cloudinary.jpg',
 * }
 */

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	name: {
		type: String,
		required: [ true, 'El nombre es obligatorio' ],
	},

	email: {
		type: String,
		required: [ true, 'El correo es obligatorio' ],
		unique: true
	},

	password: {
		type: String,
		required: [ true, 'La password es obligatoria' ],
	},

	img: {
		type: String,
	},

	role: {
		type: String,
		required: true,
		emun: [ 'ADMIN_ROLE', 'USER_ROLE' ],
		default: 'USER_ROLE'
	},
});

module.exports = model( 'Usuario', UsuarioSchema );
