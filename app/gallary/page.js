"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Refs for GSAP animations
  const galleryRef = useRef(null);
  const itemsRef = useRef([]);
  const headerRef = useRef(null);
  const modalRef = useRef(null);


  // Gallery data with size variants for masonry layout
  

  const [isVisible, setIsVisible] = useState(false);
  const [galleryData, setgalleryData] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      category: "Living Room",
      title: "Elegant Living Room",
      description:
        "A warm and inviting living space with modern furniture and soft neutral tones.",
      size: "large", // Will span 2 columns and 2 rows
    },
    {
      id: 2,
      image: "/img/p2.jpg",
      category: "Reading Corner",
      title: "Minimalist Bedroom",
      description:
        "A sleek, clutter-free bedroom designed for comfort and relaxation.",
      size: "medium", // Regular size
    },
    {
      id: 3,
      image: "/img/p3.jpg",
      category: "Kitchen",
      title: "Luxury Kitchen",
      description:
        "A modern modular kitchen featuring premium materials and functional elegance.",
      size: "medium",
    },
    {
      id: 4,
      image: "/img/p4.webp",
      category: "Bedroom",
      title: "Modern Dining Area",
      description:
        "A stylish dining space combining simplicity and elegance for family gatherings.",
      size: "medium", // Will span 2 columns
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      category: "Bedroom",
      title: "Traditional Crop Cultivation",
      description:
        "A tranquil corner with soft lighting, perfect for relaxation and reading.",
      size: "medium",
    },
  ]);


  // const fetchGallaryData = async () => {
  //   const response = await axios.get("/api/gallary");
  //   console.log(response.data.data);
  //   setgalleryData(response.data.data);

  //   // Generate dynamic filter categories from fetched data
  //   const uniqueCategories = [
  //     ...new Set(response.data.data.map((item) => item.category)),
  //   ];
  //   const dynamicCategories = [
  //     { key: "all", label: "All Projects" },
  //     ...uniqueCategories.map((category) => ({
  //       key: category,
  //       label: category
  //         .split("-")
  //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //         .join(" "),
  //     })),
  //   ];
  //   setFilterCategories(dynamicCategories);
  // };

  useEffect(() => {
    // fetchGallaryData(); // fetch Gallery data
    setIsVisible(true);
  }, []);

  // ADD this new useEffect to set initial filtered images when galleryData loads:
  useEffect(() => {
    if (galleryData.length > 0) {
      setFilteredImages(galleryData); // Show all images initially
    }
  }, [galleryData]);

  // ADD this new state for dynamic filter categories:
  const [filterCategories, setFilterCategories] = useState([
    { key: "all", label: "All Design" },
    { key: "Living Room", label: "Living Room" },
    { key: "Bedroom", label: "Bedroom" },
    { key: "Kitchen", label: "Kitchen" },
  ]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (activeFilter === "all") {
        setFilteredImages(galleryData);
      } else {
        setFilteredImages(
          galleryData.filter((img) => img.category === activeFilter)
        );
      }
      setIsLoading(false);
    }, 300);
  }, [activeFilter, galleryData]);

  // Initialize GSAP animations
  useEffect(() => {
    if (!isLoading && filteredImages.length > 0) {
      // Reset refs array to match filtered images
      itemsRef.current = itemsRef.current.slice(0, filteredImages.length);

      // Animate gallery items when they first appear
      gsap.fromTo(
        itemsRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );

      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
    }
  }, [filteredImages, isLoading]);

  // Add repeated scroll animations
  useEffect(() => {
    if (!isLoading && filteredImages.length > 0) {
      // Clear any existing ScrollTriggers to avoid duplicates
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Create new scroll animations for each image
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        // Choose a random animation effect for variety
        const effectType = index % 4;

        ScrollTrigger.create({
          trigger: item,
          start: "top bottom-=100",
          onEnter: () => {
            // Apply different effects based on the item's index
            switch (effectType) {
              case 0: // Scale effect
                gsap.fromTo(
                  item,
                  { scale: 0.9, opacity: 0.7 },
                  { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }
                );
                break;
              case 1: // Rotation effect
                gsap.fromTo(
                  item,
                  { rotation: -5, opacity: 0.7 },
                  {
                    rotation: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)",
                  }
                );
                break;
              case 2: // Slide up effect
                gsap.fromTo(
                  item,
                  { y: 20, opacity: 0.7 },
                  { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
                );
                break;
              case 3: // Slide in from side effect
                gsap.fromTo(
                  item,
                  { x: index % 2 === 0 ? -20 : 20, opacity: 0.7 },
                  { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
                );
                break;
            }
          },
          // Also animate when scrolling back up
          onEnterBack: () => {
            gsap.fromTo(
              item,
              { scale: 0.9, opacity: 0.7 },
              { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
            );
          },
          // Critical: set once to false so animations repeat every time
          once: false,
        });
      });
    }

    // Cleanup function to remove ScrollTriggers when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [filteredImages, isLoading]);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";

    // Animate modal opening with GSAP
    setTimeout(() => {
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }, 10);
  };

  const closeModal = () => {
    // Animate modal closing with GSAP
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setSelectedImage(null);
          document.body.style.overflow = "unset";
        },
      });
    } else {
      setSelectedImage(null);
      document.body.style.overflow = "unset";
    }
  };

  const getSizeClasses = (size, index) => {
    // Use index to help balance the layout
    switch (size) {
      case "large":
        return "col-span-2 row-span-2";
      case "wide":
        return "col-span-2 row-span-1";
      case "tall":
        return "col-span-1 row-span-2";
      default:
        // For medium items, make every 5th one wide to help fill gaps
        if (index % 5 === 0) {
          return "col-span-2 row-span-1";
        }
        return "col-span-1 row-span-1";
    }
  };

  return (
    <>
      {/* Filter Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-16">
        {/* <div className="text-center mb-12" ref={headerRef}> */}

        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Interior <span className="text-orange-300">Design Showcase</span>
          </h2>
          <p className="text-gray-600 text-md md:text-lg">
            Explore our curated collection of elegant interiors crafted for
            modern living. From cozy corners to luxurious spaces, every design
            tells a story of style and comfort.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterCategories.map((category, index) => (
            <button
              key={category.key}
              onClick={() => setActiveFilter(category.key)}
              className={`px-3 py-2 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-500 transform hover:scale-105 ${
                activeFilter === category.key
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-green-50 border border-green-200"
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                animation: isVisible
                  ? `slideInUp 0.6s ease-out ${index * 0.1}s both`
                  : "none",
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Masonry Gallery Grid with GSAP animations */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 auto-rows-[200px]">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div
            ref={galleryRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 auto-rows-[200px] grid-auto-flow-dense"
          >
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                ref={(el) => (itemsRef.current[index] = el)}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${getSizeClasses(
                  image.size,
                  index
                )}`}
                onClick={() => openModal(image)}
              >
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-sm lg:text-lg font-bold mb-1 lg:mb-2">
                      {image.title}
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-200 line-clamp-2">
                      {image.description}
                    </p>
                  </div>
                </div>

                {/* View Icon */}
                <div className="absolute top-4 right-4 w-8 h-8 lg:w-10 lg:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* {filteredImages.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
             No gallary photos found!
            </h3>
          </div>
        )} */}
      </div>

      {/* Modal with GSAP animations */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div ref={modalRef} className="relative max-w-4xl max-h-[90vh] m-4">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[60vh] object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add this CSS if you don't already have it */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

      export default GalleryPage;
