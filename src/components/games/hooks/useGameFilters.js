import { useState, useMemo } from 'react';

export function useGameFilters(games = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Dynamically derive unique categories from the games list
  const categories = useMemo(() => {
    if (!Array.isArray(games)) return [];
    const unique = new Set(
      games.map((game) => game.category).filter(Boolean)
    );
    return Array.from(unique);
  }, [games]);

  // Memoized filter calculation
  const filteredGames = useMemo(() => {
    if (!Array.isArray(games)) return [];

    return games.filter((game) => {
      // Title / Description search check
      const matchesSearch = searchTerm
        ? game.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.description?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Category filter check
      const matchesCategory = selectedCategory
        ? game.category === selectedCategory
        : true;

      // Status filter check
      const matchesStatus = selectedStatus
        ? game.status?.toLowerCase() === selectedStatus.toLowerCase()
        : true;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [games, searchTerm, selectedCategory, selectedStatus]);

  // Handler to clear all active filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatus('');
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    categories,
    filteredGames,
    resetFilters,
    hasActiveFilters: Boolean(searchTerm || selectedCategory || selectedStatus),
  };
}