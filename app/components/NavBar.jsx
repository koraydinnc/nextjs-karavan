"use client";

import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import Logo from '../../public/Logo.png';

const NavBar = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
        <nav className="flex justify-between items-center w-full">
          <div className="mr-8">
            <motion.div
              className="w-24 h-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image src={Logo} alt="Logo" width={150} height={150} />
            </motion.div>
          </div>

          <motion.div
            className="flex space-x-6 text-gray-700"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.3,
                  duration: 0.8,
                  staggerChildren: 0.2
                },
              }
            }}
          >
            {['Karavanım Var', 'Karavanım Yok'].map((text, index) => (
              <motion.span
                key={index}
                className="text-lg font-medium hover:text-blue-600 cursor-pointer transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {text}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="flex space-x-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: {
                opacity: 1,
                y: 0,
              }
            }}
          >
            <motion.button
              className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors duration-300 shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Giriş Yap
            </motion.button>
          </motion.div>
        </nav>
      </div>

      <motion.div
        className="w-full px-4 py-2 bg-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-screen-xl mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default NavBar;
