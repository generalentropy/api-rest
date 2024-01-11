/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemons");
const pokemons = require("./mock-pokemon");

const sequelize = new Sequelize("pokedex", "root", "azerty", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    useUTC: false,
  },
  timezone: "Europe/Paris",
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join(),
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });
    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
};
