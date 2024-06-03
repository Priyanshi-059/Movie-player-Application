import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ title, category }) {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODZiMDRjYjQyZjBmMWY1NzQ5NjA0YmQ2NjBmOTkxMyIsInN1YiI6IjY2NWFkYWFkODVmZTA5YjlkN2FmMGQ4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCJprtx3YC7YKjcR5eaVmeGsQyJ4jIQKjlp2MVQl2mk'
    }
  };

 

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));

 
  }, [category]);

  const handleImageClick = (movieId) => {
    navigate(`/player/${movieId}`);
  };

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular Movies"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => (
          <div className='card' key={index} onClick={() => handleImageClick(card.id)}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt='' />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}