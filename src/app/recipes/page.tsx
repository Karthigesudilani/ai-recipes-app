"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Plus, Loader2 } from "lucide-react";
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
import Toast, { Toast as ToastType } from "../../components/Toast";
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

  // Toast state
  const [toast, setToast] = useState<ToastType | null>(null);

  // Custom hooks
  const { recipes, filteredRecipes, isLoading, error, generateRecipes, filterRecipes } = useRecipes();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { collections, createCollection, addRecipeToCollection } = useCollections();

  const showToast = (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => {
    setToast({
      id: Date.now().toString(),
      type,
      title,
      message,
      duration: 4000
    });
  };

  useEffect(() => {
    // Load ingredients from localStorage
    const storedIngredients = localStorage.getItem('userIngredients');
    const storedDiet = localStorage.getItem('userDiet');
    
    if (storedIngredients) {
      const ingredients = JSON.parse(storedIngredients);
      setUserIngredients(ingredients);
      
      // Only generate recipes if we have ingredients and haven't already generated them
      if (ingredients.length > 0 && recipes.length === 0) {
        // Small delay to ensure state is set before generating recipes
        setTimeout(() => {
          handleGenerateRecipes();
        }, 100);
      }
    }
    if (storedDiet) {
      setUserDiet(storedDiet);
    }
  }, []);

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
      showToast('warning', 'No Ingredients', 'Please add some ingredients first.');
      return;
    }

    try {
      await generateRecipes(ingredients, diet);
      showToast('success', 'Recipes Generated', 'Your personalized recipes are ready!');
    } catch (error) {
      showToast('error', 'Generation Failed', 'Failed to generate recipes. Please try again.');
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
    showToast(
      isCurrentlyFavorite ? 'info' : 'success',
      isCurrentlyFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      isCurrentlyFavorite ? 'Recipe removed from your favorites.' : 'Recipe added to your favorites!'
    );
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
      showToast('warning', 'Invalid Collection', 'Please enter a collection name.');
      return;
    }

    const createdCollection = createCollection(newCollection);
    if (createdCollection) {
      setNewCollection({ name: "", description: "", color: "gray" });
    setShowCreateCollectionModal(false);
      showToast('success', 'Collection Created', 'Your new collection has been created!');
    }
  };

  const handleAddRecipeToCollection = (collectionId: string, recipe: Recipe) => {
    addRecipeToCollection(collectionId, recipe);
    setShowCollectionModal(false);
    showToast('success', 'Recipe Added', 'Recipe has been added to the collection!');
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
      showToast('error', 'Enhancement Failed', 'Failed to get AI enhancement. Please try again.');
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''} Found
              </h2>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showMissingIngredients}
                  onChange={(e) => setShowMissingIngredients(e.target.checked)}
                  className="rounded"
                />
                Show missing ingredients
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
            <button
              onClick={handleAddMoreIngredients}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add More Ingredients
            </button>
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

        {/* Toast */}
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    </div>
  );
} 