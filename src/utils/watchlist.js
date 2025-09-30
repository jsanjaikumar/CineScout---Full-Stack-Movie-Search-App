// localStorage-based watchlist functions
const WATCHLIST_KEY = "movie-watchlist";

// Get watchlist from localStorage
export const getWatchlist = () => {
  try {
    const watchlist = localStorage.getItem(WATCHLIST_KEY);
    return watchlist ? JSON.parse(watchlist) : [];
  } catch (error) {
    console.error("Error getting watchlist from localStorage:", error);
    return [];
  }
};

// Save watchlist to localStorage
const saveWatchlist = (watchlist) => {
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  } catch (error) {
    console.error("Error saving watchlist to localStorage:", error);
  }
};

// Add movie to watchlist
export const addToWatchlist = (movie) => {
  try {
    const watchlist = getWatchlist();

    // Check if movie already exists
    const existingIndex = watchlist.findIndex(
      (item) => item.imdbID === movie.imdbID
    );
    if (existingIndex !== -1) {
      throw new Error("Movie already in watchlist");
    }

    // Add movie with additional metadata
    const watchlistItem = {
      imdbID: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      type: movie.Type,
      imdbRating: movie.imdbRating || null,
      language: movie.language || "En",
      addedAt: new Date().toISOString(),
    };

    const updatedWatchlist = [...watchlist, watchlistItem];
    saveWatchlist(updatedWatchlist);

    return watchlistItem;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};

// Remove movie from watchlist
export const removeFromWatchlist = (imdbID) => {
  try {
    const watchlist = getWatchlist();
    const updatedWatchlist = watchlist.filter((item) => item.imdbID !== imdbID);
    saveWatchlist(updatedWatchlist);
    return true;
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    throw error;
  }
};

// Check if movie is in watchlist
export const isInWatchlist = (imdbID) => {
  try {
    const watchlist = getWatchlist();
    return watchlist.some((item) => item.imdbID === imdbID);
  } catch (error) {
    console.error("Error checking watchlist:", error);
    return false;
  }
};

// Get watchlist count
export const getWatchlistCount = () => {
  try {
    const watchlist = getWatchlist();
    return watchlist.length;
  } catch (error) {
    console.error("Error getting watchlist count:", error);
    return 0;
  }
};

// Clear entire watchlist
export const clearWatchlist = () => {
  try {
    localStorage.removeItem(WATCHLIST_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing watchlist:", error);
    throw error;
  }
};
