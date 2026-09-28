# Daniel-Navarro-M.github.io

Personal site of **Daniel Navarro**, Data Scientist & AI Engineer in Geneva: CV, work samples and contact.
Live at https://daniel-navarro-m.github.io/

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
6. Optional custom domain: buy it, add a `CNAME` file containing the domain, point DNS to GitHub Pages, then replace every `https://daniel-navarro-m.github.io` with the new domain:
   `grep -rl 'daniel-navarro-m.github.io' --include='*.html' --include='*.xml' --include='*.txt' --include='*.tex' . | xargs sed -i 's#https://daniel-navarro-m.github.io#https://NEWDOMAIN#g'`
   Keep the github.io address working (GitHub redirects it automatically) and add the new domain as a property in Search Console.

When updating content, bump `dateModified` in the JSON-LD and `lastmod` in `sitemap.xml`.
