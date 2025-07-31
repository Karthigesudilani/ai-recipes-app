"use client";

import { Heart, Clock, Sparkles, Users, Globe, ChefHat } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BenefitsSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
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
            Why Choose Smart Recipe Finder?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover the benefits that make cooking easier and more sustainable
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
            >
              <Heart className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Reduce Food Waste</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Use up to 90% of your available ingredients, significantly reducing food waste and saving money.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-4 relative h-32 rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?w=400&h=200&fit=crop&crop=center"
                alt="Fresh vegetables"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
            >
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Save Time</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No more staring at the fridge wondering what to cook. Get instant recipe suggestions in seconds.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-4 relative h-32 rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?w=400&h=200&fit=crop&crop=center"
                alt="Quick meal preparation"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
            >
              <Sparkles className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Advanced AI technology that understands ingredient combinations and creates delicious recipes.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-4 relative h-32 rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=200&fit=crop&crop=center"
                alt="AI-generated recipe"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
            >
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Dietary Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Accommodate vegan, vegetarian, gluten-free, and other dietary restrictions with ease.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-4 relative h-32 rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?w=400&h=200&fit=crop&crop=center"
                alt="Healthy dietary options"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
            >
              <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Cuisine</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover recipes from around the world, expanding your culinary horizons with every meal.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-4 relative h-32 rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?w=400&h=200&fit=crop&crop=center"
                alt="International cuisine"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4"
            >
              <ChefHat className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy Instructions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Step-by-step cooking instructions that are clear, simple, and perfect for all skill levels.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-4 relative h-32 rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=200&fit=crop&crop=center"
                alt="Easy cooking instructions"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 