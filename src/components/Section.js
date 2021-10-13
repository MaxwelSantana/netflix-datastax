import React, { useEffect, useState } from "react";
import Card from "./Card";

function Section({ genre }) {
  const [movies, setMovies] = useState(null);
  const [pageState, setPageState] = useState(null);

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre, pageState }),
    });
    const responseBody = await response.json();
    setMovies(responseBody.data.movies_by_genre.values);
    setPageState(responseBody.data.movies_by_genre.pageState);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(pageState);

  return (
    <>
      <div>{genre}</div>
      {movies && (
        <div className="movie-section">
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
          <div
            className="more-button"
            onClick={() => {
              setPageState(pageState);
              fetchData();
            }}
          ></div>
        </div>
      )}
    </>
  );
}

export default Section;
