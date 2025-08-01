"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Whychooseus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full bg-white md:py-24 md:px-12 flex flex-col md:flex-row items-center justify-between">
      <motion.div
        className="w-full md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={isMounted ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm text-[#CBAE80] uppercase tracking-widest">
          Why Choose Us
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Providing Quality Your Interior Services
        </h1>
        <p className="text-gray-600">
          With over four decades of experience providing solutions to
          large-scale enterprises throughout the globe, we offer end-to-end
          logistics tailored for specific markets.
        </p>

        <div className="flex gap-8 flex-wrap">
          <div className="flex items-center gap-4">
            <img src="/img/a2.png" alt="Furniture" className="w-10 h-10" />
            <div>
              <p className="font-semibold text-lg text-gray-800">Commercial</p>
              <p className="font-semibold text-lg text-gray-800">Furniture</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img src="/img/a3.png" alt="Lighting" className="w-10 h-10" />
            <div>
              <p className="font-semibold text-lg text-gray-800">Home</p>
              <p className="font-semibold text-lg text-gray-800">Lighting</p>
            </div>
          </div>
        </div>

        <button className="bg-[#CBAE80] text-white px-6 py-3 rounded-md font-semibold mt-6 hover:bg-[#b09c6c] transition">
          Read More
        </button>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 mt-12 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={isMounted ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/img/a1.png"
          alt="Interior Design"
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </section>
  );
}
