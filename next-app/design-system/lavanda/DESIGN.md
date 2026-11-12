# Design system "Lavanda"

Paleta recebida: **Space Black** `#0A0C0D`, **Deep Lavender** `#8D5EB7`, **Sunrise Orange** `#E67451`. Este documento vem antes das telas: define papéis, contraste e estados. Os valores estão em `tokens.css`.

## 1. Leitura do briefing

Portfólio de desenvolvedor, para recrutadores e clientes, com linguagem editorial de tipo grande e grão animado. A paleta é escura e quente-fria: preto profundo, um violeta de força média e um laranja de nascer do sol. Dials: variância 8, movimento 6, densidade 3 (mesmos do projeto).

**A paleta recebida não tem uma cor clara.** Para o tema claro e para texto sobre escuro, derivei neutros tingidos de lavanda: `mist` `#F4F0F8`, `raised` `#FBF9FD` e `sunk` `#E8E0F0`. Eles não foram escolhidos pelo usuário: se preferir outro claro, troca-se só esses três tokens.

## 2. Contraste medido (WCAG, razão de luminância)

| Par | Razão | Regra de uso |
|---|---|---|
| Space Black sobre mist | 17,42 | todo texto no tema claro |
| Mist sobre Space Black | 17,42 | todo texto no tema escuro |
| Texto secundário `#4A4455` sobre mist | 8,30 | legendas no tema claro |
| Texto secundário `#B9B0C4` sobre Space Black | 9,40 | legendas no tema escuro |
| **Branco sobre lavanda `#8D5EB7`** | **4,75** | aprovado: texto de botão principal |
| Branco sobre lavanda-deep `#734F96` | 6,39 | hover do botão |
| Lavanda-deep `#734F96` sobre mist | 5,68 | links no tema claro |
| Lavanda-soft `#C9A8E8` sobre Space Black | 9,57 | links e destaques no tema escuro |
| Sunrise Orange sobre Space Black | 6,52 | aprovado: texto e ícones de destaque sobre escuro |
| Space Black sobre Sunrise Orange | 6,52 | aprovado: texto de cartão laranja |
| **Lavanda `#8D5EB7` sobre Space Black** | **4,12** | **só texto grande (3:1) ou fronteira de componente; texto corrido usa lavanda-soft** |
| **Sunrise Orange sobre mist** | **2,67** | **reprovado: laranja nunca é texto sobre claro, só preenchimento com texto preto** |
| **Branco sobre Sunrise Orange** | **3,01** | **reprovado para texto pequeno; só no wordmark gigante do palco** |
| **Lavanda sobre Sunrise Orange** | **1,58** | **nunca adjacentes sem uma superfície neutra no meio** |

## 3. Papéis de cor

| Papel | Token | Claro | Escuro |
|---|---|---|---|
| Fundo | `--bg` | `#F4F0F8` | `#0A0C0D` |
| Superfície elevada | `--bg-raised` | `#FBF9FD` | `#161A1C` |
| Superfície rebaixada | `--bg-sunk` | `#E8E0F0` | `#050607` |
| Texto | `--fg` | `#0A0C0D` | `#F4F0F8` |
| Texto secundário | `--fg-muted` | `#4A4455` | `#B9B0C4` |
| Ação principal | `--primary-bg` | `#8D5EB7` (texto branco) | `#8D5EB7` (texto branco) |
| Hover da ação | `--primary-hover` | `#734F96` | `#734F96` |
| Destaque | `--accent-bg` | `#E67451` (texto `#0A0C0D`) | `#E67451` (texto `#0A0C0D`) |
| Link | `--link` | `#734F96` | `#C9A8E8` |
| Bloco forte | `--strong-bg` | `#0A0C0D` | `#F4F0F8` |
| Foco | `--focus-ring` | `#0A0C0D` | `#C9A8E8` |

**Regra de ouro:** um preenchimento nunca leva texto de outra cor além da definida na tabela. Lavanda pede branco; laranja pede Space Black.

**Palco do grão:** bloco Space Black com grão lavanda e laranja, nos dois temas. Dentro dele o texto é branco, e o botão principal é branco com texto Space Black.

**Trava de cor:** dois acentos, cada um com função fixa: lavanda para agir, laranja para destacar. O laranja aparece em no máximo uma superfície grande por tela.

## 4. Tipografia, espaço e forma

Herda do sistema do portfólio:
- **Fonte:** Geist (corpo e títulos, peso 600, tracking `-0.03em`) e Geist Mono só para dados. Sem serifa.
- **Escala:** 12, 14, 16, 18, 20, 24, 36, 60 px.
- **Espaço:** base de 4 px; seções entre `5rem` e `9rem`.
- **Raios:** botões e chips em pílula, cartões e mídia com 16 px, campos com 8 px.

## 5. Componentes e estados

Todo controle tem repouso, hover, ativo, foco visível, desabilitado e carregando.

- **Botão principal:** fundo lavanda, texto branco, pílula, 44 px de altura. Hover `#734F96`. Ativo desloca 1 px e reduz para 98%. Foco: anel de 2 px (Space Black no claro, lavanda-soft no escuro). Desabilitado: 45% de opacidade.
- **Botão fantasma:** só borda `--border-strong`; hover preenche com `--bg-sunk`.
- **Cartão de destaque laranja:** fundo `#E67451`, texto `#0A0C0D`. Uso: um por tela.
- **Link:** sublinhado de 1,5 px, cor `--link`; hover troca o sublinhado para laranja.
- **Chip de filtro:** pílula; ativo em lavanda com texto branco.
- **Campo:** rótulo acima, borda `--border-strong`, foco com anel; erro com borda mais grossa e mensagem abaixo, nunca só cor.
- **Cartão de projeto:** mídia em 16 px com sombra tingida de Space Black.
- **Seleção de texto:** fundo laranja, texto Space Black (6,52).

## 6. Movimento

Revelação ao rolar com deslocamento de 24 px, curva exponencial; transform e opacity apenas. Redução de movimento vale no desktop (para tudo); no celular as animações seguem, por decisão do dono do portfólio.

## 7. Riscos e o que reavaliar

- **Lavanda sobre preto (4,12) é o ponto fraco:** por isso o texto corrido sobre escuro usa lavanda-soft (9,57). Se o botão lavanda for usado sobre fundo escuro, a fronteira (4,12) passa em 3:1 para componentes de interface, mas fica discreta.
- **O laranja não aguenta fundo claro:** qualquer ideia de "texto laranja" em tema claro deve ser descartada ou virar preenchimento.
- **Neutros claros foram inventados:** validar com o dono antes de tratar como definitivos.
- **Laranja e lavanda lado a lado vibram (1,58):** manter sempre separados por neutro.
