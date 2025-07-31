"use client";

import { motion } from "framer-motion";
import { X, Zap, Loader2 } from "lucide-react";
import { EnhancementType, AIEnhancementResult } from "../../types";

interface AIEnhancementModalProps {
  showAIEnhancements: boolean;
  enhancementType: EnhancementType;
  enhancementResult: AIEnhancementResult | null;
  isEnhancing: boolean;
  onClose: () => void;
}

export default function AIEnhancementModal({
  showAIEnhancements,
  enhancementType,
  enhancementResult,
  isEnhancing,
  onClose
}: AIEnhancementModalProps) {
  if (!showAIEnhancements) return null;

  const getEnhancementTitle = () => {
    switch (enhancementType) {
      case 'substitution': return 'Ingredient Substitutions';
      case 'scaling': return 'Recipe Scaling';
      case 'dietary': return 'Dietary Modification';
      case 'nutrition': return 'Nutritional Information';
      default: return 'AI Enhancement';
    }
  };

  const getEnhancementDescription = () => {
    switch (enhancementType) {
      case 'substitution': return 'Find ingredient substitutes';
      case 'scaling': return 'Scale recipe for different servings';
      case 'dietary': return 'Modify for dietary restrictions';
      case 'nutrition': return 'Get detailed nutrition info';
      default: return 'AI Recipe Enhancement';
    }
  };

  const renderSubstitutionResult = (result: AIEnhancementResult) => {
    return (
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{getEnhancementTitle()}</h3>
        <div className="space-y-4">
          {Array.isArray(result) && result.map((sub: { originalIngredient: string; substitutes: Array<{ name: string; availability: string; ratio: string; notes: string }> }, index: number) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-3">
                {sub.originalIngredient}
              </h4>
              <div className="space-y-3">
                {sub.substitutes.map((substitute: { name: string; availability: string; ratio: string; notes: string }, subIndex: number) => (
                  <div key={subIndex} className="bg-white rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{substitute.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        substitute.availability === 'common' ? 'bg-green-100 text-green-700' :
                        substitute.availability === 'specialty' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {substitute.availability}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Ratio:</span> {substitute.ratio}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {substitute.notes}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderScalingResult = (result: AIEnhancementResult) => {
    return (
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{getEnhancementTitle()}</h3>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-900">
              Scaling from {result.originalServings} to {result.targetServings} servings
            </span>
          </div>
          <div className="space-y-3">
            {result.scaledIngredients?.map((ingredient: { ingredient: string; originalAmount: string; newAmount: string }, index: number) => (
              <div key={index} className="bg-white rounded-xl p-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{ingredient.ingredient}</span>
                  <div className="text-sm text-gray-600">
                    <span className="line-through">{ingredient.originalAmount}</span>
                    <span className="mx-2">→</span>
                    <span className="font-semibold text-green-600">{ingredient.newAmount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDietaryResult = (result: AIEnhancementResult) => {
    return (
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{getEnhancementTitle()}</h3>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
          <h4 className="font-semibold text-gray-900 mb-3">
            {result.modifiedRecipe?.title}
          </h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Modified Ingredients:</h5>
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <ul className="space-y-1">
                  {result.modifiedRecipe?.ingredients.map((ingredient: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700">• {ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Modifications Made:</h5>
              <div className="bg-white rounded-xl p-3 border border-gray-200">
                <ul className="space-y-1">
                  {result.modifiedRecipe?.modifications.map((mod: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700">• {mod}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNutritionResult = (result: AIEnhancementResult) => {
    return (
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{getEnhancementTitle()}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-100">
            <h4 className="font-semibold text-gray-900 mb-4">Macronutrients (per serving)</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Calories</span>
                <span className="font-semibold text-gray-900">{result.calories} kcal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Protein</span>
                <span className="font-semibold text-gray-900">{result.protein}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Carbohydrates</span>
                <span className="font-semibold text-gray-900">{result.carbs}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Fat</span>
                <span className="font-semibold text-gray-900">{result.fat}g</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-100">
            <h4 className="font-semibold text-gray-900 mb-4">Micronutrients</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Fiber</span>
                <span className="font-semibold text-gray-900">{result.fiber}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Sugar</span>
                <span className="font-semibold text-gray-900">{result.sugar}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Sodium</span>
                <span className="font-semibold text-gray-900">{result.sodium}mg</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
          <h4 className="font-semibold text-gray-900 mb-3">Vitamins & Minerals</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Vitamins:</h5>
              <div className="flex flex-wrap gap-2">
                {result.vitamins?.map((vitamin: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                    {vitamin}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Minerals:</h5>
              <div className="flex flex-wrap gap-2">
                {result.minerals?.map((mineral: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {mineral}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-6 bg-gradient-to-br from-orange-50 to-red-50 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  AI Recipe Enhancement
                </h2>
                <p className="text-gray-600 mt-1">
                  {getEnhancementDescription()}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Now scrollable */}
        <div className="p-6 overflow-y-auto flex-1">
          {isEnhancing ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI is enhancing your recipe...
              </h3>
              <p className="text-gray-600">
                Analyzing ingredients and generating recommendations
              </p>
            </div>
          ) : enhancementResult ? (
            <div className="space-y-6">
              {enhancementType === 'substitution' && renderSubstitutionResult(enhancementResult)}

              {enhancementType === 'scaling' && renderScalingResult(enhancementResult)}

              {enhancementType === 'dietary' && renderDietaryResult(enhancementResult)}

              {enhancementType === 'nutrition' && renderNutritionResult(enhancementResult)}
            </div>
          ) : (
            <div className="text-center py-12">
              <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Enhancement Ready
              </h3>
              <p className="text-gray-600">
                Click a recipe card to get started with AI enhancements
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 