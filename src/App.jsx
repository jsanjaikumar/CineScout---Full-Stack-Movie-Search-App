import React, { useState } from "react";
import Search from "./components/Search.jsx";
import hero from "./assets/hero.png";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { Link } from "react-router-dom";
import { updateSearchCount, getTrendingMovies } from "./appwrite.js";
import MovieListSkeleton from "./components/MovieListSkeleton.jsx";
import TrendingListSkeleton from "./components/TrendingListSkeleton.jsx";
import CineScopeChatbot from "./components/CineScopeChatBot.jsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_BASE_URL = "https://www.omdbapi.com";

const defaultMovies = ["Beast", "Titanic"];
const randomTitle =
  defaultMovies[Math.floor(Math.random() * defaultMovies.length)];

const fetchMovies = async (query = "") => {
  const params = query
    ? { s: query, apikey: API_KEY }
    : { s: randomTitle, apikey: API_KEY };

  const response = await axios.get(API_BASE_URL, {
    params,
    validateStatus: (status) => status >= 200 && status < 500, // let OMDb handle errors in payload
  });

  const data = response.data;

  if (response.status !== 200) {
    throw new Error("Failed to fetch response of movies");
  }
  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to Fetch Movie");
  }

  return data.Search || [];
};

const fetchTrending = async () => {
  const movies = await getTrendingMovies();
  return movies;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  const {
    data: moviesList = [],
    isLoading: isMoviesLoading,
    isError: isMoviesError,
    error: moviesErrorObj,
  } = useQuery({
    queryKey: ["movies", debounceSearchTerm],
    queryFn: () => fetchMovies(debounceSearchTerm),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
    enabled: true,
    onSuccess: (data) => {
      if (debounceSearchTerm && Array.isArray(data) && data.length > 0) {
        updateSearchCount(debounceSearchTerm, data[0]).catch((err) =>
          console.error("Error updating search count:", err)
        );
      }
    },
    onError: (err) => {
      setErrorMessage(
        err.message || "Failed to fetch movies. Please try again later"
      );
    },
  });

  const {
    data: trendingMovies = [],
    isLoading: isTrendingLoading,
    isError: isTrendingError,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrending,
    staleTime: 1000 * 60 * 5,
    onError: (err) => {
      console.error(`Error fetching trending movies: ${err}`);
    },
  });

  const showError =
    isMoviesError ||
    (!!errorMessage && !isMoviesLoading && moviesList.length === 0);
  const displayErrorMessage = isMoviesError
    ? moviesErrorObj?.message ||
      "Failed to fetch movies. Please try again later"
    : errorMessage;

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src={hero} alt="hero-banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> you'll Enjoy
            without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies && trendingMovies.length > 0 ? (
          <section className="trending">
            <h2>Trending</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <Link to={`/movie/${movie.movie_id}`}>
                    <img src={movie.poster_url} alt={movie.movie_id} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : isTrendingLoading ? (
          <section className="trending">
            <TrendingListSkeleton count={5} />
          </section>
        ) : (
          <section className="trending">
            <h2>Trending</h2>
            {isTrendingError && (
              <p className="text-red-500">Failed to load trending movies.</p>
            )}
          </section>
        )}

        <section className="all-movies">
          {isMoviesLoading ? (
            <MovieListSkeleton count={10} />
          ) : showError ? (
            <>
              <h2>Popular</h2>
              <p className="text-red-500">{displayErrorMessage}</p>
            </>
          ) : (
            <>
              <h2>Popular</h2>
              <ul>
                {moviesList.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
      <CineScopeChatbot />
    </main>
  );
};

export default App;
