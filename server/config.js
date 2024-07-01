const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myappdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema, 'users');

const ContactSchema = new mongoose.Schema({
    nameC: {
        type: String,
        required: true
    },
    emailC: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', ContactSchema, 'contact');

const CustomOrderSchema = new mongoose.Schema({
    nameO: {
      type: String,
      required: true,
    },
    emailO: {
      type: String,
      required: true,
    },
    phoneO: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
});
  
const CustomOrder = mongoose.model('CustomOrder', CustomOrderSchema, 'customOrderorder');

const ProductSchema = new mongoose.Schema({
    namep: { 
        type: String, 
        required: true 
    },
    price: { 
        type: String, 
        required: true 
    },
    descriptionP: { 
        type: String 
    },
    imageUrl: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true, 
        enum:['keychain', 'bookmark', 'emptypocket', 'pack'] 
    },
  });
  
const Product= mongoose.model('Product', ProductSchema, 'products');

const CartSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true  // Corrected 'require' to 'required'
    },
    quantity: {
        type: Number,
        default: 1
    }
});


const Cart = mongoose.model('Cart', CartSchema, 'cart');

module.exports = {
    User,
    Contact,
    CustomOrder,
    Product,
    Cart
};

