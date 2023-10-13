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
      next(new ApiError("you don't own a shop", 401));
    }
    next();
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const checkShopOwner = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (shop.userId !== req.user.id) {
      next(new ApiError(`you're not ${shop.name}'s owner`, 401));
    }
    next();
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = { checkOwnership, checkShopOwner };
