# Beyond — Wallpapers

15 PNGs em 5 variações e 3 resoluções. Recriados do zero em HyperFrames, alinhados ao Beyond Design System (`beyond/README.md`).

## O que mudou na recriação

- Logotipo em escala de lockup: marca 18u, wordmark 15u (u = 8px na short side 1600), proporção Inter 700/800 com tracking `-0.04em`.
- SVG correto por fundo: `mark-ring.svg` (ink) em fundo claro; `mark-on-dark.svg` (branco + ponto `#1857ff`) em azul, charcoal e ink. Sem opacidade no lockup.
- Tokens exatos do BDS: `#0a0a0a`, `#1857ff`, `#1046e8`, `#141820`, `#f6f8fc`, `#f7f6f2`, `#3f3f3f`, `#e6e6e6`.
- Espaçamento na base 8px proporcional (`--u`), grid 48px, meridianos com stroke branco 24%.
- Textos: Inter (wordmark), Syne 700 (display/tagline), DM Sans 500 (eyebrow), tracking `+0.14em` em uppercase.

## Arquivos

| Variação | Fundo | 2560×1600 | 1920×1080 | 1290×2796 |
|---|---|---|---|---|
| `beyond-mark-*` | branco | ✓ | ✓ | ✓ |
| `beyond-gradient-*` | azul hero + meridianos | ✓ | ✓ | ✓ |
| `beyond-dome-*` | soft + dome charcoal | ✓ | ✓ | ✓ |
| `beyond-grid-*` | paper + grid 48px | ✓ | ✓ | ✓ |
| `beyond-statement-*` | ink + frase | ✓ | ✓ | ✓ |

## Projetos-fonte

| Diretório | Tamanho |
|---|---|
| `../../beyond-wallpapers-16x10` | 2560×1600 |
| `../../beyond-wallpapers-16x9` | 1920×1080 |
| `../../beyond-wallpapers-9x16` | 1290×2796 |

Cada projeto tem 5 cenas em `compositions/`, SVGs em `assets/` e fontes locais. Para regenerar um PNG:

```bash
cd ../beyond-wallpapers-16x10
npx hyperframes snapshot --composition mark --frames 1 --output ../beyond/wallpapers/_tmp
```

Verificação: `npx hyperframes check --json` passa nos 3 projetos — 0 erros de lint/layout, contraste 12/12.
