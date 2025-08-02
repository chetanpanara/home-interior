"use client";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";



export default function Services() {


  // const [cards, setCard] = useState([]);

  const cards = [
    {
      title: "Residential Interior Design",
      description:
        "Crafting warm and inviting living spaces that reflect your personality and ensure comfort with style.",
      image: "/img/p1.jpeg",
    },
    {
      title: "Commercial Interior Design",
      description:
        "Designing professional, functional, and visually appealing environments that enhance productivity and brand image.",
      image: "/img/p2.jpg",
    },
    {
      title: "Space Planning & Renovation",
      description:
        "Optimizing layouts and revamping interiors with smart design solutions to make the most of your available space.",
      image: "/img/p3.jpg",
    },
  ];

  // const fetchData = async () => {
  //   const res = await axios.get("/api/admin/service");
  //   if (res.data.success) {
  //     console.log(res.data.data);
  //     setCard(res.data.data);
  //   } else {
  //     throw new Error(res.data.message || "Failed to fetch services");
  //   }
  // };

  // useEffect(() => { 
  //   fetchData();
  // },[]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-20 bg-white">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Interior Design Services
        </h2>
        <p className="text-gray-600 text-md md:text-lg">
          Transforming spaces with creativity, precision, and elegance. We
          provide customized interior solutions that blend functionality with
          aesthetics, tailored to your lifestyle and preferences.
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
              // src={`/uploads/${card.image}`}
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
