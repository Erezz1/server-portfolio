const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario } = require('../controllers/auth');

router.post(
	'/',
	[],
	crearUsuario
)

module.exports = router;
