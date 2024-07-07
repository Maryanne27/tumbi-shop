import React, { useState } from 'react';
import { BsSearch, BsPerson } from 'react-icons/bs';
import { CgShoppingCart } from 'react-icons/cg';
import { FiMenu, FiX } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-black text-white px-7 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold">TIMBU</h1>
        <div className="hidden md:flex space-x-4 text-sm">
          <ul className="flex space-x-4">
            <NavLink>Store Front</NavLink>
            <NavLink>About Us</NavLink>
            <NavLink>Connect with us</NavLink>
          </ul>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={toggleMenu} className="md:hidden">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <BsSearch size={20} className="md:hidden" />
        <div className="hidden md:flex items-center space-x-4">
          <div className="bg-white text-gray-400 p-1 flex items-center">
            <BsSearch size={20} />
            <input
              type="text"
              placeholder="search"
              className="bg-transparent border-none outline-none px-2"
            />
          </div>
          <NavLink to='user' className="bg-white text-black p-2 rounded">
            <BsPerson />
          </NavLink>
          <NavLink to='cart' className="bg-white text-black p-2 rounded">
            <CgShoppingCart />
          </NavLink>
          {/* <NavLink to='/' className="bg-white text-black p-2 rounded">
            <AiOutlineHome />
          </NavLink> */}
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center md:hidden">
          <ul className="flex flex-col space-y-4 text-sm p-4">
            <li className="flex items-center space-x-2">
              <BsPerson />
              <span>User</span>
            </li>
            <li className="flex items-center space-x-2">
              <CgShoppingCart />
              <span>Cart</span>
            </li>
            <li className="flex items-center space-x-2">
              <AiOutlineHome />
              <span>Storefront</span>
            </li>
            <li className="flex items-center space-x-2">
              <BsSearch />
              <span>Search</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
