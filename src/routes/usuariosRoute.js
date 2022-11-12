const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const LoginController = require('../controllers/LoginController');
const HomeController = require('../controllers/HomeController');


const router = Router();

//Cadastro
router.get('/cadastro', UsuarioController.index);
router.post('/cadastro', UsuarioController.criaUsuario);

//Login
router.get('/login', LoginController.index);
router.post('/login', LoginController.realizaLogin);

//Home
router.get('/home', HomeController.index);
router.get('/home/buscaDados', HomeController.buscaDados);


router.get('/usuarios', UsuarioController.buscaTodosUsuarios);
router.get('/usuariosDesativados', UsuarioController.buscaTodosUsuariosDesativados);
router.put('/usuarios/:id', UsuarioController.atualizaUsuario);
router.put('/desativaUsuarios/:id', UsuarioController.desativaUsuario);


module.exports = router;