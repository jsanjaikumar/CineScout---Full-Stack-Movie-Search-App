import React from 'react'
import star_icon from '../assets/star.svg'
import noMovie from "../assets/no-movie.png";
import { Link } from "react-router-dom";

const MovieCard = ({
  movie: { Title, Poster, Year, Type, imdbRating, language, imdbID},
}) => {
  return (
    <Link to={`/movie/${imdbID}`}>
      <div className="movie-card">
        <img src={Poster !== "N/A" ? Poster : noMovie} alt="" />

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
  );
};

export default MovieCard