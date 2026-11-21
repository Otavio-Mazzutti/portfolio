import { MotionConfig } from 'motion/react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { GitHub } from './components/sections/GitHub'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { TechStack } from './components/sections/TechStack'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { useTranslation } from './hooks/useTranslation'

function SkipLink() {
  const { t } = useTranslation()
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
    >
      {t.a11y.skipToContent}
    </a>
  )
}

function Divider() {
  return (
    <div aria-hidden="true" className="container-page">
      <div className="h-px bg-line" />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MotionConfig reducedMotion="user">
          <SkipLink />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            <Hero />
            <Divider />
            <About />
            <Experience />
            <Divider />
            <TechStack />
            <Projects />
            <Divider />
            <GitHub />
            <Contact />
          </main>
          <Footer />
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  )
}
