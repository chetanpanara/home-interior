"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "How it works", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const [isTransparent, setIsTransparent] = useState(true);
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > window.innerHeight - 80) {
          setIsTransparent(false);
        } else {
          setIsTransparent(true);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isTransparent ? "bg-transparent" : "bg-white shadow-md"
      }`}
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:justify-center md:relative">
          {/* Logo - positioned absolutely on desktop to keep menu centered */}
          <div className="flex-shrink-0 md:absolute md:left-0">
            <Link
              href="/"
              className="text-2xl font-bold from-orange-100 via-orange-400 to-orange-500 bg-clip-text text-transparent bg-gradient-to-r "
            >
              Havenly Home
            </Link>
          </div>

          {/* Desktop Menu - centered */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-2">
              {menuItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative tracking-widest px-3 py-2 text-sm font-medium transition-colors duration-300 group
                      ${
                        isActive
                          ? ` ${
                              isTransparent
                                ? "text-orange-300"
                                : "text-orange-500"
                            }`
                          : `${
                              isTransparent
                                ? "text-gray-50 hover:text-orange-300"
                                : "text-gray-600 hover:text-orange-500"
                            }`
                      }
                    `}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-orange-300 transition-all duration-300 ease-out
                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                      `}
                    ></span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-orange-600 hover:text-orange-400 focus:outline-none focus:text-orange-400 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-white `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm block tracking-wider px-3 py-2 font-medium transition-all duration-300 group rounded-md
                  ${
                    isActive
                      ? "text-orange-500 bg-gray-200"
                      : "text-gray-600 hover:text-orange-500 hover:bg-gray-200"
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-3 h-0.5 bg-orange-400 transition-all duration-300 ease-out
                    ${isActive ? "w-8" : "w-0 group-hover:w-8"}
                  `}
                ></span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
