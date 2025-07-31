import { motion } from "framer-motion";
import Image from "next/image";
import { Folder, ChefHat, Clock, Edit, Trash2, X, Plus } from "lucide-react";
import { Collection, Recipe } from "../../types";
import { getRecipeImage } from "../../utils";

interface CollectionCardProps {
  collection: Collection;
  index: number;
  onEdit: (collection: Collection) => void;
  onDelete: (collectionId: string) => void;
  onViewCollection: (collection: Collection) => void;
  onRemoveRecipe: (collectionId: string, recipeId: string) => void;
}

export default function CollectionCard({
  collection,
  index,
  onEdit,
  onDelete,
  onViewCollection,
  onRemoveRecipe
}: CollectionCardProps) {
  const getCollectionColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      orange: "bg-gradient-to-r from-orange-100 to-orange-200",
      red: "bg-gradient-to-r from-red-100 to-red-200",
      blue: "bg-gradient-to-r from-blue-100 to-blue-200",
      green: "bg-gradient-to-r from-green-100 to-green-200",
      gray: "bg-gradient-to-r from-gray-100 to-gray-200",
      pink: "bg-gradient-to-r from-pink-100 to-pink-200"
    };
    return colorMap[color] || colorMap.orange;
  };

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.1
      }}
      whileHover={{ 
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden relative"
    >
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCollectionColorClasses(collection.color)} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      {/* Collection Header */}
      <div className="relative p-8 border-b border-gray-100">
        {/* Top Border */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${getCollectionBorderColor(collection.color)}`}></div>
        
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-xl ${getCollectionColorClasses(collection.color)}`}>
                <Folder className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {collection.name}
              </h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              {collection.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(collection)}
              className="p-2 rounded-xl transition-all duration-200 hover:scale-110 text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(collection.id)}
              className="p-2 rounded-xl transition-all duration-200 hover:scale-110 text-red-400 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100">
            <div className={`p-1.5 rounded-lg ${getCollectionColorClasses(collection.color)}`}>
              <ChefHat className="w-4 h-4 text-gray-700" />
            </div>
            <span className="font-semibold text-gray-800">{collection.recipes.length} recipes</span>
          </div>
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100">
            <div className={`p-1.5 rounded-lg ${getCollectionColorClasses(collection.color)}`}>
              <Clock className="w-4 h-4 text-gray-700" />
            </div>
            <span className="font-semibold text-gray-800">{new Date(collection.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Collection Content */}
      <div className="relative p-6">
        {collection.recipes.length > 0 ? (
          <div className="space-y-4">
            {collection.recipes.slice(0, 3).map((recipe, recipeIndex) => (
              <motion.div 
                key={recipe.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: recipeIndex * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-200 group/recipe"
              >
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                  <Image
                    src={getRecipeImage(recipe.ingredients)}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover/recipe:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-gray-900 truncate mb-1">
                    {recipe.title}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {recipe.cookingTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <ChefHat className="w-3 h-3" />
                      {recipe.servings} servings
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveRecipe(collection.id, recipe.id)}
                  className="p-2 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 opacity-0 group-hover/recipe:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            {collection.recipes.length > 3 && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-3 rounded-2xl text-gray-600 font-medium">
                  <Plus className="w-4 h-4" />
                  +{collection.recipes.length - 3} more recipes
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
              <ChefHat className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No recipes yet</h4>
            <p className="text-gray-500">Add some delicious recipes to get started!</p>
          </div>
        )}
        
        <button
          onClick={() => onViewCollection(collection)}
          className="w-full mt-4 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2"
        >
          <ChefHat className="w-4 h-4" />
          View Collection
        </button>
      </div>
    </motion.div>
  );
} 