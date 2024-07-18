const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const Node = require("./nodeModel");
const Group = require("./groupNode");

const User = sequelize.define("User", {
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
});

User.hasMany(Node, {
  foreignKey: "user_id",
});
Node.belongsTo(User, {
  foreignKey: "group_id",
});

User.hasMany(Group, {
  foreignKey: "user_id",
});
Group.belongsTo(User, {
  foreignKey: "group_id",
});

const createUser = async ({ first_name, last_name, password, email }) => {
  return User.create({
    first_name: first_name,
    last_name: last_name,
    password: password,
    email: email,
  });
};

const findUserById = async (userId, attributesToInclude) => {
  return User.findByPk(userId, {
    attributes: attributesToInclude,
  });
};

const findUserByEmail = async (email, attributesToInclude) => {
  return User.findOne({
    where: { email: email },
    attributes: attributesToInclude,
  });
};

module.exports = {
  User,
  createUser,
  findUserById,
  findUserByEmail,
};
