import React from "react";
import TrendingMovieSkeleton from "./TrendingMovieSkeleton";

const TrendingListSkeleton = ({ count = 5 }) => {
  return (
    <ul>
      {Array.from({ length: count }, (_, index) => (
        <TrendingMovieSkeleton key={index} />
      ))}
    </ul>
  );
};

export default TrendingListSkeleton;
