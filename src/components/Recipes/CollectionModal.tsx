"use client";

import { motion } from "framer-motion";
import { X, Plus, Folder } from "lucide-react";
import { Recipe, Collection } from "../../types";

interface CollectionModalProps {
  showCollectionModal: boolean;
  selectedRecipeForCollection: Recipe | null;
  collections: Collection[];
  onClose: () => void;
  onAddToCollection: (collectionId: string, recipe: Recipe) => void;
  onCreateNewCollection: () => void;
}

export default function CollectionModal({
  showCollectionModal,
  selectedRecipeForCollection,
  collections,
  onClose,
  onAddToCollection,
  onCreateNewCollection
}: CollectionModalProps) {
  if (!showCollectionModal || !selectedRecipeForCollection) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Fixed */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-600 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Folder className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Add to Collection
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Organize your recipes
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-100 dark:border-orange-800">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <span className="font-medium">Recipe:</span> {selectedRecipeForCollection.title}
            </p>
          </div>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Existing Collections */}
          {collections.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Your Collections
              </h4>
              <div className="space-y-3">
                {collections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => onAddToCollection(collection.id, selectedRecipeForCollection)}
                    className="w-full p-4 text-left border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full bg-${collection.color}-500`}></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {collection.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {collection.recipes.length} recipes
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Create New Collection Button */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <button
              onClick={onCreateNewCollection}
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              Create New Collection
            </button>
          </div>

          {/* Cancel Button */}
          <div className="mt-3">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 