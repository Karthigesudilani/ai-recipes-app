"use client";

export default function TipsSection() {
  return (
    <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
        💡 Tips for Better Results:
      </h4>
      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
        <li>• Include main ingredients like proteins, vegetables, and grains</li>
        <li>• Add common pantry staples you have (oil, spices, etc.)</li>
        <li>• Be specific about ingredients (e.g., &ldquo;chicken breast&rdquo; vs &ldquo;chicken&rdquo;)</li>
        <li>• The more ingredients you add, the better the recipe suggestions</li>
      </ul>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        &ldquo;Don&rsquo;t have an ingredient? No worries! Our AI can suggest substitutes or adjust recipes to work with what you have.&rdquo;
      </p>
    </div>
  );
} 