# Nav Changes TODO

These nav link additions should be done in a separate PR/commit after the founder reviews the new pages.

---

## 1. `index.html` — Main Homepage Nav

Add "Plans" and "Compare" links to the header navigation area.

Find the nav section and add two links alongside the existing nav items:

```html
<a href="/plans/" class="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Plans</a>
<a href="/compare/" class="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Compare</a>
```

---

## 2. All Page Footers

The footer on every page (`index.html`, `forex/index.html`, `clubs.html`, `release-history.html`, `jobs/index.html`, `plans/index.html`, `compare/index.html`) should add Plans and Compare links to the footer nav row.

Find the footer link line (pattern: `Release History - Clubs - Jobs - X - LinkedIn`) and add:

```html
<a href="/plans/" class="hover:text-zinc-400">Plans</a> -
<a href="/compare/" class="hover:text-zinc-400">Compare</a> -
```

For subpages (forex/, jobs/, plans/, compare/) use relative paths:
- `../plans/index.html` for Plans
- `../compare/index.html` for Compare

---

## 3. Files to update

- [ ] `index.html` — nav + footer
- [ ] `forex/index.html` — footer only (already has back-to-home nav)
- [ ] `clubs.html` — footer only
- [ ] `release-history.html` — footer only
- [ ] `jobs/index.html` — footer only
- [ ] `plans/index.html` — footer only (already created with current footer)
- [ ] `compare/index.html` — footer only (already created with current footer)
