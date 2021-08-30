const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/db-config');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.paths = {
			auth: '/api/auth'
		}

		// Conectar a base de Datos
		this.conectarDB();

		// Middlewares
		this.middlewares();

		// Rutas de la aplicacion
		this.routes();
	}

	async conectarDB() {
		await dbConnection();
	}

	middlewares() {
		// CORS
		this.app.use( cors() );

		// Lectura y parseo del body
		this.app.use( express.json() );

		// Directorio publico
		this.app.use( express.static('public') );
	}

	routes() {
		this.app.use( this.paths.auth, require('../routes/auth') );
	}

	listen() {
		this.app.listen( this.port, () => {
			console.log(`Servidor corriendo en: http://localhost:${ this.port }/`);
		});
	}
}

module.exports = Server;
