import { motion } from "framer-motion";
import { X, Folder } from "lucide-react";
import { Collection, NewCollection } from "../../types";

interface CreateCollectionModalProps {
  showModal: boolean;
  editingCollection: Collection | null;
  newCollection: NewCollection;
  onClose: () => void;
  onUpdateCollection: (field: keyof NewCollection, value: string) => void;
  onUpdateEditingCollection: (field: keyof Collection, value: string) => void;
  onSubmit: () => void;
}

export default function CreateCollectionModal({
  showModal,
  editingCollection,
  newCollection,
  onClose,
  onUpdateCollection,
  onUpdateEditingCollection,
  onSubmit
}: CreateCollectionModalProps) {
  if (!showModal) return null;

  const colors = [
    { name: "orange", class: "bg-orange-500", text: "text-orange-500" },
    { name: "red", class: "bg-red-500", text: "text-red-500" },
    { name: "blue", class: "bg-blue-500", text: "text-blue-500" },
    { name: "green", class: "bg-green-500", text: "text-green-500" },
    { name: "gray", class: "bg-gray-500", text: "text-gray-500" },
    { name: "pink", class: "bg-pink-500", text: "text-pink-500" },
  ];

  const currentCollection = editingCollection || newCollection;
  const isEditing = !!editingCollection;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-8 bg-gradient-to-br from-orange-50 to-red-50 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Folder className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Edit Collection' : 'Create New Collection'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {isEditing ? 'Update your collection details' : 'Organize your recipes with a beautiful collection'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Collection Name
            </label>
            <input
              type="text"
              value={currentCollection.name}
              onChange={(e) => isEditing 
                ? onUpdateEditingCollection('name', e.target.value)
                : onUpdateCollection('name', e.target.value)
              }
              placeholder="e.g., Quick Weeknight Meals"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 transition-all duration-200 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Description
            </label>
            <textarea
              value={currentCollection.description}
              onChange={(e) => isEditing 
                ? onUpdateEditingCollection('description', e.target.value)
                : onUpdateCollection('description', e.target.value)
              }
              placeholder="Describe your collection..."
              rows={3}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 transition-all duration-200 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Color Theme
            </label>
            <div className="grid grid-cols-6 gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => isEditing 
                    ? onUpdateEditingCollection('color', color.name)
                    : onUpdateCollection('color', color.name)
                  }
                  className={`w-12 h-12 rounded-2xl border-2 transition-all duration-200 hover:scale-110 ${
                    currentCollection.color === color.name
                      ? 'border-gray-900 scale-110 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${color.class}`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isEditing ? 'Update Collection' : 'Create Collection'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 