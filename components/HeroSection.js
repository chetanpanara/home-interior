"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const HeroSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const slides = [
    {
      video: "/videos/h1.mp4",
      title: "“Transform Your Space, Elevate Your Lifestyle”",
      description:
        "Discover elegant interior designs that blend comfort, style, and functionality to create your dream home.",
      images: ["/img/p1.jpeg", "/img/p2.jpg", "/img/p3.jpg"],
    },
    {
      video: "/videos/h3.mp4",
      title: "“Designs That Define Your Personality”",
      description:
        "From modern minimalism to luxurious elegance, we craft interiors that reflect who you are.",
      images: ["/img/p4.jpeg", "/img/p5.jpeg", "/img/p6.jpeg"],
    },
    {
      video: "/videos/h4.mp4",
      title: "“Your Home, Our Design Expertise”",
      description:
        "Experience the perfect harmony of creativity and craftsmanship for spaces that truly inspire.",
      images: ["/img/p7.jpeg", "/img/p8.jpeg", "/img/p9.jpeg"],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen relative overflow-hidden h-screen">
      {/* Background Video Slider */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <video
            key={index}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000  ${
              index === currentVideo ? "opacity-100" : "opacity-0"
            }`}
            src={slide.video}
            autoPlay
            loop
            muted
            playsInline
          />
        ))}
        {/* Black Blur Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Hero Text Content */}
      <div className="relative z-10 bottom-0 sm:bottom-16 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="text-center w-full max-w-5xl">
          <div className="text-white space-y-4 transition-all duration-1000 ease-in-out">
            <div key={`title-${currentVideo}`} className="animate-fade-in-up">
              <h1 className="text-3xl sm:text-6xl font-bold leading-tight">
                {slides[currentVideo].title}
              </h1>
            </div>
            <div
              key={`description-${currentVideo}`}
              className="animate-fade-in-up delay-200"
            >
              <p className="text-md sm:text-lg leading-relaxed mx-auto max-w-3xl">
                {slides[currentVideo].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Changing Image Set */}
      <div className="absolute bottom-14 right-2 sm:right-16 z-20 flex space-x-3 transition-all duration-700 ease-in-out">
        {slides[currentVideo].images.map((src, index) => (
          <div
            key={`img-${currentVideo}-${index}`}
            className="w-30 h-24 sm:w-48 sm:h-32 rounded-lg overflow-hidden shadow-xl border border-white/20 transform transition-all duration-700 scale-100 opacity-0 animate-fade-in-up"
          >
            <Image
              src={src}
              alt={`Slide ${currentVideo + 1} - Image ${index + 1}`}
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Bottom Left Animated Counters */}
      <div className="absolute bottom-16 left-16 z-20   text-white text-center lg:flex hidden">
        <CounterBox value={2400} label="Projects done" plus />
        <div className="border-l border-white/40 h-full"></div>
        <CounterBox value={300} label="Loyal clients" plus />
        <div className="border-l border-white/40 h-full"></div>
        <CounterBox value={150} label="Designers" plus />
        <div className="border-l border-white/40 h-full"></div>
        <CounterBox value={600} label="Active clients" plus />
      </div>
    </div>
  );
};

const CounterBox = ({ value, label, plus = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = Math.ceil(end / steps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center w-20 sm:w-30">
      <span className="text-xl sm:text-2xl font-bold">
        {count}
        {plus ? "+" : ""}
      </span>
      <span className="text-xs sm:text-sm text-white/80">{label}</span>
    </div>
  );
};

export default HeroSection;
