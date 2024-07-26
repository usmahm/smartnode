const { createNode, getNodeById } = require("../models/nodeModel");
const { checkIfValidationError } = require("../utils/customValidationResults");
const sendResponse = require("../utils/sendResponse");

const activateNodeHandler = async (req, res, next) => {
  try {
    checkIfValidationError(req);

    const { name, group_id } = req.body;
    const node_id = req.params.node_id;

    const node = await getNodeById(node_id);
    console.log(node);

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

    console.log("node", node);

    sendResponse(res, 201, {
      success: true,
      message: "Node activated successfully",
      data: {
        node,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  activateNodeHandler,
};
