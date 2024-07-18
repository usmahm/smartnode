const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const NodeTypes = require("../utils/constants");

const Node = sequelize.define(
  "Node",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ip_address: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: NodeTypes,
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      // allowNull: false,
      defaultValue: false,
    },
    last_state_change: {
      type: DataTypes.DATE,
      // allowNull: false,
      default: DataTypes.NOW,
    },
    state_duration: {
      type: DataTypes.BIGINT,
    },
  },
  {
    hooks: {
      beforeCreate: async (node) => {
        if (node.state === undefined) {
          node.state = false;
        }
        if (!node.last_state_change) {
          node.last_state_change = new Date();
        }
      },
    },
  }
);

const createNode = async ({ name, user_id, type, group_id }) => {
  return Node.create({
    name: name,
    type: type,
    user_id: user_id,
    group_id: group_id,
  });
};

const getNodeById = async (node_id) => {
  return Node.findByPk(node_id);
};

module.exports = {
  Node,
  createNode,
  getNodeById,
};
