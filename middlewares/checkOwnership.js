const { Shop } = require("../models");
const ApiError = require("../utils/apiError");

const checkOwnership = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (!shop) {
      next(new ApiError("you don't own a shop", 400));
    }
    next();
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = checkOwnership;
