"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ActionButtonsProps {
  ingredients: string[];
  onFindRecipes: () => void;
}

export default function ActionButtons({ ingredients, onFindRecipes }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex-1"
      >
        <button
          onClick={onFindRecipes}
          disabled={ingredients.length === 0}
          className="w-full px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-semibold text-base sm:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Find Recipes ({ingredients.length} ingredients)</span>
          <span className="sm:hidden">Find Recipes ({ingredients.length})</span>
        </button>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href="/"
          className="block px-4 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-center"
        >
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </Link>
      </motion.div>
    </div>
  );
} 