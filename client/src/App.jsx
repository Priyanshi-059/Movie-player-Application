import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/Signin';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import Player from './components/Player/Player';
import SearchMovie from './pages/SearchMovie';
import PlaylistPage from './pages/PlaylistPage';
import { useEffect } from 'react';
import axios from 'axios';

export default function App() {

  const [playlists, setPlaylists] = useState(() => {
    const savedPlaylists = localStorage.getItem('playlists');
    return savedPlaylists ? JSON.parse(savedPlaylists) : [];
  });

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = (name, movie) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      movies: movie ? [movie] : [],
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const addMovieToPlaylist = (playlistId, movie) => {
    setPlaylists(playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        return { ...playlist, movies: [...playlist.movies, movie] };
      }
      return playlist;
    }));
  };

  const deleteMovieFromPlaylist = (playlistId, movieId) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist._id === playlistId) {
        return {
          ...playlist,
          movies: playlist.movies.filter(movie => movie.id !== movieId)
        };
      }
      return playlist;
    }));
  };

  



  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/search'  element={<SearchMovie playlists={playlists} addMovieToPlaylist={addMovieToPlaylist} createPlaylist={createPlaylist}/>} />
        <Route path="/projects" element={<PlaylistPage playlists={playlists} 
      onDeleteMovie={deleteMovieFromPlaylist}/>} />
        <Route path='/dashboard' element={<Dashboard />} />
        
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
