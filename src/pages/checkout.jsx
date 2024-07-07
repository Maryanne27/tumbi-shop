import React from "react";
import { BsCalendar, BsCardImage } from "react-icons/bs";
import { FiArrowRightCircle } from "react-icons/fi";
import products from "./products";

export default function Checkout() {
  const cartProducts = products.slice(0, 3);
  const subtotal = cartProducts.reduce(
    (total, product) => total + parseFloat(product.price.replace("$", "")),
    0
  );
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Payment Information Section */}
        <div className=" lg:w-1/3">
          <div className="border border-bordergray p-4  mb-8">
            <h5 className="text-lg font-bold mb-6">Payment Information</h5>
            <div className="mb-4">
              <p className="mb-3 text-base">Apply discount</p>
              <div className="bg-white  mb-2 flex justify-between p-2">
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
                    className=" border-border-box-shadow1"
                  />
                </div>
              </div>
              <p className="text-bluebase flex items-center cursor-pointer text-sm">
                <FiArrowRightCircle className="mr-2" /> Login to retrieve your
                points
              </p>
            </div>

            <div className="mb-6">
              <p className=" mb-2 mt-7 text-base">Pay With</p>
              <div className="flex items-center mb-2"></div>
              <input
                type="radio"
                name="paymentMethod"
                id="cardPayment"
                className="mr-2"
              />
              <label htmlFor="cardPayment" className="mr-4 text-nowrap text-sm">
                Credit/Debit Card
              </label>
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
              <div className="mb-4">
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
                  className="w-full p-2 border"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2 text-sm"
                  htmlFor="cardNumber"
                >
                  Card Number <BsCardImage className="inline ml-1" />
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="5061 2345 6789 1234"
                  className="w-full p-2 border "
                />
              </div>
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                  <label
                    className="block text-gray-700 mb-2 text-sm"
                    htmlFor="expiryDate"
                  >
                    Expiry Date <BsCalendar className="inline ml-1" />
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    placeholder="04/2025"
                    className="w-full p-2 border "
                  />
                </div>
                <div className="mb-4 w-1/2">
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
                    className="w-full p-2 border "
                  />
                </div>
              </div>
            </form>

            {/* Payment Summary Section */}
            <div className="p-2  mb-8">
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
                <button className="bg-black text-white w-full py-2">
                  Pay ${total.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-2/3">
          <div className="border border-bordergray p-4 mb-8">
            <div className="flex gap-2">
              <h3 className="text-xl font-bold ">Order Summary</h3>
              <p className="bg-black text-white px-2 rounded-full text-sm flex justify-center items-center text-center">
                {cartProducts.length}
              </p>
            </div>
            {cartProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-24 mb-4 items-center mt-6"
              >
                <div className="flex gap-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 "
                  />
                  <div>
                    <div className="flex justify-evenly items-center text-center">
                      <div>
                        <p className="font-bold">{product.name}</p>
                      </div>
                      <div>
                        <p className="text-lg">{product.price}</p>
                      </div>
                    </div>
                    <p className="text-gray-500">XXL</p>
                  </div>
                </div>
              </div>
            ))}
            <hr className="my-4" />
          </div>

          {/* Delivery Information Section */}
          <div className="border border-bordergray p-4 ">
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
                    className="w-full p-2 border "
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
                    className="w-full p-2 border "
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full p-2 border "
                />
              </div>
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                  <label className="block text-gray-700 mb-2" htmlFor="city">
                    City/Town
                  </label>
                  <input type="text" id="city" className="w-full p-2 border " />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-gray-700 mb-2" htmlFor="zip">
                    Zip Code
                  </label>
                  <input type="text" id="zip" className="w-full p-2 border " />
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
                    className="w-full p-2 border "
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="w-full p-2 border "
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
