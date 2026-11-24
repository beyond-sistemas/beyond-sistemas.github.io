<p align="center">
  <img src="./assets/brand-avatar.png" alt="Beyond" width="88" />
</p>

<h1 align="center">Beyond</h1>

<p align="center">
  Consultoria de engenharia — estratégia e execução na mesma mão.<br />
  <strong>Look beyond limits.</strong>
</p>

<p align="center">
  <a href="https://github.com/beyond-sistemas/beyond/actions/workflows/deploy-pages.yml">
    <img src="https://github.com/beyond-sistemas/beyond/actions/workflows/deploy-pages.yml/badge.svg" alt="Deploy to GitHub Pages" />
  </a>
  <a href="https://beyond-sistemas.github.io/beyond/">
    <img src="https://img.shields.io/website?label=site&url=https%3A%2F%2Fbeyond-sistemas.github.io%2Fbeyond%2F" alt="Site" />
  </a>
</p>

---

## Conteúdo

- [Sobre](#sobre)
- [Site](#site)
- [Serviços](#serviços)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Desenvolvimento](#desenvolvimento)
- [Deploy e CI/CD](#deploy-e-cicd)
- [Identidade visual](#identidade-visual)
- [Contato](#contato)

## Sobre

A Beyond é uma consultoria de engenharia. Quem entende o problema é quem desenha a arquitetura e responde pela entrega, do diagnóstico à produção.

Não é consultoria que só recomenda. Não é software house que só executa o que recebe pronto. Estratégia e execução ficam na mesma mão, com dono claro até o handoff.

- Atuação: arquitetura de sistemas, integrações, engenharia de software e cloud & DevOps
- Operação: somente remoto
- Tom: PT-BR direto, frases curtas, sem pitch genérico

## Site

**Produção:** https://beyond-sistemas.github.io/beyond/

Landing estática, sem build. HTML, CSS e JavaScript puro.

## Serviços

| # | Serviço | Entrega |
|---|---|---|
| 01 | Arquitetura | Design de sistemas, roadmap e decisões técnicas que escalam |
| 02 | Engenharia | Engenharia de produto hands-on, APIs e plataformas até produção |
| 03 | Cloud & DevOps | DevOps, confiabilidade e infraestrutura estável sob pressão |

## Estrutura do repositório

| Caminho | Função |
|---|---|
| `index.html` | Landing. CSS e fontes inlines no `<head>` para LCP/CPF |
| `css/styles.css` | Fonte da verdade do CSS |
| `js/main.js` | Navegação, FAQ, scroll do hero, reveals e cookie |
| `brand/guidelines.html` | Design system visual (páginas) |
| `legal/` | Termos, privacidade e cookies |
| `assets/` | Logotipos, ícones WebP, fontes locais e imagem Open Graph |
| `assets/brand-avatar.png` | Avatar da marca para GitHub e redes (512×512) |
| `wallpapers/` | Papéis de parede gerados com HyperFrames |
| `scripts/sync-inline-css.py` | Sincroniza `css/styles.css` com o `<style>` da home |
| `.github/workflows/deploy-pages.yml` | Deploy automático no GitHub Pages |
| `robots.txt`, `sitemap.xml`, `404.html` | Arquivos de SEO e erro |

## Desenvolvimento

Sirva o diretório como estático:

```bash
python3 -m http.server 4321
```

Acesse http://127.0.0.1:4321/

Depois de editar `css/styles.css`, atualize o bloco inline da home:

```bash
python3 scripts/sync-inline-css.py
```

> `index.html` inlines `css/styles.css` e as fontes locais para manter o primeiro paint fora do caminho crítico. `css/styles.css` continua sendo a fonte da verdade.

## Deploy e CI/CD

- Branch: `main`
- Workflow: `.github/workflows/deploy-pages.yml`
- Actions: `checkout@v7` → `configure-pages@v6` → `upload-pages-artifact@v5` → `deploy-pages@v5`
- Publicação: GitHub Pages com `build_type: workflow`
- O artefato usa nome por `github.run_id` para evitar colisão entre runs

Todo push em `main` dispara o deploy. `workflow_dispatch` também está disponível.

## Identidade visual

| Asset | Uso |
|---|---|
| `assets/mark.svg` | Favicon — anel ink + ponto `#1857ff` |
| `assets/mark-ring.svg` | Header (fundo claro) |
| `assets/mark-on-dark.svg` | Footer (fundo escuro) |
| `assets/brand-avatar.png` | Avatar institucional |

O anel é monocromático conforme o fundo. O ponto é sempre `#1857ff`. O gap fica no canto superior direito.

| Token | Valor | Papel |
|---|---|---|
| `--ink` | `#0a0a0a` | Texto e footer |
| `--blue` | `#1857ff` | Accent, CTA e foco |
| `--blue-mid` | `#3d74ff` | Hover de azul |
| `--charcoal` | `#141820` | Horizonte do hero e do footer |
| `--bg-soft` | `#f6f8fc` | Superfícies secundárias |

Tipografia: Inter (wordmark), Syne (títulos) e DM Sans (corpo). Fontes hospedadas localmente em `assets/fonts/`.

Guia completo: [`brand/guidelines.html`](./brand/guidelines.html)

## Contato

hello@beyond.sistemas.com.br
