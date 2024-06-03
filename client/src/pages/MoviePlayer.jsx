import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

export default function Player() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState('');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODZiMDRjYjQyZjBmMWY1NzQ5NjA0YmQ2NjBmOTkxMyIsInN1YiI6IjY2NWFkYWFkODVmZTA5YjlkN2FmMGQ4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCJprtx3YC7YKjcR5eaVmeGsQyJ4jIQKjlp2MVQl2mk' // Replace with your actual token
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        if (response.results && response.results.length > 0) {
          setApiData(response.results[0]);
        } else {
          setError('No videos found for this movie.');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch video data.');
      });
  }, [id]);

  if (error) {
    return (
      <div className="player">
        <img src={back_arrow_icon} alt='' onClick={() => { navigate(-1) }} />
        <p>{error}</p>
      </div>
    );
  }

  if (!apiData) {
    return (
      <div className="player">
        <img src={back_arrow_icon} alt='' onClick={() => { navigate(-1) }} />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='' onClick={() => { navigate(-1) }} />
      <iframe
        width='90%'
        height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer'
        frameBorder='0'
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>Published at: <span> {apiData.published_at.slice(0, 10)}</span></p>
        <p>Name: <span>{apiData.name}</span></p>
        <p>Type: <span>{apiData.type}</span></p>
      </div>
    </div>
  );
}
