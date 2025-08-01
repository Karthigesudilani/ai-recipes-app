"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { NewCollection } from "../../types";
import { Input, Textarea, Button } from "../UI";

interface CreateCollectionModalProps {
  showCreateCollectionModal: boolean;
  newCollection: NewCollection;
  onClose: () => void;
  onCreateCollection: () => void;
  onUpdateCollection: (field: string, value: string) => void;
}

export default function CreateCollectionModal({
  showCreateCollectionModal,
  newCollection,
  onClose,
  onCreateCollection,
  onUpdateCollection
}: CreateCollectionModalProps) {
  if (!showCreateCollectionModal) return null;

  const colors = ['orange', 'red', 'blue', 'green', 'purple', 'pink'];

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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Create New Collection
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <Input
              label="Collection Name"
              type="text"
              value={newCollection.name}
              onChange={(e) => onUpdateCollection('name', e.target.value)}
              placeholder="Enter collection name..."
              variant="default"
              size="md"
              fullWidth
            />

            <Textarea
              label="Description (Optional)"
              value={newCollection.description}
              onChange={(e) => onUpdateCollection('description', e.target.value)}
              placeholder="Describe your collection..."
              rows={3}
              variant="default"
              size="md"
              fullWidth
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color Theme
              </label>
              <div className="grid grid-cols-6 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onUpdateCollection('color', color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      newCollection.color === color
                        ? 'border-gray-900 dark:border-white'
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-${color}-500`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3 mt-6">
          <Button
              onClick={onClose}
              variant="secondary"
              size="md"
            >
              Cancel
            </Button>
            <Button
              onClick={onCreateCollection}
              disabled={!newCollection.name.trim()}
              variant="primary"
              size="md"
              fullWidth
            >
              Create Collection
            </Button>
            
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 