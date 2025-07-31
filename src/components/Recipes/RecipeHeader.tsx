"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, RefreshCw, Search } from "lucide-react";

interface RecipeHeaderProps {
  userIngredients: string[];
  userDiet: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddMoreIngredients: () => void;
  onRegenerateRecipes: () => void;
  isLoading: boolean;
}

export default function RecipeHeader({
  userIngredients,
  userDiet,
  searchQuery,
  onSearchChange,
  onAddMoreIngredients,
  onRegenerateRecipes,
  isLoading
}: RecipeHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <Link 
          href="/add-ingredients"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Ingredients
        </Link>
      </div>
      
      {/* Recipe Header with Image */}
      <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg mb-4">
        <Image
          src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?w=800&h=300&fit=crop&crop=center"
          alt="Delicious recipes"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold mb-2">Recipe Suggestions</h1>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 max-w-2xl">
            <p className="text-sm opacity-90">
              Based on your ingredients: <span className="font-medium">{userIngredients.join(', ')}</span>
              {userDiet && userDiet !== "none" && <span className="ml-2 text-orange-300">({userDiet})</span>}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">{userIngredients.length} ingredients</span> • Ready to cook!
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={onAddMoreIngredients}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add More Ingredients
          </button>
          <button
            onClick={onRegenerateRecipes}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search recipes by name or ingredients..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
          />
        </div>
      </motion.div>
    </div>
  );
} 