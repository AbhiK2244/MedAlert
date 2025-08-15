import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const LandingPageLayout = () => {
  return (
    <div className="px-14 flex flex-col min-h-screen w-full bg-primary text-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPageLayout