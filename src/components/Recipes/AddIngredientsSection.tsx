"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { Button, Input } from "../UI";
import IngredientInput from "../AddIngredient/IngredientInput";

interface AddIngredientsSectionProps {
  showAddIngredients: boolean;
  userIngredients: string[];
  onClose: () => void;
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
}

export default function AddIngredientsSection({
  showAddIngredients,
  userIngredients,
  onClose,
  onAddIngredient,
  onRemoveIngredient
}: AddIngredientsSectionProps) {
  const [newIngredient, setNewIngredient] = useState("");

  if (!showAddIngredients) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-200 dark:border-orange-800 p-6 mb-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Add More Ingredients
        </h3>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Current Ingredients */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Current ingredients:</p>
        <div className="flex flex-wrap gap-2">
          {userIngredients.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm"
            >
              <span className="capitalize">{ingredient}</span>
              <Button
                onClick={() => onRemoveIngredient(ingredient)}
                variant="ghost"
                size="sm"
                className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-200 p-0 h-auto"
              >
                <X className="w-3 h-3" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add New Ingredient */}
      <IngredientInput
        inputValue={newIngredient}
        setInputValue={setNewIngredient}
        onAddIngredient={onAddIngredient}
        ingredients={userIngredients}
      />
    </motion.div>
  );
} 