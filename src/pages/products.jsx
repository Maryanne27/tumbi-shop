import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  RiArrowDownSLine,
  RiShoppingCartLine,
  RiErrorWarningFill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import Promo from "./promo";
import { context } from "../context/context";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price);
};

export default function Products() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("popularity");
  const { addToCart, cart, searchQuery } = useContext(context);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [message, setMessage] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  const fetchProducts = async ({ queryKey }) => {
    const [, page] = queryKey;
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/`, {
      params: {
        organization_id: process.env.REACT_APP_ORG_ID,
        Appid: process.env.REACT_APP_APPID,
        Apikey: process.env.REACT_APP_APIKEY,
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-white z-50">
        <div className="text-center mt-5">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-white z-50">
        <div className="text-center flex justify-center items-center flex-col">
          <RiErrorWarningFill className="text-4xl lg:text-6xl text-red-500 mb-4 flex" />
          <p className="text-lg font-semibold">Error loading data</p>
        </div>
      </div>
    );
  }

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
  const endCount = Math.min(startCount + data?.length - 1, totalItems);

  const filteredProducts = data?.filter((product) =>
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
          <p className="text-nowrap lg:text-base text-xs">
            Showing <b className="font-bold"> {endCount}</b> of{" "}
            <b className="font-bold">{totalItems}</b> Items
          </p>
          <div className="text-left relative">
            <div className="flex items-center gap-4">
              <p className="text-nowrap lg:text-base text-xs">Sorted by</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            return (
              <div
                key={product.unique_id}
                className="flex flex-col items-center"
              >
                <div
                  className="w-full flex justify-center transform transition duration-300 hover:scale-105 active:scale-95"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <img
                    src={`https://api.timbu.cloud/images/${
                      product.photos[0]?.url || ""
                    }`}
                    alt={product.name}
                    className="w-40 h-52 md:w-72 md:h-80"
                  />
                </div>
                <div className="w-40 md:w-72">
                  <h3 className="text-base font-bold mt-4 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold">
                      {formatPrice(product?.current_price?.[0]?.NGN?.[0]) ||
                        150}
                    </p>
                    <div className="flex items-center">
                      {cartItem ? (
                        <div className="flex items-center px-2">
                          <button className="p-2 text-xs lg:text-sm cursor-pointer bg-black transition-all duration-300 border text-white">
                            Added to cart
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
              className={`mx-1 px-3 py-1 ${
                currentPage === i + 1
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
