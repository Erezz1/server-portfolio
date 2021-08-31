const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/crear-jwt');

// Creacion de un usuario
const crearUsuario = async ( req, res = response ) => {

	// Se obtienen los datos y se genera un usuario sin los datos innecesarios que lleguen a venir en el body.
	const { email, password, name, ...basura } = req.body;
	const data = {
		email, password, name
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

		// Se genera un token para autenticacion
		const token = await generarJWT( usuario._id, usuario.role );

		// Se almacena el usuario creado
		await usuario.save();

		res.json({ usuario, token })

	} catch (error) {
		console.log( error );
		return res.status(500).json({
			msg: 'Ocurrió un error en el servidor. Por favor, comunícaselo al desarrollador backend.'
		})
	}
}

// Login de un usuario
const login = async ( req, res = response ) => {

	// Se obtienen los datos y se elimina lo innecesario que llegue a venir en el body.
	const { email, password, ...basura } = req.body;

	try {
		// Se busca el usuario registrado con el email del body
		const usuario = await Usuario.findOne({ email });

		// Si no se encuentra ningun usuario, se manda un error.
		if ( !usuario ) {
			return res.status(404).json({
				msg: `No existe una cuenta con el email ${ email }`
			});
		}

		// Si la password registrada y la password del body no coinciden, se manda un error.
		const validPassword = bcrypt.compareSync( password, usuario.password );
		if ( !validPassword ) {
			return res.status(400).json({
				msg: 'La password no es correcta'
			});
		}

		// Se genera un token para autenticacion
		const token = await generarJWT( usuario._id, usuario.role );

		res.json({ usuario, token });

	} catch (error) {
		console.log( error );
		return res.status(500).json({
			msg: 'Ocurrió un error en el servidor. Por favor, comunícaselo al desarrollador backend.'
		})
	}
}

module.exports = {
	crearUsuario,
	login
}
