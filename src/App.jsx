import React, { useState, useEffect } from 'react'
import Search  from './components/Search.jsx';
import hero from './assets/hero.png'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx';
import {useDebounce} from 'react-use';
import { updateSearchCount, getTrendingMovies} from './appwrite.js';

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;  
  const API_BASE_URL = 'https://www.omdbapi.com';



  // const API_OPTIONS = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization: `Bearer ${API_KEY}`,
  //   },
  // };
  

const App = () => {
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [moviesList, setMoviesList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  // random movies showing purpose in the beginning
  const defaultMovies = ["Avengers", "Batman", "Beast", "Disney", "Titanic"];
  const randomTitle =
    defaultMovies[Math.floor(Math.random() * defaultMovies.length)];

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/?&apikey=${API_KEY}&s=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/?apikey=${API_KEY}&s=${randomTitle}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch response of movies");
      }
      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.error || "Failed to Fetch Movie");
        setMoviesList([]);
        return;
      }
      setMoviesList(data.Search || []);
    
      if (query && Array.isArray(data.Search) && data.Search.length > 0) {
        await updateSearchCount(query, data.Search[0]);
      }

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Failed to fetch movies. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };
    const loadTrendingMovies = async () => {
      try{
        const movies = await getTrendingMovies();

        setTrendingMovies(movies);
      } catch (error) {
        console.error(`Error fetching trending movies: ${error}`);
      }
    }

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  },[]);

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

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.movie_id} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>Popular</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {moviesList.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>


    </main>
  );
}

export default App