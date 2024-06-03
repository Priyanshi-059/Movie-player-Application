import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div className="">
          <h1 className='text-3xl text-emerald-600 font-semibold text-center my-7'>About Film Fare</h1>
          <div className=" text-md text-gray-500 flex flex-col gap-6">
            <p>Welcome to Film Fare, your ultimate destination for streaming and enjoying your favorite movies and TV shows!</p>
              <p>
              At Film Fare, our mission is to provide users with a seamless and immersive movie-watching experience. We aim to offer a vast library of high-quality content, ranging from classic films to the latest blockbusters, catering to all tastes and preferences.
              </p>
              <p>
              film Fare is developed and maintained by a dedicated team of movie enthusiasts who are passionate about delivering the best-in-class entertainment experience to our users. With years of experience in the industry, our team is committed to continuously improving and expanding our platform to meet the evolving needs of our audience.
              </p>
          </div>
        </div>
      </div>
    </div>
  )
}
