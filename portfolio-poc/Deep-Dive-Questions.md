# Technical Demo Questions

How to use this file: keep `index.html`, `css/styles.css`, and `js/main.js` open beside it. Walk top to bottom. Each question is something a reviewer may ask — why you chose it, what happens if you remove it, what changes if the value changes, what the alternative is, and what breaks for accessibility, SEO, security, or browsers.

This file is questions only. Prepare your own answers.

---

# Part 1 — `index.html` (lines 1–486)

## Lines 1–2 — `<!doctype html>` and `<html lang="en">`

1. Why do you put `<!doctype html>` as the first line, before `<html>`?
2. What happens if you remove the doctype?
3. What rendering mode does the browser fall into without it, and how would that show up on this page?
4. Why `lang="en"` on `<html>` and not on `<body>`?
5. What happens if you remove `lang` entirely?
6. Why `"en"` and not `"en-IN"` or `"en-US"` given the content is about work in Pune?
7. How do screen readers and search engines use `lang`?
8. If you later add a Hindi quote on the page, would you change this attribute or override it locally?

## Lines 3–4 — `<head>` and `<meta charset="UTF-8" />`

9. Why does charset belong in `<head>`, as early as possible?
10. What happens if charset is missing, or placed after the title?
11. Why UTF-8 and not ISO-8859-1? Point to a character on this page that would break.
12. Why the self-closing slash on `<meta />` in an HTML5 document? What changes if you drop it?
13. Why is there no `http-equiv="Content-Type"` meta tag?

## Line 5 — viewport

14. Why `width=device-width`? What happens on a phone if you remove it?
15. Why `initial-scale=1.0`? What if you set it to `1.5` or omit it?
16. Why did you not add `user-scalable=no` or `maximum-scale=1`?
17. What accessibility problem does locking zoom create?
18. How does this meta tag interact with your CSS `clamp()` type scale and the 900px media queries?

## Lines 6–9 — inline theme script in `<head>`

```html
if (localStorage.theme === "light")
  document.documentElement.classList.add("light");
```

19. Why is this script in `<head>` instead of in `js/main.js`?
20. What visual bug appears if you move this script to the bottom of `<body>` with `defer`?
21. What is FOUC in this specific case — which element flashes, and from which theme to which?
22. Why do you read `localStorage.theme` as a property instead of `localStorage.getItem("theme")`?
23. What happens if `localStorage` is unavailable (Safari private mode, blocked storage)? Does this script throw and stop the rest of the page?
24. Why compare strictly to `"light"` rather than treating any truthy value as light?
25. Why add the class on `document.documentElement` (`<html>`) instead of `document.body`?
26. What happens if this script runs after `css/styles.css` has already painted `html.light` rules — vs before?
27. Why is there no `else` that adds a `"dark"` class?
28. Why do you not also read `prefers-color-scheme` here?
29. What happens on first visit when `localStorage.theme` is undefined?
30. Could this script be replaced with a `blocking="render"` module or a tiny inline style? Trade-offs?
31. Why no `try/catch` around `localStorage`?

## Lines 11–23 — title, description, author, robots, verification, canonical

32. Why is the title `Sayantan Pal — Software Engineer at Prismforce` rather than just `Sayantan Pal`?
33. What happens to Google SERP display if the title is longer than ~60 characters?
34. Why an em dash (`—`) instead of a hyphen or `|`?
35. What happens if you remove `<title>`? What does the tab show?
36. Why `name="description"` and not an Open Graph `og:description` as well?
37. What happens if you remove the description meta tag?
38. Why mention React, Node.js, Python, FastAPI, and AWS in the description — is that for humans or crawlers?
39. Why `name="author"`? Which consumers actually use it?
40. What happens if author is removed?
41. Why `robots` is `index, follow` when that is already the default?
42. What would `noindex` do to this Netlify URL?
43. Why `google-site-verification` in a meta tag when you also have `googleaafb6cb8726be5e4.html` and `google2e544ac390422587.html` in the repo?
44. What happens if the verification content string is wrong but the HTML file is present?
45. Why two Google HTML verification files plus a meta tag — leftover from a domain/property change?
46. Why `rel="canonical"` pointing at `https://sayantan-pal-dev.netlify.app/`?
47. What duplicate-content problem does canonical solve if the site is also reachable via Netlify preview URLs or `www`?
48. What happens if canonical is removed?
49. Why the trailing slash on the canonical URL?
50. Why no `og:title`, `og:image`, `twitter:card` tags on a personal site you want shared?

## Lines 25–58 — JSON-LD Person schema

51. Why JSON-LD in a `<script type="application/ld+json">` instead of microdata or RDFa on the visible HTML?
52. What happens if this script is invalid JSON (trailing comma, comments)? Does the page break, or only rich results?
53. Why `@context` is `https://schema.org`?
54. Why `@type` is `Person` and not `ProfilePage` or `WebSite`?
55. Why nest `worksFor` as `{ "@type": "Organization", "name": "Prismforce" }` instead of a string?
56. Why `jobTitle` is `Associate Software Engineer` while the About copy says `Associate Software Developer`?
57. Why `url` repeats the canonical URL?
58. Why `image` is an absolute URL to `sayantan-image.jpg` instead of a relative path?
59. What happens to Google’s knowledge panel / rich results if `image` 404s?
60. Why `address` uses `PostalAddress` with only `addressLocality` and `addressCountry`?
61. Why `addressCountry` is `"IN"` (ISO) and not `"India"`?
62. Why no street address — privacy vs completeness of the schema?
63. Why `sameAs` only GitHub and LinkedIn, not LeetCode or email, which appear later in the page?
64. Why `knowsAbout` is a string array of skills rather than `ItemList` or `Occupation`?
65. Why does `knowsAbout` include Kubernetes and Grafana/Loki when the visible skills list is slightly different (MySQL, Tailwind, HTML, CSS, JavaScript)?
66. What happens if you remove the entire JSON-LD block?
67. Why is this in `<head>` rather than the end of `<body>`?
68. How would you test that Google actually parses this? (Rich Results Test vs Search Console)

## Lines 59–67 — font preconnect, Google Fonts, favicon, stylesheet

69. Why two preconnects — `fonts.googleapis.com` and `fonts.gstatic.com`?
70. What happens if you remove both preconnects?
71. Why does only the gstatic link have `crossorigin`?
72. What happens if you add `crossorigin` to the googleapis preconnect, or remove it from gstatic?
73. Why `rel="stylesheet"` for fonts instead of `@import` in CSS or a `<link rel="preload">`?
74. Why IBM Plex Mono 400/500, IBM Plex Sans 400/500, and Space Grotesk 500/700 — and not the other weights?
75. What happens if a heading uses `font-weight: 700` on IBM Plex Sans, which you did not load?
76. Why `display=swap` in the Google Fonts URL?
77. What happens if you use `display=block` or omit `display`?
78. What is the FOIT vs FOUT trade-off here?
79. Why load three families from the network instead of system fonts only?
80. Why `rel="icon"` with `type="image/svg+xml"` instead of a PNG favicon.ico?
81. What browsers still struggle with SVG favicons?
82. Why is the favicon path `assets/favicon.svg` relative, but JSON-LD `image` is absolute?
83. Why is `css/styles.css` linked after fonts, not before?
84. What happens if you put the CSS `<link>` above the font `<link>`?
85. Why no `media="print"` stylesheet?
86. Why no CSS reset/normalize library (modern-normalize, etc.) — you roll your own in `styles.css`?

## Line 68 — `<body>`

87. Why no class on `<body>` for theme, given theme is on `<html>`?
88. Why no `onload` handler here?

## Line 69 — skip link

89. Why is the first focusable element a “Skip to content” link?
90. What happens if you remove it?
91. Why `href="#main"` and not `#top`?
92. Which users benefit, and which keyboard path does it skip (the falling icons? the nav?)?
93. Why is it visually hidden until focus — see CSS later — and why is that the HTML’s job vs CSS?

## Lines 70–89 — falling icons (shared pattern)

The six SVGs share: `class="fall-icon"`, inline `--x/--d/--t`, `viewBox`, and `<use href="assets/icons/fall-icons.svg#…">`.

94. Why is this decorative layer in HTML instead of CSS `background-image` or a `<canvas>`?
95. Why a wrapping `.fall` div instead of positioning each SVG on `body`?
96. Why `<svg>` + `<use href="sprite.svg#id">` instead of inline paths, `<img>`, or `<object>`?
97. What happens if `fall-icons.svg` 404s?
98. What happens if the fragment `#openai` does not match a `<symbol id>` in the sprite?
99. Why CSS variables `--x`, `--d`, `--t` as inline `style` instead of extra classes or JS?
100. What does `--x` control vs `--d` vs `--t`? What happens if you remove `--d`?
101. Why are the delays `0s, 3s, 6s, 2s, 8s, 11s` and durations `14s–18s` staggered like this?
102. What happens if all six use the same `--d` and `--t`?
103. Why `pointer-events` is not set in HTML (it is in CSS) — what would happen if these SVGs were clickable?
104. Are these icons in the accessibility tree? Should they have `aria-hidden="true"`?
105. What happens for a user with `prefers-reduced-motion`? (HTML does nothing — is that a gap?)
106. Why OpenAI, Cursor, Claude, Ollama, Kimi, VS Code specifically — what story are you telling?
107. Why do only some have `fall-light` (openai, ollama, kimi) and others do not (cursor, claude, vscode)?
108. What happens in light theme if you remove `fall-light` from a white-filled icon?
109. Why does VS Code use `viewBox="0 0 100 100"` while the others use `0 0 24 24`?
110. What happens if VS Code’s `viewBox` is changed to `0 0 24 24` without changing the sprite?
111. Why is this block before `<header>` in DOM order? Does that affect paint, stacking, or tab order?

## Lines 91–110 — header and nav

112. Why `<header class="site-header">` wrapping `<nav>` instead of `<nav>` only?
113. Why is the nav a `<ul>` of `<li>` rather than a flex of `<a>` with no list?
114. What happens if you drop the `<ul>`/`<li>` and leave only links — for CSS and for screen readers?
115. Why is the name link `href="#top"` rather than `/` or `index.html`?
116. Why split the name as `Sayantan<span class="nav-bar-menu-name-dim">.Pal</span>`?
117. What happens if the span is removed — visually and for copy-paste of the name?
118. Why About, Work, Skills, Contact — and not Projects, even though `#projects` exists later?
119. What happens if a user wants to reach Selected Projects from the nav?
120. Why `href="#work"` for “Work” when both `#work` (Prismforce) and `#projects` exist?
121. Why Contact has an extra class `nav-bar-menu-items-contact`?
122. Why is the theme control a `<button>` and not a link or a checkbox?
123. Why `type="button"`? What happens if you omit `type` inside a form vs here, not inside a form?
124. Why is the button empty in HTML — no text, no `aria-label`, no `aria-pressed`?
125. What happens for a screen reader user who lands on `#themeToggle`?
126. Why `id="themeToggle"` — who consumes it?
127. What happens if you remove the id?
128. Why not `aria-pressed` reflecting light vs dark?
129. Is a sticky header (CSS) implied by this markup, or could the header be static without changing HTML?

## Lines 111–147 — `<main>` and hero

130. Why `<main id="main">` — who uses that id besides the skip link?
131. What happens if there are two `<main>` elements?
132. Why `<section class="hero" id="top">` instead of a `<div>`?
133. Why `id="top"` on the hero rather than on `<body>` or `<header>`?
134. What happens if `#top` is missing but the logo still links to `#top`?
135. Why `<p class="section-eyebrow">` with `// full-stack &amp; ai systems engineer` — why the `//` prefix?
136. Why `&amp;` instead of a raw `&` in the HTML?
137. What happens if you write `&` unescaped in HTML text?
138. Why `<h1>Sayantan<br />Pal</h1>` with a break rather than two spans or CSS `max-width`?
139. What happens if `<br />` is removed — on mobile vs desktop?
140. How do screen readers announce the `<br />` in the h1?
141. Why is the role/company line a `<p>` with `<strong>` on Prismforce and Selectprism, not another heading?
142. Why `<strong>` and not `<b>` or a span with a class?
143. Why `<figure>` around the photo without a `<figcaption>`?
144. What happens if you use a bare `<img>` without `<figure>`?
145. Why `width="800"` and `height="800"` on the img when CSS later sets `width: 100%` and `aspect-ratio: 1`?
146. What layout problem do width/height attributes prevent (CLS)?
147. What happens if those attributes are removed?
148. Why `alt="Sayantan Pal"` rather than empty `alt=""` (decorative) or a longer description?
149. Why a `.jpg` and not WebP/AVIF?
150. Why is the ticker text span empty (`id="tickerText"`) in HTML?
151. What do users without JavaScript see in the ticker?
152. Why the `$` prompt and `▍` cursor as HTML text rather than CSS `::before` / `::after`?
153. Why `id="tickerText"` on the inner span, not on `.hero-text-ticker`?
154. Why “View work” is `href="#work"` (same as nav) and Resume is an external Google Drive URL?
155. Why Google Drive `/view?usp=sharing` instead of a PDF in `/assets`?
156. What happens if the Drive file permissions are not “anyone with the link”?
157. Why is Resume a `<a class="btn btn-ghost">` and not `<a download>`?
158. Why no `target="_blank"` on Resume but yes on social links later?

## Lines 149–170 — about

159. Why `id="about"` on the section matching `href="#about"`?
160. What happens if the id is `About` (capital A) — are fragment identifiers case-sensitive?
161. Why two `<p>` inside `.about-grid` rather than one, or an `<ul>` of facts?
162. Why is this copy not using `<strong>` on tech names like the hero does?
163. Job title here says “Associate Software Developer” — JSON-LD and the work section say “Associate Software Engineer”. Why the mismatch, and what would a reviewer say?

## Lines 172–216 — skills

164. Why a nested structure `.skills-grid` > `.skills-group` > `h3` + `ul.tag-list` instead of one flat list?
165. Why `<h3>` for Frontend/Backend/Database/Infra — should these be headings in the outline after `<h2>`?
166. Why a `<ul>` of tags rather than `<span>`s — what do list semantics buy you?
167. Why `Infra &amp; Tools` needs `&amp;`?
168. Why four groups when CSS at 900px uses `repeat(3, 1fr)`? What does the fourth group do on desktop?
169. Why Redis under Database rather than Infra?
170. Why Tailwind CSS is listed when this repo does not use Tailwind?
171. Why Kubernetes is listed here and in JSON-LD?

## Lines 218–320 — work (Prismforce)

172. Why `id="work"` here and not on the projects section?
173. Why reuse `class="work"` for both experience and projects sections?
174. Why the role line is a `<p class="work-sub">` and not part of the `h2` or a `<time>`?
175. Why `Feb 2025 – Present` — how would you mark this up with `<time datetime>` and why didn’t you?
176. Why each card is `<article class="work-card">` instead of `<li>` in an `<ol>` (career chronology) or a `<div>`?
177. What does `<article>` mean here — is each card independently syndicatable?
178. Why `.work-card-service` is a `<p>` that looks like a code identifier (`service: platform-architecture`)?
179. Why those service slugs — are they real internal service names or visual flavor?
180. Why metrics are wrapped in `<strong>` (1,000+ sessions, 340ms to 220ms, 92%, 77%, 70%, [95]%, zero critical)?
181. Why `[95]%` has square brackets — placeholder? What does that do to credibility in a technical demo?
182. Why tag lists reuse `.tag-list.tag-list-small` instead of a different component?
183. Why six cards in one grid — what happens to scanning vs a timeline layout?
184. For AI Proctoring: why `&amp;` in `AI Proctoring &amp; Anti-Cheat System`?
185. If a reviewer asks you to defend the 35% / 77% / 70% numbers, which HTML choice makes those claims more or less trustworthy?

## Lines 322–415 — projects

186. Why `id="projects"` when nothing in the nav points here?
187. How does a user reach this section without scrolling — is that intentional?
188. Why the same `work-grid` / `work-card` structure as experience — reuse vs distinct visual language?
189. Why PrismSpark, Questionify, Resume Matching, Tennis, Cardiac Risk, stdlib.js PR #8600 — what selection criteria?
190. Why `12.5k★` as text rather than a live GitHub badge?
191. What happens if the stdlib PR number is wrong?

## Lines 417–478 — contact

192. Why `id="contact"` matching the nav?
193. Why a native `<form>` instead of a `mailto:` link only, or a third-party embed (Formspree)?
194. Why `name="contact"` on the form?
195. Why `method="POST"` and not `GET`?
196. What happens if you change method to GET — would Netlify still handle it, and would the message appear in the URL?
197. Why `data-netlify="true"`? What happens if you remove it on a Netlify-hosted site?
198. Why `netlify-honeypot="bot-field"`?
199. Where is the input named `bot-field`? What happens when the attribute names a field that does not exist in the form?
200. What is a honeypot field supposed to look like in HTML (hidden label + input), and why is it missing?
201. Why no `action` attribute?
202. Why `label` with `for="name"` matching `id="name"` instead of wrapping the input in the label?
203. What happens if `for` and `id` mismatch?
204. Why `type="text"` / `type="email"` / `textarea` — what does the browser do with `type="email"` on submit and on mobile keyboards?
205. Why `required` on all three fields? What happens if you remove it — HTML5 validation vs Netlify vs your JS (there is no JS validation)?
206. Why `rows="4"` on the textarea?
207. Why `type="submit"` on the button? What happens if it is `type="button"`?
208. Why no `novalidate` on the form?
209. Why no success/error UI in this HTML after submit?
210. Why social links are a `<ul class="contact-social">` after the form?
211. Why `target="_blank"` on GitHub, LinkedIn, LeetCode, and Email?
212. Why `rel="noopener"` without `noreferrer`?
213. What tabnabbing issue does `noopener` prevent?
214. What happens if you omit `rel` on `target="_blank"`?
215. Why does `mailto:sayantanpal100@gmail.com` have `target="_blank"` and `rel="noopener"`? What does `_blank` do for a mailto URL?
216. Why email is a `mailto:` link and also a form — redundant?

## Lines 480–484 — footer and script

217. Why `<footer class="site-footer">` outside `<main>`?
218. Why `&copy; 2026` hardcoded rather than generated in JS?
219. What happens on 1 Jan 2027?
220. Why “All rights reserved” on a personal portfolio?
221. Why `<script src="js/main.js" defer></script>` at the end of `<body>` **and** `defer`?
222. What does `defer` do to parse order vs `async` vs no attribute vs putting the script in `<head>`?
223. If the script is already at the end of body, what extra benefit does `defer` have?
224. What happens if you remove `defer`?
225. What happens if `js/main.js` 404s — which features die, which HTML still works?
226. Why not `type="module"`?

---

# Part 2 — `css/styles.css` (lines 1–530)

## Lines 1–11 — reset

227. Why a comment `/* RESET */` and two separate rules (`*, *::before, *::after` then `*`)?
228. Why `box-sizing: border-box` on `*` **and** pseudo-elements?
229. What happens if you omit `*::before, *::after` from the box-sizing rule?
230. What happens if you set `box-sizing` only on `html` and use `inherit`?
231. Why `margin: 0; padding: 0` on `*`?
232. What happens if you remove the padding reset — which components on this page break first (lists, headings, form)?
233. Why not use a well-known reset (A modern CSS reset, normalize.css)?
234. Why didn’t you reset `min-width` on buttons/inputs (iOS)?

## Lines 13–33 — `:root` tokens

235. Why custom properties on `:root` instead of hard-coded hex in each rule?
236. Why names `--ink`, `--panel`, `--paper`, `--muted`, `--signal`, `--signal-dim`, `--line` rather than `--bg`, `--accent`?
237. Why `#10141f` / `#171c2a` / `#f3f1ea` / `#e9a23b` — how did you pick this palette?
238. Why `--line` is `rgba(243, 241, 234, 0.12)` instead of a solid hex?
239. What happens if you remove `--signal-dim` and the hover states that use it?
240. Why three font tokens `--font-display`, `--font-body`, `--font-mono` mapping to Space Grotesk, IBM Plex Sans, IBM Plex Mono?
241. Why quoted `"Space Grotesk"` plus `sans-serif` fallback — what happens if Google Fonts fails?
242. Why `--step-0` through `--step-3` with `clamp(min, preferred, max)` instead of `rem` only or `vw` only?
243. Explain each argument of `clamp(2.5rem, 1.9rem + 3vw, 4rem)` — what happens at 320px vs 1440px?
244. What happens if you replace clamp with a single `font-size: 4rem`?
245. Why `--max-w: 1100px`? What happens if it is `100%` or `80ch`?
246. Why are colors not using `oklch()` or `color-mix` at the token level (you use `color-mix` later on the header)?

## Lines 35–43 — `html.light`

247. Why invert by reassigning the same tokens rather than a second stylesheet or `[data-theme]`?
248. Why `--ink` becomes `#f3f1ea` and `--paper` becomes `#10141f` — what does “ink on paper” mean after inversion?
249. What happens if a component uses a hard-coded `#10141f` instead of `var(--ink)`?
250. Why `--signal` becomes `rgb(232, 85, 12)` in light mode instead of keeping `#e9a23b`?
251. Why `--muted` is `#5c6578` in light — contrast against `#10141f` vs dark-mode muted `#8a93a6` on `#10141f`?
252. How would you check these pairs against WCAG contrast?
253. Why is there no `color-scheme: light` / `dark` on `html`?

## Lines 45–56 — `html` and `body`

254. Why `scroll-behavior: smooth` on `html`?
255. What happens if you remove it — how do `#about` clicks behave?
256. What does smooth scrolling do for `prefers-reduced-motion` users? Is that a gap?
257. Why `background` and `color` on `body` use `var(--ink)` and `var(--paper)`?
258. Why `font-size: var(--step-0)` on body rather than the browser default 16px?
259. Why `line-height: 1.6` — unitless? What happens with `line-height: 16px`?
260. Why `-webkit-font-smoothing: antialiased`? What happens on macOS vs Windows if you remove it?
261. Why no `text-rendering` or `font-feature-settings`?

## Lines 58–102 — element defaults (img, ul, a, headings, focus)

262. Why `img, svg { display: block; max-width: 100%; }`?
263. What extra gap appears under images if you remove `display: block`?
264. What happens if `max-width: 100%` is removed on a 800px-wide photo inside a narrow column?
265. Why `ul { list-style: none; }` globally rather than only on `.nav-bar-menu` and `.tag-list`?
266. What happens to a future content list that should show bullets?
267. Why `a { color: inherit; text-decoration: none; }` globally?
268. What happens to visited/unvisited distinction and to underline affordance on social links?
269. Why headings share `font-family: var(--font-display)`, `font-weight: 700`, `line-height: 1.1`, `letter-spacing: -0.01em`?
270. What happens if `line-height: 1.1` causes descender clipping on `h1` with a `<br />`?
271. Why `h1` uses `--step-3`, `h2` `--step-2` with `margin-bottom: 1.5rem`, `h3` `--step-1` with `0.5rem`?
272. Why no `h4–h6` rules?
273. Why `:focus-visible` on `a, button, input, textarea` and not `:focus`?
274. What happens if you use `:focus` instead — mouse users see outlines on every click?
275. Why `outline: 2px solid var(--signal)` and `outline-offset: 3px` instead of `outline: none` plus a box-shadow?
276. What happens if you `outline: none` with no replacement?
277. Why isn’t `select` included?

## Lines 104–108 — `section`

278. Why every `section` gets `max-width: var(--max-w)`, `margin-inline: auto`, `padding: 4rem 1.5rem`?
279. Why `margin-inline` instead of `margin-left` / `margin-right`?
280. What happens if a section needs full-bleed (the fall icons are outside section — good or accidental)?
281. Why `1.5rem` horizontal padding — what happens at 320px width?

## Lines 110–124 — skip link

282. Why `position: absolute; left: -999px` instead of `clip` / `clip-path` / visually-hidden class?
283. What happens if you use `display: none` until focus?
284. Why `z-index: 100` vs header `50` and fall `0`?
285. Why `:focus` (not `:focus-visible`) to bring it on-screen at `left: 1rem; top: 1rem`?
286. What happens if a keyboard user tabs away — does it go back to `-999px`?
287. Why background `var(--signal)` and color `var(--ink)` — contrast in both themes?

## Lines 126–165 — fall animation

288. Why `.fall` is `position: fixed; inset: 0; z-index: 0`?
289. Why `overflow: hidden`?
290. Why `pointer-events: none`? What happens if you remove it — can you click nav through the icons?
291. Why `main { position: relative; z-index: 1; }` — stacking context vs `.fall`?
292. What happens if you remove `z-index` from `main`?
293. Why `.fall-icon` is `position: absolute; left: var(--x); top: -3rem`?
294. What happens if `top` is `0` instead of `-3rem`?
295. Why `width: 1.5rem` with no height (viewBox handles aspect)?
296. Why `animation: fall var(--t) var(--d) linear infinite`?
297. What happens if `--t` or `--d` is invalid/missing?
298. Why `linear` not `ease-in`?
299. Why `infinite` — performance cost of six infinite animations?
300. Why `html.light .fall-light { filter: invert(1); }` instead of swapping SVG fills?
301. What happens to already-colored icons (Cursor greys, Claude orange, VS Code blues) if they had `fall-light`?
302. Why `@keyframes fall` goes `translateY(0)` → `translateY(110vh)` with opacity 0 → 0.45 → 0?
303. Why `12%, 80% { opacity: 0.45 }` — what does the hold do?
304. Why `110vh` not `100%`? What is `%` relative to for a `fixed` descendant?
305. Why no `will-change: transform` or `transform: translateZ(0)`?
306. Why no `@media (prefers-reduced-motion: reduce) { animation: none }`?

## Lines 167–221 — nav-bar

307. Why `.site-header` is `position: sticky; top: 0; z-index: 50`?
308. What happens if you use `fixed` instead of `sticky`?
309. What happens if `top` is not `0`?
310. Why `background: color-mix(in srgb, var(--ink) 90%, transparent)` instead of `opacity` on the whole header?
311. What happens if `color-mix` is unsupported?
312. Why `backdrop-filter: blur(8px)`? What happens in Firefox without the flag, or if you remove it?
313. Why `border-bottom: 1px solid var(--line)`?
314. Why `.nav-bar` has `max-width: 100vw` and `padding: 20px` instead of matching `section`’s `--max-w`?
315. What is the difference between `100vw` and `100%` here (scrollbar gutter)?
316. Why `.nav-bar-menu` is `display: flex; justify-content: center; gap: 1rem` with mono `0.75rem`?
317. What happens on a 320px screen with name + 4 links + theme button — overflow, wrap, or clip? You have no `flex-wrap`.
318. Why `.nav-bar-menu-name-dim`, `.nav-bar-menu-items-contact`, `.nav-bar-theme` share `color: var(--signal)`?
319. Why `.nav-bar-theme` resets `background`, `border`, `appearance`, sets `cursor: pointer`, `max-height: 1.2em; overflow: hidden`?
320. What happens if `overflow: hidden` is removed?
321. Why the sun/moon is `::before { content: "☀" }` and `html.light … content: "☾"` rather than HTML text or an SVG?
322. What happens if the emoji font is missing?
323. Why not `aria`-connected text that CSS hides?
324. Why `@media (min-width: 900px)` only increases `gap` and `font-size` — why 900px, not 768px?

## Lines 223–365 — hero

325. Why `.hero` is a grid with `gap: 2.5rem` even when it is a single child `.hero-text`?
326. Why `.section-eyebrow` is mono, `0.85rem`, `--signal`, `letter-spacing: 0.02em`?
327. Why `.hero-text-description` is `max-width: 42ch`?
328. What is `ch` relative to, and what happens if you use `px` or `em` instead?
329. Why `strong` inside the description is recolored to `--paper`?
330. Why `.hero-text-visual` is `width: min(220px, 70%)` on small screens?
331. Why `min()` not `max()` or a fixed `220px`?
332. Why the img has `aspect-ratio: 1; object-fit: cover; border-radius: 6px`?
333. What happens if `object-fit` is `contain` or is removed?
334. Why the ticker is a flex row with `min-height: 2.6em`, panel background, and radius 6px matching cards?
335. Why `min-height` rather than a fixed height — related to wrapping ticker text?
336. Why `.hero-text-ticker-line { flex: 1; min-width: 0; }`?
337. What happens if you remove `min-width: 0` in a flex item (classic overflow bug)?
338. Why `.hero-text-ticker-cursor { display: inline; }` — default already?
339. Why the blink animation is gated on `.is-waiting` rather than always blinking?
340. Why `@keyframes blink { 50% { opacity: 0; } }` with `step-end` and `1s`?
341. What happens if JS never adds `is-waiting`?
342. Why `.hero-text-actions` is flex with `flex-wrap: wrap`?
343. Why `.btn` uses `display: inline-block`, mono font, `transition: transform 0.15s ease, background 0.15s ease`?
344. Why hover is `translateY(-2px)`? What about `prefers-reduced-motion`?
345. Why `.btn-primary` is `--signal` on `--ink` and hover `--signal-dim`?
346. Why `.btn-ghost` is transparent with `--line` border, hover `--signal` border?
347. At `min-width: 900px`, why `.hero-text` becomes `grid-template-columns: 1.1fr 0.9fr`?
348. Why `.hero-text > :not(.hero-text-visual) { grid-column: 1; }`?
349. Why `.hero-text-visual` is `grid-column: 2; grid-row: 1 / span 5`?
350. What happens if you `span 4` or `span 2` instead of `span 5`? Count the children: eyebrow, h1, description, figure, ticker, actions — why 5?
351. Why `align-self: center; justify-self: center; width: min(100%, 380px); margin-top: 0` on desktop?
352. What happens if this media query is removed?

## Lines 367–381 — about

353. Why `.about-grid` is a 1-column grid with `gap: 1.25rem`, then `1fr 1fr` at `600px` not `900px`?
354. Why a different breakpoint than the nav/hero/skills 900px?
355. Why paragraphs are `--muted`?

## Lines 383–422 — skills

356. Why `.skills-grid` is `gap: 2rem` and becomes `repeat(3, 1fr)` at 900px?
357. There are **four** `.skills-group` children. What happens to the fourth (Infra) on a 3-column grid?
358. Why not `repeat(2, 1fr)` or `repeat(4, 1fr)` or `auto-fit`?
359. Why group `h3` is uppercase, mono, muted, `letter-spacing: 0.06em`?
360. Why `.tag-list` is flex wrap with gap, and `li` looks like chips (padding, panel, border, radius 4px vs cards’ 6px)?
361. Why `.tag-list-small li { font-size: 0.72rem; }` only changes font-size?

## Lines 424–466 — work

362. Why `.work-sub` has `margin-top: -1rem`?
363. What happens if the h2 `margin-bottom` changes — does the negative margin still make sense?
364. Why `.work-grid` is 1 column, then `1fr 1fr` at 600px **and again** at 900px with the same value?
365. What does the 900px work-grid rule actually change? Dead code?
366. Why not 3 columns on large screens for six cards?
367. Why `.work-card` padding 1.5rem, panel, line border, radius 6px (same language as ticker/buttons)?
368. Why `.work-card-service` is tiny mono `--signal`?
369. Why `.work-card p { margin-bottom: 1rem; color: var(--muted); }` — does that also hit `.work-card-service`?

## Lines 468–518 — contact

370. Why `.contact-lead` is `max-width: 50ch` (hero description was `42ch`)?
371. Why `.contact-form` is `display: grid; gap: 0.4rem; max-width: 480px`?
372. Why labels have `margin-top: 0.75rem` — how does that interact with grid gap for the first label?
373. Why inputs/textarea share padding, body font, paper color, panel background, line border?
374. Why no `:invalid` / `:focus` styles beyond the global `:focus-visible`?
375. Why `button { justify-self: start; border: none; cursor: pointer; }`?
376. What happens if `border: none` fights `.btn` / `.btn-primary` border?
377. Why `.contact-social` is a row of `gap: 1.5rem` with no wrap?
378. Why social links are `--muted` and hover `--signal` — no underline still, because of the global `a` rule?

## Lines 520–529 — footer

379. Why `.site-footer` has `position: relative; z-index: 1`?
380. What happens if z-index is removed — do falling icons paint over the footer?
381. Why `max-width: 100vw` like the nav, not `--max-w`?
382. Why `text-align: center` and `border-top`?

## CSS-wide gaps a reviewer will probe

383. Why no `@media (prefers-reduced-motion: reduce)` anywhere?
384. Why theme is only class-based (`html.light`) and never `prefers-color-scheme` on first visit?
385. Why decorative emoji (sun/moon) live in CSS `content` rather than HTML?
386. Why no print stylesheet (`@media print` hiding `.fall` and nav)?
387. Why no container queries — only viewport breakpoints at 600 and 900?
388. Why `px` for some spacing (20px nav/footer) and `rem` everywhere else?
389. Why no CSS logical properties beyond `margin-inline` (e.g. `padding-block`)?
390. Why this file is a single 530-line sheet rather than split by component?

---

# Part 3 — `js/main.js` (lines 1–60)

## Lines 1–4 — theme toggle

```js
document.getElementById("themeToggle").onclick = () => {
  const light = document.documentElement.classList.toggle("light");
  localStorage.theme = light ? "light" : "dark";
};
```

391. Why `getElementById("themeToggle")` instead of `querySelector(".nav-bar-theme")`?
392. What happens if the id is missing or misspelled — when does it throw?
393. Why `.onclick =` instead of `addEventListener("click", …)`?
394. What happens if another script also assigns `onclick`?
395. Why an arrow function?
396. Why `classList.toggle("light")` and why capture its return value?
397. What does `toggle` return when the class is added vs removed?
398. Why write `localStorage.theme = light ? "light" : "dark"` rather than `setItem`?
399. Why store `"dark"` when dark is the absence of class (the inline head script only checks `"light"`)?
400. What happens if you store `"dark"` then the head script runs — correct theme?
401. What happens if `localStorage` throws here (private mode) — does the class still toggle on screen?
402. Why no `aria-pressed` or `aria-label` update on click?
403. Why this runs at parse time of `main.js` — and how does `defer` plus end-of-body make `getElementById` safe?
404. What happens if you remove `defer` and move this script into `<head>` without waiting for DOMContentLoaded?

## Lines 6–11 — `pipelines`

405. Why this data lives in JS as a `const` array of strings, not in HTML or a JSON file?
406. Why these four strings specifically (`auth_request…`, `job_description…`, `resume…`, `skill_list…`)?
407. Why snake_case and `->` — whose dialect is that?
408. What happens if the array is empty?
409. What happens if you add a 200-character line — CSS `min-height: 2.6em` and `min-width: 0`?

## Lines 13–14 — ticker DOM refs

410. Why `getElementById("tickerText")` then `tickerEl.closest(".hero-text-ticker")`?
411. What does `closest` do, and what happens if the ancestor class is renamed in CSS/HTML but not here?
412. Why not give the ticker box its own id?
413. What happens if `#tickerText` is missing — which line throws first, 13 or 14?
414. Why are these `const` at module (script) scope?

## Lines 16–28 — `runTicker`

415. Why `async function runTicker` instead of a recursive `setTimeout` chain?
416. Why `while (true)`? When does this loop ever stop?
417. What happens to CPU/battery/battery saver with an infinite async loop of intervals?
418. Why `i % pipelines.length` instead of resetting `i` to 0?
419. What happens if `pipelines.length` is 0 (modulo by zero)?
420. Why `await typeText(line)` then add `is-waiting`, `await wait(1800)`, remove class, `await eraseText()`?
421. Why 1800ms specifically?
422. What happens if you forget to `remove` `is-waiting` before erase — cursor still blinking while deleting?
423. Why is `is-waiting` a CSS class name that JS must know — coupling?
424. Why `i++` at the end rather than at the start?
425. Why not `for await` or a generator?

## Lines 30–42 — `typeText`

426. Why return a `Promise` wrapping `setInterval`?
427. Why `let i = 0` and `text.slice(0, i)` then `i++`?
428. On the first tick, `i` is 0 so you write `""` — is that an off-by-one wasted tick?
429. Why `if (i > text.length)` and not `i === text.length`?
430. What is the last `textContent` assigned before resolve — full string or one past?
431. Why `clearInterval(interval)` before `resolve()`?
432. What happens if you resolve without clearing — leaked interval?
433. Why 35ms per character? How many ms for the longest pipeline string?
434. Why `setInterval` rather than `requestAnimationFrame`?
435. What happens if `typeText` is called again before the previous Promise resolves (it isn’t, but if it were)?
436. Why mutate `tickerEl.textContent` instead of `innerHTML` or appending a text node?

## Lines 44–55 — `eraseText`

437. Why a separate function instead of `typeText` in reverse with a shared helper?
438. Why read `tickerEl.textContent` every tick instead of closing over the original string and an index?
439. Why `current.slice(0, -1)`?
440. Why `if (current.length === 0)` — you already sliced; is this checking the **pre-slice** length?
441. Walk through the last two ticks: when `current` is `"a"` vs `""` — do you call `setInterval` one extra time?
442. Why 20ms (faster than type’s 35ms)?
443. What happens if `textContent` is already empty when `eraseText` starts?
444. Could `eraseText` run forever if `textContent` never becomes empty?

## Lines 57–60 — `wait` and `runTicker()`

445. Why wrap `setTimeout` in a Promise instead of using a raw timeout inside `runTicker`?
446. Why a generic `wait(ms)` used only once with `1800`?
447. Why `runTicker()` is invoked immediately at the bottom?
448. What happens if you don’t call it — ticker stays empty forever?
449. Why no `DOMContentLoaded` listener?
450. Why no `prefers-reduced-motion` check that would set the full text once and skip animation?
451. Why no pause when the tab is hidden (`document.hidden` / `visibilitychange`)?
452. Why no error handling if the ticker node is removed mid-animation?
453. Why vanilla JS — no TypeScript, no bundler, no framework — for this file specifically, in a demo where you claim React/Next daily?

---

# Part 4 — related files and hosting

## `robots.txt`

454. Why `User-agent: *` and `Allow: /`?
455. What happens if `robots.txt` is missing on Netlify?
456. Why `Sitemap: https://sayantan-pal-dev.netlify.app/sitemap.xml` as an absolute URL?
457. What happens if that URL is `http` or missing the domain?
458. Why no `Disallow` for `/google*.html` verification files?

## `sitemap.xml`

459. Why a sitemap with a single URL for a one-page site?
460. Why `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`?
461. Why `lastmod` is `2026-08-24` — who updates it when you change copy?
462. Why `changefreq` is `monthly`? Does Google still use this?
463. Why `priority` is `1.0` when there is only one URL?
464. What happens if sitemap and robots disagree?

## `assets/favicon.svg`

465. Why an SVG favicon with a rounded rect, letter “S”, and a `--signal`-colored dot?
466. Why `role="img"` and `aria-label="S.dev"` on a favicon — who reads that?
467. Why hard-coded `#10141F` / `#F3F1EA` / `#E9A23B` instead of `currentColor` or CSS variables?
468. What happens to the favicon when the page is in light theme — does it invert?
469. Why `viewBox="0 0 32 32"` and `rx="7"`?

## `assets/icons/fall-icons.svg`

470. Why one sprite file with `<symbol id="…">` instead of six separate SVGs?
471. Why `xmlns` on the sprite root with no `viewBox` on the root `<svg>`?
472. Why each `<symbol>` has its own `viewBox`?
473. Why `href="assets/icons/fall-icons.svg#openai"` (external sprite) vs inlining symbols in `index.html`?
474. What CORS/file-protocol issue appears if you open `index.html` as `file://` instead of via a server?
475. Why VS Code’s symbol is `viewBox="0 0 100 100"` while others are `24`?
476. Why some paths `fill="#FFFFFF"` (need `.fall-light` + invert) vs brand-colored fills?
477. What happens if two symbols share an id?

## Netlify forms, honeypot, Google verification files

478. Why `data-netlify="true"` is required at deploy time — does Netlify parse the static HTML at build?
479. What happens if you rename the form in HTML after the first deploy?
480. Why `netlify-honeypot="bot-field"` without a hidden `<input name="bot-field">`?
481. What is the correct honeypot markup, and what happens to spam if the field is omitted?
482. Why are `googleaafb6cb8726be5e4.html` and `google2e544ac390422587.html` in the repo root?
483. Why both HTML file verification **and** a `google-site-verification` meta tag?
484. What happens if you delete the HTML files but keep the meta tag, or the reverse?
485. Why `google-site-verification: …` as the only text inside those files?

## Hosting and project choices

486. Why a static site on Netlify with no bundler, no React, no build step?
487. How do you reconcile “I use React and Next.js daily” with a vanilla HTML/CSS/JS demo?
488. What happens if you add a second HTML page — which links, canonical, and sitemap entries must change?
489. Why relative paths `css/styles.css`, `js/main.js`, `assets/…` instead of root-absolute `/css/styles.css`?
490. What breaks if the site is ever hosted in a subdirectory?
491. Why no `Content-Security-Policy` meta / Netlify headers for the inline theme script and Google Fonts?
492. Why no `rel="noopener"` on the Resume Drive link but yes on socials?
493. Why no `loading="lazy"` on the hero image (it is LCP — should it be lazy)?
494. Why no `preconnect` to `drive.google.com` or GitHub?
495. If a reviewer asks “what would you add next without changing the story of the page?”, what is still missing: Open Graph, reduced-motion, honeypot field, `aria-label` on the theme button, nav link to `#projects`, `prefers-color-scheme`?

---

End of questions. Walk the three source files in this order; if a reviewer jumps to SEO, forms, or assets, use Part 4.
