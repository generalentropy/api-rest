const express = require("express");
let pokemons = require("./mock-pokemon");
const favicon = require("serve-favicon");
const { success, createId } = require("./helper");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use((req, res, next) => {
    console.log(`path: ${req.url}`);
    next();
  });

// Middleware
// app.use((req, res, next) => {
//   console.log(`URL: ${req.url}`);
//   next();
// });

app.get("/", (req, res) => {
  res.send("👋");
});

app.get("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const message = "Le pokemon demandé est présent dans la base";
  const pokemon = pokemons.find((poke) => poke.id === id);
  res.json(success(message, pokemon));
});

app.get("/api/pokemons", (req, res) => {
  const message =
    "Vous venez de récupérer tous les pokémons présents dans la base";
  res.json(success(message, pokemons));
});

app.post("/api/pokemons", (req, res) => {
  const id = createId(pokemons);

  const pokemonCreated = {
    ...req.body,
    id: id,
    created: new Date(),
  };
  pokemons.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} a été ajouté avec succès`;
  res.json(success(message, pokemonCreated));
});

app.listen(port, () =>
  console.log(`Serveur démarré sur http://localhost:${port}`)
);
