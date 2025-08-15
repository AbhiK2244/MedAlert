import React, { use } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Card from './components/Card'
import AuthForm from './components/AuthForm'

const Auth = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full min-h-screen'>
      <div className='mx-14 my-2 flex items-center gap-2 text-primary hover:text-primary-hover transition-colors duration-300 cursor-pointer' onClick={() => navigate('/')}>
        <FaArrowLeft className='mt-1' />
        <span className='text-lg font-semibold'>Back to Home</span>
      </div>

      <div className='flex mx-auto w-[65%] my-20 gap-10'>
        <div className='w-1/2'>
            <Card />
        </div>

        <div className='flex-1 my-auto'>
            <AuthForm />
        </div>
      </div>
    </div>
  )
}

export default Auth
