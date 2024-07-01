const { Cart } = require('../config');
const { ObjectId } = require('mongoose').Types;

 
exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    let cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      // Update quantity if product exists
      cartItem.quantity += 1;
      await cartItem.save();
      res.status(200).json({ success: true, data: cartItem });
    } else {
      // Add new product to cart
      cartItem = new Cart({ productId, quantity: 1 });
      await cartItem.save();
      res.status(201).json({ success: true, data: cartItem });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('productId');
        res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ObjectId' });
    }

    const cartItem = await Cart.findByIdAndDelete(id);

    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ success: false, message: 'Server error: Unable to delete item' });
  }
};


exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid item ID' });
    }

    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be greater than zero' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    
    res.status(200).json({ success: true, data: cartItem });
  } catch (error) {
    console.error('Error updating cart item:', error); // Log the error
    res.status(500).json({ success: false, message: 'Server error' });
  }
};