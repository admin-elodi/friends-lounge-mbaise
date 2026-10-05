import { useState, useEffect, useCallback } from 'react';

// Example Appwrite client setup (if using Appwrite SDK):
// import { databases } from '@/lib/appwrite';
// import { DATABASE_ID, GAMES_COLLECTION_ID } from '@/config';

export function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch games list
  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your Appwrite or API call:
      // const response = await databases.listDocuments(DATABASE_ID, GAMES_COLLECTION_ID);
      // setGames(response.documents);

      // Placeholder fetch for illustration
      const response = await fetch('/api/games');
      if (!response.ok) throw new Error('Failed to fetch games');
      const data = await response.json();
      setGames(data);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError(err.message || 'Failed to load games');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  // Create a new game
  const createGame = async (gameData) => {
    setError(null);
    try {
      // Replace with Appwrite createDocument call:
      // const newDoc = await databases.createDocument(DATABASE_ID, GAMES_COLLECTION_ID, ID.unique(), gameData);
      
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData),
      });
      if (!response.ok) throw new Error('Failed to create game');
      const created = await response.json();

      setGames((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      console.error('Error creating game:', err);
      setError(err.message || 'Failed to create game');
      throw err;
    }
  };

  // Update an existing game
  const updateGame = async (id, updatedData) => {
    setError(null);
    try {
      // Replace with Appwrite updateDocument call:
      // const updatedDoc = await databases.updateDocument(DATABASE_ID, GAMES_COLLECTION_ID, id, updatedData);

      const response = await fetch(`/api/games/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update game');
      const updated = await response.json();

      setGames((prev) =>
        prev.map((g) => ((g.$id || g.id) === id ? updated : g))
      );
      return updated;
    } catch (err) {
      console.error('Error updating game:', err);
      setError(err.message || 'Failed to update game');
      throw err;
    }
  };

  // Delete a game
  const deleteGame = async (id) => {
    setError(null);
    try {
      // Replace with Appwrite deleteDocument call:
      // await databases.deleteDocument(DATABASE_ID, GAMES_COLLECTION_ID, id);

      const response = await fetch(`/api/games/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete game');

      setGames((prev) => prev.filter((g) => (g.$id || g.id) !== id));
    } catch (err) {
      console.error('Error deleting game:', err);
      setError(err.message || 'Failed to delete game');
      throw err;
    }
  };

  return {
    games,
    loading,
    error,
    refetch: fetchGames,
    createGame,
    updateGame,
    deleteGame,
  };
}