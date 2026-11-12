import { GrainField } from "@/components/GrainField"
import { TECNOLOGIAS } from "@/data"

// Capturas reais de três projetos, flutuando no palco. São decorativas aqui: a seção Projetos apresenta cada uma.
const CARDS = [
  { src: "./capturas/captura-lento.webp", w: 1440, h: 810, pos: "right-[4%] top-[9%] w-[33%] rotate-3" },
  { src: "./capturas/captura-sessao.webp", w: 1440, h: 810, pos: "right-[31%] top-[33%] w-[23%] -rotate-[4deg]" },
  { src: "./capturas/captura-estoque-mobile.webp", w: 1080, h: 2340, pos: "right-[9%] top-[35%] w-[9%] rotate-[5deg]" },
] as const

const letters = (word: string) =>
  [...word].map((ch, i) => (
    <span key={i} data-hero-letter className="inline-block">
      {ch}
    </span>
  ))

export function Hero({ theme }: { theme: string }) {
  return (
    <section id="topo" aria-label="Apresentação" className="wrap pt-[4.5rem]">
      <div
        data-hero-stage
        className="stage relative isolate flex min-h-[calc(100dvh-5.5rem)] flex-col justify-between overflow-hidden rounded-card [container-type:inline-size]"
      >
        <GrainField theme={theme} />

        <div className="relative z-10 grid gap-6 p-6 md:max-w-[35rem] md:gap-8 md:p-10">
          <p data-hero-up className="text-xl font-medium leading-snug md:text-2xl">
            Estudante de Ciências da Computação em Minas Gerais. Construo sites, sistemas web e apps, do banco de dados à animação.
          </p>
          <div data-hero-up className="flex flex-wrap gap-3">
            <a href="#projetos" className="btn btn-primary">
              Ver projetos
            </a>
            <a href="#contato" className="btn btn-ghost">
              Falar comigo
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
          {CARDS.map((card) => (
            <div key={card.src} className={`absolute ${card.pos}`}>
              <div data-hero-card className="overflow-hidden rounded-card border border-line shadow-[var(--shadow-lift)]">
                <img src={card.src} alt="" width={card.w} height={card.h} decoding="async" className="block h-auto w-full" />
              </div>
            </div>
          ))}
        </div>

        <h1
          data-hero-wordmark
          aria-label="André Luiz Guilarducci Pereira"
          className="wordmark relative z-10 px-5 pb-5 md:px-9 md:pb-7"
        >
          <span aria-hidden="true">
            <span className="block whitespace-nowrap md:inline">{letters("André")}</span>{" "}
            <span className="block whitespace-nowrap md:inline">{letters("Luiz")}</span>
          </span>
        </h1>
      </div>

      <div className="marquee py-8 md:py-10" role="group" aria-label="Tecnologias que uso">
        {[0, 1].map((n) => (
          <ul key={n} aria-hidden={n === 1 ? "true" : undefined} className="text-xl font-medium text-muted md:text-2xl">
            {TECNOLOGIAS.map((t) => (
              <li key={t} className="whitespace-nowrap">
                {t}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
