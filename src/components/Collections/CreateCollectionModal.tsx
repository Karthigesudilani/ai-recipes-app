import { motion } from "framer-motion";
import { X, Folder } from "lucide-react";
import { Collection, NewCollection } from "../../types";
import { Button, Input, Textarea, Modal } from "../UI";

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
    <Modal
      isOpen={showModal}
      onClose={onClose}
      title={isEditing ? 'Edit Collection' : 'Create New Collection'}
      subtitle={isEditing ? 'Update your collection details' : 'Organize your recipes with a beautiful collection'}
      size="lg"
      showCloseButton={false}
      className="bg-gradient-to-br from-orange-50 to-red-50"
    >
      <div className="p-8 space-y-6">
          <div>
            <Input
              label="Collection Name"
              type="text"
              value={currentCollection.name}
              onChange={(e) => isEditing 
                ? onUpdateEditingCollection('name', e.target.value)
                : onUpdateCollection('name', e.target.value)
              }
              placeholder="e.g., Quick Weeknight Meals"
              fullWidth
              size="lg"
            />
          </div>

          <div>
            <Textarea
              label="Description"
              value={currentCollection.description}
              onChange={(e) => isEditing 
                ? onUpdateEditingCollection('description', e.target.value)
                : onUpdateCollection('description', e.target.value)
              }
              placeholder="Describe your collection..."
              rows={3}
              fullWidth
              size="lg"
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

          <div className="flex justify-between gap-4 pt-6">
            <Button
              onClick={onClose}
              variant="secondary"
              size="lg"
              fullWidth
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              variant="primary"
              size="lg"
              fullWidth
            >
              {isEditing ? 'Update Collection' : 'Create Collection'}
            </Button>
          </div>
        </div>
      </Modal>
    );
  } 