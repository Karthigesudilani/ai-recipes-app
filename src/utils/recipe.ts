import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Recipe } from "../types";

export const getRecipeImage = (ingredients: string[]) => {
  const ingredientStr = ingredients.join(' ').toLowerCase();
  
  // Food category images based on ingredients
  if (ingredientStr.includes('pasta') || ingredientStr.includes('noodle')) {
    return "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?w=400&h=200&fit=crop&crop=center";
  }
  if (ingredientStr.includes('chicken') || ingredientStr.includes('poultry')) {
    return "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=200&fit=crop&crop=center";
  }
  if (ingredientStr.includes('beef') || ingredientStr.includes('steak') || ingredientStr.includes('meat')) {
    return "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=200&fit=crop&crop=center";
  }
  if (ingredientStr.includes('fish') || ingredientStr.includes('salmon') || ingredientStr.includes('seafood')) {
    return "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=200&fit=crop&crop=center";
  }
  if (ingredientStr.includes('vegetable') || ingredientStr.includes('carrot') || ingredientStr.includes('broccoli')) {
    return "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?w=400&h=200&fit=crop&crop=center";
  }
  if (ingredientStr.includes('rice') || ingredientStr.includes('grain')) {
    return "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?w=400&h=200&fit=crop&crop=center";
  }
  if (ingredientStr.includes('egg') || ingredientStr.includes('breakfast')) {
    return "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=200&fit=crop&crop=center";
  }
  if (ingredientStr.includes('soup') || ingredientStr.includes('broth')) {
    return "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=200&fit=crop&crop=center";
  }
  if (ingredientStr.includes('salad') || ingredientStr.includes('lettuce')) {
    return "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?w=400&h=200&fit=crop&crop=center";
  }
  if (ingredientStr.includes('dessert') || ingredientStr.includes('cake') || ingredientStr.includes('sweet')) {
    return "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=200&fit=crop&crop=center";
  }
  
  // Default image
  return "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=200&fit=crop&crop=center";
};

export const getIngredientStatus = (ingredient: string, recipe: Recipe) => {
  if (recipe.usedIngredients.includes(ingredient)) {
    return "used";
  } else if (recipe.missingIngredients.includes(ingredient)) {
    return "missing";
  }
  return "available";
};

export const getWasteScoreColor = (score: number) => {
  if (score >= 0.8) return "text-green-600";
  if (score >= 0.6) return "text-yellow-600";
  return "text-red-600";
};

export const downloadRecipeAsPDF = async (recipe: Recipe, getIngredientStatus: (ingredient: string, recipe: Recipe) => string) => {
  try {
    // Create a temporary div to render the recipe content
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '800px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '40px';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.color = '#333';
    
    tempDiv.innerHTML = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #f97316; font-size: 28px; margin-bottom: 10px;">${recipe.title}</h1>
        <div style="display: flex; justify-content: center; gap: 20px; font-size: 14px; color: #666;">
          <span>⏱️ ${recipe.cookingTime}</span>
          <span>👥 ${recipe.servings} servings</span>
          <span>🏆 ${recipe.difficulty}</span>
          <span>🎯 ${Math.round(recipe.wasteScore * 100)}% efficiency</span>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #f97316; font-size: 20px; margin-bottom: 15px;">📋 Ingredients</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          ${recipe.ingredients.map((ingredient, index) => {
            const status = getIngredientStatus(ingredient, recipe);
            const statusText = status === "used" ? "✓ You have this" : status === "missing" ? "⚠️ Need to buy" : "• Available";
            const statusColor = status === "used" ? "#10b981" : status === "missing" ? "#ef4444" : "#6b7280";
            return `
              <div style="padding: 8px; border-radius: 6px; background-color: #f9fafb; border-left: 3px solid ${statusColor};">
                <span style="font-weight: 500;">${ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</span>
                <span style="font-size: 12px; color: ${statusColor}; margin-left: 8px;">${statusText}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
      
      <div>
        <h2 style="color: #f97316; font-size: 20px; margin-bottom: 15px;">👨‍🍳 Instructions</h2>
        <div style="display: flex; flex-direction: column; gap: 15px;">
          ${recipe.instructions.map((instruction, index) => `
            <div style="display: flex; gap: 15px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
              <div style="width: 30px; height: 30px; background: linear-gradient(135deg, #f97316, #dc2626); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; flex-shrink: 0;">
                ${index + 1}
              </div>
              <div style="flex: 1; line-height: 1.6;">
                ${instruction}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f97316; text-align: center; color: #666; font-size: 12px;">
        <p>Generated by Smart Recipe Finder</p>
        <p>Made with ❤️ for food lovers everywhere</p>
      </div>
    `;
    
    document.body.appendChild(tempDiv);
    
    // Convert to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    // Remove temporary div
    document.body.removeChild(tempDiv);
    
    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Download PDF
    pdf.save(`${recipe.title.replace(/[^a-zA-Z0-9]/g, '_')}_recipe.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
}; 