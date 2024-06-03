import {Link} from 'react-router-dom';
import CAllToAction from '../components/CAllToAction';
import MovieCard from '../components/MovieCards/MovieCard';
import './Home.css';
import Headline from '../components/Headline';

export default function Home() {

  return (

    <div>
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Film Fare World</h1>
          <p className='text-gray-500 text-xs sm:text-sm'>Here you'll find a variety of Movies and Series According to your interest such as
            comedy, thrilled, horror, action, drama, fantasy</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
          View all movies
        </Link>
        </div>
        <div className="p-3 bg-amber-100 dark:bg-slate-700">
          <CAllToAction/>
        </div>
        <Headline/>
        <div className='card'>
          <MovieCard/>
          <div className="more-cards ">
          <MovieCard title={"BlockBluster Movies"} category={"top_rated"}/>
          <MovieCard title={"Upcoming"} category={"popular"}/>
          <MovieCard title={"Only on FilmFare"} category={"upcoming"}/>
          <MovieCard title={"Top Movies for you"} category={"now_playing"}/>
          </div>
        </div>
      </div>
  )
}
