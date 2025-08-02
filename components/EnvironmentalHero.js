"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const EnvironmentalHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-64 sm:h-72 md:h-80 flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <Image
          src="/img/p2.jpg"
          alt="Environmental background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 backdrop-blur-xs bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          className={`text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-snug transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
        >
          Transform Your Space with
          <span className="block">Timeless Elegance.</span>
        </h1>

        <p
          className={`text-xs sm:text-sm md:text-base text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}
        >
          Experience premium interior designs tailored to your lifestyle. Create
          a home that reflects sophistication, comfort, and style. Your dream
          space starts here.
        </p>

        <div
          className={`transform transition-all duration-1000 ease-out delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        ></div>
      </div>
    </section>
  );
};

export default EnvironmentalHero;
