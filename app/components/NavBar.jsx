"use client";

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/Logo.png';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import LoginAvatar from './LoginAvatar';
import { HomeDropDown } from './HomeDropDown';

const NavBar = () => {
   
  const auth = useSelector(state => state.auth.token)

  return (
    <div className="bg-white shadow-sm border border-gray-200" suppressHydrationWarning>
      <div className="flex flex-col md:flex-row justify-between items-center p-4  max-w-screen-xxl mx-12">
        <nav className="flex justify-between items-center w-full">
          <motion.div
            className="w-24 h-20 mb-4 md:mb-0"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Link href={'/Anasayfa'}>
            <Image src={Logo} alt="Site Logo" width={150} height={150} />
            </Link>
          </motion.div>

          <motion.div
  className="flex items-center justify-center space-x-6"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }}
>
  {auth ? (
    <LoginAvatar />
  ) : (
    <div>
     
        <HomeDropDown />
    </div>
  )}
</motion.div>

        </nav>
      </div>

      <motion.div
        className="flex justify-center"
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
