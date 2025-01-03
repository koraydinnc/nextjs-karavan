"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.3 
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/404.png"
          alt="404 Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl w-full bg-transparent  p-8 md:p-12"
        >
          <div className="text-center space-y-8">
            {/* 404 Metni */}
            <motion.h1 
              variants={itemVariants}
              className="text-8xl md:text-9xl font-black"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                404
              </span>
            </motion.h1>

            {/* Ana Başlık */}
            <motion.div 
              variants={itemVariants}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Oops! Kaybolmuş Gibisiniz
              </h2>
              <p className="text-gray-800 text-lg max-w-2xl mx-auto">
                Aradığınız sayfa bir galaksi uzakta olabilir. Endişelenmeyin, sizi güvenli bir yere götürebiliriz.
              </p>
            </motion.div>

            {/* Butonlar */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Link 
                href="/"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Ana Sayfaya Dön
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-purple-600 text-purple-600 font-medium hover:bg-purple-50 transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Destek Al
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}