"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Plus, Loader2, Eye, EyeOff } from "lucide-react";
import Header from "../../components/Header";
import {
  RecipeCard,
  RecipeHeader,
  AddIngredientsSection,
  CookingModeModal,
  CollectionModal,
  CreateCollectionModal,
  AIEnhancementModal
} from "../../components/Recipes";
import { FavoriteRecipeModal } from "../../components/Favorites";
import { useToast, ToastContainer, Button } from "../../components/UI";
import { Recipe, CookingMode, NewCollection, EnhancementType, AIEnhancementResult } from "../../types";
import { useRecipes, useFavorites, useCollections } from "../../hooks";

export default function Recipes() {
  const [showMissingIngredients, setShowMissingIngredients] = useState(false);
  const [userIngredients, setUserIngredients] = useState<string[]>([]);
  const [userDiet, setUserDiet] = useState<string>("");
  const [showAddIngredients, setShowAddIngredients] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showFullRecipe, setShowFullRecipe] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cookingMode, setCookingMode] = useState<CookingMode>({
    recipe: null,
    currentStep: 0,
    timer: null
  });
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [selectedRecipeForCollection, setSelectedRecipeForCollection] = useState<Recipe | null>(null);
  const [showCreateCollectionModal, setShowCreateCollectionModal] = useState(false);
  const [newCollection, setNewCollection] = useState<NewCollection>({ name: "", description: "", color: "gray" });
  
  // AI Enhancement states
  const [showAIEnhancements, setShowAIEnhancements] = useState(false);
  const [enhancementType, setEnhancementType] = useState<EnhancementType>('substitution');
  const [enhancementResult, setEnhancementResult] = useState<AIEnhancementResult | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Custom hooks
  const { recipes, filteredRecipes, isLoading, error, generateRecipes, filterRecipes } = useRecipes();
  const { toasts, success, error: showToastError, info, warning, removeToast } = useToast();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { collections, createCollection, addRecipeToCollection } = useCollections();
  
  // Ref to prevent double API calls
  const hasGeneratedRecipes = useRef(false);



  useEffect(() => {
    // Load ingredients from localStorage
    const storedIngredients = localStorage.getItem('userIngredients');
    const storedDiet = localStorage.getItem('userDiet');
    
    if (storedIngredients) {
      const ingredients = JSON.parse(storedIngredients);
      setUserIngredients(ingredients);
      
      // Only generate recipes if we have ingredients and haven't already generated them
      if (ingredients.length > 0 && recipes.length === 0 && !hasGeneratedRecipes.current) {
        hasGeneratedRecipes.current = true;
        // Small delay to ensure state is set before generating recipes
        setTimeout(() => {
          handleGenerateRecipes();
        }, 100);
      }
    }
    if (storedDiet) {
      setUserDiet(storedDiet);
    }
  }, []); // Empty dependency array to run only once

  // Update filtered recipes when recipes change
  useEffect(() => {
    filterRecipes(searchQuery);
  }, [recipes, searchQuery]);

  const handleGenerateRecipes = async () => {
    const storedIngredients = localStorage.getItem('userIngredients');
    const storedDiet = localStorage.getItem('userDiet');
    
    const ingredients = storedIngredients ? JSON.parse(storedIngredients) : userIngredients;
    const diet = storedDiet && storedDiet !== "none" ? storedDiet : "";
    
    if (ingredients.length === 0) {
      warning('No Ingredients', 'Please add some ingredients first.');
      return;
    }

    try {
      await generateRecipes(ingredients, diet);
      success('Recipes Generated', 'Your personalized recipes are ready!');
    } catch (error) {
      showToastError('Generation Failed', 'Failed to generate recipes. Please try again.');
    }
  };

  const handleAddMoreIngredients = () => {
    setShowAddIngredients(true);
  };

  const handleAddIngredient = (ingredient: string) => {
    if (!userIngredients.includes(ingredient)) {
      const updatedIngredients = [...userIngredients, ingredient];
      setUserIngredients(updatedIngredients);
      localStorage.setItem('userIngredients', JSON.stringify(updatedIngredients));
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    const updatedIngredients = userIngredients.filter(ingredient => ingredient !== ingredientToRemove);
    setUserIngredients(updatedIngredients);
      localStorage.setItem('userIngredients', JSON.stringify(updatedIngredients));
  };

  const handleToggleFavorite = (recipe: Recipe) => {
    toggleFavorite(recipe);
    const isCurrentlyFavorite = isFavorite(recipe.id);
    if (isCurrentlyFavorite) {
      info('Removed from Favorites', 'Recipe removed from your favorites.');
    } else {
      success('Added to Favorites', 'Recipe added to your favorites!');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterRecipes(query);
  };

  const startCookingMode = (recipe: Recipe) => {
    setCookingMode({
      recipe,
      currentStep: 0,
      timer: null
    });
  };

  const nextStep = () => {
    if (cookingMode.recipe && cookingMode.currentStep < cookingMode.recipe.instructions.length - 1) {
      setCookingMode(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    }
  };

  const previousStep = () => {
    if (cookingMode.currentStep > 0) {
      setCookingMode(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }));
    }
  };

  const exitCookingMode = () => {
    setCookingMode({
      recipe: null,
      currentStep: 0,
      timer: null
    });
  };

  const handleCreateCollection = () => {
    if (!newCollection.name.trim()) {
      warning('Invalid Collection', 'Please enter a collection name.');
      return;
    }

    const createdCollection = createCollection(newCollection);
    if (createdCollection) {
      setNewCollection({ name: "", description: "", color: "gray" });
    setShowCreateCollectionModal(false);
      success('Collection Created', 'Your new collection has been created!');
    }
  };

  const handleAddRecipeToCollection = (collectionId: string, recipe: Recipe) => {
    addRecipeToCollection(collectionId, recipe);
    setShowCollectionModal(false);
    success('Recipe Added', 'Recipe has been added to the collection!');
  };

  const handleAddToCollection = (recipe: Recipe) => {
    setSelectedRecipeForCollection(recipe);
    setShowCollectionModal(true);
  };

  const handleCreateNewCollection = () => {
    setShowCollectionModal(false);
    setShowCreateCollectionModal(true);
  };

  const getAIEnhancement = async (recipe: Recipe, type: 'substitution' | 'scaling' | 'dietary' | 'nutrition') => {
    setIsEnhancing(true);
    setEnhancementType(type);
    setShowAIEnhancements(true);

    try {
      const response = await fetch('/api/ai-enhancements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe,
          type,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get enhancement');
      }

      const result = await response.json();
      setEnhancementResult(result);
    } catch (error) {
      console.error('Error getting AI enhancement:', error);
      showToastError('Enhancement Failed', 'Failed to get AI enhancement. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubstitutionEnhancement = (recipe: Recipe) => {
    getAIEnhancement(recipe, 'substitution');
  };

  const handleNutritionEnhancement = (recipe: Recipe) => {
    getAIEnhancement(recipe, 'nutrition');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <RecipeHeader
          userIngredients={userIngredients}
          userDiet={userDiet}
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onAddMoreIngredients={handleAddMoreIngredients}
          onRegenerateRecipes={handleGenerateRecipes}
          isLoading={isLoading}
        />

          {/* Add Ingredients Section */}
          {showAddIngredients && (
          <AddIngredientsSection
            showAddIngredients={showAddIngredients}
            userIngredients={userIngredients}
            onClose={() => setShowAddIngredients(false)}
            onAddIngredient={handleAddIngredient}
            onRemoveIngredient={handleRemoveIngredient}
          />
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
            <p className="text-gray-600">Generating delicious recipes...</p>
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

        {/* Recipes Grid */}
        {!isLoading && filteredRecipes.length > 0 && (
          <div>
            <div className="md:flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''} Found
              </h2>
              <label className="mt-4 md:mt-0 flex items-center gap-4 text-sm cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showMissingIngredients}
                    onChange={(e) => setShowMissingIngredients(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-14 h-6 rounded-full transition-all duration-300 ease-in-out shadow-lg ${
                    showMissingIngredients 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-orange-500/25' 
                      : 'bg-gray-200 dark:bg-gray-600 shadow-gray-400/25'
                  }`}>
                    <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-300 ease-in-out flex items-center justify-center ${
                      showMissingIngredients ? 'translate-x-7' : 'translate-x-0.5'
                    }`}>
                      {showMissingIngredients ? (
                        <Eye className="w-3 h-3 text-orange-500" />
                      ) : (
                        <EyeOff className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold transition-colors duration-200 ${
                    showMissingIngredients 
                      ? 'text-orange-600 dark:text-orange-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    Show missing ingredients
                  </span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    showMissingIngredients 
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' 
                      : 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400'
                  }`}>
                    {showMissingIngredients ? 'ON' : 'OFF'}
                  </div>
                </div>
              </label>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {filteredRecipes.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    index={index}
                    showMissingIngredients={showMissingIngredients}
                    isFavorite={isFavorite}
                    toggleFavorite={handleToggleFavorite}
                    onViewFullRecipe={(recipe) => {
                          setSelectedRecipe(recipe);
                          setShowFullRecipe(true);
                        }}
                    onStartCooking={startCookingMode}
                    onAddToCollection={handleAddToCollection}
                    onSubstitutionEnhancement={handleSubstitutionEnhancement}
                    onNutritionEnhancement={handleNutritionEnhancement}
                  />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

        {/* No Recipes State */}
        {!isLoading && recipes.length === 0 && !error && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Recipes Generated
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adding more ingredients or different combinations.
            </p>
            <Button
              onClick={handleAddMoreIngredients}
              leftIcon={<Plus className="w-4 h-4" />}
              variant="primary"
              size="lg"
            >
              Add More Ingredients
            </Button>
          </div>
        )}

        {/* Modals */}
        <FavoriteRecipeModal
          showFullRecipe={showFullRecipe}
          selectedRecipe={selectedRecipe}
          onClose={() => setShowFullRecipe(false)}
        />

        <CookingModeModal
          cookingMode={cookingMode}
          onClose={exitCookingMode}
          onNextStep={nextStep}
          onPreviousStep={previousStep}
        />

        <CollectionModal
          showCollectionModal={showCollectionModal}
          selectedRecipeForCollection={selectedRecipeForCollection}
          collections={collections}
          onClose={() => setShowCollectionModal(false)}
          onAddToCollection={handleAddRecipeToCollection}
          onCreateNewCollection={handleCreateNewCollection}
        />

        <CreateCollectionModal
          showCreateCollectionModal={showCreateCollectionModal}
          newCollection={newCollection}
          onClose={() => setShowCreateCollectionModal(false)}
          onCreateCollection={handleCreateCollection}
          onUpdateCollection={(field, value) => setNewCollection(prev => ({ ...prev, [field]: value }))}
        />

        <AIEnhancementModal
          showAIEnhancements={showAIEnhancements}
          enhancementType={enhancementType}
          enhancementResult={enhancementResult}
          isEnhancing={isEnhancing}
          onClose={() => setShowAIEnhancements(false)}
        />

        {/* Toast Container */}
        <ToastContainer
          toasts={toasts}
          onClose={removeToast}
        />
      </div>
    </div>
  );
} 