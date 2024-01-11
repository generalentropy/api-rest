const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const { success, createId } = require("../helper.js");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
let pokemons = require("../src/db/mock-pokemon.js");
const PokemonModel = require("../src/models/pokemons.js");

const app = express();
const port = 3000;

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("La connexion à la base de données a été établie avec succès");
  })
  .catch((err) => {
    console.error(err);
  });

// instance de Model (création de la table)
const Pokemon = PokemonModel(sequelize, DataTypes);

sequelize.sync({ force: true }).then(() => {
  console.log("La base de données a été synchronisée avec succès");

  //  La méthode create de Sequelize retourne une promesse qui, une fois résolue, donne l'instance de l'objet qui a été créé dans la base de données
  pokemons.map((pokemon) => {
    Pokemon.create({
      name: pokemon.name,
      hp: pokemon.hp,
      cp: pokemon.cp,
      picture: pokemon.picture,
      types: pokemon.types.join(),
    }).then((poke) => console.log(poke.toJSON()));
  });
});

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
