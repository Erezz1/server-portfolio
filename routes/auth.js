const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, login } = require('../controllers/auth');
const { validarChecks } = require('../middlewares/validar-checks');

/**
 * ruta: /api/auth
 */

// Creacion de un usuario
router.post(
	'/create',
	[
		check('email', 'El correo es obligatorio').isEmail(),
		check('password', 'La password es obligatoria').not().isEmpty(),
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		validarChecks
	],
	crearUsuario
)

// Login de un usuario
router.post(
	'/login',
	[
		check('email', 'El correo es obligatorio').isEmail(),
		check('password', 'La password es obligatoria').not().isEmpty(),
		validarChecks
	],
	login
)

module.exports = router;
