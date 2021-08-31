const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { 
	obtenerUsuario, 
	obtenerUsuarios,
	editarUsuario,
	eliminarUsuario
} = require('../controllers/usuarios');

const { validarChecks } = require('../middlewares/validar-checks');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarAdmin } = require('../middlewares/validar-admin');

const { validarUsuario } = require('../helpers/validaciones-db');

/**
 * ruta: /api/usuarios
 */

// Obtener un usuario por su id
router.get(
	'/:id',
	[
		validarJWT,
		validarAdmin,
		check('id', 'El id no es uno de MongoDB.').isMongoId(),
		check('id').custom( validarUsuario ),
		validarChecks
	],
	obtenerUsuario
)

// Obtener todos los usuarios
router.get(
	'/',
	[
		validarJWT,
		validarAdmin
	],
	obtenerUsuarios
)

// Editar un usuario
router.put(
	'/:id',
	[
		validarJWT,
		validarAdmin,
		check('id', 'El id no es uno de MongoDB.').isMongoId(),
		check('id').custom( validarUsuario ),
		validarChecks
	],
	editarUsuario
)

// Elimina un usuario
router.delete(
	'/:id',
	[
		validarJWT,
		validarAdmin,
		check('id', 'El id no es uno de MongoDB.').isMongoId(),
		check('id').custom( validarUsuario ),
		validarChecks
	],
	eliminarUsuario
)

module.exports = router;
