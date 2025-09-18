import React from 'react'

const Field = ({title, text, className}) => {
  return (
    <div className='w-full'>
      <p className='text-xs text-neutral-500 font-medium'>{title}</p>
      <p className={`${className} text-sm`}>{text === "" || !text || text == "undefined" ? <span className='text-xs font-medium text-red-500'>N/A</span> : text}</p>
    </div>
  )
}

export default Field
