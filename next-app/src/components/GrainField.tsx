import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// O shader (WebGL) só é baixado quando o palco entra na tela. Por baixo fica o gradiente estático de `.grain`,
// que é o primeiro quadro e também o substituto se o WebGL faltar.
const ShaderBackground = lazy(() =>
  import("@/components/motion/shader-background").then((m) => ({ default: m.ShaderBackground })),
)

/**
 * Lê a paleta dos tokens CSS, para o shader não ter hex fixo. Estes tokens não mudam com o tema;
 * a escolha por tema abaixo repete o mapeamento de --grain-* em index.css (usado pelo gradiente estático).
 */
function readPalette() {
  const cs = getComputedStyle(document.documentElement)
  const v = (n: string) => cs.getPropertyValue(`--color-${n}`).trim()
  return {
    light: { back: v("space"), colors: [v("lavender"), v("orange"), v("space-raised")] },
    dark: { back: v("space-deep"), colors: [v("lavender"), v("orange"), v("space")] },
  }
}

export function GrainField({
  theme,
  shape = "wave",
  className,
}: {
  theme: string
  shape?: "wave" | "corners" | "blob" | "ripple"
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  const [inView, setInView] = useState(false)
  const [tabOn, setTabOn] = useState(true)
  const [palette] = useState(readPalette)
  const grain = theme === "dark" ? palette.dark : palette.light

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting)
        if (e.isIntersecting) setSeen(true)
      },
      { rootMargin: "200px" },
    )
    io.observe(el)
    const onVis = () => setTabOn(!document.hidden)
    document.addEventListener("visibilitychange", onVis)
    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className={cn("grain", className)}>
      {seen && (
        <Suspense fallback={null}>
          <ShaderBackground
            variant="grain-gradient"
            colorBack={grain.back}
            colors={grain.colors}
            shape={shape}
            softness={0.7}
            intensity={0.45}
            noise={0.42}
            scale={1.1}
            // Fora da tela ou com a aba escondida o shader para de desenhar
            speed={inView && tabOn ? 0.55 : 0}
            maxPixelCount={1920 * 1080}
            minPixelRatio={1}
            style={{ position: "absolute", inset: 0 }}
          />
        </Suspense>
      )}
    </div>
  )
}
