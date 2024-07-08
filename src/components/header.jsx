import React, { useState } from "react";
import {
  RiSearchLine,
  RiShoppingCartLine,
  RiCloseLine,
  RiHomeLine,
  RiMenu4Fill,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-black text-white px-7 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <div className="flex flex-col text-center">
          <h1 className="text-md font-bold">TIMBU</h1>
          <span className="text-md">cloud shop</span>
        </div>
        <div className="hidden md:flex space-x-6 text-sm">
          <ul className="flex space-x-6">
            <NavLink to="/">Store Front</NavLink>
            {/* <NavLink to="/about">About Us</NavLink> */}
          </ul>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="md:hidden inline-flex items-center bg-white p-2 text-black1">
          <RiSearchLine size={24} />
        </button>
        <button
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center bg-white text-black1 p-2"
        >
          {menuOpen ? <RiCloseLine size={24} /> : <RiMenu4Fill size={24} />}
        </button>
        <div className="hidden md:flex items-center space-x-4">
          <div className="bg-white text-gray-400 p-1 flex items-center ">
            <RiSearchLine size={20} />
            <input
              type="text"
              placeholder="search"
              className="bg-transparent border-none outline-none px-2 text-black"
            />
          </div>
          {/* <NavLink to="/user" className="bg-white text-black p-2 ">
            <RiUserLine />
          </NavLink> */}
          <NavLink to="/cart" className="bg-white text-black p-2 ">
            <RiShoppingCartLine />
          </NavLink>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full h-40 bg-white text-black flex flex-col items-start p-4 md:hidden">
          <ul className="flex flex-col space-y-4 text-sm w-full">
            
            <li className="flex items-center space-x-2">
              <RiShoppingCartLine />
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li className="flex items-center space-x-2">
              <RiHomeLine />
              <NavLink to="/">Storefront</NavLink>
            </li>
            <li className="flex items-center space-x-2">
              <RiSearchLine />
              <span>Search</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
