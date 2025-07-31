export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  difficulty: string;
  usedIngredients: string[];
  missingIngredients: string[];
  wasteScore: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  color: string;
  recipes: Recipe[];
  createdAt: string;
}

export interface CookingMode {
  recipe: Recipe | null;
  currentStep: number;
  timer: number | null;
}

export interface NewCollection {
  name: string;
  description: string;
  color: string;
}

export type EnhancementType = 'substitution' | 'scaling' | 'dietary' | 'nutrition';

export interface AIEnhancementResult {
  // Substitution enhancement
  originalIngredient?: string;
  substitutes?: Array<{
    name: string;
    availability: 'common' | 'specialty' | 'rare';
    ratio: string;
    notes: string;
  }>;
  
  // Scaling enhancement
  originalServings?: number;
  targetServings?: number;
  scaledIngredients?: Array<{
    ingredient: string;
    originalAmount: string;
    newAmount: string;
  }>;
  
  // Dietary enhancement
  modifiedRecipe?: {
    title: string;
    ingredients: string[];
    modifications: string[];
  };
  
  // Nutrition enhancement
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  vitamins?: string[];
  minerals?: string[];
} 