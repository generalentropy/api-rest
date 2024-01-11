// L’API Rest et la Base de données : Créer un modèle Sequelize
// https://gist.github.com/codeursenior/d8f2ac304112ea8caea93591e999ac33

// param 1 : sequalize : instance de la connexion à la base de données
// param 2 : DataTypes : types de données

// On décrit toutes les propriétés de notre modèle
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Modifie le comportement par défaut de Sequelize
      timestamps: true,
      // Automatiquement ajouté par Sequelize
      // On peut renommer la propriété createdAt (ex :"created")
      createdAt: "created",
      updatedAt: false,
    }
  );
};
