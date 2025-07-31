"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Clock, Star, TrendingUp } from "lucide-react";
import { Input } from "../UI";

interface IngredientInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onAddIngredient: (ingredient: string) => void;
  ingredients: string[];
}

export default function IngredientInput({ 
  inputValue, 
  setInputValue, 
  onAddIngredient, 
  ingredients 
}: IngredientInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Popular ingredients for autocomplete
  const popularIngredients = [
    "chicken", "beef", "pork", "fish", "salmon", "tuna", "shrimp",
    "rice", "pasta", "bread", "potato", "onion", "garlic", "tomato",
    "carrot", "broccoli", "spinach", "lettuce", "cucumber", "bell pepper",
    "mushroom", "eggplant", "zucchini", "squash", "corn", "peas",
    "cheese", "milk", "yogurt", "butter", "cream", "sour cream",
    "egg", "flour", "sugar", "salt", "pepper", "oil", "vinegar",
    "lemon", "lime", "orange", "apple", "banana", "strawberry",
    "chocolate", "vanilla", "cinnamon", "oregano", "basil", "thyme"
  ];

  const handleAddClick = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !ingredients.includes(trimmedValue)) {
      onAddIngredient(trimmedValue);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onAddIngredient(suggestion);
    setInputValue("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = popularIngredients
        .filter(ingredient => 
          ingredient.toLowerCase().includes(inputValue.toLowerCase()) &&
          !ingredients.includes(ingredient)
        )
        .slice(0, 8);
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, ingredients]);

  // Handle keyboard navigation
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        handleSuggestionClick(filteredSuggestions[selectedIndex]);
      } else {
        handleAddClick();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="bg-white rounded-2xl py-6 border-gray-100">
        <label className="block text-lg font-bold text-gray-700 mb-2">
          Enter the Ingredients
        </label>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 relative me-4">
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Type an ingredient (e.g., chicken, tomato, rice)..."
              rightIcon={<Search className="w-4 h-4" />}
              fullWidth
            />
            
            {/* Enhanced Autocomplete Suggestions */}
            <AnimatePresence>
              {showSuggestions && filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
                >
                  <div className="p-2">
                    <div className="text-xs text-gray-500 px-3 py-1 font-medium">
                      Popular Ingredients
                    </div>
                    {filteredSuggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSuggestionClick(suggestion);
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full px-3 py-3 text-left transition-all duration-150 flex items-center gap-3 cursor-pointer text-sm rounded-md ${
                          index === selectedIndex
                            ? "bg-orange-50 text-orange-700 border border-orange-200"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                        type="button"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-3 h-3 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <span className="capitalize font-medium">{suggestion}</span>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {suggestion.includes(" ") ? "Common ingredient" : "Basic ingredient"}
                          </div>
                        </div>
                        {index === selectedIndex && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-orange-500 rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddClick}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl"
          >
            <Plus size={18} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add</span>
            <span className="sm:hidden">+</span>
          </motion.button>
        </div>
        
        {/* Enhanced Help Text */}
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Press Enter or comma to add</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>Use autocomplete for popular ingredients</span>
          </div>
        </div>
      </div>
    </div>
  );
} 