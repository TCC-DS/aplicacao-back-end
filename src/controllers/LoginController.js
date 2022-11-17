const database = require('../models');
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

class LoginController {

  static index(_req, res) {
    res.render("login");
  }

  static async realizaLogin(req, res) {
    const { email, senha } = req.body;

    const usuario = await database.Usuarios.findOne({
      where: {
        email,
      },
    });

    if (!usuario) {
      return res.status(401).json({ mensagem: `usuário ou senha invalidos` });
    }
    const resultado = bcrypt.compareSync(senha, usuario.senha);

    if (!resultado) {
      return res.status(401).json({ mensagem: `usuário ou senha invalidos` });
    }

    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      admin: usuario.administrador,
    };

    console.log(req.session.usuario);

    return res.status(200).json({ mensagem: `usuário autenticado` });
  }
};

module.exports = LoginController;