import { useParams, useNavigate } from "react-router-dom";
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";
import { useState } from "react";
import star_icon from "../assets/star.svg";
import Spinner from "./Spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const fetchMovie = async (id) => {
  if (!id) throw new Error("Invalid movie ID");

  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      i: id,
      apikey: API_KEY,
    },
    validateStatus: (status) => status >= 200 && status < 500, // let handler manage OMDb errors
  });

  const data = response.data;

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }

  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to fetch movie details");
  }

  return data;
};

const MovieDetails = () => {
  const { id } = useParams();
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const {
    data: movie,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id),
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleVisitHome = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  if (isError || !movie) {
    return (
      <div className="p-4">
        <p className="text-red-500">
          {(error && error.message) || "Failed to load movie details."}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  const {
    Title,
    Poster,
    Released,
    Runtime,
    Year,
    Actors,
    Rated,
    Director,
    Genre,
    Awards,
    Type,
    Plot,
    Country,
    imdbRating,
    Language,
    BoxOffice,
    Production,
    imdbVotes = "0",
  } = movie;

  const formattedVotes = (() => {
    try {
      return `${Math.floor(parseInt(imdbVotes.replace(/,/g, "")) / 10000)}k`;
    } catch {
      return "N/A";
    }
  })();

  return (
    <div className="model-top">
      <div className="model-box">
        <div className="content-box ">
          <div className="head">
            <div className="frame1">
              <h1>
                {Title?.split(" ").slice(0, 6).join(" ")}
                {Title?.split(" ").length > 6 ? "..." : ""}
              </h1>
              <div className="frame 2 ">
                <div className="span ">
                  {[Year, Runtime, Rated].filter(Boolean).join(" • ")}
                </div>
              </div>
            </div>

            <div className="frame3 ">
              <button className="btn">
                {star_icon && (
                  <img src={star_icon} alt="Star Icon" className="w-5 h-5" />
                )}
                {imdbRating || "N/A"}/10 ({formattedVotes})
              </button>
            </div>
          </div>

          <div className="img-trailer">
            <img src={Poster} alt={Title} />
          </div>

          <section className="info-section">
            <div className="info">
              <div className="info-gener">
                <h2 className="gen">Genres</h2>{" "}
                <div className="gen-list ">
                  {Genre
                    ? (Array.isArray(Genre) ? Genre : Genre.split(",")).map(
                        (genre, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-white text-sm font-medium rounded-[6px] bg-[#221F3D] justify-center"
                          >
                            {genre.trim()}
                          </span>
                        )
                      )
                    : "N/A"}
                </div>
              </div>
              <div className="info-overview">
                <h2>Overview</h2>
                <p>{Plot || "N/A"}</p>
              </div>
              <div className="info-tagline">
                <h2>Type</h2>
                <p>{Type || "N/A"}</p>
              </div>
              <div className="info-release">
                <h2>Release date</h2>
                <p>{Released || "N/A"}</p>
              </div>
              <div className="info-country">
                <h2>Countries</h2>
                <p>{Country || "N/A"}</p>
              </div>
              <div className="info-actors">
                <h2>Actors</h2>
                <p>{Actors || "N/A"}</p>
              </div>
              <div className="info-actors">
                <h2>Director</h2>
                <p>{Director || "N/A"}</p>
              </div>
              <div className="info-actors">
                <h2>Language</h2>
                <p>{Language || "N/A"}</p>
              </div>
              <div className="info-awards">
                <h2>Awards</h2>
                <p>{Awards || "N/A"}</p>
              </div>
              <div className="info-language">
                <h2>BoxOffice</h2>
                <p>{BoxOffice || "N/A"}</p>
              </div>
              <div className="info-production">
                <h2>Production</h2>
                <p>{Production || "N/A"}</p>
              </div>
            </div>

            <button
              className={`visit-home ${
                animate ? "animate-slide-out-left" : ""
              }`}
              onClick={handleVisitHome}
            >
              Visit Homepage <i className="bx bx-right-arrow-alt"></i>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
