"use client";

import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import Logo from '../../public/Logo.png';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

const NavBar = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
        <nav className="flex justify-between items-center w-full">
          <div className="mb-4">
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
            {['Karavan Konaklama Yerleri', 'Konaklama Yerleri'].map((text, index) => (
              <motion.span
                key={index}
                className="text-lg font-medium hover:text-green-600 cursor-pointer transition-colors duration-300"
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
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button>
                Giriş Yap
              </Button>
            </motion.button>
          </motion.div>
        </nav>
      </div>

      <motion.div
        className="flex w-full px-4 py-2 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
      <SearchBar />
      </motion.div>
    </div>
  );
};

export default NavBar;
