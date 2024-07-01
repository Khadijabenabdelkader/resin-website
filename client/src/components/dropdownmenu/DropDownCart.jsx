import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const DropDownCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cart');
        if (response.data.success) {
          setCartItems(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch cart items');
        }
      } catch (error) {
        setError('Network error: Failed to fetch cart items');
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/cart/${itemId}`);
      if (response.data.success) {
        setCartItems(cartItems.filter(item => item._id !== itemId));
        console.log('Item deleted successfully');
      } else {
        console.error('Failed to delete item:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

 
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow-lg z-50">
      <div className="bg-white shadow-lg rounded-lg p-4">
        {cartItems.length === 0 ? (
          <div>
            <div className="text-center text-gray-500">Cart is empty</div>
            <div className="flex justify-center mt-6">
              <Link to="/Collection" className="hover:underline">
                <button className="bg-gray-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
                  Return to shop
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item._id} className="cart-item flex items-center py-2 border-b border-gray-200">
                <img src={item.productId.imageUrl} alt={item.productId.nameP} className="w-16 h-16 rounded-md object-cover" />
                <div className="product-details ml-4">
                  <p className="product-name text-gray-700 font-semibold">{item.productId.nameP}</p>
                  <p className="product-price text-gray-500">${item.productId.price}</p>
                  <p className="product-quantity text-gray-500">Quantity: {item.quantity}</p>
                  <button className='bg-gray-700 hover:bg-gray-400 text-white font-normal py-2 px-4 rounded'
                    onClick={() => deleteItem(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-6">
              <button className="bg-gray-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
                Command
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
