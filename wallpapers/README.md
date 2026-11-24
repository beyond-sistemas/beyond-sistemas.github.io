# Beyond — Wallpapers

15 PNGs em 5 variações e 3 resoluções. Gerados com HyperFrames a partir de composições HTML editáveis.

## Variações

| Arquivo base | Descrição |
|---|---|
| `beyond-mark-*` | Anel + wordmark sobre fundo claro |
| `beyond-gradient-*` | Gradiente azul do hero + meridianos |
| `beyond-dome-*` | Horizonte charcoal com ponto azul |
| `beyond-grid-*` | Grid 48px + “Look beyond limits.” |
| `beyond-statement-*` | Frase de posicionamento sobre ink |

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

Cada projeto tem 5 cenas em `compositions/`. Para regenerar um PNG:

```bash
cd ../beyond-wallpapers-16x10
npx hyperframes snapshot --composition mark --frames 1 --output ../beyond/wallpapers/_tmp
```

Depois, copie `frame-00-at-0.5s.png` para o nome desejado.
