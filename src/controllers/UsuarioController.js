const database = require('../models');
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

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

  static async criaUsuario(req, res) {
    const { nome, email, telefone, cpf_cnpj, senha, confirma_senha } = req.body;
    const dataAtual = new Date();

    if (senha != confirma_senha) return res.status(500).json({ mensagem: "Senhas não conferem !" });

    const usuarioExistente = await database.Usuarios.findAndCountAll({
      where: {
        [Op.or]: { cpf_cnpj, email },
      }
    });

    if (usuarioExistente.count > 0) {
      return res.status(500).json({ mensagem: "Já existe um usuário com este email ou cnpj !" });
    }

    try {
      const usuario = await database.Usuarios.create({
        nome: nome,
        email: email,
        senha: bcrypt.hashSync(senha, 8),
        telefone: telefone,
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