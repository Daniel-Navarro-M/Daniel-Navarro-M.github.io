# Daniel-Navarro-M.github.io

Personal site of **Daniel Navarro**, Data Scientist & AI Engineer in Geneva: CV, work samples and contact.
Live at https://danielnavarro.work/

Static HTML/CSS/JS, no build step. GitHub Pages serves the `main` branch root.

## Structure
- `index.html` (EN), `fr/index.html` (FR, Romandie) and `de/index.html` (DE, Vienna/Austria), linked with hreflang
- `cv/` web CV plus `Daniel_Navarro_CV.pdf`, compiled from `Daniel_Navarro_CV.tex` with `lualatex`
- `work/<slug>/` case studies, one URL each for long-tail search
- `assets/` CSS, JS (hero knowledge-graph canvas, theme toggle, filters), images
- `sitemap.xml`, `robots.txt`, `llms.txt`, `404.html`

## After publishing (SEO checklist)
1. Settings > Pages: source `main` / root.
2. Google Search Console: add the URL-prefix property, verify with the HTML meta tag (add it to `<head>` of `index.html`), submit `sitemap.xml`, request indexing for `/` and `/fr/`.
3. Bing Webmaster Tools: import from Search Console.
4. Add the site URL to LinkedIn (Contact info + Featured), GitHub profile, email signature, ORCID. These backlinks drive name-search ranking.
5. Validate structured data: https://search.google.com/test/rich-results

When updating content, bump `dateModified` in the JSON-LD (full ISO datetime with timezone, e.g. `2026-10-04T12:00:00+02:00`) and `lastmod` in `sitemap.xml`.
