import { motion } from "framer-motion";
import { Folder } from "lucide-react";

interface CollectionsHeaderProps {
  collectionsCount: number;
}

export default function CollectionsHeader({ collectionsCount }: CollectionsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <Folder className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-900">Recipe Collections</h1>
      </div>
      <p className="text-gray-600">
        Organize your recipes into themed collections for easy access and inspiration.
      </p>
    </motion.div>
  );
} 