const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const { NODE_TYPES, NODE_STATES } = require("../utils/constants");

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
      // allowNull: false,
    },
    ip_address: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: NODE_TYPES,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM,
      values: NODE_STATES,
    },
    last_state_change: {
      type: DataTypes.DATE,
      // allowNull: false,
      // default: DataTypes.NOW,
    },
    state_duration: {
      type: DataTypes.BIGINT,
    },
  },
  {
    hooks: {
      beforeCreate: async (node) => {
        if (node.state === undefined) {
          node.state = "0";
        }
        // if (!node.last_state_change) {
        //   node.last_state_change = new Date();
        // }
      },
    },
  }
);

const createNode = async ({ type }) => {
  return Node.create({
    type: type,
  });
};

// const activateNode = async ({ name, user_id, type, group_id }) => {
//   return Node.create({
//     name: name,
//     type: type,
//     user_id: user_id,
//     group_id: group_id,
//   });
// };

const getNodeById = async (node_id) => {
  return Node.findByPk(node_id);
};

const getAllNodes = async (attributes_to_include) => {
  return Node.findAll({
    attributes: attributes_to_include,
  });
};

const getAllNodesByUser = async (user_id, attributes_to_include) => {
  return Node.findAll({
    where: {
      user_id: user_id,
    },
    attributes: attributes_to_include,
  });
};

const getAllNotActivatedNodes = async (attributes_to_include) => {
  return Node.findAll({
    where: {
      user_id: null,
    },
    attributes: attributes_to_include,
  });
};

module.exports = {
  Node,
  createNode,
  getNodeById,
  getAllNodes,
  getAllNodesByUser,
  getAllNotActivatedNodes,
};
