const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize.js");

const app = express();
const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

// Points de terminaison
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemons")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);

// Erreurs 404
app.use((req, res) => {
  const message = `La ressource demandée n'existe pas : ${req.url}`;
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(`Serveur démarré sur http://localhost:${port}`)
);
