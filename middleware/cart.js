const Cart = require("../models/cart.model");

function initializeCart(req, res, next) {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const cartSession = req.session.cart;
    cart = new Cart(
      cartSession.items,
      cartSession.totalQuantity,
      cartSession.totalPrice
    );
  }

  res.locals.cart = cart;

  next();
}

module.exports = initializeCart;
