import { useEffect, useState } from "react"
import { Icon } from "@/components/Icon"
import { lockScroll } from "@/lib/motion"
import { cn } from "@/lib/utils"

const LINKS = [
  ["Sobre", "#sobre"],
  ["Projetos", "#projetos"],
  ["Percurso", "#percurso"],
  ["Contato", "#contato"],
] as const

export function Nav({ theme, onToggleTheme }: { theme: "light" | "dark"; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState("")

  // Marca o link da seção que está na tela
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    )
    LINKS.forEach(([, href]) => {
      const el = document.querySelector(href)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    lockScroll(open)
    document.documentElement.style.overflow = open ? "hidden" : ""
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const themeLabel = theme === "dark" ? "Mudar para o tema claro" : "Mudar para o tema escuro"

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-bg/85 backdrop-blur-md">
      <a href="#conteudo" className="btn btn-primary absolute left-4 top-2 -translate-y-20 focus:translate-y-0">
        Ir para o conteúdo
      </a>
      <nav aria-label="Principal" className="wrap flex h-16 items-center justify-between gap-6">
        <a href="#topo" className="rounded-full text-lg font-semibold tracking-tight">
          André Luiz
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                aria-current={current === href ? "true" : undefined}
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:text-fg aria-[current=true]:bg-sunk aria-[current=true]:text-fg"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="grid size-11 place-items-center rounded-full text-xl transition-colors duration-200 hover:bg-sunk active:scale-95"
          >
            <Icon name={theme === "dark" ? "sun-2" : "moon"} />
          </button>
          <a href="#contato" className="btn btn-primary hidden text-sm md:inline-flex">
            Falar comigo
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-celular"
            aria-label={open ? "Fechar o menu" : "Abrir o menu"}
            className="relative grid size-11 place-items-center rounded-full transition-colors duration-200 hover:bg-sunk md:hidden"
          >
            <span className={cn("absolute h-0.5 w-5 rounded-full bg-fg transition-transform duration-300 ease-out", open ? "rotate-45" : "-translate-y-1")} />
            <span className={cn("absolute h-0.5 w-5 rounded-full bg-fg transition-transform duration-300 ease-out", open ? "-rotate-45" : "translate-y-1")} />
          </button>
        </div>
      </nav>

      <div
        id="menu-celular"
        hidden={!open}
        className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-bg md:hidden"
      >
        <ul className="wrap grid gap-1 pt-6">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block py-3 text-4xl font-semibold tracking-tight">
                {label}
              </a>
            </li>
          ))}
          <li className="pt-6">
            <a href="#contato" onClick={() => setOpen(false)} className="btn btn-primary w-full">
              Falar comigo
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
