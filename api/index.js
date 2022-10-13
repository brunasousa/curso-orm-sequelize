const express = require("express");
const routes = require('./routes')

//https://github.com/alura-cursos/1862-sequelize/tree/aula-5

const app = express();
const port = 3000;

routes(app);

app.listen(port, () => console.log(`O servidor está rodando na porta ${port}`));