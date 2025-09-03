import React from 'react'

const LoadingBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-primary overflow-hidden">
      <div className="h-full w-1/2 bg-white animate-loading"></div>
    </div>
  )
}

export default LoadingBar
