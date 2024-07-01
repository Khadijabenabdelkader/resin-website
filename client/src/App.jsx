import React, { useState, createContext } from "react";
import axios from "axios";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Contact } from './components/Contact';
import { Collection } from './components/Collection';
import { LoginRegisterMenu } from './components/dropdownmenu/LoginRegisterMenu';

export const AppContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const addToCart = async (productId) => {
    try {
      // Get all cart items
      const cartResponse = await axios.get('http://localhost:3000/api/cart');
      
      if (cartResponse.data.success) {
        const cartItems = cartResponse.data.data;
  
        // Check if the product already exists in the cart
        const existingCartItem = cartItems.find(item => item.productId._id === productId);
    
        if (existingCartItem) {
          // If the product exists in the cart, update its quantity
          const updatedCartItem = { quantity: existingCartItem.quantity + 1 };
    
          // Update the existing cart item
          const response = await axios.put(`http://localhost:3000/api/cart/${existingCartItem._id}`, updatedCartItem);
    
          if (response.data.success) {
            console.log('Quantity updated for product in cart:', response.data.data);
            return true; // Indicate success
          } else {
            console.error('Failed to update quantity in cart:', response.data.message);
            return false; // Indicate failure
          }
        } else {
          // If the product does not exist in the cart, add it
          const response = await axios.post('http://localhost:3000/api/cart/add', { productId });
    
          if (response.data.success) {
            console.log('Product added to cart:', response.data.data);
            return true; // Indicate success
          } else {
            console.error('Failed to add product to cart:', response.data.message);
            return false; // Indicate failure
          }
        }
      } else {
        console.error('Failed to get cart items:', cartResponse.data.message);
        return false; // Indicate failure
      }
    } catch (error) {
      console.error('Error adding/updating product in cart:', error);
      return false; // Indicate failure
    }
  };
  
  
  
  const handleAddToCart = async (productId) => {
    const added = await addToCart(productId);
   
  };
  

  return (
    <>
      <div>
        <AppContext.Provider value={{isLoggedIn, setIsLoggedIn, handleLogout, handleAddToCart, user, setUser}}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Collection" element={<Collection />} />
            <Route path="/Register" element={<LoginRegisterMenu />} />
            <Route path="/Login" element={<LoginRegisterMenu />} />


          </Routes>
        </Router>
        </AppContext.Provider>
        
      </div>
    </>
  );
}

export default App;