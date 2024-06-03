import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl '>
                Want to Watch your Playlist?
            </h2>
            <p className='text-gray-400 my-2'>
            Excited to dive into your playlist? Unlock the magic now! Click below to explore your personalized movie haven and embark on an unforgettable cinematic journey.
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href='/projects'  rel='noopener noreferrer'>Checkout Here</a>
            </Button>
            <div className='flex justify-center items-center mt-5'>
                <p className='mr-3'>Didn't Signin?</p>
                <Button gradientDuoTone='pinkToOrange'  className='rounded-tl-xl rounded-bl-none'>
                    <a href='/sign-in' rel='noopener noreferrer'>sign In</a>
                </Button>
            </div>
        </div>
        <div className="p-7 flex-1">
            <img src='https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg' />
        </div>
    </div>
  )
}
