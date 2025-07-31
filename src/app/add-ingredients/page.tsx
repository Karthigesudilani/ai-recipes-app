"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import {
  HeaderSection,
  BackgroundImages,
  IngredientInput,
  IngredientTags,
  DietaryPreferences,
  ActionButtons,
  TipsSection
} from "../../components/AddIngredient";

export default function AddIngredients() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedDiet, setSelectedDiet] = useState<string>("none");
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);
  const router = useRouter();

  // Load existing ingredients and diet from localStorage on component mount
  useEffect(() => {
    const storedIngredients = localStorage.getItem('userIngredients');
    const storedDiet = localStorage.getItem('userDiet');
    
    if (storedIngredients) {
      try {
        const ingredients = JSON.parse(storedIngredients);
        setIngredients(ingredients);
        if (ingredients.length > 0) {
          setLoadedFromStorage(true);
        }
      } catch (error) {
        console.error('Error parsing stored ingredients:', error);
      }
    }
    
    if (storedDiet) {
      setSelectedDiet(storedDiet);
    }
  }, []);

  const addIngredient = (ingredient: string) => {
    const trimmedIngredient = ingredient.trim();
    
    if (trimmedIngredient && !ingredients.includes(trimmedIngredient)) {
      const newIngredients = [...ingredients, trimmedIngredient];
      setIngredients(newIngredients);
      setInputValue("");
      
      // Update localStorage
      localStorage.setItem('userIngredients', JSON.stringify(newIngredients));
      
      // Reset loaded from storage flag since we're adding new ingredients
      setLoadedFromStorage(false);
    }
  };

  const removeIngredient = (indexToRemove: number) => {
    const newIngredients = ingredients.filter((_, index) => index !== indexToRemove);
    setIngredients(newIngredients);
    
    // Update localStorage
    if (newIngredients.length === 0) {
      localStorage.removeItem('userIngredients');
    } else {
      localStorage.setItem('userIngredients', JSON.stringify(newIngredients));
    }
  };

  const clearAllIngredients = () => {
    setIngredients([]);
    localStorage.removeItem('userIngredients');
    setLoadedFromStorage(false);
  };

  const handleFindRecipes = () => {
    if (ingredients.length > 0) {
      // Store ingredients in localStorage for the recipes page
      localStorage.setItem('userIngredients', JSON.stringify(ingredients));
      
      // Store diet preference (only if not "none")
      if (selectedDiet && selectedDiet !== "none") {
        localStorage.setItem('userDiet', selectedDiet);
      } else {
        localStorage.removeItem('userDiet');
      }
      
      // Small delay to ensure localStorage is saved before navigation
      setTimeout(() => {
        router.push('/recipes');
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Header showBackButton={true} backUrl="/" />
      </motion.div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <HeaderSection />

        <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Background Images */}
          <BackgroundImages />
          
          {/* Input Section */}
          <IngredientInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onAddIngredient={addIngredient}
            ingredients={ingredients}
          />

          {/* Ingredients Tags */}
          <IngredientTags
            ingredients={ingredients}
            onRemoveIngredient={removeIngredient}
            onClearAll={clearAllIngredients}
            loadedFromStorage={loadedFromStorage}
          />

          {/* Dietary Preferences */}
          <DietaryPreferences
            selectedDiet={selectedDiet}
            setSelectedDiet={setSelectedDiet}
          />

          {/* Action Buttons */}
          <ActionButtons
            ingredients={ingredients}
            onFindRecipes={handleFindRecipes}
          />

          {/* Tips */}
          <TipsSection />
        </div>
      </div>
    </div>
  );
} 