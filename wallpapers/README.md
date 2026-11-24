# Beyond — Wallpapers

15 PNGs. Família visual única derivada da composição que funcionou (grid): grid 48px, arcos concêntricos, ponto azul no topo direito, logo no canto superior esquerdo e tipografia grande e assimétrica. Todas as cinco cenas têm logo e composição impactante.

## Cenas

| Arquivo | Fundo | Tipografia principal |
|---|---|---|
| `beyond-mark-*` | paper | "Beyond" em Inter 800, 18u |
| `beyond-gradient-*` | azul (`#1857ff` → `#1046e8` → `#0b3fd9`) | "Look beyond limits." em Syne 700, 13u |
| `beyond-dome-*` | charcoal + glow azul | "Beyond" em Inter 800, 18u |
| `beyond-grid-*` | paper | "Look beyond limits." em Syne 700, 11u |
| `beyond-statement-*` | ink + glow azul | "Estratégia e execução na mesma mão." em Syne 700, 9u com régua azul |

Elementos constantes em todas: assinatura `Beyond` com SVG correto por fundo (`mark-ring.svg` no claro, `mark-on-dark.svg` no escuro/azul), tagline Syne 700 com tracking `+0.14em`, grid 48px, quatro arcos concêntricos, ponto azul `#1857ff`, régua de 2px e eyebrow DM Sans 500. Espaçamento em base 8px proporcional (`--u`).

## Resoluções

- `2560x1600` — notebook 16:10
- `1920x1080` — desktop 16:9
- `1290x2796` — celular 9:16

## Projetos-fonte

| Diretório | Tamanho |
|---|---|
| `../../beyond-wallpapers-16x10` | 2560×1600 |
| `../../beyond-wallpapers-16x9` | 1920×1080 |
| `../../beyond-wallpapers-9x16` | 1290×2796 |

Cada projeto tem 5 cenas em `compositions/`, SVGs em `assets/` e fontes locais. Para regenerar:

```bash
cd ../beyond-wallpapers-16x10
npx hyperframes snapshot --composition mark --frames 1 --output ../beyond/wallpapers/_tmp
```

Verificação: `npx hyperframes check --json` passa nos 3 projetos — 0 erros de lint/layout, contraste 21/21.
