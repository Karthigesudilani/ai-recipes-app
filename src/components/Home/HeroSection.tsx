"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10"></div>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-orange-800 dark:text-orange-200 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            AI-Powered Recipe Discovery
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Turn Leftover Ingredients Into
            <span className="text-orange-500 block"> Delicious Meals</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Stop wasting food and start creating amazing dishes. Our AI analyzes your available ingredients 
            and generates personalized recipes that minimize waste and maximize flavor.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/add-ingredients"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Finding Recipes
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Hero Image Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative h-24 md:h-32 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?w=400&h=300&fit=crop&crop=center"
                alt="Delicious pasta dish"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative h-24 md:h-32 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?w=400&h=300&fit=crop&crop=center"
                alt="Fresh vegetables"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative h-24 md:h-32 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=300&fit=crop&crop=center"
                alt="Grilled chicken"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative h-24 md:h-32 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?w=400&h=300&fit=crop&crop=center"
                alt="Healthy salad"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 