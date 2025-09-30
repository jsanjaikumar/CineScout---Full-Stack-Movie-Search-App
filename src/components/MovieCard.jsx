import React, { useState, useEffect } from "react";
import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "../utils/watchlist.js";
import star_icon from "../assets/star.svg";
import noMovie from "../assets/no-movie.png";
import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";

const MovieCard = ({
  movie: { Title, Poster, Year, Type, imdbRating, language, imdbID },
}) => {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const movieData = { Title, Poster, Year, Type, imdbRating, language, imdbID };

  // Check if movie is in watchlist on component mount
  useEffect(() => {
    const checkWatchlistStatus = () => {
      try {
        const isInList = isInWatchlist(imdbID);
        setInWatchlist(isInList);
      } catch (error) {
        console.error("Error checking watchlist status:", error);
      }
    };

    checkWatchlistStatus();
  }, [imdbID]);

  const handleWatchlistToggle = (e) => {
    e.preventDefault(); // Prevent navigation to movie details
    e.stopPropagation();

    setIsLoading(true);

    try {
      if (inWatchlist) {
        removeFromWatchlist(imdbID);
        setInWatchlist(false);
      } else {
        addToWatchlist(movieData);
        setInWatchlist(true);
      }

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent("watchlistUpdated"));
    } catch (error) {
      console.error("Failed to update watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="movie-card-wrapper">
      <Link to={`/movie/${imdbID}`}>
        <div className="movie-card">
          <div className="relative">
            <img
              src={Poster && Poster !== "N/A" ? Poster : noMovie}
              alt={Title}
              onError={(e) => {
                e.target.onerror = null; // prevent infinite loop
                e.target.src = noMovie;
              }}
            />

            {/* Watchlist button */}
            <button
              onClick={handleWatchlistToggle}
              disabled={isLoading}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                inWatchlist
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-black/50 text-white hover:bg-black/70"
              } ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : inWatchlist ? (
                <Heart size={16} fill="currentColor" />
              ) : (
                <Plus size={16} />
              )}
            </button>
          </div>

          <h3 className="mt-4">{Title}</h3>

          <div className="content">
            <div className="rating">
              <img src={star_icon} alt="stars" />
              <p className="rating-value">
                {imdbRating
                  ? imdbRating.toFixed(1)
                  : (Math.random() * 2 + 6).toFixed(1)}
              </p>

              <span>•</span>
              <p className="lang">{language ? language : "En"}</p>
              <span>•</span>
              <p className="year">{Year ? Year.split("–")[0] : "N/A"}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
