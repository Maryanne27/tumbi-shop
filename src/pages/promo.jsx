import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RiArrowRightSLine } from "react-icons/ri";
import bg1 from "../assets/bg.JPG";
import bg2 from "../assets/bg2.svg";
import brand1 from "../assets/brand1.svg";
import brand2 from "../assets/brand2.svg";
import brand3 from "../assets/brand3.svg";
import brand4 from "../assets/brand4.svg";
import brand5 from "../assets/brand5.svg";
import brand6 from "../assets/brand6.svg";

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const imageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const brandVariants = {
  hidden: { opacity: 0, rotateX: -90 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.5, delay: 0.2 },
  },
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};

export default function Promo() {
  const promoRef = useRef(null);
  const brandsRef = useRef(null);
  const promoInView = useInView(promoRef, { once: true, threshold: 0.5 });
  const brandsInView = useInView(brandsRef, { once: true, threshold: 0.5 });

  return (
    <div>
      <div className="flex justify-center items-center my-16">
        <div className="flex flex-col md:flex-row overflow-hidden max-w-3xl w-full">
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={promoInView ? "visible" : "hidden"}
            variants={imageVariants}
            ref={promoRef}
          >
            <img
              src={bg2}
              alt="promo"
              className="object-cover w-full h-full md:h-auto"
            />
          </motion.div>
          <div
            className="flex-1 flex flex-col justify-center items-start p-6 h-full md:h-auto pt-16 pb-16 md:pt-0 md:pb-0"
            style={{
              backgroundImage: `url(${bg1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full max-w-sm ml-auto text-left">
              <motion.p
                className="text-gray1 text-base mb-2"
                initial="hidden"
                animate={promoInView ? "visible" : "hidden"}
                variants={textVariants}
              >
                Limited offer
              </motion.p>
              <motion.h3
                className="text-white text-2xl font-bold mb-4"
                initial="hidden"
                animate={promoInView ? "visible" : "hidden"}
                variants={textVariants}
              >
                30% Off this weekend and get free gift
              </motion.h3>
              <motion.button
                className="bg-white text-black px-4 py-2 flex items-center hover:bg-green-200"
                initial="hidden"
                animate={promoInView ? "visible" : "hidden"}
                variants={buttonVariants}
              >
                Shop Now <RiArrowRightSLine className="ml-2" />
              </motion.button>
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
          <motion.div
            className="bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 justify-center items-center"
            ref={brandsRef}
            initial="hidden"
            animate={brandsInView ? "visible" : "hidden"}
            variants={brandVariants}
          >
            {[brand1, brand2, brand3, brand4, brand5, brand6].map(
              (brand, index) => (
                <motion.img
                  key={index}
                  src={brand}
                  alt={`brand ${index + 1}`}
                  className="w-24 md:w-32 mx-auto"
                  variants={brandVariants}
                  whileHover="hover"
                />
              )
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
