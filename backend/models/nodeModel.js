const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const Node = sequelize.define('Node', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM,
    values: ['fluid_level', 'switch'],
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  last_state_change: {
    type: DataTypes.DATE,
    allowNull: false,
    default: DataTypes.NOW,
  },
  state_duration: {
    type: DataTypes.BIGINT,
  }
})

module.exports = Node;