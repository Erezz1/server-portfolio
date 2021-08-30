const { response } = require('express');

const crearUsuario = ( req, res = response ) => {

	res.json({
		msg: 'Creando usuario...'
	})
}

module.exports = {
	crearUsuario
}
