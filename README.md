# Beyond

Consultoria de engenharia — estratégia e execução na mesma mão. **Look beyond limits.**

Site de marca e design system da Beyond, liderada por Keven Miano.

- Landing: `index.html`
- Design system (HTML): `brand/guidelines.html`
- Contato: `hello@beyond.sistemas.com.br`

---

# Design System & Style Guide

Fonte de verdade alinhada ao CSS live (`css/styles.css`).

## Positioning & voice

| | |
|---|---|
| **Nome** | Beyond |
| **Tagline** | Look beyond limits |
| **Categoria** | Consultoria de engenharia — arquitetura, integrações, software e cloud & DevOps |
| **Voz** | Clear · Bold · Expansive · Technical |
| **Tom** | PT-BR direto, frases curtas, sem pitch genérico |
| **CTAs** | Fale conosco · Ver serviços · Enviar mensagem |

**Significado do símbolo:** anel aberto = limite; gap = abertura; ponto azul = o que está *beyond* (visão / próximo passo).

---

## Logo

| Asset | Uso |
|---|---|
| `assets/mark.svg` | Favicon — anel ink + bolinha `#1857ff` |
| `assets/mark-ring.svg` | Header (fundo claro) — anel ink + bolinha `#1857ff` |
| `assets/mark-on-dark.svg` | Footer (fundo escuro) — anel branco + bolinha `#1857ff` |

Anel monocromático (preto ou branco conforme o fundo). Bolinha sempre `#1857ff`.

### Lockup

**Header**
- Mark `1.7rem` (≥860px: `1.85rem`)
- Wordmark Inter **700**, tracking `-0.04em`

**Footer**
- Mark `2.35rem`
- Wordmark Inter **800**, tracking `-0.04em`

### Regras
- Clear space ≥ diâmetro do ponto; gap sempre upper-right
- Flat: ink, white ou brand blue no ponto
- Mínimo digital: **24px** (só símbolo)
- **Não:** stretch, glow, purple, amarelo, fechar o anel

---

## Color tokens

### Primárias

| Token | Hex | Papel |
|---|---|---|
| `--ink` | `#0a0a0a` | Texto, footer, bordas fortes |
| `--blue` | `#1857ff` | Accent, CTAs, focus |
| `--bg` | `#ffffff` | Fundo base |
| `--charcoal` | `#141820` | Hero ground |
| `--muted` | `#3f3f3f` | Texto secundário |

### Superfícies

| Token | Hex |
|---|---|
| `--bg-soft` | `#f6f8fc` |
| `--bg-blue` | `#eef2fa` |
| `--paper` | `#f7f6f2` |
| `--line` | `#e6e6e6` |
| `--line-strong` | `#0a0a0a` |

### Blue scale

| Token | Hex |
|---|---|
| `--blue-deep` | `#0b3fd9` |
| Hero field | `#1046e8` |
| `--blue` | `#1857ff` |
| `--blue-mid` | `#3d74ff` |
| `--blue-soft` | `#9ec2ff` |
| `--blue-glow` | `#d6e6ff` |

### Semânticos

| Token / hex | Uso |
|---|---|
| `--green` `#05e17a` | Success |
| `#e11d48` | Error |
| FAQ | `#252b38` |

### Focus

`--ring: 2px` · `--ring-offset: 2px` · `--ring-color: var(--blue)`

**Accent da marca = blue. Nunca amarelo.**

**Ratios:** ~60% white/soft/paper · 25% ink · 12% blue · 3% green

---

## Typography

### Families

| Token | Stack | Uso |
|---|---|---|
| `--font-logo` | Inter | Wordmark, hero brand |
| `--font-display` | Syne | Títulos, eyebrows |
| `--font-body` | DM Sans | Body, nav, botões, FAQ |

### Scale

| Token | Value | Token | Value |
|---|---|---|---|
| `--text-xs` | `0.75rem` | `--text-2xl` | `1.5rem` |
| `--text-sm` | `0.875rem` | `--text-3xl` | `1.875rem` |
| `--text-base` | `1rem` | `--text-4xl` | `2.25rem` |
| `--text-lg` | `1.125rem` | `--text-5xl` | `3rem` |
| `--text-xl` | `1.25rem` | `--text-6xl` | `3.75rem` |

### Leading

`--leading-tight 1.25` · `--leading-snug 1.375` · `--leading-normal 1.5` · `--leading-relaxed 1.625`

### Tracking

| Padrão | Valor |
|---|---|
| Display tight | `-0.04em` … `-0.06em` |
| Body | `-0.01em` |
| Uppercase / eyebrow | `+0.12em` … `+0.14em` |

Body default: DM Sans **500**, `text-base`, `leading-relaxed`.

---

## Spacing & layout

### Space scale (8px base)

`1→8` · `2→16` · `3→24` · `4→32` · `5→40` · `6→48` · `7→64` · `8→80` · `9→96` · `10→112` · `11→128`

### Layout

| Token | Default | Responsive |
|---|---|---|
| `--container` | `1100px` | ≥1024 → `1160px` |
| `--gutter` | `1.25rem` | 640→`1.5rem` · 1024→`2rem` |
| `--nav-h` | `72px` | ≤640 → `64px` |
| `--section-y` | `80px` | 800→112 · 1024→128 |

### Breakpoints

`420` · `640` · `720` · `760` · `800` · **`860`** (nav desktop / sticky) · `1024` · `1100`

### Radius

| Valor | Uso |
|---|---|
| **12px** | Botões, inputs, cookie |
| **16px** | Form card |
| Elipse | Hero ground / footer dome |

**Evitar:** pills `9999px`, cantos 0–4px misturados.

---

## Buttons

Altura **52px** (nav/cookie **44px**), radius **12px**, DM Sans 700, sentence case.

| Variante | Estilo | Onde |
|---|---|---|
| `.btn--blue` | fill `#1857ff` / texto branco | Nav, form, cookie |
| `.btn--solid` | branco / ink | Hero primary |
| `.btn--ghost` | outline branco | Hero secondary |
| `.btn--outline` | outline ink | Cookie reject |
| `.btn--ink` | fill ink | Spec |

Hover blue → `--blue-mid` `#3d74ff`.

---

## Inputs

- Height `52px`, border `2px solid #e6e6e6`, radius `12px`
- Focus: border `#1857ff` + `box-shadow: 0 0 0 3px #1857ff59`
- Error `#e11d48` · Success `#05e17a` · Disabled `#f0f0ee`

---

## Components

| Component | Notes |
|---|---|
| Header | Sticky, blur, soft bg |
| Hero | `#1046e8` · meridians · charcoal ground · solid+ghost |
| Why | Ícones + lead · soft bg |
| Services | 01/02/03 · `.is-active` por scroll |
| Approach | Descobrir → Desenhar → Entregar · sticky ≥860 |
| FAQ | `#252b38` · accordion |
| Contact | Mail underline · form card · mailto |
| Footer | Ink · dome · brand + cols |
| Cookie | `#111` · accept blue / reject outline |

---

## Motion

| Sistema | Comportamento |
|---|---|
| Hero | Rise 0.75s · underline draw · ground no scroll |
| Reveal | IO opacity + `translateY(14px)` · 0.65s |
| Approach | Item a item por viewport |
| Reduced | `prefers-reduced-motion` → estado final |

---

## Motifs

Círculo / horizonte (hero ground + footer dome) · meridians · grid 48px · scribble underline.

**Não é neobrutalism** — alto contraste ink/blue, radius 12px, grids sutis.

---

## Snippet `:root`

```css
:root {
  --bg: #ffffff;
  --bg-soft: #f6f8fc;
  --bg-blue: #eef2fa;
  --paper: #f7f6f2;
  --ink: #0a0a0a;
  --charcoal: #141820;
  --muted: #3f3f3f;
  --line: #e6e6e6;
  --line-strong: #0a0a0a;
  --blue: #1857ff;
  --blue-mid: #3d74ff;
  --blue-deep: #0b3fd9;
  --blue-soft: #9ec2ff;
  --blue-glow: #d6e6ff;
  --green: #05e17a;
  --font-display: "Syne", system-ui, sans-serif;
  --font-body: "DM Sans", system-ui, sans-serif;
  --font-logo: "Inter", "DM Sans", system-ui, sans-serif;
}
```

Hero field: `#1046e8` · FAQ: `#252b38`.

Versão visual paginada: [`brand/guidelines.html`](./brand/guidelines.html).
