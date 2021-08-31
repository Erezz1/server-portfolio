const { response } = require('express');

const validarAdmin = ( req, res = response, next ) => {

	const { role, name } = req.usuario;

	if ( role !== 'ADMIN_ROLE' ) {
		return res.status(400).json({
			msg: `El usuario ${ name } no tiene rol de administrador.`
		});
	}

	next();
}

module.exports = {
	validarAdmin
}
