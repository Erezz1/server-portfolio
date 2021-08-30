const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

// Creacion de un usuario
const crearUsuario = async ( req, res = response ) => {

	// Se obtienen los datos y se genera un usuario sin los datos innecesarios que lleguen a venir en el body.
	const { email, password, name, role, ...basura } = req.body;
	const data = {
		email, password, name, role
	}
	const usuario = new Usuario( data );

	try {
		// Se verifica que no haya ningun usuario registrado con el correo recibido.
		const usuarioDB = await Usuario.findOne({ email });
		if ( usuarioDB ) {
			return res.status(400).json({
				msg: `La cuenta con el correo ${ email } ya ha sido registrado anteriormente.`
			});
		}

		// Se encripta la password
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync( password, salt );

		// Se almacena el usuario creado
		await usuario.save();

	} catch (error) {
		console.log( error );
		return res.status(500).json({
			msg: 'Ocurrió un error en el servidor. Por favor, comunícaselo al desarrollador backend.'
		})
	}

	res.json( usuario )
}

module.exports = {
	crearUsuario
}
