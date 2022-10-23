const database = require('../models');
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

class LoginController {

  static index(_req, res) {
    res.render("login");
  }

  static realizaLogin(req, res) {

  }

};

module.exports = LoginController;