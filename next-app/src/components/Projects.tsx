import { useEffect, useState } from "react"
import { Icon } from "@/components/Icon"
import { Split } from "@/components/Split"
import { GRUPOS, PROJETOS, type GrupoId, type Projeto } from "@/data"
import { refreshScroll } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Filtro = GrupoId | "todos"

function Shot({ c, dark, className, w, h }: { c: Projeto["desk"]; dark: boolean; className?: string; w: number; h: number }) {
  return <img src={dark && c.escuro ? c.escuro : c.src} alt={c.alt} width={w} height={h} loading="lazy" decoding="async" className={className} />
}

function Card({ p, dark, wide }: { p: Projeto; dark: boolean; wide: boolean }) {
  const main = p.links[0]
  return (
    <article className={cn("group/card", wide && "md:grid md:grid-cols-12 md:items-center md:gap-6")}>
      <a
        href={main.href}
        target="_blank"
        rel="noopener"
        aria-label={`${main.rotulo}: ${p.nome} (abre em nova aba)`}
        className={cn("relative block rounded-card", wide && "md:col-span-7")}
      >
        <div className="overflow-hidden rounded-card border border-line bg-sunk shadow-[var(--shadow-card)] transition-shadow duration-500 ease-out group-hover/card:shadow-[var(--shadow-lift)]">
          <Shot
            c={p.desk}
            dark={dark}
            w={1440}
            h={810}
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
          />
        </div>
        <div className="absolute -bottom-6 right-5 w-[17%] overflow-hidden rounded-card border border-line bg-sunk shadow-[var(--shadow-lift)] transition-transform duration-500 ease-out group-hover/card:-translate-y-2">
          <Shot c={p.cel} dark={dark} w={1080} h={2340} className="aspect-[9/19] w-full object-cover object-top" />
        </div>
      </a>

      <div className={cn("mt-10", wide && "md:col-span-5 md:mt-0 md:pl-6")}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h4 className="text-2xl md:text-3xl">{p.nome}</h4>
          <span className="tag">{p.rotulo}</span>
        </div>
        <p className="mt-2 max-w-[46ch] text-lg text-muted">{p.resumo}</p>
        <p className="mt-3 font-mono text-xs text-muted">{p.tech.join(", ")}</p>

        <details className="mt-4 border-t border-line">
          <summary className="flex min-h-11 items-center justify-between gap-4 py-3 text-sm font-semibold">
            Contexto e entrega
            <Icon name="add-circle" className="plus text-xl" />
          </summary>
          <dl className="grid grid-cols-3 gap-4 pb-4 pt-1">
            {p.fatos.map(([n, label]) => (
              <div key={label}>
                <dt className="text-lg font-semibold tracking-tight">{n}</dt>
                <dd className="text-sm text-muted">{label}</dd>
              </div>
            ))}
          </dl>
          <p className="max-w-[60ch] pb-3 text-muted">{p.contexto}</p>
          <p className="max-w-[60ch] pb-4">{p.entrega}</p>
        </details>

        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {p.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener" className="link inline-flex min-h-11 items-center gap-1.5 font-semibold">
                {l.rotulo}
                <Icon name="arrow-right-up" />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function Projects({ theme }: { theme: string }) {
  const [filtro, setFiltro] = useState<Filtro>("todos")
  const dark = theme === "dark"

  // A altura da página muda com o filtro: o ScrollTrigger precisa medir de novo
  useEffect(() => {
    refreshScroll()
  }, [filtro])

  const chips: { id: Filtro; nome: string; n: number }[] = [
    { id: "todos", nome: "Todos", n: PROJETOS.length },
    ...GRUPOS.map((g) => ({ id: g.id as Filtro, nome: g.nome, n: PROJETOS.filter((p) => p.grupo === g.id).length })),
  ]

  return (
    <section id="projetos" tabIndex={-1} className="wrap py-24 md:py-36">
      <Split text="Projetos" className="text-6xl leading-[0.95] md:text-8xl" />
      <p data-rise className="mt-6 max-w-[52ch] text-lg text-muted">
        {PROJETOS.length} projetos em cinco grupos. Nos sites de demonstração, as marcas e os dados são fictícios.
      </p>

      <div data-rise role="group" aria-label="Filtrar projetos por grupo" className="mt-8 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button key={c.id} type="button" className="chip" aria-pressed={filtro === c.id} onClick={() => setFiltro(c.id)}>
            {c.nome}
            <span className="n">{c.n}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {filtro === "todos" ? "Mostrando todos os projetos" : `Mostrando o grupo ${GRUPOS.find((g) => g.id === filtro)?.nome}`}
      </p>

      {GRUPOS.filter((g) => filtro === "todos" || filtro === g.id).map((g) => {
        const lista = PROJETOS.filter((p) => p.grupo === g.id)
        return (
          <div key={g.id} className="mt-20 border-t border-line-strong pt-6 md:mt-28">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-3xl md:text-4xl">{g.nome}</h3>
              <p className="font-mono text-sm text-muted">
                {lista.length} {lista.length === 1 ? "projeto" : "projetos"}
              </p>
            </div>
            <p className="mt-2 max-w-[52ch] text-muted">{g.descricao}</p>

            <ul className="mt-10 grid gap-x-6 gap-y-16 md:grid-cols-12">
              {lista.map((p, i) => {
                // Ritmo 7/5, 5/7. Um último item sozinho ocupa a linha inteira, com a imagem ao lado do texto.
                const alone = i === lista.length - 1 && lista.length % 2 === 1
                const big = i % 4 === 0 || i % 4 === 3
                return (
                  <li key={p.id} className={cn(alone ? "md:col-span-12" : big ? "md:col-span-7" : "md:col-span-5 md:mt-20")}>
                    <Card p={p} dark={dark} wide={alone} />
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </section>
  )
}
