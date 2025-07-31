import { motion } from "framer-motion";
import { Heart, ChefHat } from "lucide-react";
import Link from "next/link";

export default function EmptyFavorites() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-24 h-24 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
        <Heart className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No Favorite Recipes Yet
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
        Start exploring recipes and click the heart icon to save your favorites here for easy access.
      </p>
      <Link
        href="/add-ingredients"
        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
      >
        <ChefHat className="w-4 h-4" />
        Start Cooking
      </Link>
    </motion.div>
  );
} 