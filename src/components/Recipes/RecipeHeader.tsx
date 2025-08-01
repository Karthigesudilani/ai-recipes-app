"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, RefreshCw, Search } from "lucide-react";
import { Input, Button } from "../UI";

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
          <Button
            onClick={onAddMoreIngredients}
            leftIcon={<Plus className="w-4 h-4" />}
            variant="primary"
            size="sm"
          >
            Add More Ingredients
          </Button>
          <Button
            onClick={onRegenerateRecipes}
            disabled={isLoading}
            leftIcon={<RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
            variant="secondary"
            size="sm"
          >
            Regenerate
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search recipes by name or ingredients..."
          leftIcon={<Search className="w-5 h-5" />}
          fullWidth
          size="lg"
        />
      </motion.div>
    </div>
  );
} 