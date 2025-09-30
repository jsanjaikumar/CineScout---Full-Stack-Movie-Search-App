import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Home } from "lucide-react";
import { getWatchlistCount } from "../utils/watchlist.js";
import logo from "../assets/logo.png";

const Header = () => {
  const location = useLocation();
  const isWatchlistPage = location.pathname === "/watchlist";
  const [watchlistCount, setWatchlistCount] = useState(0);

  const updateWatchlistCount = () => {
    try {
      const count = getWatchlistCount();
      setWatchlistCount(count);
    } catch (error) {
      console.error("Error getting watchlist count:", error);
    }
  };

  useEffect(() => {
    // Initial count
    updateWatchlistCount();

    // Listen for watchlist updates
    const handleWatchlistUpdate = () => {
      updateWatchlistCount();
    };

    window.addEventListener("watchlistUpdated", handleWatchlistUpdate);

    return () => {
      window.removeEventListener("watchlistUpdated", handleWatchlistUpdate);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md border-b border-light-100/10">
      <div className="max-w-7xl mx-auto px-5 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="CineScout" className="w-8 h-8" />
            <span className="text-white font-bold text-xl hidden sm:block">
              CineScout
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {!isWatchlistPage && (
              <Link
                to="/"
                className="text-white hover:text-light-200 transition-colors p-2 rounded-lg"
                title="Home"
              >
                <Home size={24} />
              </Link>
            )}

            <Link
              to="/watchlist"
              className={`relative text-white hover:text-light-200 transition-colors p-2 rounded-lg ${
                isWatchlistPage ? "bg-light-100/10" : ""
              }`}
              title="My Watchlist"
            >
              <Heart
                size={24}
                fill={isWatchlistPage ? "currentColor" : "none"}
              />
              {watchlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {watchlistCount > 9 ? "9+" : watchlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
