import React from "react";
import { RiShoppingCartLine, RiArrowDownSLine, RiArrowLeftSLine, RiArrowRightSLine, RiHomeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import products from "./products";
import Promo from "./promo";

export default function FeaturedProducts() {
  return (
    <div className="bg-gray-custom min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <p>Showing 9 results of 50 Items</p>
          <div className="text-left">
            <div className="flex text-center justify-center items-center gap-4">
              <p>Sorted by</p>
              <button
                type="button"
                className="flex justify-center border border-black shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-gray-700 hover:bg-gray-50"
                id="menu-button"
              >
                popularity
                <RiArrowDownSLine className="ml-2 text-center" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800">
            <RiHomeLine className="mr-2" />
            <span>Home</span>
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <div className="w-full flex justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-48 object-contain"
                />
              </div>
              <div className="w-full">
                <h3 className="text-base font-bold mt-4">{product.name}</h3>
                <p className="text-gray-600 text-xs">{product.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-bold">{product.price}</p>
                  <Link to="/cart">
                    <div className="bg-black text-white p-2 rounded">
                      <RiShoppingCartLine />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center mt-8">
          <RiArrowLeftSLine className="cursor-pointer mx-2" />
          <div className="flex space-x-2">
            <span className="cursor-pointer px-2 py-1 rounded bg-white hover:bg-gray-100">
              1
            </span>
            <span className="cursor-pointer px-2 py-1 rounded bg-white hover:bg-gray-100">
              2
            </span>
            <span className="cursor-pointer px-2 py-1 rounded bg-white hover:bg-gray-100">
              3
            </span>
            <span className="cursor-pointer px-2 py-1 rounded bg-white hover:bg-gray-100">
              4
            </span>
            <span className="cursor-pointer px-2 py-1 rounded bg-white hover:bg-gray-100">
              5
            </span>
            <span className="cursor-pointer px-2 py-1 rounded bg-white hover:bg-gray-100">
              ...
            </span>
            <span className="cursor-pointer px-2 py-1 rounded bg-white hover:bg-gray-100">
              16
            </span>
          </div>
          <RiArrowRightSLine className="cursor-pointer mx-2" />
        </div>

        <Promo />
      </div>
    </div>
  );
}
