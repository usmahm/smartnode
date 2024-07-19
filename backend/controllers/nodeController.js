const { createNode } = require("../models/nodeModel");
const { checkIfValidationError } = require("../utils/customValidationResults");
const sendResponse = require("../utils/sendResponse");

const createNodeHandler = async (req, res, next) => {
  try {
    checkIfValidationError(req);

    const { name, type, group_id } = req.body;

    let createdNode = await createNode({
      name: name,
      user_id: req.user.id,
      type: type,
      group_id: group_id,
    });

    console.log(createdNode);

    sendResponse(res, 201, {
      success: true,
      message: "Node created successfully",
      data: {
        node: createdNode,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createNodeHandler,
};
