import React from "react";
import { FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <div className="bg-gray-100 py-10">
      {/* Subscribe section */}
      <div className="text-center w-full max-w-lg mx-auto mb-10">
        <h4 className="text-3xl font-bold mb-2">
          Subscribe to our news update to get our latest collection
        </h4>
        <p className="text-gray-600 mb-4">
          By subscribing to our news you get 10% off on your first order
        </p>

        <div className="flex justify-center items-center space-x-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FiMail className="text-gray1" />
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              className="pl-10 pr-4 py-2 border border-gray-300  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-black text-white px-4 py-2 ">Subscribe</button>
        </div>
      </div>

      {/* Footer section */}
      <div className="bg-greengray text-black py-10">
        <div className="container mx-auto flex flex-wrap justify-between items-start space-y-6 md:space-y-0">
          <div className="w-full md:w-1/4">
            <h5 className="text-xl font-bold mb-2">
              Timbu <span className="font-light">cloud shop</span>
            </h5>
            <p>
              Specializes in providing high quality and stylish products for
              your cupboard
            </p>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="text-xl font-bold mb-2">Company</h5>
            <p>About Us</p>
            <p>Support Us</p>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="text-xl font-bold mb-2">Support</h5>
            <p>FAQ</p>
            <p>Cookie Policy</p>
            <p>Terms of Use</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>© 2023 . Powered by Ryvision. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
