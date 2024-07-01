import React, { useEffect, useState, useContext  } from 'react';
import axios from 'axios';
import { AppContext } from "../../App";

export const EmptyPocket = () => {
  const { handleAddToCart  } = useContext(AppContext);
  const [emptypockets, setEmptypockets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        if (response.data.success) {
          const emptypocketProducts = response.data.data.filter(product => product.category === 'emptypocket');
          setEmptypockets(emptypocketProducts);
        } else {
          setError(response.data.message || 'Failed to fetch products');
          console.error('Failed to fetch products:', response.data.message);
        }
      } catch (error) {
        setError('Network error: Failed to fetch products');
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (emptypockets.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-wrap justify-center gap-8 p-8">
      {emptypockets.map(product => (
        <div key={product._id} className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
          <img src={product.imageUrl} alt={product.namep} className="w-full h-48 object-cover rounded-t-lg" />
          <p className="mt-4 text-center">{product.namep}</p>
          <p className="mt-4 text-center">{product.descriptionP}</p>
          <p className="mt-4 text-center">{product.price}</p>
          <div className="flex justify-center mt-4">
            <button onClick={() => handleAddToCart(product._id)}
             className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-400">
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
