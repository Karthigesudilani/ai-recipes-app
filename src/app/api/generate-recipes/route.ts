import { NextRequest, NextResponse } from 'next/server';

interface RecipeRequest {
  ingredients: string[];
  dietaryRestrictions?: string;
  servings?: number;
  cuisine?: string;
  difficulty?: string;
}

interface RecipeResponse {
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
  cuisine?: string;
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Call Google Gemini API
async function callGeminiAPI(prompt: string, systemMessage: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }

  // Try different models in order of preference
  const models = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-1.0-pro'
  ];

  for (const model of models) {
    try {
      console.log(`Calling Gemini API with model: ${model}...`);
      console.log('Prompt:', prompt);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemMessage}\n\n${prompt}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
          }
        }),
      });

      console.log('Gemini response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error response for ${model}:`, errorText);
        
        // If it's a 503 (overloaded) or 404 (model not found), try next model
        if (response.status === 503 || response.status === 404) {
          console.log(`Model ${model} unavailable, trying next model...`);
          continue;
        }
        
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Gemini response data:', data);
      
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      console.log('Generated text:', generatedText);
      
      return generatedText;
    } catch (error) {
      console.error(`Error with Gemini model ${model}:`, error);
      
      // If this is the last model, throw the error
      if (model === models[models.length - 1]) {
        throw error;
      }
      
      // Otherwise, continue to next model
      console.log(`Trying next model...`);
    }
  }

  throw new Error('All Gemini models are currently unavailable');
}

export async function POST(request: NextRequest) {
  try {
    const { ingredients, dietaryRestrictions, servings = 4, cuisine, difficulty = "Easy" }: RecipeRequest = await request.json();

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Ingredients are required' },
        { status: 400 }
      );
    }

    // Enhanced prompt for better recipe generation
    const prompt = `You are a professional chef and recipe developer specializing in waste-minimizing, delicious recipes.

Available ingredients: ${ingredients.join(', ')}

Requirements:
- Generate 4-5 creative, practical recipes that use MOST of the provided ingredients
- Prioritize waste minimization (higher waste score = better)
- ${dietaryRestrictions ? `Make ALL recipes ${dietaryRestrictions} friendly` : 'No dietary restrictions'}
- Include clear, step-by-step cooking instructions
- Suggest common pantry staples for missing ingredients
- Calculate waste efficiency score (0-10, higher is better)
- ${cuisine ? `Focus on ${cuisine} cuisine style` : 'Use diverse cooking styles'}
- Target ${servings} servings per recipe
- Keep difficulty level: ${difficulty}

For each recipe, provide:
- Creative, appealing title
- Complete ingredient list (including pantry staples)
- Detailed, numbered cooking instructions
- Accurate cooking time
- Waste score calculation (how many provided ingredients are used)
- Estimated nutrition info (calories, protein, carbs, fat)

Return ONLY a valid JSON array with this exact structure:
[
  {
    "id": "unique_id",
    "title": "Creative Recipe Name",
    "ingredients": ["ingredient1", "ingredient2", "pantry_item1"],
    "instructions": ["Step 1: Detailed instruction", "Step 2: Detailed instruction"],
    "cookingTime": "25 minutes",
    "servings": ${servings},
    "difficulty": "${difficulty}",
    "usedIngredients": ["ingredients from user's list that are used"],
    "missingIngredients": ["ingredients not in user's list"],
    "wasteScore": 8.5,
    "cuisine": "${cuisine || 'International'}",
    "nutritionInfo": {
      "calories": 350,
      "protein": 15,
      "carbs": 45,
      "fat": 12
    }
  }
]

Focus on practical, delicious recipes that maximize ingredient usage and minimize waste.`;

    // Get recipes from Gemini API only
    const content = await callGeminiAPI(prompt, 'You are a professional chef and recipe developer. Create practical, delicious recipes that minimize food waste and use available ingredients efficiently. Always return valid JSON.');
    
    if (!content) {
      throw new Error('No response from Gemini API');
    }

    // Parse the JSON response from Gemini API
    let recipes: RecipeResponse[];
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        recipes = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      console.error('Raw response:', content);
      throw new Error('Failed to parse AI response. Please try again.');
    }

    return NextResponse.json(recipes);

  } catch (error) {
    console.error('Recipe generation error:', error);
    
    // Return error response instead of fallback data
    return NextResponse.json(
      { 
        error: 'Unable to generate recipes at this time. Please check your Gemini API key and try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 