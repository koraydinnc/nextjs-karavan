"use client";

import { motion } from 'framer-motion';
import React from 'react';

const icon = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 2 }
  }
};

const NavBar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <nav className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
        <div className="mr-8">
          <svg viewBox="0 0 100 100" className="w-10 h-10">
            <motion.path
              d="M10 10 H 90 V 90 H 10 L 10 10" // Buraya SVG'nizin path'ini yerleştirin
              variants={icon}
              initial="hidden"
              animate="visible"
              stroke="black"
              strokeWidth="2"
              fill="transparent"
            />
          </svg>
        </div>

        <div className="flex space-x-6">
          <span className="text-lg font-semibold hover:text-blue-500 cursor-pointer">Karavanım Var</span>
          <span className="text-lg font-semibold hover:text-blue-500 cursor-pointer">Karavanım Yok</span>
        </div>
        <div>
        <span className="text-lg font-semibold hover:text-blue-500 cursor-pointer">Karavanınızı KaravanGo'ya taşıyın</span>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
