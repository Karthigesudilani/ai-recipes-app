"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import {
  CollectionsHeader,
  CreateCollectionButton,
  EmptyCollections,
  CollectionCard,
  CreateCollectionModal,
  CollectionDetailModal
} from "../../components/Collections";
import { Collection, Recipe, NewCollection } from "../../types";
import { useCollections } from "../../hooks";
import { FavoriteRecipeModal } from "../../components/Favorites";

export default function CollectionsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollection, setNewCollection] = useState<NewCollection>({ name: "", description: "", color: "orange" });
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const { 
    collections, 
    isLoading, 
    error, 
    createCollection, 
    updateCollection, 
    deleteCollection, 
    removeRecipeFromCollection 
  } = useCollections();

  const handleCreateCollection = () => {
    if (!newCollection.name.trim()) return;

    createCollection(newCollection);
    setNewCollection({ name: "", description: "", color: "orange" });
    setShowCreateModal(false);
  };

  const handleUpdateCollection = () => {
    if (!editingCollection || !editingCollection.name.trim()) return;

    updateCollection(editingCollection);
    setEditingCollection(null);
    setShowCreateModal(false);
  };

  const handleEditCollection = (collection: Collection) => {
    setEditingCollection(collection);
    setShowCreateModal(true);
  };

  const handleDeleteCollection = (collectionId: string) => {
    deleteCollection(collectionId);
  };

  const handleViewCollection = (collection: Collection) => {
    setSelectedCollection(collection);
    setShowCollectionModal(true);
  };

  const handleRemoveRecipe = (collectionId: string, recipeId: string) => {
    removeRecipeFromCollection(collectionId, recipeId);
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const handleUpdateNewCollection = (field: keyof NewCollection, value: string) => {
    setNewCollection(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateEditingCollection = (field: keyof Collection, value: string) => {
    if (editingCollection) {
      setEditingCollection(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setEditingCollection(null);
    setNewCollection({ name: "", description: "", color: "orange" });
  };

  const handleSubmitCollection = () => {
    if (editingCollection) {
      handleUpdateCollection();
    } else {
      handleCreateCollection();
    }
  };

  return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <CollectionsHeader collectionsCount={collections.length} />

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading your collections...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
          >
            <p className="text-red-800">{error}</p>
        </motion.div>
        )}

        {/* Create Collection Button */}
        {!isLoading && (
          <CreateCollectionButton onClick={() => setShowCreateModal(true)} />
        )}

        {/* Collections Grid */}
        {!isLoading && collections.length > 0 && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {collections.map((collection, index) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  index={index}
                  onEdit={handleEditCollection}
                  onDelete={handleDeleteCollection}
                  onViewCollection={handleViewCollection}
                  onRemoveRecipe={handleRemoveRecipe}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && collections.length === 0 && !error && (
          <EmptyCollections onCreateCollection={() => setShowCreateModal(true)} />
        )}

        {/* Create/Edit Collection Modal */}
        <CreateCollectionModal
          showModal={showCreateModal}
          editingCollection={editingCollection}
          newCollection={newCollection}
          onClose={handleCloseCreateModal}
          onUpdateCollection={handleUpdateNewCollection}
          onUpdateEditingCollection={handleUpdateEditingCollection}
          onSubmit={handleSubmitCollection}
        />

        {/* Collection Detail Modal */}
        <CollectionDetailModal
          showModal={showCollectionModal}
          selectedCollection={selectedCollection}
          onClose={() => setShowCollectionModal(false)}
          onViewRecipe={handleViewRecipe}
          onRemoveRecipe={handleRemoveRecipe}
        />

        {/* Recipe Detail Modal - Reusing Favorites Modal */}
        <FavoriteRecipeModal
          showFullRecipe={showRecipeModal}
          selectedRecipe={selectedRecipe}
          onClose={() => setShowRecipeModal(false)}
        />
      </div>
    </div>
  );
} 