const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = Router();

router.get('/usuarios', UsuarioController.buscaTodosUsuarios);
router.get('/usuariosDesativados', UsuarioController.buscaTodosUsuariosDesativados);
router.post('/usuarios', UsuarioController.criaUsuario);
router.put('/usuarios/:id', UsuarioController.atualizaUsuario);
router.put('/desativaUsuarios/:id', UsuarioController.desativaUsuario);


module.exports = router;