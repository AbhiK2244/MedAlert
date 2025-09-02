import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    // <div className='w-full h-16 my-6 flex items-center justify-between pl-8 pr-2'>
    //   <div className='w-full py-4 flex items-center justify-between'>
    //     <div>
    //         <h1 className='text-xl px-6 py-1 font-bold cursor-pointer bg-white text-[#4F6FFE] rounded-full'>medalert ai</h1>
    //     </div>

    //     <div className='flex items-center gap-8 bg-white text-[#4F6FFE] rounded-full px-6 py-2'>
    //         <Link to="/" className='text-sm hover:underline font-medium'>HOME</Link>
    //         <Link to="/" className='text-sm hover:underline font-medium'>ABOUT US</Link>
    //         <Link to="/" className='text-sm hover:underline font-medium'>CONTACT US</Link>
    //     </div>
    //     <div className='flex items-center gap-4 h-full'>
    //         <Link to="/auth" className=' bg-white text-[#4F6FFE] rounded-full px-6 py-2 font-semibold'>LOGIN</Link>
    //     </div>
    //   </div>
    // </div>

    <div className='w-full h-16 my-6 text-[#4F6FFE] bg-neutral-100 flex items-center justify-between rounded-full pl-8 pr-2'>
      <div className='w-full py-2 flex items-center justify-between'>
        <div>
            <h1 className='text-3xl font-bold cursor-pointer'>medalert ai</h1>
        </div>

        <div className='flex items-center gap-8'>
            <Link to="/" className='text-lg hover:underline'>HOME</Link>
            <Link to="/about" className='text-lg hover:underline'>ABOUT US</Link>
            <Link to="/contact" className='text-lg hover:underline'>CONTACT US</Link>
        </div>
        <div className='flex items-center gap-4 h-full'>
            <Link to="/auth" className='text-white bg-[#4F6FFE] text-xl px-4 py-2 rounded-full font-semibold'>LOGIN</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
