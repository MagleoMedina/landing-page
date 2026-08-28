import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import TechStack from './components/sections/TechStack'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App