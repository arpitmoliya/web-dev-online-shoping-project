const Product = require("../models/product.model");

function getCart(req, res) {
  res.render("customer/cart/cart");
}

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart updated!",
    newTotalItems: cart.totalQuantity,
  });
}

function updateCartItem(req, res) {
  const cart = res.locals.cart;

  const updateItemData = cart.updateItem(req.body.productId, req.body.quqntity);

  req.session.cart = cart;

  res.json({
    message: "Item updated!",
    updateCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updateItemPrice: updateItemData.updateItemPrice,
    },
  });
}

module.exports = {
  getCart: getCart,
  addCartItem: addCartItem,
  updateCartItem: updateCartItem,
};
