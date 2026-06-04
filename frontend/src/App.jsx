import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import Header from './components/Header'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Loader from './components/Loader'
import Footer from './components/Footer'
import About from './components/About'
import { useEffect } from 'react'

function App() {
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false);
    },3000);
    return ()=>clearTimeout(timer);
  })
  

  return (
    <>
    {/* {<div className={`${loading ? 'block' : 'hidden'} z-90`}>
      <Loader />
    </div>} */}
    
    <div className="App">
    <main className='w-full bg-black text-white '>
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      
    </main>
      <Footer />
    </div>
    </>
    
  )
}

export default App
