import React from "react";
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieListSkeleton = ({ count = 10 }) => {
  return (
    <ul className="movies-grid">
      {Array.from({ length: count }, (_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </ul>
  );
};

export default MovieListSkeleton;
