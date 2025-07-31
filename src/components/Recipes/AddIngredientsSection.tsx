"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";

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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular ingredients for autocomplete
  const popularIngredients = [
    "tomato", "onion", "garlic", "potato", "carrot", "bell pepper", "mushroom",
    "chicken", "beef", "pork", "fish", "shrimp", "egg", "milk", "cheese",
    "rice", "pasta", "bread", "flour", "butter", "olive oil", "soy sauce",
    "lemon", "lime", "ginger", "basil", "oregano", "thyme", "rosemary",
    "spinach", "lettuce", "cucumber", "avocado", "banana", "apple", "orange",
    "strawberry", "blueberry", "chocolate", "sugar", "salt", "pepper"
  ];

  const handleInputChange = (value: string) => {
    setNewIngredient(value);
    if (value.trim()) {
      const filtered = popularIngredients.filter(
        ingredient => 
          ingredient.toLowerCase().includes(value.toLowerCase()) &&
          !userIngredients.includes(ingredient)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const trimmedSuggestion = suggestion.trim();
    if (trimmedSuggestion && !userIngredients.includes(trimmedSuggestion)) {
      onAddIngredient(trimmedSuggestion);
      setNewIngredient("");
      setShowSuggestions(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
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
              <button
                onClick={() => onRemoveIngredient(ingredient)}
                className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-200"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add New Ingredient */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              ref={inputRef}
              type="text"
              value={newIngredient}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newIngredient.trim()) {
                  handleSuggestionClick(newIngredient.trim());
                }
              }}
              placeholder="Type an ingredient..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            onClick={() => {
              if (newIngredient.trim() && !userIngredients.includes(newIngredient.trim())) {
                handleSuggestionClick(newIngredient.trim());
              }
            }}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            Add
          </button>
        </div>

        {/* Autocomplete Suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 mt-1 max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSuggestionClick(suggestion);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
} 