import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/Landing Page'
import NotFound from './pages/Not Found'
import LandingPageLayout from './layouts/LandingPageLayout'
import Auth from './pages/Auth'
import AboutUs from './pages/About us/AboutUs'; 



function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route element={<LandingPageLayout />}> 
        <Route path='/' element={<LandingPage />} />  
      </Route>

      <Route path='/auth' element={<Auth />} />
      <Route path='*' element={<NotFound />} />
      
    <Route path="/about" element={<AboutUs />} />

    </Routes>
  )
}

export default App
