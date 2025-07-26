// TrendingMovieSkeleton.jsx
import React from 'react';
import { Skeleton, Box } from '@mui/material';

const TrendingMovieSkeleton = () => {
  return (
    <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Skeleton
        height={10}
        width={1}
        variant="text"
        sx={{ bgcolor: "#0F0D23" }}
      />
      {/* Number Skeleton */}
      <Skeleton
        variant="text"
        width={20}
        height={20}
        sx={{ bgcolor: "#0F0D23" }}
      />

      {/* Poster Skeleton */}
      <Skeleton
        variant="rectangular"
        width={60}
        height={90}
        sx={{
          borderRadius: "4px",
          bgcolor: "#0F0D23",
        }}
      />
    </li>
  );
};

export default TrendingMovieSkeleton;
