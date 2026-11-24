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

## Sobre a Beyond

A Beyond é uma consultoria de engenharia. Estratégia e execução na mesma mão — do diagnóstico à produção.

Consultoria de engenharia para o problema que trava o seu negócio. Quem desenha a solução é quem responde pela entrega.

### Qual a diferença para uma consultoria ou uma software house?

Consultoria tradicional recomenda e sai. Software house executa o que recebe pronto. A Beyond faz as duas coisas: entende o problema, decide a arquitetura e responde pela entrega.

## Estratégia e execução na mesma mão

**Decisão com contexto.** Entendemos o negócio antes do sistema. Arquitetura é escolha técnica, não template.

**Engenharia junto.** O sênior que desenha acompanha a implementação, as integrações e o deploy. Sem repasse entre times.

**Dono até o fim.** Você fala com quem decide. A responsabilidade vai do diagnóstico ao handoff, com testes e documentação.

## Serviços

Não separamos quem planeja de quem executa. Uma equipe, do desenho à produção.

| # | Serviço | Descrição |
|---|---|---|
| 01 | **Arquitetura** | Design de sistemas, roadmap e decisões técnicas que escalam. |
| 02 | **Engenharia** | Engenharia de produto hands-on, APIs e plataformas até produção. |
| 03 | **Cloud & DevOps** | DevOps, confiabilidade e infraestrutura estável sob pressão. |

## Como trabalhamos

| Etapa | Descrição |
|---|---|
| **01 · Descobrir** | Mapear restrições, sistemas e o limite real que trava o crescimento. |
| **02 · Desenhar** | Definir arquitetura, prioridades e um caminho que o time consiga executar. |
| **03 · Entregar** | Entregar com engenheiro responsável envolvido — código, deploy e decisões até o handoff. |

## FAQ

**Como é o processo?**  
Descobrir, desenhar, entregar — um ciclo curto com dono claro e checkpoints semanais.

**Como funciona a cobrança?**  
Por projeto ou retainer. Alinhamos o escopo antes do kickoff para o investimento ficar transparente.

**Onde vocês ficam?**  
Somente remoto.

## Contato

Conte o desafio. Respondemos com um próximo passo claro — sem pitch genérico.

hello@beyond.sistemas.com.br

---

# Apêndice — repositório

## Estrutura

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
| `.github/workflows/deploy-pages.yml` | Deploy automático no GitHub Pages |
| `robots.txt`, `sitemap.xml`, `404.html` | Arquivos de SEO e erro |

## Desenvolvimento

```bash
python3 -m http.server 4321
# http://127.0.0.1:4321/
```

`css/styles.css` é a única fonte de CSS, incluindo os `@font-face`. As fontes WOFF2 locais são pré-carregadas no `<head>` das páginas.

## Deploy e CI/CD

- Branch: `main`
- Actions: `checkout@v7` → `configure-pages@v6` → `upload-pages-artifact@v5` → `deploy-pages@v5`
- Publicação: GitHub Pages com `build_type: workflow`
- Artefato com nome por `github.run_id` para evitar colisão entre runs

Todo push em `main` dispara o deploy. `workflow_dispatch` também está disponível.

Site: https://beyond-sistemas.github.io/beyond/

## Identidade visual

| Asset | Uso |
|---|---|
| `assets/mark.svg` | Favicon — anel ink + ponto `#1857ff` |
| `assets/mark-ring.svg` | Header (fundo claro) |
| `assets/mark-on-dark.svg` | Footer (fundo escuro) |
| `assets/brand-avatar.png` | Avatar institucional |

Guia completo: [`brand/guidelines.html`](./brand/guidelines.html)
