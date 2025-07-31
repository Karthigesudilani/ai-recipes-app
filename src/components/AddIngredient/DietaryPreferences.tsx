"use client";

import { motion } from "framer-motion";
import { Select, SelectOption } from "../UI";
import { Leaf, Apple, Utensils, Cake, Coffee, Zap, Heart, Star } from "lucide-react";

interface DietaryPreferencesProps {
  selectedDiet: string;
  setSelectedDiet: (diet: string) => void;
}

const dietaryOptions: SelectOption[] = [
  { value: "none", label: "No Restrictions", description: "No dietary restrictions", icon: <Star className="w-4 h-4" /> },
  { value: "vegetarian", label: "Vegetarian", description: "No meat products", icon: <Leaf className="w-4 h-4" /> },
  { value: "vegan", label: "Vegan", description: "No animal products", icon: <Apple className="w-4 h-4" /> },
  { value: "pescatarian", label: "Pescatarian", description: "Fish and seafood only", icon: <Utensils className="w-4 h-4" /> },
  { value: "gluten-free", label: "Gluten-Free", description: "No gluten products", icon: <Cake className="w-4 h-4" /> },
  { value: "dairy-free", label: "Dairy-Free", description: "No dairy products", icon: <Coffee className="w-4 h-4" /> },
  { value: "keto", label: "Keto", description: "Low-carb, high-fat diet", icon: <Zap className="w-4 h-4" /> },
  { value: "paleo", label: "Paleo", description: "Whole foods only", icon: <Heart className="w-4 h-4" /> },
  { value: "low-carb", label: "Low-Carb", description: "Reduced carbohydrate intake", icon: <Zap className="w-4 h-4" /> },
  { value: "mediterranean", label: "Mediterranean", description: "Mediterranean diet style", icon: <Leaf className="w-4 h-4" /> },
  { value: "dash", label: "DASH", description: "Dietary Approaches to Stop Hypertension", icon: <Heart className="w-4 h-4" /> },
  { value: "whole30", label: "Whole30", description: "30-day elimination diet", icon: <Apple className="w-4 h-4" /> }
];

export default function DietaryPreferences({ selectedDiet, setSelectedDiet }: DietaryPreferencesProps) {
  return (
    <div className="space-y-4 mt-6">
      <Select
        label="Dietary Preferences (Optional)"
        options={dietaryOptions}
        value={selectedDiet}
        onChange={setSelectedDiet}
        placeholder="Choose your dietary preferences..."
        searchable
        fullWidth
        helperText="We'll filter recipes to match your dietary needs and preferences"
      />
      
      {/* Visual indicator for selected option */}
      {selectedDiet && selectedDiet !== "none" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-800"
        >
          <span className="font-medium">
            Selected: {dietaryOptions.find(option => option.value === selectedDiet)?.label}
          </span>
        </motion.div>
      )}
      
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r mb-4 from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">
            Smart Recipe Filtering
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Let&apos;s make sure your recipes match your dietary needs perfectly.
          </p>
        </div>
      </div>
    </div>
  );
} 