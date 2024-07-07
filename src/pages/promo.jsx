import React from "react";
import { FiChevronRight } from "react-icons/fi";
import bg1 from "../assets/bg.JPG";
import bg2 from "../assets/bg2.svg";
import brand1 from "../assets/brand1.svg";
import brand2 from "../assets/brand2.svg";
import brand3 from "../assets/brand3.svg";
import brand4 from "../assets/brand4.svg";
import brand5 from "../assets/brand5.svg";
import brand6 from "../assets/brand6.svg";

export default function Promo() {
  return (
    <div>
      <div className="flex justify-center items-center my-16">
        <div className="flex flex-col md:flex-row overflow-hidden max-w-3xl w-full">
          <div className="flex-1">
            <img src={bg2} alt="promo" className="object-cover w-full h-full" />
          </div>
          <div
            className="flex-1 flex flex-col justify-center items-start p-6"
            style={{
              backgroundImage: `url(${bg1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full max-w-sm ml-auto text-left">
              <p className="text-gray-700 text-base mb-2">Limited offer</p>
              <h3 className="text-white text-2xl font-bold mb-4">
                30% Off this weekend and get free gift
              </h3>
              <button className="bg-white text-black px-4 py-2 flex items-center">
                Shop Now <FiChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Brands section */}
      <div className="container mx-auto py-10">
        <h3 className="text-2xl font-medium mb-6 text-gray-900">
          Our Trusted Brands
        </h3>
        <div className="bg-black p-4">
          <div className="bg-white flex flex-wrap items-center justify-center space-x-0 md:space-x-5 space-y-5 md:space-y-0 p-4">
            <img src={brand1} alt="Givenchy" className="w-24 md:w-32" />
            <img src={brand2} alt="Prada" className="w-24 md:w-32" />
            <img src={brand3} alt="Zara" className="w-24 md:w-32" />
            <img src={brand4} alt="Dior" className="w-24 md:w-32" />
            <img src={brand5} alt="Armani" className="w-24 md:w-32" />
            <img src={brand6} alt="Fendi" className="w-24 md:w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
