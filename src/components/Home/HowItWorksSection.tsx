"use client";

import { Zap } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Three simple steps to transform your ingredients into delicious meals
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="text-center group"
          >
            <div className="relative mb-6">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110"
              >
                <span className="text-2xl font-bold text-white">1</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md"
              >
                <Image
                  src="https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?w=100&h=100&fit=crop&crop=center"
                  alt="Fresh ingredients"
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Add Your Ingredients</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Simply type in the ingredients you have available. Our smart interface makes it easy to add multiple items.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="text-center group"
          >
            <div className="relative mb-6">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110"
              >
                <span className="text-2xl font-bold text-white">2</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md"
              >
                <Zap className="w-4 h-4 text-orange-500" />
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">AI Generates Recipes</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our advanced AI analyzes your ingredients and creates personalized recipes that use what you have.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="text-center group"
          >
            <div className="relative mb-6">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110"
              >
                <span className="text-2xl font-bold text-white">3</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md"
              >
                <Image
                  src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?w=100&h=100&fit=crop&crop=center"
                  alt="Delicious meal"
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Cook & Enjoy</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Follow the step-by-step instructions and enjoy delicious meals while reducing food waste.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 