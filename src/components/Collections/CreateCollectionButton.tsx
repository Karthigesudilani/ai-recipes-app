import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface CreateCollectionButtonProps {
  onClick: () => void;
}

export default function CreateCollectionButton({ onClick }: CreateCollectionButtonProps) {
  return (
    <div className="text-center mb-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
      >
        <Plus className="w-4 h-4" />
        Create New Collection
      </motion.button>
    </div>
  );
} 