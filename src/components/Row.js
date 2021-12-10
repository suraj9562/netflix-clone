import axios from "../axios";
import React, { useState, useEffect } from "react";
import YouTube from 'react-youtube';
import './row.css'
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movie, SetMovie] = useState([]);
  const [tarilerUrl, setTarilerUrl] = useState("");
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  const handleClick = (movie) =>{
    if(tarilerUrl){
      setTarilerUrl("");
    }else{
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "").then(url =>{
        const urlParams = new URLSearchParams( new URL(url).search );
        setTarilerUrl(urlParams.get("v"))
      }).catch((error)=>
        console.log(error)
      )
    }
  }

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
    //   console.table(request.data.results);
      SetMovie(request.data.results);

      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

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
            onClick={()=>handleClick(movie)}
          />
        ))}
      </div>
      {tarilerUrl && <YouTube videoId={tarilerUrl} opts={opts}/>}
    </div>
  );
};

export default Row;
