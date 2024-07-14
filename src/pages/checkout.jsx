import React, { useContext, useState, useEffect } from "react";
import {
  RiCalendarLine,
  RiArrowRightCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Card from "../assets/card.png";
import { context } from "../context/context";

export default function Checkout() {
  const { cart, clearCart } = useContext(context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchProductDetails = async (productId) => {
    const id = "7b59152ffec240b3816027d241f05c93";
    const Appid = "OAX7IL8QDFZH0VY";
    const Apikey = "72eda6187cbb4106b975e9d2d616073420240712142534062960";

    const response = await fetch(
      `https://api.timbu.cloud/products/${productId}?organization_id=${id}&Appid=${Appid}&Apikey=${Apikey}`
    );

    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await Promise.all(
          cart.map((product) => fetchProductDetails(product.id))
        );
        setProductDetails(details);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (cart.length > 0) {
      fetchDetails();
    }
  }, [cart]);

  const subtotal = productDetails.reduce(
    (total, product) =>
      total +
      (parseFloat(product?.current_price) || 0) *
      (product.quantity || 1),
    0
  );
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  const onSubmit = (data) => {
    setIsModalOpen(true);
    clearCart();
  };

  return (
    <div className="mx-auto p-4 mt-10 max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 order-2 lg:order-1">
          <div className="border border-bordergray p-4 mb-8">
            <h5 className="text-lg font-bold mb-6">Payment Information</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <p className="mb-3 text-base">Apply discount</p>
                <div className="bg-white mb-2 flex justify-between p-2">
                  <div>
                    <p className="text-sm text-checkoutblack">
                      Discount with Subscription points
                    </p>
                    <small className="text-checkoutgray text-xs">
                      Make use of your Rhapsody points as discount
                    </small>
                  </div>
                  <div className="flex justify-center items-center">
                    <input
                      type="radio"
                      name="discount"
                      id="discount"
                      className="border-border-box-shadow1"
                    />
                  </div>
                </div>
                <p className="text-bluebase flex items-center cursor-pointer text-sm">
                  <RiArrowRightCircleLine className="mr-2" /> Login to retrieve
                  your points
                </p>
              </div>

              <div className="mb-6">
                <p className="mb-2 mt-7 text-base">Pay With</p>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="cardPayment"
                    className="mr-2 text-blue-500"
                    defaultChecked
                  />
                  <label
                    htmlFor="cardPayment"
                    className="mr-4 text-nowrap text-sm"
                  >
                    Debit/credit Card
                  </label>
                </div>
                <div>
                  <div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="payOnDelivery"
                      className="mr-2"
                    />
                    <label
                      htmlFor="payOnDelivery"
                      className="text-nowrap text-sm"
                    >
                      Pay on Delivery
                    </label>
                  </div>
                </div>
              </div>

              <h4 className="text-base mb-3">Enter Card Information</h4>
              <div className="mb-4 relative">
                <label
                  className="block text-gray-700 mb-2 text-sm"
                  htmlFor="cardName"
                >
                  Card Holder's Name
                </label>
                <input
                  type="text"
                  id="cardName"
                  placeholder="James Doe"
                  className="w-full p-2 border pr-10"
                  {...register("cardName", { required: true })}
                />
                {errors.cardName && (
                  <p className="text-red-500">Card holder's name is required</p>
                )}
              </div>
              <div className="mb-4 relative">
                <label
                  className="block text-gray-700 mb-2 text-sm"
                  htmlFor="cardNumber"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="5061 2345 6789 1234"
                  className="w-full p-2 border pr-10 text-black"
                  {...register("cardNumber", {
                    required: true,
                    pattern: /^[0-9]{16}$/,
                  })}
                />
                <img
                  src={Card}
                  alt="card"
                  className="absolute right-2 top-10 text-gray-400"
                />
                {errors.cardNumber && (
                  <p className="text-red-500">Card number must be 16 digits</p>
                )}
              </div>
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2 relative">
                  <label
                    className="block text-gray-700 mb-2 text-sm"
                    htmlFor="expiryDate"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    placeholder="12/24"
                    className="w-full p-2 border pr-10 text-black"
                    {...register("expiryDate", {
                      required: true,
                      pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                    })}
                  />
                  <RiCalendarLine className="absolute right-2 top-10 text-gray-400" />
                  {errors.expiryDate && (
                    <p className="text-red-500">
                      Expiry date must be MM/YY format
                    </p>
                  )}
                </div>
                <div className="mb-4 w-1/2 relative">
                  <label
                    className="block text-gray-700 mb-2 text-sm"
                    htmlFor="cvv"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    className="w-full p-2 border pr-10 text-black"
                    {...register("cvv", {
                      required: true,
                      pattern: /^[0-9]{3}$/,
                    })}
                  />
                  {errors.cvv && (
                    <p className="text-red-500">CVV must be 3 digits</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <h3 className="text-base">Subtotal</h3>
                <h3 className="text-base">${subtotal.toFixed(2)}</h3>
              </div>
              <div className="flex justify-between items-center mt-4">
                <h3 className="text-base">Discount</h3>
                <h3 className="text-base">-${discount.toFixed(2)}</h3>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Total</h3>
                <h3 className="text-xl font-bold">${total.toFixed(2)}</h3>
              </div>
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="bg-buttonblack text-white px-4 py-2 text-base w-full"
                >
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-2/3 order-1 lg:order-2">
          <div className="border border-bordergray p-4 mb-8">
            <div className="flex gap-2 items-center">
              <h3 className="text-xl font-bold">Order Summary</h3>
              <p className="bg-black text-white px-2 rounded-full text-sm flex justify-center items-center text-center">
                {cart.length}
              </p>
            </div>
            {productDetails.map((product) => (
              <div
                key={product.unique_id}
                className="flex gap-6 mb-4 items-center mt-6"
              >
                <div className="flex gap-5 items-center">
                  <img
                    src={`https://api.timbu.cloud/images/${product?.photos[0]?.url}`}
                    alt={product.name}
                    className="w-20 h-20"
                  />
                  <div>
                    <p className="font-bold">{product?.name}</p>
                    <p className="text-gray-500">XXL</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <p className="text-lg">₦{product.current_price }</p>
                </div>
              </div>
            ))}
            <hr className="my-4" />
          </div>

          {/* Delivery Information Section */}
          <div className="border border-bordergray p-4">
            <h3 className="text-xl font-bold mb-4">Delivery Information</h3>

            <div className="flex space-x-4">
              <div className="mb-4 w-1/2">
                <label className="block text-gray-700 mb-2" htmlFor="firstname">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="w-full p-2 border"
                  {...register("firstname", {
                    required: true,
                  })}
                />
                {errors.firstname?.type === "required" && (
                  <p className="text-red-500">first name is required</p>
                )}
              </div>
              <div className="mb-4 w-1/2">
                <label className="block text-gray-700 mb-2" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="w-full p-2 border"
                  {...register("lastname", {
                    required: true,
                  })}
                />
                {errors.lastname?.type === "required" && (
                  <p className="text-red-500">Last name is required</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full p-2 border"
                {...register("address", {
                  required: true,
                })}
              />
              {errors.address?.type === "required" && (
                <p className="text-red-500">Address is required</p>
              )}
            </div>
            <div className="flex space-x-4">
              <div className="mb-4 w-1/2">
                <label className="block text-gray-700 mb-2" htmlFor="city">
                  City/Town
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full p-2 border"
                  {...register("city", {
                    required: true,
                  })}
                />
                {errors.city?.type === "required" && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>
              <div className="mb-4 w-1/2">
                <label className="block text-gray-700 mb-2" htmlFor="zip">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip"
                  className="w-full p-2 border"
                  {...register("zip", {
                    required: true,
                  })}
                />
                {errors.zip?.type === "required" && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="mb-4 w-1/2">
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Mobile No
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-full p-2 border"
                  {...register("phone", {
                    required: true,
                  })}
                />
                {errors.phone?.type === "required" && (
                  <p className="text-red-500">phone number is required</p>
                )}
              </div>
              <div className="mb-4 w-1/2 pb-3">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-full p-2 border"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email address is required</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-center">
       <div className="bg-white px-16 py-10 shadow-lg text-center">
         <div className="flex items-center justify-center">
         <RiCheckboxCircleLine size={60} className="mr-2 text-green-500" />
      </div>
      <h3 className="text-lg font-bold mb-4 flex items-center justify-center">
        Payment Successful
      </h3>
            <p className="text-center text-checkoutgray pb-7">
              Your order is now on the way.
            </p>
            <NavLink
              to="/"
              className="block bg-buttonblack text-white text-center py-2 px-4 "
            >
              Back to store
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
