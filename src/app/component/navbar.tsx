"use client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  // State to control hamburger menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function for menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-lg z-50 h-[66px] flex items-center mix-blend-difference">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Logo */}
        <div className="text-lg sm:text-2xl font-bold text-white tracking-tight">
          METABLOG
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="block md:hidden">
          <button
            className="p-2 text-white rounded hover:bg-gray-200 focus:outline-none"
            aria-label="Menu"
            onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative flex flex-col items-center group">
            <span className="text-white font-medium text-sm group-hover:text-blue-600">
              <Link href="/">Home</Link>
            </span>
            <div className="absolute w-2 h-2 bg-blue-600 rounded-full top-[calc(100%+4px)] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all"></div>
            <div className="absolute w-full h-[2px] bg-blue-600 top-[calc(100%+4px)] left-0 transform scale-x-0 group-hover:scale-x-100 transition-all"></div>
          </div>

          <div className="relative flex flex-col items-center group">
            <span className="text-white font-medium text-sm group-hover:text-blue-600">
              <Link href="/explore">Explore</Link>
            </span>
            <div className="absolute w-2 h-2 bg-blue-600 rounded-full top-[calc(100%+4px)] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all"></div>
            <div className="absolute w-full h-[2px] bg-blue-600 top-[calc(100%+4px)] left-0 transform scale-x-0 group-hover:scale-x-100 transition-all"></div>
          </div>

          <div className="relative flex flex-col items-center group">
            <span className="text-white font-medium text-sm group-hover:text-blue-600">
              <Link href="/about">About</Link>
            </span>
            <div className="absolute w-2 h-2 bg-blue-600 rounded-full top-[calc(100%+4px)] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all"></div>
            <div className="absolute w-full h-[2px] bg-blue-600 top-[calc(100%+4px)] left-0 transform scale-x-0 group-hover:scale-x-100 transition-all"></div>
          </div>

          <div className="relative flex flex-col items-center group">
            <span className="text-white font-medium text-sm group-hover:text-blue-600">
              <Link href="/contact">Contact</Link>
            </span>
            <div className="absolute w-2 h-2 bg-blue-600 rounded-full top-[calc(100%+4px)] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all"></div>
            <div className="absolute w-full h-[2px] bg-blue-600 top-[calc(100%+4px)] left-0 transform scale-x-0 group-hover:scale-x-100 transition-all"></div>
          </div>

          <div className="w-4 h-4 border-2 border-white rounded-full"></div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-[66px] left-0 w-full bg-white shadow-lg p-4 md:hidden">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="block text-gray-800 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="block text-gray-800 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}>
                Explore
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block text-gray-800 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block text-gray-800 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
