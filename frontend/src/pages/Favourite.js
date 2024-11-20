import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      const response = await axios.get('http://localhost:5000/api/favourites');
      setFavourites(response.data);
    };
    fetchFavourites();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Favourites</h2>
      <div className="row">
        {favourites.map((movie) => (
          <div className="col-md-3 mb-4" key={movie._id}>
            <div className="card">
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">{movie.Year} ({movie.Type})</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
