const database = require('../models');
const bcrypt = require("bcryptjs");

class UsuarioController {
  static async buscaTodosUsuarios(req, res) {
    try {
      const todosUsuarios = await database.Usuarios.findAll();
      return res.status(200).json(todosUsuarios);
    }
    catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static geraSenha() {
    var length = 9;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  static async criaUsuario(req, res) {
    const { nome, email, telefone, cpf_cnpj } = req.body;
    const novaSenha = bcrypt.hashSync(UsuarioController.geraSenha(), 8);
    const dataAtual = new Date();
    try {
      const usuario = await database.Usuarios.create({
        nome: nome,
        email: email,
        senha: novaSenha,
        email: telefone,
        cpf_cnpj: cpf_cnpj,
        ativo: true,
        administrador: false,
        createdAt: dataAtual,
        updatedAt: dataAtual,
      });

      if (!usuario) {
        return res.send("Houve um erro ao salvar o usuario");
      }

      return res.status(200).json(usuario);
    }
    catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = UsuarioController;