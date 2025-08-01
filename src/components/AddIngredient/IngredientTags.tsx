"use client";

import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../UI";

interface IngredientTagsProps {
  ingredients: string[];
  onRemoveIngredient: (index: number) => void;
  onClearAll: () => void;
  loadedFromStorage: boolean;
}

export default function IngredientTags({ 
  ingredients, 
  onRemoveIngredient, 
  onClearAll,
  loadedFromStorage 
}: IngredientTagsProps) {
  if (ingredients.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Your Ingredients ({ingredients.length})
        </h3>
        <Button
          onClick={onClearAll}
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 self-start sm:self-center"
        >
          Clear All
        </Button>
      </div>
      <motion.div 
        layout
        className="flex flex-wrap gap-2"
      >
        <AnimatePresence>
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-1 sm:gap-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-orange-200 dark:border-orange-700"
            >
              <span className="text-xs sm:text-sm font-medium capitalize">{ingredient}</span>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => onRemoveIngredient(index)}
                className="text-orange-600 dark:text-orange-300 hover:text-orange-800 dark:hover:text-orange-100 transition-colors"
              >
                <X size={14} className="sm:w-4 sm:h-4" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
        <Sparkles className="w-4 h-4 text-green-500" />
        <span>
          {loadedFromStorage ? "Loaded your previous ingredients!" : "Ready to find recipes with these ingredients!"}
        </span>
      </div>
    </div>
  );
} 