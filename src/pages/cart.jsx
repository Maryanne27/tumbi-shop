import React, { useContext, useState } from "react";
import {
  RiDeleteBinLine,
  RiShoppingCartLine,
  RiErrorWarningFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { context } from "../context/context";
import Modal from "../modal/deleteModal";

const formatPrice = (price) => {
  if (isNaN(price)) return '₦150.00';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(price);
};

export default function Cart() {
  const {
    cart,
    clearCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useContext(context);

  const [removalMessage, setRemovalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, product) =>
      total +
      parseFloat(product.current_price[0]?.NGN || "0") *
      (product.quantity || 1),
    0
  );
  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  const handleRemoveFromCart = (productId, productName) => {
    setCurrentProduct({ id: productId, name: productName });
    setIsModalOpen(true);
  };

  const confirmRemoveFromCart = () => {
    if (currentProduct) {
      removeFromCart(currentProduct.id);
      setRemovalMessage(` ${currentProduct.name} has been removed from cart.`);
      setTimeout(() => setRemovalMessage(""), 3000);
    }
    setIsModalOpen(false);
  };

  const incrementQuantityWithLimit = (product) => {
    if (product.quantity < product.available_quantity) {
      incrementQuantity(product.id);
    }
  };

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

      {removalMessage && (
        <div className="flex mb-4 p-2 bg-lightblue text-darkblue text-center justify-center items-center gap-2 text-nowrap whitespace-nowrap">
          <RiErrorWarningFill className="mr-2 flex justify-center items-center" />
          <span>{removalMessage}</span>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={confirmRemoveFromCart}
        productName={currentProduct?.name}
      />

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold mb-8">Cart</h2>
        {cart?.length > 0 && (
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

      {cart?.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            {cart.map((product) => (
              <div
                key={product.unique_id}
                className="border border-b-checkoutgray pb-4 flex items-start"
              >
                <img
                  src={`https://api.timbu.cloud/images/${product?.photos[0]?.url}`}
                  alt={product.name}
                  className="w-40 h-40 lg:w-52 lg:h-52 mt-4"
                />
                <div className="flex-1 pt-7">
                  <div className="flex justify-between items-center pb-4">
                    <h3 className="text-sm lg:text-lg font-bold ml-8">
                      {product.name}
                    </h3>
                    <div className="text-right">
                      <p className="font-normal text-sm lg:font-bold">
                        {formatPrice(
                         product.current_price[0]?.NGN || 150
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-checkoutgray text-sm mb-4 ml-8">XXL</p>
                  {product.available_quantity > 0 ? (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 bg-white border border-gray-300 ml-8">
                        <button
                          className="p-2"
                          onClick={() => decrementQuantity(product.id)}
                        >
                          -
                        </button>
                        <span>{product.quantity || 1}</span>
                        <button
                          className="p-2"
                          onClick={() => incrementQuantityWithLimit(product)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="p-2 flex items-center"
                        onClick={() =>
                          handleRemoveFromCart(product.id, product.name)
                        }
                      >
                        <RiDeleteBinLine className="mr-2" />
                      </button>
                    </div>
                  ) : (
                   <div className="flex justify-between items-center">
                    <p className="text-red-500 font-bold ml-8">Out of Stock</p>
                    <button
                        className="p-2 flex items-center"
                        onClick={() =>
                          handleRemoveFromCart(product.id, product.name)
                        }
                      >
                        <RiDeleteBinLine className="mr-2" />
                      </button>
                      </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3">
            <div className="p-4 border border-gray1">
              <div className="flex justify-between mb-4">
                <p>Subtotal</p>
                <p>{formatPrice(subtotal)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Discount</p>
                <p>{formatPrice(discount)}</p>
              </div>
              <hr />
              <div className="flex justify-between mb-4 mt-4">
                <p className="font-bold">Total</p>
                <p className="font-bold">{formatPrice(total)}</p>
              </div>
              <Link to="/checkout">
                <div className="text-center">
                  <button className="bg-black text-white w-full py-2">
                    Pay {formatPrice(total)}
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
        <p className="text-gray-600 text-center">
          Browse our products and discover our best deals
        </p>
        <Link to="/">
          <button className="bg-buttonblack px-6 py-2 text-white font-medium mt-3">
            Start shopping
          </button>
        </Link>
        </div>
      )}
    </div>
  );
}
