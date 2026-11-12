import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Hero } from "@/components/Hero"
import { Nav } from "@/components/Nav"
import { Projects } from "@/components/Projects"
import { About, Contact, Footer, Path } from "@/components/Sections"
import { initMotion } from "@/lib/motion"

type Theme = "light" | "dark"

const initialTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light")

export function App() {
  const root = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<Theme>(initialTheme)

  // O atributo muda antes da pintura, para o grão ler as cores já do tema novo
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0A0C0D" : "#F4F0F8")
  }, [theme])

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    try {
      localStorage.setItem("tema", next)
    } catch {
      /* sem armazenamento: vale só nesta visita */
    }
    setTheme(next)
  }

  // Segue o sistema enquanto a pessoa não escolheu um tema
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      try {
        if (localStorage.getItem("tema")) return
      } catch {
        /* segue o sistema */
      }
      setTheme(mq.matches ? "dark" : "light")
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useLayoutEffect(() => {
    if (!root.current) return
    return initMotion(root.current)
  }, [])

  return (
    <div ref={root}>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main id="conteudo">
        <Hero theme={theme} />
        <About />
        <Projects theme={theme} />
        <Path />
        <Contact theme={theme} />
      </main>
      <Footer />
    </div>
  )
}

export default App
