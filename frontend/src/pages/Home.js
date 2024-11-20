import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${api_key}=${searchTerm}`
    );
    setMovies(response.data.Search || []);
  };

  const addToFavourites = async (movie) => {
    await axios.post('http://localhost:5000/api/favourites', movie);
    alert('Added to favourites!');
  };

  return (
    <div className="container mt-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search movies or TV shows..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={searchMovies}>
          Search
        </button>
      </div>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-3 mb-4" key={movie.imdbID}>
            <div className="card">
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">{movie.Year} ({movie.Type})</p>
                <button className="btn btn-success" onClick={() => addToFavourites(movie)}>
                  Add to Favourites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
