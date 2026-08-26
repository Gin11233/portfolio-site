import LineNav from './components/LineNav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import AmbientBackground from './components/AmbientBackground.jsx'
import CursorGlow from './components/CursorGlow.jsx'

function App() {
  return (
    <>
      <AmbientBackground />
      <CursorGlow />
      <LineNav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
