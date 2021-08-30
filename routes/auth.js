const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario } = require('../controllers/auth');
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
		check('role', 'El rol no pertenece a ninguno valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
		validarChecks
	],
	crearUsuario
)

module.exports = router;
