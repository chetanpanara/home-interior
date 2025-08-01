"use client";
import Whychooseus from "@/components/Whychooseus";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-20 bg-white">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Side Image */}
        <motion.div
          className="relative w-full lg:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          whileHover={{ scale: 1.03 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <img
            src="/img/p2.jpg"
            alt="Office Design"
            className="rounded-md w-full"
          />
        </motion.div>

        {/* Right Side Text + Image */}
        <div className="w-full lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-[#CBAE80] uppercase tracking-widest">
              About Us
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Transforming <span className="text-orange-300">Spaces, Elevating</span> Lifestyles
            </h1>
            <p className="text-gray-500 mt-3 text-sm md:text-base">
              We create stunning, functional interiors that bring your vision to
              life. Our team combines creativity, precision, and premium quality
              to design spaces that inspire and reflect your lifestyle.
            </p>
          </motion.div>

          <motion.ul
            className="space-y-3 text-sm md:text-base text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <li>
              ✨ We craft interiors that blend style, comfort, and
              functionality.
            </li>
            <li>
              ✨ Every project is tailored to reflect your personality and
              needs.
            </li>
            <li>
              ✨ We deliver premium materials and flawless execution every time.
            </li>
          </motion.ul>

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          ></motion.div>

          <motion.img
            src="/img/p3.jpg"
            alt="Living Room"
            className="rounded-md w-full"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </section>
  );
}
