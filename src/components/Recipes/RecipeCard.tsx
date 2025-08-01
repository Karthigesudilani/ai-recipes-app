"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ChefHat, Clock, Users, Star, Heart, Flame, Timer, 
  Target, Download, Folder, RefreshCw, Check, Zap, Award 
} from "lucide-react";
import { Recipe } from "../../types";
import { getRecipeImage, getIngredientStatus, getWasteScoreColor } from "../../utils";
import { Button } from "../UI";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  showMissingIngredients: boolean;
  isFavorite: (recipeId: string) => boolean;
  toggleFavorite: (recipe: Recipe) => void;
  onViewFullRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
  onAddToCollection: (recipe: Recipe) => void;
  onSubstitutionEnhancement: (recipe: Recipe) => void;
  onNutritionEnhancement: (recipe: Recipe) => void;
}

export default function RecipeCard({
  recipe,
  index,
  showMissingIngredients,
  isFavorite,
  toggleFavorite,
  onViewFullRecipe,
  onStartCooking,
  onAddToCollection,
  onSubstitutionEnhancement,
  onNutritionEnhancement
}: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      {/* Recipe Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
        
        {/* Recipe Image */}
        <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
          <Image
            src={getRecipeImage(recipe.ingredients)}
            alt={recipe.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute top-2 right-2">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm ${
              recipe.difficulty === 'Easy' ? 'text-green-800' :
              recipe.difficulty === 'Medium' ? 'text-yellow-800' :
              'text-red-800'
            }`}>
              <Flame className="w-3 h-3" />
              {recipe.difficulty}
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {recipe.title}
          </h3>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 ${getWasteScoreColor(recipe.wasteScore)}`}>
              <Target className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">
                {Math.round(recipe.wasteScore * 100)}%
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(recipe);
              }}
              className={`p-1.5 rounded-full transition-all duration-200 hover:scale-110 ${
                isFavorite(recipe.id)
                  ? 'text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite(recipe.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Recipe Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <Timer className="w-3 h-3" />
            {recipe.cookingTime}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {recipe.servings}
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span className="capitalize">{recipe.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-orange-500" />
          Ingredients
        </h4>
        <div className="space-y-2">
          {recipe.ingredients.slice(0, 4).map((ingredient, index) => {
            const status = getIngredientStatus(ingredient, recipe);
            return (
              <div
                key={index}
                className={`flex items-center gap-2 text-sm p-2 rounded-lg transition-colors ${
                  status === "used"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                    : status === "missing"
                    ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                    : "bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    status === "used"
                      ? "bg-green-500"
                      : status === "missing"
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}
                />
                <span className="capitalize flex-1 text-xs">{ingredient}</span>
                {status === "used" && (
                  <span className="text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Have
                  </span>
                )}
                {status === "missing" && showMissingIngredients && (
                  <span className="text-xs bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-full font-medium">
                    Need
                  </span>
                )}
              </div>
            );
          })}
          {recipe.ingredients.length > 4 && (
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
              +{recipe.ingredients.length - 4} more ingredients
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-white dark:bg-gray-800">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-orange-500" />
          Instructions
        </h4>
        <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          {recipe.instructions.slice(0, 3).map((instruction, index) => (
            <li key={index} className="flex gap-3 p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
              <span className="leading-relaxed text-xs">{instruction}</span>
            </li>
          ))}
          {recipe.instructions.length > 3 && (
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-2">
              +{recipe.instructions.length - 3} more steps
            </div>
          )}
        </ol>
        
        {/* Action Buttons */}
        <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <Button 
            onClick={() => onViewFullRecipe(recipe)}
            leftIcon={<ChefHat className="w-4 h-4" />}
            variant="primary"
            size="sm"
            fullWidth
          >
            View Full Recipe
          </Button>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Button
              onClick={() => onStartCooking(recipe)}
              leftIcon={<Timer className="w-3 h-3" />}
              variant="primary"
              size="sm"
              className="bg-green-500 hover:bg-green-600"
            >
              Start Cooking
            </Button>
            <Button
              onClick={() => onAddToCollection(recipe)}
              leftIcon={<Folder className="w-3 h-3" />}
              variant="secondary"
              size="sm"
            >
              Add to Collection
            </Button>
          </div>
          
          {/* AI Enhancement Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => onSubstitutionEnhancement(recipe)}
              leftIcon={<RefreshCw className="w-3 h-3" />}
              variant="primary"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600"
            >
              Substitutions
            </Button>
            <Button
              onClick={() => onNutritionEnhancement(recipe)}
              leftIcon={<Target className="w-3 h-3" />}
              variant="primary"
              size="sm"
              className="bg-purple-500 hover:bg-purple-600"
            >
              Nutrition
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 