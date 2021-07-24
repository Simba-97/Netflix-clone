import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchURL, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");


    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            //console.log(request);
            return request;
        }
        fetchData();
    }, [fetchURL])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            //https://developers.google.com/youtube/player_parameters;
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
    }

    //console.table(movies);

    return (
        <div className="row">
            <h2>{title}</h2>
            
            <div className="row_posters">
                {movies.map(movie => (
                    <img 
                        key={movie.id} 
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                        src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                    />
                ))}
            </div>
            <Youtube videoId={trailerUrl} opts={opts}/>
        </div>
    )
}

export default Row;
