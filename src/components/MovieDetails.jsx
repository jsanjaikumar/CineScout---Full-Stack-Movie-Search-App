import { useParams, useNavigate } from "react-router-dom";
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";
import { useEffect, useState } from "react";
import star_icon from "../assets/star.svg";
import Spinner from "./Spinner";


const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [animate, setAnimate] = useState(false);

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch movie details"); 
        }
        const data = await res.json();
        if (data.Response === "False") {
          setErrorMessage(data.Error || "Failed to fetch movie details");
          return;
        }
        setMovie(data);

      } catch (error) {
        console.error(`Error fetching movie details:", ${error}`);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchMovie();
  }, [id]);

   const navigate = useNavigate();

     const handleVisitHome = () => {
       setAnimate(true);
       setTimeout(() => {
          navigate("/"); // Navigate or redirect after animation
       }, 300); // matches your animation duration
     };


  if (loading) {
    return (
       <MovieDetailsSkeleton />
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
  } = movie;

 


  
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
                    {[Year, Runtime, Rated].join(" • ")}
                  </div>
                </div>
              </div>

              <div className="frame3 ">
                <button className="btn">
                  {star_icon && (
                    <img src={star_icon} alt="Star Icon" className="w-5 h-5" />
                  )}
                  {imdbRating}/10 (
                  {`${Math.floor(
                    parseInt(movie.imdbVotes.replace(/,/g, "")) / 10000
                  )}k`}
                  )
                </button>
              </div>
            </div>

            <div className="img-trailer">
              <img src={Poster} alt={Title} />
            </div>

            {loading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <section className="info-section">
                <div className="info">
                  <div className="info-gener">
                    <h2 className="gen">Generes</h2>{" "}
                    <div className="gen-list ">
                      {(Array.isArray(Genre) ? Genre : Genre.split(",")).map(
                        (genre, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1  text-white text-sm font-medium rounded-[6px]  bg-[#221F3D] justify-center"
                          >
                            {genre.trim()}
                          </span>
                        )
                      ) || "N/A"}
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
                  <div className="info-language">
                    <h2>Language</h2>
                    <p>{Language || "N/A"}</p>
                  </div>
                  <div className="info-awards">
                    <h2>Awards</h2>
                    <p> {Awards || "N/A"}</p>
                  </div>
                  <div className="info-revenue">
                    <h2>BoxOffice </h2>
                    <p>{BoxOffice || "N/A"}</p>
                  </div>
                  <div className="info-production">
                    <h2>Production</h2>
                    <p>{Production || "N/A"}</p>
                  </div>
                </div>

                <button className={`visit-home ${animate ? 'animate-slide-out-left' : ''}`} onClick={handleVisitHome}>
                  Visit Homepage <i className="bx bx-right-arrow-alt"></i>
                </button>
              </section>
            )}
          </div>
        </div>
      </div>
    
  );
};


export default MovieDetails
