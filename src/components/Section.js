import React, { useEffect, useState } from "react";
import Card from "./Card";

function Section({ genre }) {
  const [movies, setMovies] = useState(null);

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getMovies");
    const responseBody = await response.json();
    setMovies(responseBody.data.movies_by_genre.values);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(movies);

  return (
    <>
      <div>{genre}</div>
      {movies && (
        <div className="movie-section">
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}

export default Section;
