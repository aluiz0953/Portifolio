import { useState, type FormEvent } from "react"
import { GrainField } from "@/components/GrainField"
import { Icon, type IconName } from "@/components/Icon"
import { Split } from "@/components/Split"
import { CONTATO, HABILIDADES } from "@/data"

const DECLARACAO =
  "Gosto de entender como as máquinas funcionam por dentro. Trabalho com reparo de computadores e redes, e estou aprendendo desenvolvimento web, sistemas de dados e servidores em nuvem."

export function About() {
  return (
    <section id="sobre" tabIndex={-1} className="wrap grid gap-8 py-20 md:grid-cols-12 md:gap-6 md:py-32">
      <Split text="Sobre" className="text-3xl md:col-span-3 md:text-4xl" />
      <div className="md:col-span-9">
        <p data-scrub className="text-3xl font-medium leading-[1.14] tracking-[-0.03em] md:text-5xl md:leading-[1.1]">
          {DECLARACAO.split(" ").map((w, i) => (
            <span key={i} className="sw">
              {w}{" "}
            </span>
          ))}
        </p>
        <p data-rise className="mt-8 max-w-[58ch] text-lg text-muted">
          Sou estudante de Ciências da Computação na Uninter. Fora da tela, curto games, música e testar tecnologias novas.
        </p>
        <dl data-rise className="mt-12 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          {[
            ["Localização", "Santos Dumont, Minas Gerais"],
            ["Formação", "Ciências da Computação, Uninter"],
            ["Objetivo", "Sistemas de dados e servidores em nuvem"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="mt-1 text-lg font-semibold leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Lista({ titulo, itens }: { titulo: string; itens: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-muted">{titulo}</h4>
      <ul className="mt-3 grid gap-4">
        {itens.map(([nome, prova]) => (
          <li key={nome}>
            <p className="font-semibold leading-snug">{nome}</p>
            <p className="text-sm text-muted">{prova}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Path() {
  return (
    <section id="percurso" tabIndex={-1} className="wrap py-20 md:py-32">
      <Split text="Percurso" className="text-6xl leading-[0.95] md:text-8xl" />
      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-12 md:gap-6">
        <article data-rise className="flex min-h-72 flex-col justify-between gap-10 rounded-card bg-strong p-6 text-on-strong md:col-span-7 md:p-10">
          <p className="font-mono text-sm text-on-strong-muted">2025, cursando</p>
          <div>
            <h3 className="text-3xl md:text-5xl">Ciências da Computação</h3>
            <p className="mt-2 text-lg text-on-strong-muted">Uninter, Juiz de Fora/MG</p>
            <p className="mt-4 max-w-[52ch]">
              Graduação com foco em algoritmos, estruturas de dados, desenvolvimento de software, programação web e fundamentos de computação.
            </p>
          </div>
        </article>

        <article data-rise className="flex min-h-72 flex-col justify-between gap-10 rounded-card bg-accent p-6 text-on-accent md:col-span-5 md:p-10">
          <h3 className="text-3xl md:text-4xl">Idiomas</h3>
          <dl className="grid gap-4">
            <div>
              <dt className="text-2xl font-semibold tracking-tight">Português</dt>
              <dd>Nativo</dd>
            </div>
            <div>
              <dt className="text-2xl font-semibold tracking-tight">Inglês</dt>
              <dd>Intermediário a avançado</dd>
            </div>
          </dl>
        </article>

        <article data-rise className="flex flex-col justify-between gap-10 rounded-card border border-line bg-raised p-6 md:col-span-5 md:p-10">
          <p className="font-mono text-sm text-muted">2022 a 2024</p>
          <div>
            <h3 className="text-3xl md:text-4xl">Ensino Médio</h3>
            <p className="mt-2 text-lg text-muted">E.E. Presidente João Pinheiro, Santos Dumont/MG</p>
          </div>
        </article>

        <article data-rise className="rounded-card bg-sunk p-6 md:col-span-7 md:p-10">
          <h3 className="text-3xl md:text-4xl">O que faço e o que estudo</h3>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <Lista titulo="Na prática, hoje" itens={HABILIDADES.pratica} />
            <Lista titulo="Em aprendizado" itens={HABILIDADES.aprendendo} />
          </div>
        </article>
      </div>
    </section>
  )
}

const CANAIS: { icon: IconName; nome: string; valor: string; href: string; externo?: boolean }[] = [
  { icon: "letter", nome: "E-mail", valor: CONTATO.email, href: `mailto:${CONTATO.email}` },
  { icon: "phone", nome: "Telefone", valor: CONTATO.telefone, href: CONTATO.telefoneHref },
  { icon: "github", nome: "GitHub", valor: "github.com/aluiz0953", href: CONTATO.github, externo: true },
  { icon: "linkedin", nome: "LinkedIn", valor: "André Luiz Guilarducci Pereira", href: CONTATO.linkedin, externo: true },
]

type Erros = { nome?: string; email?: string; mensagem?: string }

function validar(d: { nome: string; email: string; mensagem: string }): Erros {
  const e: Erros = {}
  if (!d.nome.trim()) e.nome = "Informe seu nome."
  if (!d.email.trim()) e.email = "Informe seu e-mail."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Esse e-mail parece incompleto. Confira o endereço."
  if (d.mensagem.trim().length < 10) e.mensagem = "Escreva uma mensagem com pelo menos 10 caracteres."
  return e
}

function Campo({ id, rotulo, erro, children }: { id: string; rotulo: string; erro?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {rotulo}
      </label>
      {children}
      {erro ? (
        <p id={`${id}-erro`} role="alert" className="text-sm font-semibold">
          {erro}
        </p>
      ) : null}
    </div>
  )
}

export function Contact({ theme }: { theme: string }) {
  const [dados, setDados] = useState({ nome: "", email: "", mensagem: "" })
  const [erros, setErros] = useState<Erros>({})
  const [enviado, setEnviado] = useState(false)

  const set = (k: keyof typeof dados) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...dados, [k]: e.target.value }
    setDados(next)
    setEnviado(false)
    if (erros[k]) setErros({ ...erros, [k]: validar(next)[k] })
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const er = validar(dados)
    setErros(er)
    const first = (["nome", "email", "mensagem"] as const).find((k) => er[k])
    if (first) {
      document.getElementById(`c-${first}`)?.focus()
      return
    }
    // Sem servidor: o formulário monta o e-mail e abre o aplicativo de e-mail de quem escreve
    const assunto = `Contato pelo portfólio: ${dados.nome.trim()}`
    const corpo = `${dados.mensagem.trim()}\n\n${dados.nome.trim()}\n${dados.email.trim()}`
    window.location.href = `mailto:${CONTATO.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`
    setEnviado(true)
  }

  const attrs = (k: keyof Erros) => ({ "aria-invalid": erros[k] ? true : undefined, "aria-describedby": erros[k] ? `c-${k}-erro` : undefined })

  return (
    <section id="contato" tabIndex={-1} className="wrap py-20 md:py-32">
      <div className="stage relative isolate overflow-hidden rounded-card px-6 py-16 md:px-12 md:py-28">
        <GrainField theme={theme} shape="corners" />
        <div className="relative z-10">
          <Split text="Vamos conversar" className="text-6xl leading-[0.92] md:text-9xl" />
          <a href={`mailto:${CONTATO.email}`} data-rise className="link mt-8 inline-flex items-center gap-2 text-2xl font-semibold md:text-4xl">
            {CONTATO.email}
            <Icon name="arrow-right-up" />
          </a>
        </div>
      </div>

      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-6">
        <form onSubmit={onSubmit} noValidate data-rise className="grid gap-5 md:col-span-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Campo id="c-nome" rotulo="Nome" erro={erros.nome}>
              <input id="c-nome" className="field" type="text" autoComplete="name" maxLength={80} value={dados.nome} onChange={set("nome")} {...attrs("nome")} />
            </Campo>
            <Campo id="c-email" rotulo="E-mail" erro={erros.email}>
              <input id="c-email" className="field" type="email" autoComplete="email" maxLength={120} value={dados.email} onChange={set("email")} {...attrs("email")} />
            </Campo>
          </div>
          <Campo id="c-mensagem" rotulo="Mensagem" erro={erros.mensagem}>
            <textarea id="c-mensagem" className="field min-h-36 resize-y" maxLength={2000} value={dados.mensagem} onChange={set("mensagem")} {...attrs("mensagem")} />
          </Campo>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="submit" className="btn btn-primary">
              Enviar mensagem
            </button>
            <p className="text-sm text-muted">O envio abre o seu aplicativo de e-mail com a mensagem pronta.</p>
          </div>
          <p role="status" className="min-h-6 font-semibold">
            {enviado ? `Mensagem montada. Se o aplicativo de e-mail não abriu, escreva para ${CONTATO.email}.` : ""}
          </p>
        </form>

        <ul data-rise className="grid content-start gap-2 md:col-span-4 md:col-start-9">
          {CANAIS.map((c) => (
            <li key={c.nome}>
              <a
                href={c.href}
                {...(c.externo ? { target: "_blank", rel: "noopener" } : {})}
                className="group/canal flex items-center gap-4 rounded-card p-3 transition-colors duration-200 hover:bg-sunk"
              >
                <span className="grid size-11 flex-none place-items-center rounded-full bg-sunk text-xl transition-colors duration-200 group-hover/canal:bg-raised">
                  <Icon name={c.icon} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">{c.nome}</span>
                  <span className="block truncate font-semibold">{c.valor}</span>
                </span>
                {c.externo ? <span className="sr-only">(abre em nova aba)</span> : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="wrap pb-10">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-6 text-sm">
        <p>© 2026 André Luiz Guilarducci Pereira</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <li>
            <a className="link" href={CONTATO.github} target="_blank" rel="noopener">
              GitHub
            </a>
          </li>
          <li>
            <a className="link" href={CONTATO.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link inline-flex items-center gap-1" href="#topo">
              Voltar ao topo
              <Icon name="arrow-up" />
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-4 max-w-[80ch] text-xs text-muted">
        Grão animado: Shader Background, do BeUI (MIT), sobre Paper Shaders. Ícones Solar (CC BY 4.0). Fontes Geist e Geist Mono.
      </p>
    </footer>
  )
}
