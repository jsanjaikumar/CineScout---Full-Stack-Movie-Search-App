import React from "react";
import { Skeleton, Box } from "@mui/material";

const MovieCardSkeleton = () => {
  return (
    <li className="movie-card">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

        <Skeleton
                height={10}
                width={1}
                variant="text"
                sx={{ bgcolor: "#0F0D23" }}
              />
              
        {/* Movie Poster Skeleton */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{
            borderRadius: "8px",
            bgcolor: "#0F0D23", // Dark theme skeleton
          }}
        />

        {/* Movie Title Skeleton */}
        <Skeleton
          variant="text"
          width="80%"
          height={24}
          sx={{ bgcolor: "#0F0D23" }}
        />

        {/* Movie Year Skeleton */}
        <Skeleton
          variant="text"
          width="40%"
          height={20}
          sx={{ bgcolor: "#0F0D23" }}
        />
      </Box>
    </li>
  );
};

export default MovieCardSkeleton;
