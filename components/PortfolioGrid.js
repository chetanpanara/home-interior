"use client";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Commercial Space Design",
    description:
      "This living room was designed to embody simplicity, elegance, and functionality. The goal was to create a warm yet sophisticated space with a neutral color palette, natural textures.",
    image: "/img/p1.jpeg",
  },
  {
    title: "Commercial Space Design",
    description:
      "This living room was designed to embody simplicity, elegance, and functionality. The goal was to create a warm yet sophisticated space with a neutral color palette, natural textures.",
    image: "/img/p2.jpg",
  },
  {
    title: "Commercial Space Design",
    description:
      "This living room was designed to embody simplicity, elegance, and functionality. The goal was to create a warm yet sophisticated space with a neutral color palette, natural textures.",
    image: "/img/p3.jpg",
  },
];

export default function PortfolioGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Showcasing Timeless Designs That <br />
          Inspire and Elevate Spaces.
        </h2>
        <p className="text-gray-600 text-md md:text-lg">
          Explore our curated portfolio of stunning interior designs, where
          creativity meets functionality to transform ordinary spaces into
          extraordinary experiences
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="rounded-xl overflow-hidden bg-white shadow-md"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-64 object-cover"
            />

            <div className="bg-white px-6 py-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {card.title}
                </h3>
                
              </div>
              {card.description && (
                <p className="text-sm text-gray-600 leading-snug">
                  {card.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
