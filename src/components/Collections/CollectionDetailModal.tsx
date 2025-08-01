import { motion } from "framer-motion";
import Image from "next/image";
import { X, ChefHat, Clock, Download, FileText } from "lucide-react";
import { Collection, Recipe } from "../../types";
import { getRecipeImage, downloadRecipeAsPDF, getIngredientStatus } from "../../utils";
import { Modal, Button } from "../UI";

interface CollectionDetailModalProps {
  showModal: boolean;
  selectedCollection: Collection | null;
  onClose: () => void;
  onViewRecipe: (recipe: Recipe) => void;
  onRemoveRecipe: (collectionId: string, recipeId: string) => void;
}

export default function CollectionDetailModal({
  showModal,
  selectedCollection,
  onClose,
  onViewRecipe,
  onRemoveRecipe
}: CollectionDetailModalProps) {
  if (!showModal || !selectedCollection) return null;

  const getCollectionBorderColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      orange: "bg-gradient-to-r from-orange-500 to-orange-600",
      red: "bg-gradient-to-r from-red-500 to-red-600",
      blue: "bg-gradient-to-r from-blue-500 to-blue-600",
      green: "bg-gradient-to-r from-green-500 to-green-600",
      gray: "bg-gradient-to-r from-gray-500 to-gray-600",
      pink: "bg-gradient-to-r from-pink-500 to-pink-600"
    };
    return colorMap[color] || colorMap.orange;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Fixed */}
        <div className={`relative h-44 rounded-t-3xl overflow-hidden flex-shrink-0 bg-gradient-to-br ${getCollectionBorderColor(selectedCollection.color)}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
          <div className="absolute top-6 right-6">
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl text-white hover:bg-white/30 shadow-lg"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{selectedCollection.name}</h2>
                <p className="text-lg opacity-90 drop-shadow-md">{selectedCollection.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
                <ChefHat className="w-5 h-5" />
                <span className="font-semibold">{selectedCollection.recipes.length} recipes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">{new Date(selectedCollection.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-8 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Recipes ({selectedCollection.recipes.length})
            </h3>
          </div>

          {selectedCollection.recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCollection.recipes.map((recipe, index) => (
                <motion.div 
                  key={recipe.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => onViewRecipe(recipe)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={getRecipeImage(recipe.ingredients)}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadRecipeAsPDF(recipe, getIngredientStatus);
                        }}
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-orange-500 opacity-0 group-hover:opacity-100"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveRecipe(selectedCollection.id, recipe.id);
                        }}
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-red-500 opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                          ⭐ {Math.round(recipe.wasteScore * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 truncate mb-3 group-hover:text-orange-600 transition-colors">
                      {recipe.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {recipe.cookingTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <ChefHat className="w-3 h-3" />
                        {recipe.servings} servings
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                        {recipe.difficulty}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {recipe.usedIngredients.length} ingredients used
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Click to view details</span>
                      <FileText className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-3xl flex items-center justify-center">
                <ChefHat className="w-10 h-10 text-gray-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No recipes yet</h4>
              <p className="text-gray-500">Add some delicious recipes to this collection!</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 