import React, { useState, useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  RiArrowDownSLine,
  RiShoppingCartLine,
  RiAddLine,
  RiSubtractLine,
  RiErrorWarningFill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import Promo from "./promo";
import { context } from "../context/context";

export default function Products() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("popularity");
  const { addToCart, cart, incrementQuantity, decrementQuantity, searchQuery } =
    useContext(context);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [message, setMessage] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  const fetchProducts = async ({ queryKey }) => {
    const [, page] = queryKey;
    const response = await axios.get("api/products", {
      params: {
        organization_id: "7b59152ffec240b3816027d241f05c93",
        Appid: "OAX7IL8QDFZH0VY",
        Apikey: "72eda6187cbb4106b975e9d2d616073420240712142534062960",
        page: page,
        size: productsPerPage,
      },
    });
    setTotalItems(response.data.total);
    return response.data.items;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data, Refresh Page</div>;

  const totalPages = Math.ceil(totalItems / productsPerPage);

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSortOption = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage("Item added to cart");
    setTimeout(() => setMessage(""), 2000);
  };

  const sortOptions = ["popularity", "highest price", "lowest price", "newest"];

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startCount = (currentPage - 1) * productsPerPage + 1;
  const endCount = Math.min(startCount + data.length - 1, totalItems);

  const filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-custom min-h-screen">
      <div className="container mx-auto p-4">
        {message && (
          <div className="flex mb-4 p-2 bg-lightblue text-darkblue text-center justify-center items-center gap-2 text-nowrap whitespace-nowrap">
            <RiErrorWarningFill className="mr-2 flex justify-center items-center" />
            <span>{message}</span>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <p>
            Showing 
            <b className="font-bold"> {endCount}</b> of{" "}
            <b className="font-bold">{totalItems}</b> Items
          </p>
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
                <div className="absolute z-10 w-40 bg-white border left-12 border-gray-300 shadow-lg">
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

        <h2 className="text-2xl font-bold pb-5">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            return (
              <div
                key={product.unique_id}
                className="flex flex-col items-center"
              >
                <div className="w-full flex justify-center transform transition duration-300 hover:scale-105 active:scale-95">
                  <img
                    src={`https://api.timbu.cloud/images/${product.photos[0]?.url}`}
                    alt={product.name}
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-full">
                  <h3 className="text-base font-bold mt-4 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold">
                      ₦{product?.current_price[0]?.NGN || '₦150'}
                    </p>
                    <div className="flex items-center">
                      {cartItem ? (
                        <div className="flex items-center bg-white">
                          <button onClick={() => decrementQuantity(product.id)}>
                            <RiSubtractLine className="text-2xl" />
                          </button>
                          <span className="px-2">{cartItem.quantity}</span>
                          <button onClick={() => incrementQuantity(product.id)}>
                            <RiAddLine className="text-xl" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="relative p-2 text-xs lg:text-sm cursor-pointer hover:bg-black hover:text-white transition-all duration-300 border border-black rounded"
                        >
                          <span className="hidden lg:inline">Add to cart</span>
                          <RiShoppingCartLine className="lg:hidden text-2xl" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2"
          >
            <RiArrowLeftSLine />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-3 py-1  ${currentPage === i + 1
                ? "bg-gray-300"
                : "bg-white hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-2"
          >
            <RiArrowRightSLine />
          </button>
        </div>

        <Promo />
      </div>
    </div>
  );
}
