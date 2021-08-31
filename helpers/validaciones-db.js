const Usuario = require('../models/usuario');

const validarUsuario = async ( id ) => {
	const usuario = await Usuario.findById( id );

	if ( !usuario ) {
		throw new Error(`El usuario con el id ${ id } no existe.`);
	}
}

module.exports = {
	validarUsuario
}
