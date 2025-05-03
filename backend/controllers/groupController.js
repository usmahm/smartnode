const {
  createGroup,
  findGroupById,
  getAllUserGroups,
} = require("../models/groupModel");
const { checkIfValidationError } = require("../utils/customValidationResults");
const sendResponse = require("../utils/sendResponse");

const createGroupHandler = async (req, res, next) => {
  try {
    checkIfValidationError(req);

    console.log(req.body);
    const createdGroup = await createGroup({
      name: req.body.name,
      user_id: req.user.id,
    });

    createdGroupJSON = createdGroup.toJSON();

    createdGroupJSON.nodes = [];
    console.log(createdGroupJSON);
    sendResponse(res, 201, {
      success: true,
      message: "Group created successfully",
      data: {
        group: createdGroupJSON,
      },
    });
  } catch (err) {
    console.log("EEHEHE");
    next(err);
  }
};

const getAllUserGroupsHandler = async (req, res, next) => {
  try {
    const groups = await getAllUserGroups(req.user.id);

    sendResponse(res, 200, {
      success: true,
      message: "Group fetched successfully",
      data: {
        groups: groups,
      },
    });
  } catch (err) {
    console.log("ERR", err);
    next(err);
  }
};

module.exports = {
  createGroupHandler,
  getAllUserGroupsHandler,
};
