"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ProblemSolutionSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              The Problem We Solve
            </h2>
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mt-1"
                >
                  <span className="text-red-600 dark:text-red-400 text-sm font-bold">!</span>
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Food Waste Crisis</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    You&apos;ve got random ingredients in your fridge, but no idea what to cook. 
                    Sound familiar? We&apos;ve all been there.
                  </p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mt-1"
                >
                  <span className="text-red-600 dark:text-red-400 text-sm font-bold">!</span>
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Decision Paralysis</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our AI analyzes your available ingredients and creates personalized recipes 
                    that minimize waste and maximize flavor. No more decision paralysis!
                  </p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mt-1"
                >
                  <span className="text-red-600 dark:text-red-400 text-sm font-bold">!</span>
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Recipe Overwhelm</h3>
                  <p className="text-gray-600 dark:text-gray-300">Thousands of recipes online, but none match what&apos;s actually in your kitchen.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Solution</h3>
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300">AI analyzes your ingredients</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300">Generates personalized recipes</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300">Minimizes food waste</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300">Saves time and money</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 