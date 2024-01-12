// L’API Rest et la Base de données : Créer un modèle Sequelize
// https://gist.github.com/codeursenior/d8f2ac304112ea8caea93591e999ac33

// param 1 : sequalize : instance de la connexion à la base de données
// param 2 : DataTypes : types de données

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/

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
        validate: {
          isInt: {
            msg: `Utilisez uniquement un nombre entier pour les points de vie`,
          },
          notNull: { msg: `Les points de vie sont une propriété obligatoire` },
          notEmpty: { msg: `Ne peut pas etre une chaine vide` },
        },
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
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
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
