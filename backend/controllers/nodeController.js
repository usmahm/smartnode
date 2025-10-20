const mqttClient = require("../config/mqttClient");
const { socketClientsNodes, io } = require("../config/socket");
const { createNode, getNodeById } = require("../models/nodeModel");
const { checkIfValidationError } = require("../utils/customValidationResults");
const sendResponse = require("../utils/sendResponse");

const activateNodeHandler = async (req, res, next) => {
  try {
    checkIfValidationError(req);

    const { name, group_id } = req.body;
    const node_id = req.params.node_id;

    const node = await getNodeById(node_id);

    if (!node) {
      const error = new Error();
      error.statusCode = 404;
      error.body = {
        success: false,
        message: "Node doen't exist",
      };

      throw error;
    } else if (node.user_id) {
      const error = new Error();
      error.statusCode = 400;
      error.body = {
        success: false,
        message: "Node already activated",
      };

      throw error;
    }

    node.set({
      name,
      group_id,
      user_id: req.user.id,
      last_state_change: new Date(),
    });

    await node.save();

    sendResponse(res, 201, {
      success: true,
      message: "Node activated successfully",
      data: {
        node,
      },
    });
  } catch (err) {
    // // console.log(err);
    next(err);
  }
};

const changeNodeStateHandler = async (req, res, next) => {
  try {
    checkIfValidationError(req);

    const node_id = req.params.node_id;
    const { state, duration } = req.body;

    if (state) {
      const node = await getNodeById(node_id);

      if (!node) {
        const error = new Error();
        error.statusCode = 404;
        error.body = {
          success: false,
          message: "Node doen't exist",
        };

        throw error;
      } else if (!node.user_id) {
        const error = new Error();
        error.statusCode = 404;
        error.body = {
          success: false,
          message: "Node not activated",
        };

        throw error;
      }

      node.set({
        state: state,
        duration: duration,
      });

      await node.save();

      // mqttClient.publish(
      //   `${process.env.MQTT_SWITCH_SUB_TOPIC}/${node_id}`,
      //   state
      // );

      // check if node is online and send new state, else, send error
      if (!(node_id in socketClientsNodes)) {
        const error = new Error();
        error.statusCode = 400;
        error.body = {
          success: false,
          message: "Node not online",
        };

        throw error;
      }

      io.to(node_id).emit("state", { state });

      sendResponse(res, 200, {
        success: true,
        message: "Node state changed successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

const getNodeState = async (req, res, next) => {
  try {
    const node_id = req.params.node_id;

    const node = await getNodeById(node_id);

    if (node) {
      const error = new Error();
      error.statusCode = 404;
      error.body = {
        success: false,
        message: "Node doen't exist",
      };

      throw error;
    }

    sendResponse(res, 200, {
      success: true,
      message: "Group fetched successfully",
      data: {
        state: node.state,
      },
    });
  } catch (err) {
    console.log("ERR", err);
    next(err);
  }
};

module.exports = {
  activateNodeHandler,
  changeNodeStateHandler,
  getNodeState,
};
