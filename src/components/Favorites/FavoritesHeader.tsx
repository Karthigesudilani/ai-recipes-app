import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FavoritesHeaderProps {
  favoritesCount: number;
}

export default function FavoritesHeader({ favoritesCount }: FavoritesHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <Heart className="w-8 h-8 text-red-500 fill-current" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Favorite Recipes</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        {favoritesCount === 0 
          ? "You haven't saved any recipes yet. Start cooking to build your collection!"
          : `You have ${favoritesCount} favorite recipe${favoritesCount === 1 ? '' : 's'}`
        }
      </p>
    </motion.div>
  );
} 