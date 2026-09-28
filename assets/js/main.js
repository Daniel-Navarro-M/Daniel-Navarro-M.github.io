document.documentElement.classList.remove('no-js');

// Theme toggle (remembered per visitor)
const root = document.documentElement, tbtn = document.getElementById('theme');
try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
tbtn && tbtn.addEventListener('click', () => {
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// Sticky nav border
const nav = document.querySelector('.nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Work filters
document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.filters button').forEach(x => x.setAttribute('aria-pressed', x === b));
  document.querySelectorAll('.case').forEach(c => c.classList.toggle('hide', b.dataset.f !== 'all' && !c.dataset.tags.includes(b.dataset.f)));
}));

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// Hero knowledge graph: drifting nodes, nearby nodes link up, cursor pulls edges
const cv = document.getElementById('graph');
if (cv) {
  const ctx = cv.getContext('2d'), labels = (cv.dataset.labels || '').split('|');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W, H, DPR, nodes = [], mouse = { x: -1e4, y: -1e4 };
  const css = n => getComputedStyle(root).getPropertyValue(n).trim();
  const size = () => {
    DPR = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const n = Math.round(Math.min(90, W * H / 14000));
    nodes = Array.from({ length: n }, (_, i) => ({
      x: W * (.35 + Math.random() * .65), y: Math.random() * H,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      r: i < labels.length ? 3.2 : 1.2 + Math.random() * 1.6, label: labels[i]
    }));
  };
  const draw = () => {
    const ink = css('--ink'), acc = css('--accent'), acc2 = css('--accent-2');
    ctx.clearRect(0, 0, W, H);
    for (const p of nodes) {
      if (!still) { p.x += p.vx; p.y += p.vy; if (p.x < W * .3 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
      const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
      if (d < 160 && !still) { p.x += dx * .004; p.y += dy * .004; }
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) { ctx.globalAlpha = (1 - d / 130) * .35; ctx.strokeStyle = (a.label || b.label) ? acc2 : ink; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    ctx.font = '500 11px "JetBrains Mono", monospace';
    for (const p of nodes) {
      const near = Math.hypot(mouse.x - p.x, mouse.y - p.y) < 160;
      ctx.globalAlpha = p.label ? .95 : .45; ctx.fillStyle = p.label || near ? acc : ink;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      if (p.label) { ctx.globalAlpha = .7; ctx.fillStyle = ink; ctx.fillText(p.label, p.x + 8, p.y + 4); }
    }
    ctx.globalAlpha = 1;
    still || requestAnimationFrame(draw);
  };
  addEventListener('resize', () => { size(); still && draw(); });
  cv.parentElement.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
  cv.parentElement.addEventListener('pointerleave', () => mouse = { x: -1e4, y: -1e4 });
  size(); draw();
}
