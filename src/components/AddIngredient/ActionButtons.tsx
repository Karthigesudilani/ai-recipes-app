"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../UI";

interface ActionButtonsProps {
  ingredients: string[];
  onFindRecipes: () => void;
}

export default function ActionButtons({ ingredients, onFindRecipes }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <div className="flex-1">
        <Button
          onClick={onFindRecipes}
          disabled={ingredients.length === 0}
          leftIcon={<Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />}
          variant="primary"
          size="lg"
          fullWidth
        >
          <span className="hidden sm:inline">Find Recipes ({ingredients.length} ingredients)</span>
          <span className="sm:hidden">Find Recipes ({ingredients.length})</span>
        </Button>
      </div>
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