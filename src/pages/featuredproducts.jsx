import React, { useState, useContext } from "react";
import { RiArrowDownSLine, RiShoppingCartLine } from "react-icons/ri";
// import { Link } from "react-router-dom";
import products from "./products";
import Promo from "./promo";
import { context } from "../context/context";

export default function FeaturedProducts() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("popularity");
  const { addToCart } = useContext(context);

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSortOption = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  const sortOptions = ["popularity", "highest price", "lowest price", "newest"];

  return (
    <div className="bg-gray-custom min-h-screen">
      <div className="container mx-auto p-4">
        {/* <div className="mb-4">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <RiHomeLine className="mr-2" />
            <span>Home</span>
          </Link>
        </div> */}
        <div className="flex justify-between items-center mb-8">
          <p>Showing 9 results of 50 Items</p>
          <div className="text-left relative">
            <div className="flex items-center gap-4">
              <p>Sorted by</p>
              <button
                type="button"
                onClick={handleDropdown}
                className="flex justify-center border border-black shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-gray-700 hover:bg-gray-50"
                id="menu-button"
              >
                {sortOption}
                <RiArrowDownSLine className="ml-2 text-center" />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 -mb-48 w-40 bg-white border left-12 border-gray-300 shadow-lg">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSortOption(option)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <div className="w-full flex justify-center transform transition duration-300 hover:scale-105 active:scale-95">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-58 lg:w-64"
                />
              </div>
              <div className="w-full lg:w-64">
                <h3 className="text-base font-bold mt-4 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs">{product.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-bold">{product.price}</p>
                  <div
                    onClick={() => addToCart(product)}
                    className="relative p-2 text-xs lg:text-sm cursor-pointer hover:bg-black hover:text-white transition-all duration-300 border border-black1 rounded"
                  >
                    <span className="hidden lg:inline">Add to cart</span>

                    <RiShoppingCartLine className="lg:hidden text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Promo />
      </div>
    </div>
  );
}
