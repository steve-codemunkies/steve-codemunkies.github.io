# Implementation Plan: Publish `steve-codemunkies/steve-codemunkies.github.io` to GitHub Pages via GitHub Actions

## Context & Current State

| Item | Current value |
|---|---|
| Repository | `steve-codemunkies/steve-codemunkies.github.io` |
| Branch | `main` |
| Jekyll version | `4.4.1` (pinned in `Gemfile.lock`) |
| Ruby version in `Gemfile.lock` | Bundled with `4.0.3`, multi-platform `Gemfile.lock` already present |
| Existing workflow file | `.github/workflows/build-and-deploy.yml` |
| Existing workflow purpose | Builds Jekyll + deploys to AWS (`beta.codemunki.es`) via CDK |
| Custom domain | `www.stevehocking.co.uk` (already in `CNAME` file at repo root) |
| `CNAME` file content | `www.stevehocking.co.uk` |

The existing workflow (`build-and-deploy.yml`) targets AWS infrastructure and a different domain. It must be **replaced** with a workflow that uses the official GitHub Pages Actions-based deployment pipeline.

---

## Prerequisites (Manual Steps — Cannot Be Automated by an Agent)

These must be completed by the repository owner **before** the code changes are merged, as they require access to the GitHub web UI and the domain registrar.

### P1 — Enable GitHub Pages with Actions source
- Navigate to: `https://github.com/steve-codemunkies/steve-codemunkies.github.io/settings/pages`
- Under **"Build and deployment"** → **"Source"**, select **"GitHub Actions"**
- Reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow

### P2 — Set the custom domain in GitHub Pages settings
- On the same Settings → Pages screen, enter `www.stevehocking.co.uk` in the **"Custom domain"** field and click **Save**
- GitHub will attempt to verify DNS. It may show a warning until DNS is updated (step P3)
- Once verified, tick **"Enforce HTTPS"**
- Reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

### P3 — Verify/update DNS records at your registrar
Your `CNAME` file already sets `www.stevehocking.co.uk` as the custom domain. Ensure the following DNS records exist at your domain registrar:

**For `www` subdomain:**
```
www.stevehocking.co.uk   CNAME   steve-codemunkies.github.io
```

**For the apex domain** (`stevehocking.co.uk` without `www`), add all four GitHub Pages `A` records:
```
stevehocking.co.uk   A   185.199.108.153
stevehocking.co.uk   A   185.199.109.153
stevehocking.co.uk   A   185.199.110.153
stevehocking.co.uk   A   185.199.111.153
```

> If your DNS provider supports `ALIAS` or `ANAME` records, you may use `stevehocking.co.uk ALIAS steve-codemunkies.github.io` for the apex instead.

Reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain

---

## Code Changes (Agent-Implementable)

### Change 1 — Replace the GitHub Actions workflow

**File to modify:** `.github/workflows/build-and-deploy.yml`
**Action:** Replace the entire file contents with the following.

**Current file location:** https://github.com/steve-codemunkies/steve-codemunkies.github.io/blob/main/.github/workflows/build-and-deploy.yml

```yaml name=.github/workflows/build-and-deploy.yml
name: Build and deploy stevehocking.co.uk

on:
  push:
    branches:
      - main
  workflow_dispatch:

# Permissions required by actions/deploy-pages
permissions:
  contents: read
  pages: write
  id-token: write

# Prevent overlapping deployments; never cancel an in-progress deploy
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 📂 Checkout repository
        uses: actions/checkout@v4

      - name: 💎 Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3'
          bundler-cache: true   # Runs `bundle install` and caches gems automatically

      - name: ⚙️ Configure GitHub Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: 🔨 Build Jekyll site
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production

      - name: 📦 Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        # Uploads the default Jekyll output directory: _site/

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: 🚀 Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Key decisions and rationale:**

| Decision | Reason |
|---|---|
| `on.push.branches: [main]` only | Satisfies the requirement to gate deployment to `main` only. The `aws/*` branch trigger from the old workflow is removed. |
| `workflow_dispatch` retained | Allows manual re-runs from the Actions tab without a push. |
| `ruby/setup-ruby@v1` with `bundler-cache: true` | Uses the `Gemfile.lock` already committed to the repo (pinned to Jekyll 4.4.1) and caches gem installs between runs. This replaces the now-unmaintained `limjh16/jekyll-action-ts@v2`. |
| `ruby-version: '3.3'` | Current stable Ruby LTS. Compatible with all gems in the existing `Gemfile.lock`. |
| `actions/configure-pages@v5` | Detects the Pages base path and injects it into the build, ensuring asset URLs are correct. |
| `JEKYLL_ENV: production` | Ensures Jekyll omits drafts and applies production-only settings (e.g. no livereload). |
| `actions/upload-pages-artifact@v3` | Packages the `_site/` directory (Jekyll's default output) as a Pages artifact. |
| `actions/deploy-pages@v4` | Officially deploys the artifact to the `github-pages` environment. Requires `pages: write` and `id-token: write` permissions. |
| AWS steps removed | The CDK/S3/CloudFront deployment steps for `beta.codemunki.es` are no longer needed in this workflow. The AWS infrastructure may be decommissioned separately if desired. |
| Two-job split (`build` + `deploy`) | Required by the `actions/deploy-pages` action architecture. The `deploy` job uses `needs: build` to enforce ordering. |

**References for actions used:**
- `actions/checkout@v4`: https://github.com/actions/checkout
- `ruby/setup-ruby@v1`: https://github.com/ruby/setup-ruby
- `actions/configure-pages@v5`: https://github.com/actions/configure-pages
- `actions/upload-pages-artifact@v3`: https://github.com/actions/upload-pages-artifact
- `actions/deploy-pages@v4`: https://github.com/actions/deploy-pages
- Official GitHub Pages Actions workflow docs: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#creating-a-custom-github-actions-workflow-to-publish-your-site

---

### Change 2 — Verify `CNAME` file is present and correct

**File:** `CNAME` (repo root)
**Current content:** `www.stevehocking.co.uk`
**Action:** No change required. ✅

The `CNAME` file is already present and contains the correct value. It **must remain in the repository root** so that Jekyll includes it in the `_site/` output and GitHub Pages preserves the custom domain setting on every deploy.

Reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain

---

### Change 3 — Verify `_config.yml` has no conflicting `baseurl`

**File:** `_config.yml`
**Current relevant lines:**
```yaml
baseurl: ""
url: "https://www.stevehocking.co.uk"
```
**Action:** No change required. ✅

`baseurl: ""` is correct for a site served from the root of a custom domain. The `url` value already matches the target domain. If `baseurl` were set to a non-empty value, asset paths would break under the custom domain.

---

## Summary of All File Changes

| File | Action |
|---|---|
| `.github/workflows/build-and-deploy.yml` | **Replace** entire contents with new workflow |
| `CNAME` | No change (already correct) |
| `_config.yml` | No change (already correct) |

---

## Verification Steps (Post-Deploy)

Once the PR is merged to `main` and the workflow runs:

1. Go to `https://github.com/steve-codemunkies/steve-codemunkies.github.io/actions` and confirm the **"Build and deploy stevehocking.co.uk"** workflow runs successfully on the merge commit.
2. Go to **Settings → Pages** and confirm the deployment shows as active under the `github-pages` environment with the URL `https://www.stevehocking.co.uk`.
3. Visit `https://www.stevehocking.co.uk` to confirm the site loads correctly over HTTPS.
4. Confirm the `CNAME` file is present in the deployed output by checking `https://www.stevehocking.co.uk/CNAME`.
