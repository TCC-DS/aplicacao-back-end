const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();
const port = 3333;


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


routes(app);

app.get("/", (_req, res) => {
  res.render("index")
});


app.listen(port, () => console.log(`servidor rodando na porta ${port}`));

module.exports = app;