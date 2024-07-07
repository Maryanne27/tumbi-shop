import React from "react";
import { BsTrash } from "react-icons/bs";
// import { FiTrash, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import products from "./products";

export default function cart() {
  const cartProducts = products.slice(0, 3);

  // Calculate subtotal
  const subtotal = cartProducts.reduce(
    (total, product) => total + parseFloat(product.price.replace("$", "")),
    0
  );
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold mb-8">Cart</h2>

        <div className="flex text-center justify-center items-center gap-4">
          <button
            type="button"
            className="flex justify-center border border-black shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-gray-700 hover:bg-gray-50 "
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <BsTrash className=" " />
            Remove All
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          {cartProducts.map((product) => (
            <div
              key={product.id}
              className="border border-b-checkoutgray mb-4 flex flex-col lg:flex-row items-center lg:items-start"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32"
              />
              <div className="flex-1 mb-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <div className="text-right">
                    <p className="text-sm font-bold mb-4">{product.price}</p>
                  </div>
                </div>
                <p className="text-checkoutgray text-sm mb-4">XXL</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 bg-white">
                    <button className=" p-2">-</button>
                    <span className="">1</span>
                    <button className=" p-2">+</button>
                  </div>
                  <div>
                    <button className="p-2 flex items-center">
                      <BsTrash className="mr-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:w-1/3">
          <div className="p-2 border border-gray1">
            <div className="flex justify-between mb-4">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between mb-4">
              <p>Discount</p>
              <p>$10.00</p>
            </div>
            <hr />
            <div className="flex justify-between mb-4 mt-4">
              <p className="font-bold">Total</p>
              <p className="font-bold">${total.toFixed(2)}</p>
            </div>
            <Link to="/checkout">
              <div className="text-center">
                <button className="bg-black text-white w-full py-2">
                  Pay ${total.toFixed(2)}
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
