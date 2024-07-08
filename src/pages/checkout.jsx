import React, { useState } from "react";
import {
  RiCalendarLine,
  RiArrowRightCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import products from "./products";
import Card from "../assets/card.png";
import { NavLink } from "react-router-dom";

export default function Checkout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartProducts = products.slice(0, 3);
  const subtotal = cartProducts.reduce(
    (total, product) => total + parseFloat(product.price.replace("$", "")),
    0
  );
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  const handlePay = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto p-4 mt-10 max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Payment Information Section */}
        <div className="lg:w-1/3">
          <div className="border border-bordergray p-4 mb-8">
            <h5 className="text-lg font-bold mb-6">Payment Information</h5>
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

            <form>
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
                />
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
                />
                <img
                  src={Card}
                  alt=""
                  className="absolute right-2 top-10 text-gray-400"
                />
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
                    placeholder="04/2025"
                    className="w-full p-2 border pr-10 text-black"
                  />
                  <RiCalendarLine className="absolute right-2 top-10 text-gray-400" />
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
                    placeholder="491"
                    className="w-full p-2 border pr-10 text-black"
                  />
                  <RiCalendarLine className="absolute right-2 top-10 text-gray-400" />
                </div>
              </div>
            </form>

            {/* Payment Summary Section */}
            <div className="p-2 mb-8">
              <div className="flex justify-between mb-4">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Tax (10%)</p>
                <p>${(subtotal * 0.1).toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Shipping</p>
                <p>$0.00</p>
              </div>
              <hr />
              <div className="flex justify-between mb-4">
                <p className="font-bold">Total</p>
                <p className="font-bold">${total.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <button
                  className="bg-black text-white w-full py-2"
                  onClick={handlePay}
                >
                  Pay ${total.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-2/3">
          <div className="border border-bordergray p-4 mb-8">
            <div className="flex gap-2 items-center">
              <h3 className="text-xl font-bold">Order Summary</h3>
              <p className="bg-black text-white px-2 rounded-full text-sm flex justify-center items-center text-center">
                {cartProducts.length}
              </p>
            </div>
            {cartProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-6 mb-4 items-center mt-6"
              >
                <div className="flex gap-5 items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20"
                  />
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-gray-500">XXL</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <p className="text-lg">{product.price}</p>
                </div>
              </div>
            ))}
            <hr className="my-4" />
          </div>

          {/* Delivery Information Section */}
          <div className="border border-bordergray p-4">
            <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
            <form>
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="firstname"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className="w-full p-2 border"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="lastname"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className="w-full p-2 border"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="address">
                  Address
                </label>
                <input type="text" id="address" className="w-full p-2 border" />
              </div>
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                  <label className="block text-gray-700 mb-2" htmlFor="city">
                    City/Town
                  </label>
                  <input type="text" id="city" className="w-full p-2 border" />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-gray-700 mb-2" htmlFor="zip">
                    Zip Code
                  </label>
                  <input type="text" id="zip" className="w-full p-2 border" />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Mobile No
                  </label>
                  <input type="text" id="phone" className="w-full p-2 border" />
                </div>
                <div className="mb-4 w-1/2 pb-3">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input type="text" id="email" className="w-full p-2 border" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center ">
          <div className="bg-white p-6 rounded shadow-md text-center px-16 py-16">
            <div className="flex justify-center items-center pb-3">
              <RiCheckboxCircleLine size={60} />
            </div>
            <h2 className="text-lg font-bold mb-2">Payment Successful</h2>
            <p className="mb-4">Your order is now on the way!</p>
            <NavLink to="/">
              <button
                className="bg-black text-white py-2 px-4 rounded"
                onClick={closeModal}
              >
                Go back to store
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
