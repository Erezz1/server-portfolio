const { response } = require('express');
const { validationResult } = require('express-validator');

// Validacion de los errores que se hayan generado con express-validator 
const validarChecks = ( req, res = response, next ) => {
	const errors = validationResult( req );

	if ( !errors.isEmpty() ) {
		return res.status(400).json( errors );
	}

	next();
}

module.exports = {
	validarChecks
}
