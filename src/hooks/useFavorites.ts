import { useState, useEffect } from 'react';
import { Recipe } from '../types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = () => {
      setIsLoading(true);
      try {
        const savedFavorites = localStorage.getItem('favoriteRecipes');
        if (savedFavorites) {
          const parsedFavorites = JSON.parse(savedFavorites);
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error('Error parsing favorites:', error);
        setError('Failed to load favorites');
        localStorage.removeItem('favoriteRecipes');
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const addToFavorites = (recipe: Recipe) => {
    const updatedFavorites = [...favorites, recipe];
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (recipeId: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== recipeId);
    setFavorites(updatedFavorites);
    
    if (updatedFavorites.length === 0) {
      localStorage.removeItem('favoriteRecipes');
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    }
  };

  const toggleFavorite = (recipe: Recipe) => {
    const isFavorite = favorites.some(fav => fav.id === recipe.id);
    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favoriteRecipes');
  };

  return {
    favorites,
    isLoading,
    error,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites
  };
} 