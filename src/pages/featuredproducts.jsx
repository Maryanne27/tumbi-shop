import React, { useState, useContext } from 'react';
import { RiArrowDownSLine, RiArrowLeftSLine, RiArrowRightSLine, RiHomeLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import products from './products';
import Promo from './promo';
import { fadeIn } from '../variants';
import { context } from '../context/context';


const flipVariants = {
  hidden: { opacity: 0, rotateX: -90 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.6, delay: 0.2 },
  },
};

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
        <div className="mb-4">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <RiHomeLine className="mr-2" />
            <span>Home</span>
          </Link>
        </div>
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn("up", 0.2)}
          viewport={{ once: false, amount: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="flex flex-col items-center"
              variants={fadeIn("up", 0.2)}
            >
              <motion.div
                className="w-full flex justify-center"
                initial="hidden"
                animate="visible"
                variants={flipVariants}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-58 lg:w-64"
                />
              </motion.div>
              <div className="w-full lg:w-64">
                <h3 className="text-base font-bold mt-4 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs">{product.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-bold">{product.price}</p>
                  <div
                    onClick={() => addToCart(product)}
                    className="relative bg-black text-white p-2 text-xs lg:text-sm cursor-pointer"
                  >
                    Add to cart
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Pagination */}
        <div className="flex justify-center items-center mt-28">
          <RiArrowLeftSLine className="cursor-pointer mx-2" />
          <div className="flex space-x-2">
            <span className="cursor-pointer px-2 py-1 bg-white hover:bg-gray-100">
              1
            </span>
            <span className="cursor-pointer px-2 py-1 bg-white hover:bg-gray-100">
              2
            </span>
            <span className="cursor-pointer px-2 py-1 bg-white hover:bg-gray-100">
              3
            </span>
            <span className="cursor-pointer px-2 py-1 bg-white hover:bg-gray-100">
              4
            </span>
            <span className="cursor-pointer px-2 py-1 bg-white hover:bg-gray-100">
              5
            </span>
            <span className="cursor-pointer px-2 py-1 bg-white hover:bg-gray-100">
              ...
            </span>
            <span className="cursor-pointer px-2 py-1 bg-white hover:bg-gray-100">
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
