const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const Node = require("./nodeModel");

const Group = sequelize.define("Group", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Group.hasMany(Node, {
  foreignKey: "group_id",
});
Node.belongsTo(Group, {
  foreignKey: "group_id",
});

module.exports = Group;
