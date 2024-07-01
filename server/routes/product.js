const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  newProduct,
  getSingleProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

router.route('/products').get(getProducts);
router.route('/products/new').post(newProduct);
router.route('/products/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct);


module.exports = router;
