const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequalize = require("./src/db/sequelize.js");

const app = express();
const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequalize.initDb();

app.listen(port, () =>
  console.log(`Serveur démarré sur http://localhost:${port}`)
);
