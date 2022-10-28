const bodyParser = require('body-parser');
const usuarios = require('./usuariosRoute');
const logger = require("morgan");
const express = require("express");

module.exports = app => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(usuarios);
}