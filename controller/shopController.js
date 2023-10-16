const { Shop, Product, User } = require("../models");
const ApiError = require("../utils/apiError");

const createShop = async (req, res, next) => {
  try {
    let { name, product } = req.body;
    const userId = req.user.id;

    const productId = await Product.findOne({
      where: {
        name: product,
      },
    });

    const findUserId = await User.findOne({
      where: {
        id: userId,
      },
    });
    console.log(productId);

    if (!productId) {
      next(new ApiError("Product doesn't exist", 400));
    }

    if (findUserId.shopId !== null) {
      next(new ApiError("This user already has a shop", 400));
    } else {
      const newShop = await Shop.create({
        name,
        productId: productId.id,
        include: ["Users"],
      });
      findUserId.update({
        shopId: newShop.id,
      });
    }

    await findUserId.save();

    res.status(200).json({
      status: "Success",
      data: {
        newShop,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findShops = async (req, res, next) => {
  try {
    const Shops = await Shop.findAll({
      include: ["Users", "Product"],
    });

    res.status(200).json({
      status: "Success",
      data: {
        Shops,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findShopById = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({
      where: {
        id: req.params.id,
      },
      include: ["User", "Product"],
    });

    if (shop === null) {
      res.status(400).json({
        status: "failed",
        message: "shop doesn't exist",
      });
    }

    res.status(200).json({
      status: "Success",
      data: {
        shop,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateShop = async (req, res, next) => {
  const { name, price, stock } = req.body;
  try {
    const shop = await Shop.update(
      {
        name,
        price,
        stock,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteShop = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!shop) {
      next(new ApiError("Shop id tersebut gak ada", 404));
    }

    await Shop.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createShop,
  findShops,
  findShopById,
  updateShop,
  deleteShop,
};
