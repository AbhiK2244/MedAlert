import React from 'react'
import cover from '/images/cover.png'

const Card = () => {
  return (
    <div className='bg-primary h-96 rounded-lg px-10 py-8 overflow-hidden'>
      <h1 className='text-white text-2xl font-bold text-center'>Welcome to MedAlert AI</h1>
      <p className='text-white text-center mt-4'>Scan nutrition labels and get health insights, safe consumption advice, and downloadable diet reports powered by AI.</p>

      <img src={cover} alt="Cover" className='w-52 mx-auto -mt-8' />
    </div>
  )
}

export default Card
