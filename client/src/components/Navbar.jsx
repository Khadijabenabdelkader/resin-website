import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import { LoginRegisterMenu } from './dropdownmenu/LoginRegisterMenu';
import { DropDownMenu } from './dropdownmenu/DropDownMenu';
import { DropDownCart } from './dropdownmenu/DropDownCart';

export const Navbar = () => {
  const { isLoggedIn } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const Links = [
    { name: "HOME", link: "/" },
    { name: "COLLECTIONS", link: "/Collection" },
    { name: "CONTACT", link: "/Contact" },
  ];

  const handlePersonIconClick = () => {
    if (isLoggedIn) {
      setShowMenu(!showMenu);
      setShowForm(false);
    } else {
      setShowForm(!showForm);
      setShowMenu(false);
    }
  };

  const handleCartIconClick = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
          WE AIME ART 
        </div>

        <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
          <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link to={link.link} className="text-gray-800 hover:text-gray-400 duration-500">{link.name}</Link>
            </li>
          ))}
        </ul>

        <span className="text-3xl pt-2 flex space-x-4">
          <ion-icon name="person-outline" onClick={handlePersonIconClick}></ion-icon>
          <ion-icon name="cart-outline" onClick={handleCartIconClick}></ion-icon>
        </span>
      </div>

      {isLoggedIn ? (
        showMenu && <DropDownMenu />
      ) : (
        showForm && <LoginRegisterMenu onClose={() => setShowForm(false)} />
      )}
      {showCart && <DropDownCart />}
    </div>
  );
};
