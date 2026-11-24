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

## O problema

Sistema travado não é falta de ferramenta. É dívida de decisão.

- **Consultoria tradicional** entrega diagnóstico, slides e uma recomendação. Quem decide não implementa. Quem implementa não entendeu o contexto.
- **Software house** executa a especificação que recebe. Entrega função, não resolve o problema de arquitetura por trás dela.
- **Time interno** tem contexto, mas raramente tem largura de banda para reestruturar a base e entregar ao mesmo tempo.

O resultado é o mesmo: integração frágil, acoplamento invisível e ninguém responsável pelo sistema como um todo.

## A tese

Engenharia sênior que decide e executa no mesmo ciclo.

A Beyond entra no problema com mão na massa. O mesmo engenheiro que entende o negócio desenha a arquitetura, escreve o código, acompanha o deploy e faz o handoff. Não existe repasse entre "quem pensa" e "quem faz".

| | Consultoria | Software house | **Beyond** |
|---|---|---|---|
| Diagnóstico | sim | raramente | sim |
| Decisão de arquitetura | recomenda | recebe pronta | decide e implementa |
| Código em produção | não | sim | sim, com o mesmo dono |
| Responsabilidade | termina no relatório | termina na entrega | vai até o handoff |
| Contexto do negócio | alto | baixo | alto |

## O que entregamos

### Arquitetura

- Diagnóstico de sistemas existentes e do limite real que trava o crescimento
- Desenho de fronteiras, contratos e roadmap técnico
- Decisões registradas, com trade-offs explícitos — não template de slide

### Integrações

- Mapeamento de ERPs, CRMs, gateways, clouds e APIs
- Auth, eventos, sincronização e contratos estáveis com terceiros
- Pontes sob medida onde não existe conector pronto

### Engenharia de produto

- Implementação hands-on de APIs, serviços e plataformas
- Código no repositório do cliente, desde o primeiro commit
- Testes, documentação e deploy na infraestrutura do cliente

### Cloud & DevOps

- Confiabilidade e observabilidade sob pressão
- Infraestrutura estável, versionada e reproduzível
- Operação transferida para o time com handoff claro

## Como o trabalho acontece

| Etapa | O que sai |
|---|---|
| **01 · Descobrir** | Mapa de sistemas, restrições e gargalo real |
| **02 · Desenhar** | Arquitetura, prioridades e plano executável pelo time |
| **03 · Entregar** | Código, deploy, testes, documentação e handoff |

Ciclo curto, com dono claro e checkpoints semanais. Escopo acompanha o que o time aprende na prática.

## Princípios técnicos

- **Sem lock-in:** código, PRs e infraestrutura vivem na conta do cliente
- **Contratos antes de implementar:** fronteiras estáveis entre sistemas
- **Solução sob medida:** não existe peça genérica para problema específico
- **Entrega verificável:** testes e documentação acompanham o código
- **Saída planejada:** o time continua rodando sem depender de nós

Operação: somente remoto.

## Site

**Produção:** https://beyond-sistemas.github.io/beyond/

Landing estática, sem build. HTML, CSS e JavaScript puro.

## Contato

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
| `scripts/sync-inline-css.py` | Sincroniza `css/styles.css` com o `<style>` da home |
| `.github/workflows/deploy-pages.yml` | Deploy automático no GitHub Pages |
| `robots.txt`, `sitemap.xml`, `404.html` | Arquivos de SEO e erro |

## Desenvolvimento

```bash
python3 -m http.server 4321
# http://127.0.0.1:4321/
```

Depois de editar `css/styles.css`, sincronize o bloco inline da home:

```bash
python3 scripts/sync-inline-css.py
```

> `index.html` inlines CSS e fontes locais para manter o primeiro paint fora do caminho crítico. `css/styles.css` continua sendo a fonte da verdade.

## Deploy e CI/CD

- Branch: `main`
- Actions: `checkout@v7` → `configure-pages@v6` → `upload-pages-artifact@v5` → `deploy-pages@v5`
- Publicação: GitHub Pages com `build_type: workflow`
- Artefato com nome por `github.run_id` para evitar colisão entre runs

Todo push em `main` dispara o deploy. `workflow_dispatch` também está disponível.

## Identidade visual

| Asset | Uso |
|---|---|
| `assets/mark.svg` | Favicon — anel ink + ponto `#1857ff` |
| `assets/mark-ring.svg` | Header (fundo claro) |
| `assets/mark-on-dark.svg` | Footer (fundo escuro) |
| `assets/brand-avatar.png` | Avatar institucional |

| Token | Valor | Papel |
|---|---|---|
| `--ink` | `#0a0a0a` | Texto e footer |
| `--blue` | `#1857ff` | Accent, CTA e foco |
| `--blue-mid` | `#3d74ff` | Hover de azul |
| `--charcoal` | `#141820` | Horizonte do hero e do footer |

Tipografia: Inter (wordmark), Syne (títulos), DM Sans (corpo), hospedada localmente em `assets/fonts/`.

Guia completo: [`brand/guidelines.html`](./brand/guidelines.html)
