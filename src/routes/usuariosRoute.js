const { Router } = require('express');
const bcrypt = require("bcryptjs");
const UsuarioController = require('../controllers/UsuarioController');

const router = Router();

router.get('/usuarios', UsuarioController.buscaTodosUsuarios);
router.post('/usuarios', UsuarioController.criaUsuario);


module.exports = router;