const {
  createNode,
  getAllNodesByUser,
  getAllNotActivatedNodes,
  getAllNodes,
  getNodeById,
} = require("../models/nodeModel");
const { getAllUsers } = require("../models/userModel");
const { checkIfValidationError } = require("../utils/customValidationResults");
const sendResponse = require("../utils/sendResponse");
const { ADMIN_IDS } = require("../utils/constants");

const createNodeHandler = async (req, res, next) => {
  try {
    checkIfValidationError(req);

    const { type } = req.body;

    let createdNode = await createNode({
      type,
    });

    sendResponse(res, 201, {
      success: true,
      message: "Node created successfully",
      data: {
        node: {
          id: createdNode.id,
          type: createdNode.type,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const resetNodeHandler = async (req, res, next) => {
  try {
    checkIfValidationError(req);

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
    }

    node.set({
      name: null,
      group_id: null,
      user_id: null,
      last_state_change: null,
    });

    await node.save();

    sendResponse(res, 200, {
      success: true,
      message: "Node reset successfully",
    });
  } catch (err) {
    next(err);
  }
};

const getNodesHandler = async (req, res, next) => {
  try {
    const user_id = req.query.user_id;
    const not_activated = req.query.not_activated;

    let nodes;
    if (user_id) {
      nodes = await getAllNodesByUser(user_id, ["id", "name"]);

      // console.log(nodes);
      // if (!nodes) {
      //   const error = new Error();
      //   error.statusCode = 404;
      //   error.body = {
      //     success: false,
      //     message: "User doen't exist",
      //   };

      //   throw error;
      // }
    } else if (not_activated) {
      nodes = await getAllNotActivatedNodes(["id", "name"]);
    } else {
      nodes = await getAllNodes(["id", "name"]);
    }

    sendResponse(res, 200, {
      success: true,
      message: "Nodes fetched successfully",
      data: {
        nodes,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUsersHandler = async (req, res, next) => {
  try {
    let users = await getAllUsers(["id", "first_name", "last_name"]);

    sendResponse(res, 200, {
      success: true,
      message: "Users fetched successfully",
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getAdminIDsHandler = async (req, res, next) => {
  try {
    sendResponse(res, 200, {
      success: true,
      message: "Admin IDs fetched successfully",
      data: {
        admins: ADMIN_IDS,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNodeHandler,
  getUsersHandler,
  getNodesHandler,
  resetNodeHandler,
  getAdminIDsHandler,
};
