# Deploying this portfolio to GitHub and Render

This file contains concise steps to connect your local project to GitHub and deploy it to Render (static site).

## 1) Ensure git identity is set (optional)
Run locally if not already set:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## 2) Authenticate GitHub CLI (recommended)
If you want a quick, secure login from the terminal use the `gh` CLI (already available on this machine):

```bash
gh auth login
```

Choose GitHub.com, authenticate via browser, and allow repo access.

You can verify auth with:

```bash
gh auth status
```

## 3) Create a remote repository (if you haven't yet)
Option A — create via `gh` (convenient):

```bash
# creates a private repo; remove --private or use --public if desired
gh repo create louis479/portfolio-website --source=. --remote=origin --push
```

Option B — create via GitHub web UI, then add the remote (if not configured):

```bash
git remote add origin https://github.com/<your-username>/portfolio-website.git
git branch -M main
git push -u origin main
```

If `git push` fails with permission errors, run `gh auth login` (see step 2) or set up an SSH key / PAT.

## 4) Verify repository pushed

```bash
git status --porcelain --branch
git remote -v
```

Confirm `origin` points to your GitHub repo and `main` is pushed.

## 5) Deploy on Render (static site)
1. Go to https://render.com and sign in.
2. Click "New" → "Static Site".
3. Connect your GitHub account when prompted and select the `portfolio-website` repository.
4. Set the branch to `main`.
5. Build Command: leave empty for plain HTML/CSS/JS. (If you use a build step, add it.)
6. Publish Directory: `/` (root) or the folder containing `index.html`.
7. Click "Create Static Site" — Render will build and publish; you’ll get a site URL.

## 6) Optional: Custom `render.yaml`
Render supports a `render.yaml` manifest for infra-as-code. You can create one if you prefer to manage services in repo. Otherwise, the web UI is sufficient.

A `render.yaml` file has been added at the repo root. It defines a static site service named `portfolio-website`:

- `type: static-site`
- `env: static`
- `branch: main`
- `buildCommand: ""`
- `staticPublishPath: /`
- `rootDir: /`
- `plan: free`

When Render detects this file, it will use those settings automatically.

## 7) Post-deploy checks
- Open the provided Render URL and confirm the site loads.
- If assets fail to load, check console/network for 404s and adjust `staticPublishPath` or root accordingly.

---
If you want, I can:
- Run `gh auth login` here (requires interactive auth via browser) — tell me to proceed.
- Create a `render.yaml` manifest for you.
- Create a simple GitHub Action to automatically run tests/builds before push.
