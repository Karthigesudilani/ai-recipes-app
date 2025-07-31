"use client";

import { useToast, ToastContainer } from './index';

// Example of how to integrate Toast into your existing pages
export const ToastExample = () => {
  const { toasts, success, error, info, warning, removeToast } = useToast();

  const handleRecipeSaved = () => {
    success("Recipe Saved!", "Your recipe has been saved to your collection.");
  };

  const handleRecipeError = () => {
    error("Error", "Failed to save recipe. Please try again.");
  };

  const handleRecipeInfo = () => {
    info("Recipe Info", "This recipe uses 5 ingredients from your pantry.");
  };

  const handleRecipeWarning = () => {
    warning("Warning", "This recipe contains allergens. Please check ingredients.");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleRecipeSaved}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Show Success Toast
        </button>
        <button
          onClick={handleRecipeError}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Show Error Toast
        </button>
        <button
          onClick={handleRecipeInfo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Show Info Toast
        </button>
        <button
          onClick={handleRecipeWarning}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Show Warning Toast
        </button>
      </div>

      {/* Toast Container - Add this to your layout */}
      <ToastContainer 
        toasts={toasts} 
        onClose={(id: string) => removeToast(id)} 
        position="top-right" 
      />
    </div>
  );
}; 