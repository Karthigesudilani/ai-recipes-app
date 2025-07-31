"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { X, Timer, Users, ChefHat, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Recipe, CookingMode } from "../../types";
import { getRecipeImage } from "../../utils";

interface CookingModeModalProps {
  cookingMode: CookingMode;
  onClose: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

export default function CookingModeModal({
  cookingMode,
  onClose,
  onNextStep,
  onPreviousStep
}: CookingModeModalProps) {
  if (!cookingMode.recipe) return null;

  const { recipe, currentStep } = cookingMode;
  const isLastStep = currentStep === recipe.instructions.length - 1;

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
        {/* Cooking Mode Header */}
        <div className="relative h-48 rounded-t-2xl overflow-hidden">
          <Image
            src={getRecipeImage(recipe.ingredients)}
            alt={recipe.title}
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
            <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                {recipe.cookingTime}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {recipe.servings} servings
              </div>
            </div>
          </div>
        </div>

        {/* Cooking Mode Content */}
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {currentStep + 1} of {recipe.instructions.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(((currentStep + 1) / recipe.instructions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / recipe.instructions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Step */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-500" />
              Step {currentStep + 1}
            </h3>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {recipe.instructions[currentStep]}
              </p>
            </div>
          </div>

          {/* Completion Message */}
          {isLastStep && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-6 p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border-2 border-orange-200 dark:border-orange-700 shadow-lg"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="text-4xl mb-2"
                >
                  🎉
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-2">
                Congratulations!
              </h3>
              <p className="text-lg text-orange-600 dark:text-orange-400 mb-3">
                Your delicious meal is ready to enjoy!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-orange-500 dark:text-orange-400 mb-4">
                <span>⭐</span>
                <span>Bon Appétit!</span>
                <span>⭐</span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-orange-200 dark:border-orange-600">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Tip:</span> Take a photo and share your culinary success!
                </p>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={onPreviousStep}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {!isLastStep ? (
                <button
                  onClick={onNextStep}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-center">                        
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Check className="w-5 h-5" />
                    Finish
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 