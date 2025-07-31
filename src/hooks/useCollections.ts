import { useState, useEffect } from 'react';
import { Collection, NewCollection, Recipe } from '../types';

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCollections = () => {
    setIsLoading(true);
    try {
      const savedCollections = localStorage.getItem('recipeCollections');
      if (savedCollections) {
        const parsedCollections = JSON.parse(savedCollections);
        setCollections(parsedCollections);
      }
    } catch (error) {
      console.error('Error parsing collections:', error);
      setError('Failed to load collections');
      localStorage.removeItem('recipeCollections');
      setCollections([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCollections = (updatedCollections: Collection[]) => {
    setCollections(updatedCollections);
    localStorage.setItem('recipeCollections', JSON.stringify(updatedCollections));
  };

  const createCollection = (newCollection: NewCollection) => {
    if (!newCollection.name.trim()) return;

    const collection: Collection = {
      id: Date.now().toString(),
      name: newCollection.name.trim(),
      description: newCollection.description.trim(),
      color: newCollection.color,
      recipes: [],
      createdAt: new Date().toISOString()
    };

    const updatedCollections = [...collections, collection];
    saveCollections(updatedCollections);
    return collection;
  };

  const updateCollection = (updatedCollection: Collection) => {
    const updatedCollections = collections.map(c => 
      c.id === updatedCollection.id ? updatedCollection : c
    );
    saveCollections(updatedCollections);
  };

  const deleteCollection = (collectionId: string) => {
    const updatedCollections = collections.filter(c => c.id !== collectionId);
    saveCollections(updatedCollections);
  };

  const addRecipeToCollection = (collectionId: string, recipe: Recipe) => {
    const updatedCollections = collections.map(c => {
      if (c.id === collectionId) {
        return { ...c, recipes: [...c.recipes, recipe] };
      }
      return c;
    });
    saveCollections(updatedCollections);
  };

  const removeRecipeFromCollection = (collectionId: string, recipeId: string) => {
    const updatedCollections = collections.map(c => {
      if (c.id === collectionId) {
        return { ...c, recipes: c.recipes.filter(r => r.id !== recipeId) };
      }
      return c;
    });
    saveCollections(updatedCollections);
  };

  const clearAllCollections = () => {
    setCollections([]);
    localStorage.removeItem('recipeCollections');
  };

  useEffect(() => {
    loadCollections();
  }, []);

  return {
    collections,
    isLoading,
    error,
    loadCollections,
    createCollection,
    updateCollection,
    deleteCollection,
    addRecipeToCollection,
    removeRecipeFromCollection,
    clearAllCollections
  };
} 