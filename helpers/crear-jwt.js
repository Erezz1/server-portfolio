const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '', role = '' ) => {
	return new Promise(( resolve, reject ) => {
		const payload = { uid, role };

		jwt.sign( payload, process.env.SECRETKEY, {
			expiresIn: '365d'
		}, ( error, token ) => {
			if ( error ) {
				console.log( error );
				reject('No se pudo generar el token')
			} else {
				resolve( token );
			}
		});
	})
}

module.exports = {
	generarJWT
}