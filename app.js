const express = require("express");
let pokemons = require("./mock-pokemon");
const { success } = require("./helper");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log(`URL: ${req.url}`);
//   next();
// });

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(port, () =>
  console.log(`Serveur démarré sur http://localhost:${port}`)
);

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
