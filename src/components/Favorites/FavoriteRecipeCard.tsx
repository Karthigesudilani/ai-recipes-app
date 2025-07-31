import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ChefHat, 
  Clock, 
  Users, 
  Star, 
  Award, 
  Target, 
  Download, 
  Trash2, 
  Timer,
  Zap
} from "lucide-react";
import { Recipe } from "../../types";
import { getWasteScoreColor, getRecipeImage } from "../../utils";

interface FavoriteRecipeCardProps {
  recipe: Recipe;
  index: number;
  onViewFullRecipe: (recipe: Recipe) => void;
  onRemoveFromFavorites: (recipeId: string) => void;
  onDownloadPDF: (recipe: Recipe) => void;
}

export default function FavoriteRecipeCard({
  recipe,
  index,
  onViewFullRecipe,
  onRemoveFromFavorites,
  onDownloadPDF
}: FavoriteRecipeCardProps) {
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
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
        
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
              <Award className="w-3 h-3" />
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
              onClick={() => onRemoveFromFavorites(recipe.id)}
              className="p-1.5 rounded-full transition-all duration-200 hover:scale-110 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
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
          {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm p-2 rounded-lg bg-gray-50 dark:bg-gray-700/30 text-gray-600 dark:text-gray-300"
            >
              <div className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
              <span className="capitalize flex-1 text-xs">{ingredient}</span>
            </div>
          ))}
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
        <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button 
            onClick={() => onViewFullRecipe(recipe)}
            className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2"
          >
            <ChefHat className="w-4 h-4" />
            View Full Recipe
          </button>
          <button 
            onClick={() => onDownloadPDF(recipe)}
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </motion.div>
  );
} 