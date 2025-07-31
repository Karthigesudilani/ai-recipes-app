import { NextRequest, NextResponse } from 'next/server';

interface EnhancementRequest {
  type: 'substitution' | 'scaling' | 'dietary' | 'nutrition';
  recipe: {
    title: string;
    ingredients: string[];
    instructions: string[];
    servings: number;
    dietaryRestrictions?: string;
  };
  targetServings?: number;
  dietaryRestrictions?: string;
  missingIngredients?: string[];
}

interface SubstitutionResponse {
  originalIngredient: string;
  substitutes: Array<{
    name: string;
    ratio: string;
    notes: string;
    availability: 'common' | 'specialty' | 'rare';
  }>;
}

interface ScalingResponse {
  originalServings: number;
  targetServings: number;
  scaledIngredients: Array<{
    ingredient: string;
    originalAmount: string;
    newAmount: string;
  }>;
  adjustedInstructions: string[];
}

interface DietaryResponse {
  originalRecipe: string;
  modifiedRecipe: {
    title: string;
    ingredients: string[];
    instructions: string[];
    modifications: string[];
  };
}

interface NutritionResponse {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  vitamins: string[];
  minerals: string[];
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
      console.log(`Calling Gemini API for enhancement with model: ${model}...`);
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
            temperature: 0.3,
            maxOutputTokens: 1500,
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
    const { type, recipe, targetServings, dietaryRestrictions, missingIngredients }: EnhancementRequest = await request.json();

    let prompt = '';
    let systemMessage = '';

    switch (type) {
      case 'substitution':
        systemMessage = 'You are a professional chef and ingredient substitution expert. Provide practical, accessible ingredient substitutes that maintain recipe quality and flavor. Always return valid JSON.';
        prompt = `Provide ingredient substitutions for this recipe: ${recipe.title}

Original ingredients: ${recipe.ingredients.join(', ')}

${missingIngredients ? `Missing ingredients to substitute: ${missingIngredients.join(', ')}` : 'Suggest common substitutions for key ingredients'}

For each substitution, provide:
- Original ingredient name
- 2-3 substitute options with ratios
- Notes on flavor/texture differences
- Availability level (common/specialty/rare)

IMPORTANT: Return ONLY a valid JSON array with this exact structure:
[
  {
    "originalIngredient": "ingredient name",
    "substitutes": [
      {
        "name": "substitute name",
        "ratio": "1:1 or 2:1 etc",
        "notes": "flavor/texture notes",
        "availability": "common"
      }
    ]
  }
]

Do not include any additional text or explanations outside the JSON.`;

        break;

      case 'scaling':
        systemMessage = 'You are a professional chef and recipe scaling expert. Accurately scale recipe ingredients and adjust cooking instructions for different serving sizes. Always return valid JSON.';
        prompt = `Scale this recipe from ${recipe.servings} servings to ${targetServings} servings:

Recipe: ${recipe.title}
Ingredients: ${recipe.ingredients.join(', ')}
Instructions: ${recipe.instructions.join(' | ')}

Provide:
- Scaled ingredient amounts
- Adjusted cooking instructions
- Any equipment changes needed

IMPORTANT: Return ONLY a valid JSON object with this exact structure:
{
  "originalServings": ${recipe.servings},
  "targetServings": ${targetServings},
  "scaledIngredients": [
    {
      "ingredient": "ingredient name",
      "originalAmount": "original amount",
      "newAmount": "scaled amount"
    }
  ],
  "adjustedInstructions": ["modified instruction 1", "modified instruction 2"]
}

Do not include any additional text or explanations outside the JSON.`;

        break;

      case 'dietary':
        systemMessage = 'You are a professional chef and dietary modification expert. Modify recipes to accommodate dietary restrictions while maintaining flavor and nutrition. Always return valid JSON.';
        prompt = `Modify this recipe to be ${dietaryRestrictions} friendly:

Recipe: ${recipe.title}
Ingredients: ${recipe.ingredients.join(', ')}
Instructions: ${recipe.instructions.join(' | ')}

Requirements:
- Replace non-compliant ingredients
- Maintain flavor and texture
- Ensure nutritional balance
- Provide clear modification notes

IMPORTANT: Return ONLY a valid JSON object with this exact structure:
{
  "originalRecipe": "${recipe.title}",
  "modifiedRecipe": {
    "title": "Modified recipe title",
    "ingredients": ["modified ingredients"],
    "instructions": ["modified instructions"],
    "modifications": ["list of changes made"]
  }
}

Do not include any additional text or explanations outside the JSON.`;

        break;

      case 'nutrition':
        systemMessage = 'You are a professional nutritionist and recipe analyst. Provide detailed nutritional information for recipes. Always return valid JSON.';
        prompt = `Analyze the nutritional content of this recipe:

Recipe: ${recipe.title}
Ingredients: ${recipe.ingredients.join(', ')}
Servings: ${recipe.servings}

Provide detailed nutrition per serving including:
- Calories, protein, carbs, fat
- Fiber, sugar, sodium
- Key vitamins and minerals
- Health benefits/notes

IMPORTANT: Return ONLY a valid JSON object with this exact structure:
{
  "calories": 350,
  "protein": 15,
  "carbs": 45,
  "fat": 12,
  "fiber": 8,
  "sugar": 5,
  "sodium": 400,
  "vitamins": ["Vitamin C", "Vitamin A"],
  "minerals": ["Iron", "Calcium"]
}

Do not include any additional text or explanations outside the JSON.`;

        break;

      default:
        return NextResponse.json(
          { error: 'Invalid enhancement type' },
          { status: 400 }
        );
    }

    try {
      console.log('Making Gemini API call for enhancement type:', type);
      console.log('Recipe:', recipe.title);
      
      const content = await callGeminiAPI(prompt, systemMessage);
      console.log('Gemini response content:', content);

      if (!content) {
        throw new Error('No response content from Gemini API');
      }

      // Parse the JSON response
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          console.log('Parsed result:', result);
          return NextResponse.json(result);
        } else {
          console.error('No JSON found in content:', content);
          throw new Error('No valid JSON found in response');
        }
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', parseError);
        console.error('Raw content:', content);
        throw new Error('Failed to parse AI response. Please try again.');
      }

    } catch (error) {
      console.error('Error with Gemini API:', error);
      return NextResponse.json(
        { 
          error: 'Unable to generate enhancement at this time. Please check your Gemini API key and try again.',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Enhancement error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 