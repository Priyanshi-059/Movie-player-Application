import { Button, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './SearchMovie.css';

export default function SearchMovie({ playlists, addMovieToPlaylist, createPlaylist }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

console.log(movies);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    if (query.trim() === '') return;

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: "186b04cb42f0f1f5749604bd660f9913",
          query: query,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching data from TMDB:', error);
      setError('Failed to fetch data. Please check your API key and try again.');
    }
  };

  const truncateOverview = (overview) => {
    const words = overview.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return overview;
  };

  const handleAddToPlaylist = (movie) => {
    setSelectedMovie(movie);
    setShowPlaylistModal(true);
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() === '') return;
    createPlaylist(newPlaylistName, selectedMovie);
    setNewPlaylistName('');
    setShowPlaylistModal(false);
  };

  const handleAddToExistingPlaylist = (playlistId) => {
    addMovieToPlaylist(playlistId, selectedMovie);
    setShowPlaylistModal(false);
  };

  const fetchVideoDetails = async (movieId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        params: {
          api_key: process.env.VITE_FIREBASE_API_KEY,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching video details from TMDB:', error);
      return [];
    }
  };

  const handleImageClick = async (movieId) => {
    const videos = await fetchVideoDetails(movieId);
    const video = videos.find(video => video.site === 'YouTube' && video.type === 'Trailer');
    if (video) {
      navigate(`/player/${movieId}`);
    } else {
      navigate(`/player/${movieId}`);
    }
  };

  return (
    <div>
      <div className='srh'>
        <div>
          <h2> Search Here :</h2>
        </div>
        <div>
          <form onSubmit={handleSearch}>
            <TextInput
              type='text'
              placeholder='Search...'
              rightIcon={AiOutlineSearch}
              className='hidden lg:inline'
              value={query}
              onChange={handleInputChange}
            />
          </form>
          <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
          </Button>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="movie-list">
        {movies.length > 0 && (
          <div className="movie-cards-container">
            {movies.filter(movie => movie.poster_path).map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className='image' onClick={() => handleImageClick(movie.id)}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                  />
                </div>
                <div className='describe'>
                  <div className='movie-inf'>
                  <h3 className="movie-title"><span>Title: </span>{movie.title}</h3>
                  <h3 className="movie-date"><span>Release Date: </span>{movie.release_date}</h3>
                  <h3 className="movie-overview"><span>Overview: </span>{truncateOverview(movie.overview)}</h3>
                  </div>
                  <div id='addplay'>
                    <button type="submit" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => handleAddToPlaylist(movie)}>Add to Playlist</button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showPlaylistModal && (
        <div className="playlist-modal">
          <h2 className='addplay'>Add to Playlist :- </h2>
          <div>
            <input
              className='in'
              type="text"
              placeholder="New Playlist Name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <button onClick={handleCreatePlaylist} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add to Playlist</button>
          </div>
          <div>
            <h3 className='addplay'>Existing Playlists :</h3>
            <div className='allplaylist'>
              {playlists.map((playlist) => (
                <Button key={playlist.id} onClick={() => handleAddToExistingPlaylist(playlist.id)} type='submit' gradientDuoTone='pinkToOrange'>
                  {playlist.name}
                </Button>
              ))}
            </div>
          </div>
          <div className='close'>
            <button onClick={() => setShowPlaylistModal(false)} type='submit'>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
