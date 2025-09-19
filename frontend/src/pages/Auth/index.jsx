import React, { use } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Card from './components/Card'
import AuthForm from './components/AuthForm'

const Auth = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full min-h-screen'>
      <div className='mx-4 md:mx-6 lg:mx-14 my-2 flex items-center gap-2 text-primary hover:text-primary-hover transition-colors duration-300 cursor-pointer' onClick={() => navigate('/')}>
        <FaArrowLeft className='mt-1' />
        <span className='text-lg font-semibold'>Back to Home</span>
      </div>

      <div className='flex flex-col-reverse md:flex-row mx-auto md:w-[85%] lg:w-[65%] mt-20 md:mb-20 gap-10'>
        <div className='md:w-1/2'>
            <Card />
        </div>

        <div className='flex-1 my-auto mx-10 md:mx-0'>
            <AuthForm />
        </div>
      </div>
    </div>
  )
}

export default Auth
