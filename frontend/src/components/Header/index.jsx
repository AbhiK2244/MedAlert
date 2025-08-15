import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='w-full h-16 my-6 bg-[#4F6FFE] text-white flex items-center justify-between rounded-full px-8'>
      <div className='w-full py-4 flex items-center justify-between'>
        <div>
            <h1 className='text-3xl font-bold'>medalert ai</h1>
        </div>

        <div className='flex items-center gap-8'>
            <Link to="/" className='text-lg hover:underline'>HOME</Link>
            <Link to="/about" className='text-lg hover:underline'>ABOUT US</Link>
            <Link to="/" className='text-lg hover:underline'>CONTACT US</Link>
        </div>
        <div className='flex items-center gap-4 h-full'>
            <Link to="/auth" className='bg-white text-[#4F6FFE] text-xl px-4 py-2 rounded-full hover:bg-gray-200 font-semibold'>LOGIN</Link>
            <Link to="/auth" className='bg-white  text-[#4F6FFE] text-xl px-4 py-2 rounded-full hover:bg-gray-200 ml-2 font-semibold'>SIGN UP</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
