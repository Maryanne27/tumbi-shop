import React, { useContext } from 'react';
import { RiDeleteBinLine, RiShoppingCartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { context } from '../context/context';

export default function Cart() {
  const { cart, clearCart } = useContext(context);

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, product) => total + parseFloat(product.price.replace('$', '')),
    0
  );
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumbs */}
      <nav className="flex mb-4">
        <Link to="/" className="mr-2 text-blue-500">
          Home
        </Link>
        <span className="mr-2">/</span>
        <Link to="/" className="mr-2 text-blue-500">
          Storefront
        </Link>
        <span className="mr-2">/</span>
        <span>Cart</span>
      </nav>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold mb-8">Cart</h2>
        {cart.length > 0 && (
          <div className="flex text-center justify-center items-center gap-2">
            <button
              type="button"
              onClick={clearCart}
              className="flex justify-center items-center border border-black shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-gray-700 hover:bg-gray-50"
              id="menu-button"
            >
              <RiDeleteBinLine className="mr-2" />
              Remove All
            </button>
          </div>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            {cart.map((product) => (
              <div
                key={product.id}
                className="border border-b-checkoutgray mb-4 flex items-start"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 lg:w-52 lg:h-52"
                />
                <div className="flex-1 ">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs lg:text-lg font-medium lg:font-bold">
                      {product.name}
                    </h3>
                    <div className="text-right">
                      <p className="font-normal text-sm lg:font-bold">
                        {product.price}
                      </p>
                    </div>
                  </div>
                  <p className="text-checkoutgray text-sm mb-4">XXL</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded">
                      <button className="p-2">-</button>
                      <span>1</span>
                      <button className="p-2">+</button>
                    </div>
                    <button className="p-2 flex items-center">
                      <RiDeleteBinLine className="mr-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3">
            <div className="p-4 border border-gray1">
              <div className="flex justify-between mb-4">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Discount</p>
                <p>${discount.toFixed(2)}</p>
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
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <RiShoppingCartLine size={48} className="text-gray-500 mb-4" />
          <h2 className="text-lg font-bold">Your cart is empty</h2>
          <p className="text-gray-600">Browse our products and add items to your cart.</p>
        </div>
      )}
    </div>
  );
}
