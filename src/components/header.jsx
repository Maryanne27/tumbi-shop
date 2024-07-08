import React, { useContext, useState } from "react";
import {
  RiSearchLine,
  RiShoppingCartLine,
  RiCloseLine,
  RiHomeLine,
  RiMenu4Fill,
  RiUser2Line,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { context } from "../context/context";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartQuantity } = useContext(context);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <div
        className={`bg-black text-white px-7 py-4 flex justify-between items-center transition-transform duration-300 ${
          menuOpen ? "transform -translate-y-full" : ""
        }`}
      >
        <div className="flex items-center space-x-8">
          <div className="flex flex-col text-center">
            <h1 className="text-md font-bold">TIMBU</h1>
            <span className="text-md">cloud shop</span>
          </div>
          <div className="hidden md:flex space-x-6 text-sm">
            <ul className="flex space-x-6">
              <NavLink to="/">Store Front</NavLink>
            </ul>
          </div>
        </div>

        <div className="flex items-center space-x-4 relative">
          <button className="md:hidden inline-flex items-center bg-white p-2 text-black1 relative">
            <NavLink to="/cart">
              <RiShoppingCartLine size={24} />
              {cartQuantity > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                  {cartQuantity}
                </span>
              )}
            </NavLink>
          </button>
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center bg-white text-black1 p-2"
          >
            {menuOpen ? <RiCloseLine size={24} /> : <RiMenu4Fill size={24} />}
          </button>
          <div className="hidden md:flex items-center space-x-4 relative">
            <div className="bg-white text-gray-400 p-1 flex items-center ">
              <RiSearchLine size={20} />
              <input
                type="text"
                placeholder="search"
                className="bg-transparent border-none outline-none px-2 text-black"
              />
            </div>
            <NavLink to="/cart" className="bg-white text-black p-2 relative">
              <RiShoppingCartLine />
              {cartQuantity > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                  {cartQuantity}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-fit bg-white text-black flex flex-col items-start p-4 z-50 transition-transform duration-300 b-6">
          <div className="w-full flex justify-between items-center border-b pb-2 mb-4">
            <h1 className="text-lg font-bold">TIMBU</h1>
            <button onClick={toggleMenu} className="p-2">
              <RiCloseLine size={24} />
            </button>
          </div>
          <ul className="flex flex-col space-y-4 text-sm w-full">
            <li className="flex items-center space-x-2">
              <RiUser2Line />
              <span>Your Account</span>
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
