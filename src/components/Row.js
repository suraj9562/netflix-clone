import axios from "../axios";
import React, { useState, useEffect } from "react";
import './row.css'

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movie, SetMovie] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.table(request.data.results);
      SetMovie(request.data.results);

      return request;
    }

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movie.map((movie) => (
          <img
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseUrl}${ isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            key={movie.id}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
