import { useEffect, useState } from "react";
import Section from "./components/Section";
import "./App.css";

function App() {
  const genreIncrement = 4;
  const [genres, setGenres] = useState(null);
  const [limit, setLimit] = useState(genreIncrement);

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getGenres", {
      method: "POST",
      body: limit,
    });
    const responseBody = await response.json();
    setGenres(responseBody.data.reference_list.values);
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  return (
    <>
      {genres &&
        genres.map((genre) => (
          <Section key={genre.value} genre={genre.value} />
        ))}
      <div
        className="page-end"
        onMouseEnter={() => {
          setLimit(limit + genreIncrement);
        }}
      />
    </>
  );
}

export default App;
