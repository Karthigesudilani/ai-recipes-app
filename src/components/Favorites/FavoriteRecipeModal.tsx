import { motion } from "framer-motion";
import Image from "next/image";
import { X, Timer, Users, Award, Target, Download, Zap, ChefHat } from "lucide-react";
import { Recipe } from "../../types";
import { getWasteScoreColor, getRecipeImage, downloadRecipeAsPDF, getIngredientStatus } from "../../utils";

interface FavoriteRecipeModalProps {
  showFullRecipe: boolean;
  selectedRecipe: Recipe | null;
  onClose: () => void;
}

export default function FavoriteRecipeModal({
  showFullRecipe,
  selectedRecipe,
  onClose
}: FavoriteRecipeModalProps) {
  if (!showFullRecipe || !selectedRecipe) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative h-48 rounded-t-2xl overflow-hidden">
          <Image
            src={getRecipeImage(selectedRecipe.ingredients)}
            alt={selectedRecipe.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold mb-2">{selectedRecipe.title}</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                {selectedRecipe.cookingTime}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {selectedRecipe.servings} servings
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                {selectedRecipe.difficulty}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Efficiency Score and Download */}
          <div className="flex items-center justify-between mb-6">
            <div className={`flex items-center gap-2 ${getWasteScoreColor(selectedRecipe.wasteScore)}`}>
              <Target className="w-5 h-5 fill-current" />
              <span className="font-semibold">
                {Math.round(selectedRecipe.wasteScore * 100)}% Ingredient Efficiency
              </span>
            </div>
            <button
              onClick={() => downloadRecipeAsPDF(selectedRecipe, getIngredientStatus)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              Ingredients
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {ingredient}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-500" />
              Instructions
            </h3>
            <ol className="space-y-3">
              {selectedRecipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {instruction}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 