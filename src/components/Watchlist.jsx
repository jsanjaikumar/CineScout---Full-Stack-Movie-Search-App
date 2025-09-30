import React, { useState, useEffect } from "react";
import { getWatchlist, removeFromWatchlist } from "../utils/watchlist.js";
import { Link } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import star_icon from "../assets/star.svg";
import noMovie from "../assets/no-movie.png";
import Spinner from "./Spinner.jsx";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingIds, setRemovingIds] = useState(new Set());

  const loadWatchlist = () => {
    try {
      const watchlistData = getWatchlist();
      // Sort by addedAt descending (newest first)
      const sortedWatchlist = watchlistData.sort(
        (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
      );
      setWatchlist(sortedWatchlist);
    } catch (error) {
      console.error("Error loading watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWatchlist();

    // Listen for watchlist updates from other components
    const handleWatchlistUpdate = () => {
      loadWatchlist();
    };

    window.addEventListener("watchlistUpdated", handleWatchlistUpdate);

    return () => {
      window.removeEventListener("watchlistUpdated", handleWatchlistUpdate);
    };
  }, []);

  const handleRemove = (imdbID) => {
    setRemovingIds((prev) => new Set(prev.add(imdbID)));

    try {
      removeFromWatchlist(imdbID);
      setWatchlist((prev) => prev.filter((movie) => movie.imdbID !== imdbID));

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent("watchlistUpdated"));
    } catch (error) {
      console.error("Failed to remove from watchlist:", error);
    } finally {
      setRemovingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(imdbID);
        return newSet;
      });
    }
  };

  if (isLoading) {
    return (
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-white hover:text-light-200 transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-left">My Watchlist</h1>
          </div>
          <p className="text-light-200">{watchlist.length} movies</p>
        </header>

        {watchlist.length === 0 ? (
          <div className="text-center mt-20">
            <div className="max-w-md mx-auto">
              <img
                src={noMovie}
                alt="No movies"
                className="w-32 h-32 mx-auto mb-6 opacity-50"
              />
              <h2 className="text-white text-xl mb-4">
                Your watchlist is empty
              </h2>
              <p className="text-light-200 mb-6">
                Start adding movies to your watchlist to keep track of what you
                want to watch!
              </p>
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                Browse Movies
              </Link>
            </div>
          </div>
        ) : (
          <section className="watchlist-grid">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {watchlist.map((movie) => (
                <div key={movie.imdbID} className="watchlist-card">
                  <Link to={`/movie/${movie.imdbID}`} className="block">
                    <img
                      src={
                        movie.poster && movie.poster !== "N/A"
                          ? movie.poster
                          : noMovie
                      }
                      alt={movie.title}
                      className="w-full h-[250px] object-cover rounded-[16px]"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noMovie;
                      }}
                    />
                  </Link>

                  <div className="mt-3">
                    <h3 className="text-white font-bold text-base line-clamp-1">
                      {movie.title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <img src={star_icon} alt="rating" className="w-4 h-4" />
                        <span className="text-white font-bold text-sm">
                          {movie.imdbRating
                            ? movie.imdbRating.toFixed(1)
                            : "N/A"}
                        </span>
                        <span className="text-gray-100 text-sm">•</span>
                        <span className="text-gray-100 text-sm capitalize">
                          {movie.language}
                        </span>
                        <span className="text-gray-100 text-sm">•</span>
                        <span className="text-gray-100 text-sm">
                          {movie.year ? movie.year.split("–")[0] : "N/A"}
                        </span>
                      </div>

                      <button
                        onClick={() => handleRemove(movie.imdbID)}
                        disabled={removingIds.has(movie.imdbID)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1 rounded disabled:opacity-50"
                        title="Remove from watchlist"
                      >
                        {removingIds.has(movie.imdbID) ? (
                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      Added {new Date(movie.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Watchlist;
