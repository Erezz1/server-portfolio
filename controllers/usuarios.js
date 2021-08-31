const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

// Obtener un usuario por su id
const obtenerUsuario = async ( req, res = response ) => {

	// Obtener el id de los parametros
	const { id } = req.params;

	try {
		// Buscar el usuario desde el id de los parametros.
		const usuario = await Usuario.findById( id );
		res.json( usuario );

	} catch (error) {
		console.log( error );

		res.status(500).json({
			msg: 'Ocurrio un error en el servidor al obtener un Usuario'
		})
	}
}

// Obtener todos los usuarios
const obtenerUsuarios = async ( req, res = response ) => {

	// Se obtienen las querys para el paginador
	const { limit = 4, skip = 0 } = req.query;

	try {
		// Se busca el numero de usuarios y todos los usuarios con rol de usuario, paginado.
		const [ total, usuarios ] = await Promise.all([
			Usuario.countDocuments({ role: 'USER_ROLE' }),
			Usuario.find({ role: 'USER_ROLE' }).skip( Number( skip ) ).limit( Number( limit ) )
		]);

		res.json({
			total, usuarios
		})

	} catch (error) {
		console.log( error );
		res.status(500).json({
			msg: 'Ocurrio un error al obtener a todos los usuarios.'
		})
	}
}

// Se actualiza un usuario con su id.
const editarUsuario = async ( req, res = response ) => {

	// Se obtienen los parametros y los datos del body.
	const { name, email, password, ...basura } = req.body;
	const { id } = req.params;
	const data = {};

	// Se le pasan a la data los valores que se hayan recibido del body.
	if ( name ) { data.name = name; }
	if ( email ) { data.email = email; }
	if ( password ) {
		// En caso de haber recibido una password actualizada, se hace la encriptacion
		const salt = bcrypt.genSaltSync();
		data.password = bcrypt.hashSync( password, salt );
	}

	try {
		// Se busca al usuario a actualizar por id y se le editan  los datos con la nueva data
		const usuario = await Usuario.findByIdAndUpdate( id, data, { new: true } );

		res.json({
			msg: 'El usuario ha sido actualizado con exito!',
			usuario
		});

	} catch( error ) {
		console.log( error );
		res.status(500).json({
			msg: 'Ocurrio un error al actualizar al usuario.'
		});
	}
}

const eliminarUsuario = async ( req, res = response ) => {

	const { id } = req.params;

	try {
		const usuario = await Usuario.findByIdAndRemove( id );

		res.json({
			msg: `El usuario ${ usuario.name } ha sido eliminado exitosamente!`
		})

	} catch (error) {
		console.log( error );
		res.status(500).json({
			msg: 'Ocurrio un error al eliminar al usuario.'
		})
	}
}

module.exports = {
	obtenerUsuario,
	obtenerUsuarios,
	editarUsuario,
	eliminarUsuario
}
