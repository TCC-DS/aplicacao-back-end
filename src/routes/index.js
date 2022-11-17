const bodyParser = require('body-parser');
const usuarios = require('./usuariosRoute');
const logger = require("morgan");
const express = require("express");
const uuid = require('uuid').v4
const session = require("express-session");
const FileStore = require('session-file-store')(session);
const cookieParser = require("cookie-parser");


module.exports = app => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({
    genid: (req) => {
      console.log('Inside the session middleware')
      console.log(req.sessionID)
      return uuid() // use UUIDs for session IDs
    },
    store: new FileStore({
      path: "./src/sessions"
    }),
    secret: "mN3.vT2*dX",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: (1000 * 60 * 100)
    }
  }));
  app.use(usuarios);
  app.use(function (req, res, next) {
    res.render("error404", { url: req.url });
  });
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
  });

}