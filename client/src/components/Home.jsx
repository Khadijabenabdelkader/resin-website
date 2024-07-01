import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import img1 from './../../public/assets/img1.jpg';
import img2 from './../../public/assets/img2.jpg';
import img4 from './../../public/assets/img4.jpg';
import { FaRegCopyright } from "react-icons/fa";

export const Home = () => {
  const [formData, setFormData] = useState({
    nameO: '',
    emailO: '',
    phoneO: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:3000', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        console.log( response );
        window.location.reload();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    }
  };

  return (
    <>
      <Navbar />
      <header className='w-full h-screen pt-11'>
        <img src={img1} className="object-cover w-full h-full" />
      </header>
      <section className="flex flex-col items-center">
        <div className="flex flex-row items-center justify-center text-center px-4 pt-7 pr-9 pl-5">
          <div className="flex flex-col items-center">
            <p className="mb-4 ml-4 pl-28 pr-28">
              We Aime Art by Wiem is where passion meets perfection through 
              the intricate beauty of resin art. Each piece, from keychains 
              and bookmarks to catchall trays, is handcrafted with meticulous 
              care, making every item a unique masterpiece. Our creations are
              perfect for those seeking distinctive, homemade gift ideas that
              blend artistry and functionality.
            </p>
            <span className="text-pink-300 ml-12 pl-40 pr-40">
              At We Love Art by Wiem, we believe that every piece tells 
              a story and adds a touch of elegance and individuality to your life.
            </span>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={img2}
              className="w-full h-full pr-42 rounded-full object-cover"
              alt="Resin Art"
            />
          </div>
        </div>
        <div className='bg-biege mt-7 w-full flex justify-center items-center h-screen'>
          <div className='flex justify-between w-full'>
            <div className='w-1/2 px-4 text-center mx-16 pt-7 text-2xl'>
              <p>
                If you're looking to make someone's day extra special, whether it's your friend,
                dad, mom, sister, boyfriend, brother, or anyone dear to you, we've got you covered!
                At We Aime Art by Wiem.
              </p>
              <p className='text-red-300 bg-biege'>
                Contact us today to order your personalized gift 
                and make any occasion truly unforgettable!
              </p>
            </div>
            <div className='w-1/2 px-4'>
              <form onSubmit={handleSubmit} className='flex flex-col'>
                <input
                  type='text'
                  name='nameO'
                  required
                  placeholder='Your Name'
                  value={formData.nameO}
                  onChange={handleChange}
                  className='mb-4 px-4 py-2 border rounded'
                />
                <input
                  type='email'
                  name='emailO'
                  required
                  placeholder='Your Email'
                  value={formData.emailO}
                  onChange={handleChange}
                  className='mb-4 px-4 py-2 border rounded'
                />
                <input
                  type='tel'
                  name='phoneO'
                  required
                  placeholder='Your Phone'
                  value={formData.phoneO}
                  onChange={handleChange}
                  className='mb-4 px-4 py-2 border rounded'
                />
                <input
                  type='text'
                  name='description'
                  required
                  placeholder='Description of the item'
                  value={formData.description}
                  onChange={handleChange}
                  className='mb-4 px-4 py-2 border rounded'
                />
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='mb-4 px-4 py-2 border rounded'
                />
                <button className='bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-400'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='relative w-full h-screen'>
          <img src={img4} className="object-cover w-full h-full pb-2" alt="Resin Art" />
          <div className='absolute text-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <h1 className="text-black font-bold mb-4">Multiple Choices of Elements Made of Resin</h1>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-16">
            <Link to="/Collection">
              <button className="bg-white text-black px-10 py-2 rounded shadow hover:bg-gray-400">
                Voir Collections
              </button>
            </Link>
          </div>
        </div>
        <div className='mb-7 pt-7 relative w-full py-11 flex flex-row justify-between'>
          <div className='px-11'>
            <h1 className='text-2xl ml-12'>We Aime Art By Wiem</h1>
            <p className='px-9 mx-6'>
              The process involves combining clear or colored resin with various inclusions like 
              dried flowers, glitter, or pigments, resulting in stunning, one-of-a-kind creations. 
              Whether it's jewelry, home decor, or functional art, our resin pieces offer both beauty 
              and durability. Making every piece not just a product, but a cherished work of art.
            </p>
          </div>
          <div className='pt-3 flex flex-col px-9 mx-11'>
            <h1 className='text-2xl'>Pages</h1>
            <h3>Home</h3>
            <h3>Collections</h3>
            <h3>Contact</h3>
          </div>
          <div className='pt-3 flex flex-col mx-11'>
            <h1 className='text-2xl'>Contact info</h1>
            <h3>Jemmel, Monastir, Tunisia</h3>
            <h3>weaimeart@gmail.com</h3>
            <h3>23588722</h3>
          </div>
        </div>
      </section>
      <footer className='fixed bottom-0 left-0 w-full bg-white flex items-center justify-between py-2 px-4'>
        <div className='flex-shrink-0'>
          <a href="https://www.instagram.com/we_aime_art_by_wiem/?hl=fr" target="_blank" rel="noopener noreferrer" className="text-gray-700">
            <ion-icon name="logo-instagram" size=""></ion-icon>
          </a>
        </div>
        <div className="flex items-center justify-center flex-grow text-gray-700">
          <span>
            2024 <FaRegCopyright className="inline mx-1" /> We Aime Art. All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};
