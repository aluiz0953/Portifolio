// Movimento da página: GSAP + ScrollTrigger, com Lenis como único motor de rolagem suave.
// Com prefers-reduced-motion nada disso liga: sem Lenis, sem linhas do tempo, tudo no estado final.
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

let lenis: Lenis | null = null

export const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
export const lockScroll = (on: boolean) => (on ? lenis?.stop() : lenis?.start())
export const refreshScroll = () => ScrollTrigger.refresh()

function goTo(hash: string) {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return false
  const done = () => el.focus({ preventScroll: true })
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.1, onComplete: done })
  else {
    el.scrollIntoView()
    done()
  }
  history.replaceState(null, "", hash)
  return true
}

export function initMotion(root: HTMLElement) {
  // Âncoras: rolagem (suave ou nativa) e foco no destino, para quem navega por teclado
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]')
    if (!a || a.hash.length < 2) return
    if (goTo(a.hash)) e.preventDefault()
  }
  document.addEventListener("click", onClick)

  if (prefersReduced()) return () => document.removeEventListener("click", onClick)

  gsap.registerPlugin(ScrollTrigger)
  lenis = new Lenis({ lerp: 0.1 })
  lenis.on("scroll", ScrollTrigger.update)
  const tick = (t: number) => lenis?.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  const cleanups: (() => void)[] = []

  const ctx = gsap.context(() => {
    // 1. Entrada do hero: o momento autoral da página
    const letters = gsap.utils.toArray<HTMLElement>("[data-hero-letter]")
    const cards = gsap.utils.toArray<HTMLElement>("[data-hero-card]")
    gsap.set(letters, { yPercent: 105 })
    gsap.set("[data-hero-up]", { autoAlpha: 0, y: 24 })
    gsap.set(cards, { autoAlpha: 0, y: 70, scale: 0.92 })
    gsap.set("[data-hero-stage]", { clipPath: "inset(6% 3% 6% 3% round 28px)" })

    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .to("[data-hero-stage]", { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.3, clearProps: "clipPath" }, 0)
      .to(letters, { yPercent: 0, duration: 1.25, stagger: 0.045 }, 0.1)
      .to("[data-hero-up]", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09 }, 0.55)
      .to(cards, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.12, ease: "back.out(1.4)" }, 0.5)

    // Saída do hero ligada à rolagem: o wordmark e as capturas sobem em ritmos diferentes
    gsap.to("[data-hero-wordmark]", { yPercent: -14, ease: "none", scrollTrigger: { trigger: "[data-hero-stage]", start: "top top", end: "bottom top", scrub: true } })
    cards.forEach((card, i) =>
      gsap.to(card.parentElement, { yPercent: -18 - i * 14, ease: "none", scrollTrigger: { trigger: "[data-hero-stage]", start: "top top", end: "bottom top", scrub: true } }),
    )

    // As capturas seguem o ponteiro, só com mouse (efeito aditivo, o layout não depende dele)
    const stage = root.querySelector<HTMLElement>("[data-hero-stage]")
    if (stage && window.matchMedia("(pointer: fine)").matches) {
      const movers = cards.map((card, i) => ({
        x: gsap.quickTo(card, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(card, "y", { duration: 0.9, ease: "power3.out" }),
        depth: 14 + i * 12,
      }))
      const onMove = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect()
        const nx = (e.clientX - r.left) / r.width - 0.5
        const ny = (e.clientY - r.top) / r.height - 0.5
        movers.forEach((m) => {
          m.x(nx * m.depth)
          m.y(ny * m.depth)
        })
      }
      const onLeave = () => movers.forEach((m) => { m.x(0); m.y(0) })
      stage.addEventListener("pointermove", onMove)
      stage.addEventListener("pointerleave", onLeave)
      window.addEventListener("blur", onLeave)
      cleanups.push(() => {
        stage.removeEventListener("pointermove", onMove)
        stage.removeEventListener("pointerleave", onLeave)
        window.removeEventListener("blur", onLeave)
      })
    }

    // 2. Títulos de seção: palavra a palavra, uma vez
    gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
      const words = el.querySelectorAll(".wi")
      gsap.set(words, { yPercent: 110 })
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.to(words, { yPercent: 0, duration: 1, stagger: 0.06, ease: "expo.out" }),
      })
    })

    // 3. Declaração do "Sobre": as palavras acendem conforme a rolagem
    gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((el) => {
      gsap.fromTo(
        el.querySelectorAll(".sw"),
        { opacity: 0.22 },
        { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 58%", scrub: true } },
      )
    })

    // 4. Blocos de apoio: sobem uma vez, em grupo
    gsap.set("[data-rise]", { autoAlpha: 0, y: 28 })
    ScrollTrigger.batch("[data-rise]", {
      start: "top 90%",
      once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "expo.out", clearProps: "transform" }),
    })
  }, root)

  const refresh = () => ScrollTrigger.refresh()
  document.fonts.ready.then(refresh)
  window.addEventListener("load", refresh)

  return () => {
    document.removeEventListener("click", onClick)
    window.removeEventListener("load", refresh)
    cleanups.forEach((fn) => fn())
    ctx.revert()
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}
