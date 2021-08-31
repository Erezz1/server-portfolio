const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

// Validar el token.
const validarJWT = async ( req, res = response, next ) => {
	const token = req.header('x-token');

	// Verificar si contamos con un token.
	if ( !token ) {
		return res.status(400).json({
			msg: 'No hay token en la peticion.'
		});
	}

	try {
		// Verificar si el token es valido y obtenemos el id del usuario.
		const { uid } = jwt.verify( token, process.env.SECRETKEY );

		// Buscar si existe un usuario con el uid del token y pasarlo a la request
		const usuario = await Usuario.findById( uid );
		req.usuario = usuario;

		next();
	} catch (error) {
		console.log( error );
		res.status(500).json({
			msg: 'Ocurrio un error al verificar el token.'
		})
	}
}

module.exports = {
	validarJWT
}
