const { Shop } = require("../models");
const ApiError = require("../utils/apiError");

const checkShopOwner = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (shop.id !== req.user.shopId) {
      next(new ApiError(`you're not ${shop.name}'s owner`, 401));
    }
    next();
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = { checkShopOwner };
