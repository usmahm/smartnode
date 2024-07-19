const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const { Node } = require("./nodeModel");

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
  as: "nodes",
});

Node.belongsTo(Group, {
  foreignKey: "group_id",
  as: "group",
});

const createGroup = async ({ name, user_id }) => {
  return Group.create({
    name: name,
    user_id: user_id,
  });
};

const getAllUserGroups = async (user_id) => {
  return Group.findAll({
    where: {
      user_id: user_id,
    },
    include: {
      model: Node,
      as: "nodes",
    },
  });
};

const findGroupById = async (group_id) => {
  return Group.findByPk(group_id, {
    include: {
      model: Node,
      as: "nodes",
    },
  });
};

module.exports = {
  Group,
  getAllUserGroups,
  createGroup,
  findGroupById,
};
