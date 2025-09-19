import React from 'react'
import SkeletonLoader from './SkeletonLoader'

const Field = ({title, text, className, isFetching}) => {
  return (
    <div className='w-full'>
      <p className='text-xs text-neutral-500 font-medium'>{title}</p>

      {isFetching ? <SkeletonLoader /> : <p className={`${className} text-sm`}>{text === "" || !text || text == "undefined" ? <span className='text-xs font-medium text-red-500'>N/A</span> : text}</p>}
    </div>
  )
}

export default Field
