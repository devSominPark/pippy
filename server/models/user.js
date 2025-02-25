const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      year: DataTypes.STRING,
      month: DataTypes.STRING,
      day: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    },
  );
  return users;
};
