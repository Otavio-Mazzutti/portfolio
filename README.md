# Otávio Mazzutti — Portfolio

Personal portfolio of **Otávio Mazzutti**, Full Stack Developer based in Uberlândia, Brazil.
It covers experience, tech stack, featured projects and live GitHub data, in Portuguese and English.

Built with **React 19, TypeScript, Vite, Tailwind CSS v4 and Motion**.

## Highlights

- **Content lives in config files.** Profile, experience, skills and projects are in `src/data/*`. Components never hard-code personal data.
- **Full i18n (PT / EN).** UI strings are typed dictionaries. Data fields use `{ pt, en }` objects. The language follows the browser on the first visit and is saved in `localStorage` after that.
- **Dark-first theme with a light mode.** Colors are semantic CSS variables. An inline script applies the saved theme before first paint, so there is no flash.
- **Live GitHub section.** It uses the public GitHub REST API without a token. Responses are cached in `localStorage` for one hour. Skeletons show while data loads. If a request fails, the section falls back to stale cache, then to static content, and offers a retry button.
- **Accessibility.**
  - Semantic landmarks and a skip link.
  - Visible focus styles and full keyboard navigation.
  - The project modal and mobile menu trap focus, close with `Esc` and restore focus when they close.
  - `aria-live` feedback when the email is copied.
  - `prefers-reduced-motion` is respected by both Motion and CSS.
- **SEO.** Meta description, canonical URL, Open Graph and Twitter cards, `robots.txt`, and a 1200×630 OG image.
- **Performance.**
  - Self-hosted variable fonts, split by `unicode-range` subsets.
  - Vendor code split into separate chunks (`react`, `motion`).
  - Icons are imported individually so unused ones are tree-shaken.
  - Hashed assets are served with immutable cache headers on Vercel.

## Tech stack

| Area      | Tools                                                                                        |
| --------- | -------------------------------------------------------------------------------------------- |
| Framework | React 19 + TypeScript                                                                        |
| Build     | Vite                                                                                         |
| Styling   | Tailwind CSS v4 (CSS-first `@theme`)                                                         |
| Motion    | [Motion](https://motion.dev) (formerly Framer Motion)                                        |
| Icons     | Lucide React (UI) and React Icons (Simple Icons, the official brand marks)                   |
| Fonts     | Geist and Geist Mono via Fontsource                                                          |
| Quality   | `tsc -b` (strict), [Oxlint](https://oxc.rs) with the `react`, `typescript` and `jsx-a11y` plugins |
| Hosting   | Vercel                                                                                       |

## Getting started

Requirements: **Node.js ≥ 20.19** and npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Starts the dev server with HMR              |
| `npm run build`     | Type-checks, then builds to `dist/`         |
| `npm run preview`   | Serves the production build locally         |
| `npm run typecheck` | Runs the TypeScript project build (no emit) |
| `npm run lint`      | Runs Oxlint                                 |
| `npm run check`     | Runs typecheck and lint                     |

## Project structure

```text
src/
  components/
    layout/      Header, Footer, navigation config
    sections/    Hero, About, Experience, TechStack, Projects, GitHub, Contact
    ui/          Card, Button, Tag, Reveal, SectionHeading, ProjectModal, ProjectCover, toggles…
  contexts/      Theme and Language providers (+ context objects)
  data/          profile.ts · experience.ts · skills.ts · projects.ts   ← edit these
  hooks/         useGitHub, useTranslation, useTheme, useActiveSection, useModalBehavior…
  lib/           GitHub API client, formatting, safe localStorage helpers
  locales/       pt.ts (dictionary shape) · en.ts
  styles/        globals.css (design tokens, base styles)
  types/         Shared TypeScript types
public/          favicon, OG image, robots.txt, resume/
```

## Customization

Every value that still needs to be filled in is marked with `TODO`:

```bash
grep -rn "TODO" src index.html
```

| What                                    | Where                                                      |
| --------------------------------------- | ---------------------------------------------------------- |
| Name, role, bio, email, location, goals | `src/data/profile.ts`                                      |
| LinkedIn URL                            | `profile.linkedin` in `src/data/profile.ts`                |
| Profile photo                           | Import the image in `profile.ts` and set `profile.photo`   |
| Résumé PDFs (one per language)          | Add `public/resume/otavio-mazzutti-cv-pt.pdf` and `otavio-mazzutti-cv-en.pdf`. The download buttons serve the one matching the site language (`profile.resume`) |
| Graduation period                       | `profile.education.period`                                 |
| Experience and dates                    | `src/data/experience.ts` (`'YYYY-MM'`, `'present'` or `null`) |
| Skills and icons                        | `src/data/skills.ts`                                       |
| Repositories in the GitHub section      | `profile.github.highlightedRepos`                          |
| UI copy (both languages)                | `src/locales/pt.ts` and `src/locales/en.ts`                |
| Colors and fonts                        | CSS variables in `src/styles/globals.css`                  |
| Production URL (canonical / OG)         | `index.html` and `profile.siteUrl`                         |
| OG image                                | Edit `public/og-image.svg`, then export it to `public/og-image.png` (1200×630) |

**Adding the photo**

```ts
// src/data/profile.ts
import photo from '../assets/photo.jpg'
// …
photo: photo,
```

**Experience dates**

```ts
start: '2025-02',
end: 'present', // renders as "Atual" / "Present" and highlights the timeline dot
```

When `start` is `null`, the timeline shows "Datas a definir" / "Dates to be added".

## Adding a new project

Projects are rendered straight from `src/data/projects.ts`. Adding one means adding an object, with **no component changes**:

```ts
{
  slug: 'my-app',                               // unique id
  title: { pt: 'Meu App', en: 'My App' },
  category: 'fullstack',                        // 'distributed-systems' | 'web' | 'data' | 'fullstack' | 'mobile'
  summary: { pt: '…', en: '…' },
  stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  repo: 'https://github.com/Otavio-Mazzutti/my-app',
  demo: 'https://my-app.vercel.app',            // optional: shows a "Demo" link
  image: cover,                                 // optional: import from src/assets/projects/
  details: {
    overview: { pt: '…', en: '…' },
    features: [{ pt: '…', en: '…' }],
    architecture: [{ pt: '…', en: '…' }],
    run: ['npm install', 'npm run dev'],        // optional
  },
}
```

- If you leave out `image`, a line-art cover is drawn for the project's category.
- When the number of projects is odd, the first one gets a wide horizontal card. The rest fill a two-column grid.
- To add a new category, extend `ProjectCategory` in `src/types/index.ts` and add its label to both locale files. TypeScript points out anything that is missing.

## Deploying to Vercel

The repository is ready for Vercel. `vercel.json` sets the Vite framework preset, the SPA rewrite, cache headers and security headers.

1. Push the project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected settings:
   - **Framework:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**.
5. Replace `https://YOUR-DOMAIN.vercel.app` in `index.html` and `profile.siteUrl` with the real URL, then push again.

No environment variables are needed. The GitHub API is called anonymously from the browser, and **no tokens or credentials are stored in the code**.

Using the CLI instead:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

## Notes on the GitHub section

- Unauthenticated requests are limited to 60 per hour per visitor IP. The one-hour cache keeps normal browsing far below that.
- The language chart shows each language's **share of repositories by primary language**. It does not measure skill level.
- The GitHub section never adds repositories to *Featured projects* on its own. Featured projects come only from `projects.ts`.

## First commit

```bash
git init
git add .
git commit -m "feat: initial portfolio with React, TypeScript, Tailwind CSS and Motion"
```

## License

The code is MIT-licensed and free to use as a reference. The personal content, including texts, photo and résumé, belongs to Otávio Mazzutti.
