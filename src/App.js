import { useEffect, useState } from "react";
import Section from "./components/Section";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
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
      <NavBar />
      <HeroSection />
      {genres && (
        <div className="container">
          {genres.map((genre) => (
            <Section key={genre.value} genre={genre.value} />
          ))}
        </div>
      )}
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
