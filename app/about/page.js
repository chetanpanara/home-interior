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

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Have A Project? Lets Discuss It
            </h1>
            <p className="text-gray-500 mt-3 text-sm md:text-base">
              Fusce accumsan tincidunt erat et convallis risus ullamcorper eu
              vehicula massa a massa cursus
            </p>
          </motion.div>

          <motion.ul
            className="space-y-3 text-sm md:text-base text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <li>✨ Essential Design Program</li>
            <li>✨ Dedicated Design Program</li>
            <li>✨ White Gloves Design Program</li>
          </motion.ul>

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
          </motion.div>

          <motion.img
            src="/img/p3.jpg"
            alt="Living Room"
            className="rounded-md w-full"
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
