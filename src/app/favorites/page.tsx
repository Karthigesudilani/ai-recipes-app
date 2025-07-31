"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import {
  FavoritesHeader,
  EmptyFavorites,
  FavoriteRecipeCard,
  FavoriteRecipeModal
} from "../../components/Favorites";
import { Recipe } from "../../types";
import { downloadRecipeAsPDF, getIngredientStatus } from "../../utils";
import { useFavorites } from "../../hooks";

export default function FavoritesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showFullRecipe, setShowFullRecipe] = useState(false);

  const { favorites, removeFromFavorites, isLoading, error } = useFavorites();

  const handleViewFullRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowFullRecipe(true);
  };

  const handleRemoveFromFavorites = (recipeId: string) => {
    removeFromFavorites(recipeId);
  };

  const handleDownloadPDF = (recipe: Recipe) => {
    downloadRecipeAsPDF(recipe, getIngredientStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <FavoritesHeader favoritesCount={favorites.length} />

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading your favorites...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
          >
            <p className="text-red-800">{error}</p>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && favorites.length === 0 && !error && (
          <EmptyFavorites />
        )}

        {/* Favorites Grid */}
        {!isLoading && favorites.length > 0 && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {favorites.map((recipe, index) => (
                <FavoriteRecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  index={index}
                  onViewFullRecipe={handleViewFullRecipe}
                  onRemoveFromFavorites={handleRemoveFromFavorites}
                  onDownloadPDF={handleDownloadPDF}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Full Recipe Modal */}
        <FavoriteRecipeModal
          showFullRecipe={showFullRecipe}
          selectedRecipe={selectedRecipe}
          onClose={() => setShowFullRecipe(false)}
        />
      </div>
    </div>
  );
} 