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
  .use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Bienvenue👋");
});

app.get("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const exist = pokemons.find((pokemon) => pokemon.id === id);
  console.log(exist);
  if (!exist) return res.status(404).json({ erreur: "Ressource non trouvée" });
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

app.put("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) =>
    pokemon.id !== id ? pokemon : pokemonUpdated
  );
  const message = `Le pokemon ${pokemonUpdated.name} a été modifié avec succès`;
  res.json(success(message, pokemonUpdated));
});

app.delete("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokemon ${pokemonDeleted.name} été supprimé avec succès`;
  res.json(success(message, pokemonDeleted));
});

app.listen(port, () =>
  console.log(`Serveur démarré sur http://localhost:${port}`)
);
