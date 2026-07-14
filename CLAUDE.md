# Elite Analytics Landing Page

Single-file static site. This is the home base — it links to every dashboard.

- **Local:** `C:\Users\ECP\elite-landing\`
- **GitHub:** acostapabloEC/elite-landing (git-connected to Vercel)
- **Vercel:** elite-landing-eta.vercel.app ✓ auto-deploy on push (`elite-landing.vercel.app` belongs to an unrelated third party — don't use it)
- **No password** — public-facing

---

## The one file to edit

**`index.html`** — everything: HTML, CSS, and JS are all inline in this single file. No build step, no npm. Edit and push.

```
git add index.html
git commit -m "describe the change"
git push
```

---

## Structure

The page has two tabs:
- **EPG** — Frank LaRosa's marketing dashboards (LinkedIn, TV, YouTube, Instagram, Podcast, Google Reviews)
- **Moneyball** — BDA rep analytics (Payback, Projection, Calls Efficiency)

Each dashboard is a `.card` element. Cards have:
- `card-icon` — colored SVG icon
- `card-name` — dashboard title
- `card-scope` — short label (e.g. "LinkedIn · Weekly")
- `card-desc` — one-line description
- `card-tags` — small tags at the bottom (e.g. "engagements", "impressions")
- `badge` — status: `badge-live`, `badge-beta`, or `badge-soon`
- `card-color` CSS variable — accent color for hover state

Cards with `card-live` class are clickable links. Cards with `card-disabled` are grayed out (coming soon).

---

## Dashboard URLs (current)

| Dashboard | URL |
|---|---|
| LinkedIn / Marketing | https://epg-marketing-dashboard.vercel.app |
| TV | https://epg-tv-dashboard.vercel.app |
| YouTube | https://epg-youtube-dashboard.vercel.app |
| Instagram | https://epg-instagram-dashboard.vercel.app |
| Podcast | https://epg-simplecast-podcast.vercel.app |
| Google Reviews | https://epg-google-reviews-dashboard.vercel.app |
| BDA Payback | https://bda-payback.vercel.app |
| BDA Projection | https://bda-projection.vercel.app |
| BDA Calls Efficiency | https://bda-calls-efficiency-dashboard.vercel.app |

---

## Design system

Fonts: **Syne** (headings/UI) + **DM Mono** (labels/meta text) — loaded from Google Fonts.

CSS variables (defined in `:root`):
- `--bg` `--surface` `--border` — dark background layers
- `--accent` (#2196F3) — blue, default card color
- `--green` (#4CAF50) — live badge
- `--gold` (#c8a84b) — Moneyball tab accent
- `--text` `--muted` `--dim` — text hierarchy

Add a new card by copying an existing `.card` block and updating the href, name, scope, desc, tags, and `--card-color`.

---

## "Last updated" per card

Each live card shows a real "Updated X ago" label sourced from Vercel, not hand-maintained:
- `api/last-updated.js` — serverless function; calls the Vercel Deployments API for each dashboard's `projectId` (hardcoded map in the file) and returns the latest production `ready` timestamp per project key.
- Requires two encrypted env vars on the **elite-landing** Vercel project (already set): `VERCEL_API_TOKEN`, `VERCEL_TEAM_ID`. Never put the token in the repo or client-side JS — the function only runs server-side.
- `index.html` fetches `/api/last-updated` on load and fills in every `.card-updated[data-project="..."]` span with a relative time (`relTime()`) plus an exact-timestamp tooltip.
- Adding a new dashboard card: add its Vercel `projectId` to the `PROJECTS` map in `api/last-updated.js`, and add `<span class="card-updated" data-project="your-key"></span>` next to that card's arrow in `card-foot`.

## Ideas / open items

<!-- Add ideas here as they come up -->
