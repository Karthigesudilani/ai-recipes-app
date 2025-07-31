import { motion } from "framer-motion";
import { Folder, Plus } from "lucide-react";

interface EmptyCollectionsProps {
  onCreateCollection: () => void;
}

export default function EmptyCollections({ onCreateCollection }: EmptyCollectionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl flex items-center justify-center shadow-lg">
        <Folder className="w-16 h-16 text-orange-500" />
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-4">
        No Collections Yet
      </h3>
      <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
        Create your first recipe collection to organize your favorite recipes by theme, cuisine, or occasion.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCreateCollection}
        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <Plus className="w-5 h-5" />
        Create First Collection
      </motion.button>
    </motion.div>
  );
} 