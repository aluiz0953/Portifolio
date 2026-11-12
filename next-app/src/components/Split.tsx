import { Fragment } from "react"
import { cn } from "@/lib/utils"

/**
 * Título dividido em palavras para o reveal. O nome acessível fica inteiro no próprio título (aria-label)
 * e as palavras soltas ficam escondidas dos leitores de tela. Sem JavaScript de animação o texto aparece normal.
 */
export function Split({
  as: Tag = "h2",
  text,
  className,
}: {
  as?: "h2" | "h3"
  text: string
  className?: string
}) {
  const words = text.split(" ")
  return (
    <Tag data-split aria-label={text} className={cn(className)}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  )
}
