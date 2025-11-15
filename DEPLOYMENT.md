Deployment and Production Checklist

This project uses React + TypeScript + Vite.

Quick summary:
- Tech stack: React 18, TypeScript, Vite (7.2.2), TailwindCSS, Radix UI, Framer Motion, React Router, etc.
- Build verified: `npm run build` produced a working `dist/` with no build errors.
- Vulnerability status: `npm audit` reports zero vulnerabilities (moderate+ resolved).

Production build steps

1. Install dependencies

```bash
npm install
```

2. Run a production build

```bash
npm run build
```

3. Preview the production build locally

```bash
npm run preview
# or serve the dist directory with a static server
npx serve dist
```

Deploy options

- GitHub Pages (already configured):
  - Build: `npm run build`
  - Deploy: `npm run deploy` (uses `gh-pages -d dist` and `predeploy` script)

- Vercel / Netlify / Cloudflare Pages:
  - Point to the repository and configure build command: `npm run build` and publish directory: `dist`.

Notes & recommendations

- We updated `vite` to `^7.2.2` to remove reported moderate vulnerabilities related to `esbuild`.
- If you use CI, run `npm ci` and `npm run build` in the pipeline.
- Keep dependencies updated periodically and re-run `npm audit`.

If you'd like, I can:
- Add a CI workflow (GitHub Actions) to run `npm ci`, `npm run build`, and `npm audit` on every push.
- Prepare a small `Dockerfile` for containerized deployment.

