import { useState, useEffect } from 'react';
import { Recipe } from '../types';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const generateRecipes = async (ingredients: string[], dietaryRestrictions?: string) => {
    if (ingredients.length === 0) {
      const errorMessage = "No ingredients found. Please add some ingredients first.";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ingredients,
          dietaryRestrictions: dietaryRestrictions || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        const errorMessage = errorData.error || 'Failed to generate recipes';
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      const recipes: Recipe[] = await response.json();
      setRecipes(recipes);
    } catch (error) {
      console.error("Error generating recipes:", error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate recipes. Please try again.';
      setError(errorMessage);
      throw error; // Re-throw the error so the calling component can handle it
    } finally {
      setIsLoading(false);
    }
  };

  const filterRecipes = (query: string) => {
    if (!query.trim()) {
      setFilteredRecipes(recipes);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(lowerQuery)
      )
    );
    setFilteredRecipes(filtered);
  };

  // Update filtered recipes when recipes change
  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  return {
    recipes,
    filteredRecipes,
    isLoading,
    error,
    generateRecipes,
    filterRecipes,
    setRecipes
  };
} 