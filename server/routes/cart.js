const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
// Add product to cart
router.post('/add', cartController.addToCart);

// Get all cart items
router.get('/', cartController.getCartItems);

router.put('/:id', cartController.updateCartItem);

// Remove item from cart
router.delete('/:id', cartController.removeFromCart);


module.exports = router;
