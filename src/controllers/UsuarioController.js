const database = require('../models');

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
}

module.exports = UsuarioController;