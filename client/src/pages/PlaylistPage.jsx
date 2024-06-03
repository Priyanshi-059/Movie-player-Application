import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './PlaylistPage.css';
import { Button } from 'flowbite-react';

const PlaylistPage = ({ playlists,onDeleteMovie }) => {

  const handleDeleteMovie = (playlistId, movieId) => {
    onDeleteMovie(playlistId, movieId);
  };

  return (
    <div className="playlist-page-container">
      <h2 className='head'>Your Playlists</h2>
      <div className="playlist-cards-container">
        {playlists.map((playlist) => (
          <div key={playlist._id} className="playlist-card">
            <h3 className="playlist-title "><span> PlayList : </span>{playlist.name}</h3>
            <div className="playlist-movies">
              {playlist.movies.map((movie) => (
                <div key={movie.id} className="playlist-movie"> 
                  {/* Wrap the image inside a Link component */}
                  <Link to={`/player/${movie.id}`} className="playlist-movie-link">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="playlist-movie-poster"
                    />
                  </Link>
                  <div className="playlist-movie-info">
                    <div className='info'>
                      <h4><span className='sp'>Title: </span>{movie.title}</h4>
                      <h4 ><span className='sp'>Release Date: </span>{movie.release_date}</h4>
                      <p><span className='sp'>Overview: </span> {movie.overview}</p>
                    </div>
                    <div className='delbtn'>
                      <Button gradientDuoTone='pinkToOrange' onClick={() => handleDeleteMovie(playlist._id, movie.id)} className="delete-movie-button">Delete Movie</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
