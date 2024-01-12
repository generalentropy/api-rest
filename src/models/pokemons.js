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
        validate: {
          notNull: { msg: `Le pokemon doit avoir un nom` },
          notEmpty: {
            msg: `La propriété ne peut pas être une chaîne de caractère vide`,
          },
        },
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
          max: {
            args: [999],
            msg: "Value must be less than or equal to 999",
          },
          min: {
            // https://github.com/sequelize/sequelize/issues/7815
            args: [0],
            msg: "Value must be 0 or greater",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: `Utilisez uniquement un nombre entier pour les points de dégats`,
          },
          notNull: {
            msg: `Les points de dégats sont une propriété obligatoire`,
          },
          notEmpty: { msg: `Ne peut pas etre une chaine vide` },
          max: {
            args: [99],
            msg: "Value must be less than or equal to 99",
          },
          min: {
            // https://github.com/sequelize/sequelize/issues/7815
            args: [0],
            msg: "Value must be 0 or greater",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `La propriété ne doit pas être null` },
          isUrl: {
            msg: `La propriété doit être une URL valide`,
          },
        },
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
        isTypesValid(value) {
          if (!value) {
            throw new Error(`La propriété doit avoir au moins un type`);
          }
          if (value.split(",").length > 3) {
            throw new Error(`Un pokemon ne peut avoir plus de 3 types`);
          }
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
