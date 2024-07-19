const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/dbConnection");
const { Node } = require("./nodeModel");
const { Group } = require("./groupModel");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;
      },
    },
  }
);

User.hasMany(Node, {
  foreignKey: "user_id",
  as: "nodes",
});
Node.belongsTo(User, {
  foreignKey: "user_id",
  as: "creator",
});

User.hasMany(Group, {
  foreignKey: "user_id",
  as: "groups",
});
Group.belongsTo(User, {
  foreignKey: "user_id",
  as: "creator",
});

const createUser = async ({ first_name, last_name, password, email }) => {
  return User.create({
    first_name: first_name,
    last_name: last_name,
    password: password,
    email: email,
  });
};

const findUserById = async (userId, attributes_to_include) => {
  return User.findByPk(userId, {
    attributes: attributes_to_include,
  });
};

const findUserByEmail = async (email, attributes_to_include) => {
  return User.findOne({
    where: { email: email },
    attributes: attributes_to_include,
  });
};

module.exports = {
  User,
  createUser,
  findUserById,
  findUserByEmail,
};
