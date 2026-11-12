# Portfólio: direção

Refeito do zero em React + Vite. O portfólio antigo (HTML, CSS e JS puros, na raiz do repositório) fica como está até a troca ser aprovada.

**Leitura do briefing:** portfólio de desenvolvedor em formação, para recrutadores e para clientes de sites, com linguagem editorial de tipo grande e grão, sobre Tailwind v4, GSAP e Lenis.

**Dials (design-taste-frontend):** variância 8, movimento 6, densidade 3.

## Direção de arte

- **Tese visual:** nascer do sol sobre preto profundo. Página em lavanda-claro, tinta Space Black e um palco escuro com grão lavanda e laranja, animado, onde o nome aparece como wordmark gigante. O grão é a textura da marca.
- **Peça do hero:** o grain shader (GrainGradient, WebGL) num palco arredondado, com três capturas reais de projetos flutuando e o wordmark "André Luiz" de ponta a ponta.
- **Tipografia:** Geist Variable (títulos em 600, tracking de -0.04em) e Geist Mono só para dados (anos e tecnologias). Sem serifa.
- **Cores (design system "Lavanda", em `next-app/design-system/lavanda`):** Space Black `#0A0C0D`, Deep Lavender `#8D5EB7`, Sunrise Orange `#E67451`, mais três neutros claros derivados. Lavanda é a ação (texto branco, 4,75:1); laranja é destaque (texto Space Black, 6,52:1) e nunca é texto sobre claro (2,67:1). Dentro do palco do grão o texto é branco. Tema escuro: a página inteira vira Space Black com texto claro.
- **Forma:** botões e chips em pílula, cartões e mídia com 16 px, campos com 8 px.
- **Sequência:** navegação, hero, faixa de tecnologias (único letreiro), sobre, projetos, percurso, contato, rodapé.
- **Movimento:** entrada do hero em GSAP (letras do wordmark, capturas que assentam), títulos palavra a palavra, declaração do "Sobre" que acende conforme a rolagem, capturas do hero que seguem o ponteiro. Um momento autoral (o hero), o resto discreto.
- **Rolagem suave:** Lenis, o único motor, ligado ao ticker do GSAP e ao ScrollTrigger. Locomotive Scroll foi descartado: o Lenis mantém a rolagem nativa (acessível, `position: sticky` funciona) e é mais leve.
- **Three.js:** não. O grão do `@paper-design/shaders-react` já é WebGL e cumpre o papel de textura; uma cena 3D não acrescentaria narrativa.
- **Movimento reduzido:** sem Lenis, sem linhas do tempo e sem letreiro; o shader congela (regra do próprio componente) e tudo aparece no estado final.

## Inspiração (só traços gerais, nada copiado)

- **neiden.framer.media:** wordmark gigante sobre textura granulada, grade de colunas, coluna fixa enquanto o conteúdo rola.
- **yuki-template.framer.website:** nome enorme com imagens flutuando, rótulo pequeno à esquerda e declaração grande à direita.

Identidade, layout, textos e imagens são próprios. Nenhum asset, código ou texto das referências foi usado.

## Procedência

- **Capturas:** telas reais dos meus projetos, em `public/capturas/`.
- **Shader:** Shader Background, do BeUI, de Saurabh Chauhan (MIT), sobre `@paper-design/shaders-react`. O aviso de licença está no topo de `src/components/motion/shader-background.tsx`.
- **Ícones:** Solar Icon Set (480 Design, CC BY 4.0) e marcas do GitHub e do LinkedIn, via Iconify, embutidos em `src/components/Icon.tsx`.
- **Fontes:** Geist e Geist Mono (Vercel, OFL), servidas pelo próprio site via Fontsource.
- **Sem avatar:** não há foto minha no projeto, e iniciais ou ilustração não entram no lugar.
