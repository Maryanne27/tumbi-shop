import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { context } from "../context/context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RiErrorWarningFill } from "react-icons/ri";
import similarProducts from "./similarProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(context);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  const fetchProductDetails = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE}/${id}/`, {
      params: {
        organization_id: process.env.REACT_APP_ORG_ID,
        Appid: process.env.REACT_APP_APPID,
        Apikey: process.env.REACT_APP_APIKEY,
      },
    });
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: fetchProductDetails,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center  bg-white z-50">
        <div className="text-center mt-5">
          {/* <div className="loader border-t-4 border-blue-500 rounded-full w-10 h-10 mb-4 animate-spin"></div> */}
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center  bg-white  z-50">
        <div className="text-center flex justify-center items-center flex-col">
          <RiErrorWarningFill className="text-4xl lg:text-6xl text-red-500 mb-4 flex " />
          <p className="text-lg font-semibold">Error loading data</p>
          {/* <p className="text-gray-500">Please refresh the page</p> */}
        </div>
      </div>
    );
  }

  const product = data;
  //   const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="container mx-auto px-4 py-7">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div>
        <img
                    src={`https://api.timbu.cloud/images/${
                      product.photos[0]?.url || ""
                    }`}
            
            alt={product.name}
            className="w-96 h-96"
          />
        </div>
        <div className="flex flex-col justify-center items-start pt-5">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg font-bold mt-4 pb-7">
            {formatPrice(product.current_price)}
          </p>
          <h4 className="font-bold text-lg">Description</h4>
          <p className="mt-4">{product.description}</p>
          <div className="flex items-center mt-8">
            <button
              onClick={() => addToCart(product)}
              className="py-2 px-3 text-xs lg:text-sm cursor-pointer bg-black hover:text-black transition-all duration-300 border border-black hover:bg-transparent text-white"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold pb-4">Similar Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {similarProducts.map((similarProduct) => (
            <div key={similarProduct.id} className="flex flex-col items-start">
              <img
                src={similarProduct.image}
                alt={similarProduct.name}
                className="w-40 h-52"
              />
              <h3 className="text-base font-bold mt-2">
                {similarProduct.name}
              </h3>

              <p className="text-sm font-bold">₦{similarProduct.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
