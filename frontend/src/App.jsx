import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/Hero'
import Header from './components/Header'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import { Divide } from 'lucide-react'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      
    <main className='w-full bg-black text-white'>
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      
    </main>
      <Footer />
    </div>
  )
}

export default App
