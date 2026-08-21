# HTML Fundamentals: Emmet, Tags, and Block vs Inline

Interview-ready notes for a final-year CSE student. Read this in order: first understand the page as a whole, then learn how to type it faster (Emmet), then master the tags you will actually use, then the layout rule that interviewers love (block vs inline), then the semantic text tags (`<b>` / `<i>` / `<em>` / `<strong>`).

Hands-on files this note maps to:

- `_1_intro.html` — document skeleton, headings, anchors, image
- `_2_Headings_Lists.html` — lists, inline text tags, block vs inline

---

## How to use these notes

Think of learning HTML like assembling a building:

1. **Blueprint** — the document skeleton (`DOCTYPE`, `html`, `head`, `title`, `body`)
2. **Power tools** — Emmet abbreviations so you type the blueprint in seconds
3. **Rooms and fixtures** — headings, links, images, lists, common tags
4. **Architecture rule** — block-level vs inline (how boxes stack)
5. **Voice of the text** — `<strong>`, `<em>`, `<b>`, `<i>`
6. **Viva** — interview Q&A and a last-minute cheat sheet

---

## 1. Big picture: an HTML page is a published book

> **Analogy:** A webpage is a book. Some pages of the book are metadata (ISBN, copyright, title on the spine). The rest is what a reader actually sees (chapters, paragraphs, photos, footnotes).

| HTML part | Book analogy | Purpose |
| --- | --- | --- |
| `<!DOCTYPE html>` | ISBN / edition label | Tells the browser: “use modern standards mode, not quirks mode” |
| `<html lang="en">` | The book itself | Root container; `lang` tells screen readers the language |
| `<head>` | Copyright page + catalog metadata | Invisible to the reader, critical for the browser, SEO, and devices |
| `<title>` | Title printed on the spine | Browser tab, bookmarks, search-result title |
| `<body>` | All readable chapters | Everything the user sees |
| Block elements (`div`, `p`, `h1`) | Chapters and paragraphs | Structure the layout |
| Inline elements (`a`, `span`, `em`) | Bold words, footnotes, page numbers inside a sentence | Format text without breaking the paragraph |

**Interview Tip:** Interviewers often ask “what is the difference between `<head>` and `<body>`?” Answer: `<head>` is metadata for machines; `<body>` is content for humans.

---

## 2. Document skeleton: `DOCTYPE`, `html`, `head`, `title`, `body`

> **Analogy:** Before you write a single chapter, you bind the book: cover, ISBN, language, and empty pages. That binding is the HTML boilerplate.

This is the same skeleton used in `_1_intro.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Headings</title>
</head>
<body>
    <!-- visible content goes here -->
</body>
</html>
```

### 2.1 `<!DOCTYPE html>`

- Not an HTML tag. It is a **preamble** (a document-type declaration).
- In HTML5 it is short and fixed: `<!DOCTYPE html>`.
- If you omit it, browsers may fall into **quirks mode** and layout CSS like old Internet Explorer. Always include it as the first line.

**Interview one-liner:** “`<!DOCTYPE html>` switches the browser into standards mode.”

### 2.2 `<html lang="en">`

- Root element. Every other element is a descendant of `<html>`.
- `lang="en"` helps screen readers pronounce the page correctly and helps search engines know the language.
- There can be only one `<html>` element in a document.

### 2.3 `<head>` — the invisible control room

> **Analogy:** `<head>` is the control room of a theatre. The audience never sees it, but lights, captions, and the playbill all come from there.

Put these in `<head>` first (MDN / web.dev recommendation):

1. Character encoding
2. Viewport
3. Title

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lists</title>
</head>
```

| Tag | What it does | Why interviews care |
| --- | --- | --- |
| `<meta charset="UTF-8">` | Declares Unicode encoding | Put it early so the title itself renders correctly (Hindi, emoji, etc.) |
| `<meta name="viewport" ...>` | Makes the page use the device width | Without it, phones shrink the desktop layout and the page looks tiny |
| `<title>` | Tab label, bookmark name, SEO title | Unique, descriptive titles beat generic ones like “Untitled” |
| `<link rel="stylesheet">` | Attaches CSS | Not in this lesson yet, but interviewers expect you to know it lives in `<head>` |
| `<script>` | JavaScript | Can go in `<head>` or before `</body>`; defer/async are follow-up questions |

**How you will use `<head>` in projects:** charset + viewport + title on every page. Add CSS links and a favicon as the app grows. Add Open Graph tags later for social sharing.

### 2.4 `<title>` vs the `title` attribute (easy mix-up)

In `_1_intro.html` you wrote:

```html
<body> <!-- so here title gives a tooltip when you hover over the heading -->
    <h1 title="Welcome to My Website">Welcome to My Website</h1>
```

That comment is about the **`title` attribute**, not the `<title>` element.

| Feature | Where it lives | What the user sees |
| --- | --- | --- |
| `<title>Headings</title>` | Inside `<head>` | Browser tab / bookmark / search result |
| `title="Welcome to My Website"` | Attribute on any element (here, `<h1>`) | Tooltip on hover (unreliable on mobile / for accessibility) |

**Interview Tip:** Never say “the title tag shows a tooltip.” Say “the `<title>` element labels the document; the `title` attribute may show a native tooltip.”

### 2.5 `<body>` — the stage

> **Analogy:** If `<head>` is the control room, `<body>` is the stage. Actors (headings, paragraphs, images, links) only appear if you put them here.

Everything visible — headings, lists, images, forms — belongs in `<body>`. Browsers still try to recover if you forget `<body>`, but you should always write it explicitly.

---

## 3. Emmet: write HTML at the speed of thought

> **Analogy:** Emmet is AutoCAD for HTML. You type a compact blueprint (`ul>li*3`), press **Tab** in VS Code, and the full structure appears. You are not learning a new language — you are learning a shorthand for the language you already know.

Emmet ships with VS Code / Cursor. Type the abbreviation in an HTML file, then press **Tab** (or **Enter**, depending on settings).

### 3.1 Operators you must memorize

| Syntax | Meaning | Example abbreviation | Expands to |
| --- | --- | --- | --- |
| `>` | Child (nest inside) | `div>p` | `<div><p></p></div>` |
| `+` | Sibling (next to) | `h1+p` | `<h1></h1><p></p>` |
| `*` | Multiply | `ul>li*3` | three `<li>` inside `<ul>` |
| `^` | Climb up one level | `div>p>span^p` | second `<p>` is sibling of first `<p>` |
| `()` | Group | `(header>h1)+footer` | header and footer as siblings |
| `#` | ID | `div#app` | `<div id="app"></div>` |
| `.` | Class | `p.lead` | `<p class="lead"></p>` |
| `[]` | Custom attribute | `a[href="#"]` | `<a href="#"></a>` |
| `{}` | Text content | `p{Hello}` | `<p>Hello</p>` |
| `$` | Auto-numbering | `ul>li.item$*3` | `item1`, `item2`, `item3` |

### 3.2 Abbreviations that match this lesson

These are the exact shortcuts used in `_2_Headings_Lists.html`:

**`ul>li*3`** — unordered list with three items:

```html
<ul>
    <li>tea</li>
    <li>coffee</li>
    <li>milk</li>
</ul>
```

**`ol>li*3`** — ordered list with three items:

```html
<ol>
    <li>apple</li>
    <li>banana</li>
    <li>cherry</li>
</ol>
```

**Boilerplate:** type `!` then Tab to generate a full HTML5 skeleton (`DOCTYPE`, `html`, `head`, charset, viewport, `title`, `body`).

### 3.3 Interview-level Emmet (one step beyond class)

```text
nav>ul>li*3>a{Link $}
```

Expands to a navigation list with numbered link text:

```html
<nav>
    <ul>
        <li><a href="">Link 1</a></li>
        <li><a href="">Link 2</a></li>
        <li><a href="">Link 3</a></li>
    </ul>
</nav>
```

```text
div>(header>h1{Site})+(main>p{Hello})+footer>p{© 2026}
```

Grouping with `()` lets you build a page outline in one abbreviation.

**How you will use Emmet in real work:** scaffold lists, navs, and card grids in seconds during labs, internships, and live coding rounds. Interviewers rarely ask you to recite Emmet, but they notice if you can produce markup quickly. Knowing `ul>li*3` also proves you understand **parent–child nesting**.

**Interview Tip:** If asked “what is Emmet?”, say: “A toolkit that expands CSS-like abbreviations into HTML/CSS. `>` means child, `*` means repeat, `{}` is text, `$` is a counter.”

---

## 4. Commonly used tags (in depth)

### 4.1 Headings: `<h1>` to `<h6>`

> **Analogy:** A newspaper. `<h1>` is the front-page headline. `<h2>` is a section title. `<h3>` is a subsection. You would never print a tiny footnote as the only headline, and you would not jump from “World News” to a tiny caption with nothing in between.

From `_1_intro.html`:

```html
<h1 title="Welcome to My Website">Welcome to My Website</h1>
<h2>About Me</h2>
<h3>My Hobbies</h3>
<h4>Traveling</h4>
<h5>Photography</h5>
<h6>Coding</h6>
```

**How to use headings in depth:**

- Headings are **block-level**. Each one starts on a new line and takes full width.
- They create the **document outline**. Screen readers and search engines use that outline like a table of contents.
- Prefer **one `<h1>` per page** (the main topic). Then nest: `h1 → h2 → h3`. Do not skip from `h1` to `h4` just because `h4` looks smaller. Size is CSS’s job; rank is HTML’s job.
- Do not use headings only to make text big. If it is not a section title, use `<p>` + CSS.

**Interview Tip:** “Headings communicate rank, not font size. I style size with CSS; I choose `h1`–`h6` for outline and accessibility.”

### 4.2 Anchor tag: `<a>`

> **Analogy:** An `<a>` is a door. The visible text is the sign on the door. `href` is the address behind the door. A door that says “click here” is a useless sign; a door that says “Visit Chaicode” tells you where you will land.

From `_1_intro.html`:

```html
<a href="https://chaicode.com">Visit Chaicode</a>
<a href="mailto:sayantanpal100@gmail.com">Email Me</a>
<a href="tel:+9832524555">Call Me</a>
<a href="../index.html">Home</a>
```

`<a>` is **inline**. Links sit inside a sentence without forcing a new line.

#### `href` schemes you should know

| `href` value | What it opens | When you use it |
| --- | --- | --- |
| `https://chaicode.com` | Absolute URL (another site) | External pages |
| `../index.html` | Relative path (parent folder) | Internal site navigation |
| `#section-id` | Fragment on the same page | Jump links / skip links |
| `mailto:user@mail.com` | Default email app | Contact links |
| `tel:+9832524555` | Phone dialer on mobile | Call-now buttons |

#### Attributes interviewers follow up on

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
    Example (opens in a new tab)
</a>
```

- `target="_blank"` — new tab. Modern browsers imply `rel="noopener"`, but stating it still shows you know the old `window.opener` tab-nabbing issue.
- **Accessible link text** — never wrap only the word “here”. Screen-reader users can list all links; “here”, “here”, “here” is noise.

```html
<!-- Weak -->
<p>Learn more about our products <a href="/products">here</a>.</p>

<!-- Strong -->
<p>Learn more <a href="/products">about our products</a>.</p>
```

**How you will use `<a>`:** navigation, emails, tel links, in-page jumps (`href="#content"`). Use a `<button>` for actions that do not navigate. Fake links with `href="#"` plus JavaScript are an interview red flag.

### 4.3 Image tag: `<img>`

> **Analogy:** `<img>` is a framed photo on the wall. `src` is the photograph. `alt` is the braille / caption for anyone who cannot see the photo (screen readers, broken URLs, slow networks).

From `_1_intro.html`:

```html
<img
    src="./images/Screenshot 2025-12-26 at 11.12.53 AM.png"
    alt="A scenic view of mountains during sunset"
    width="600"
    height="400"
>
```

**Key facts:**

- `<img>` is a **void (empty) element** — no closing tag, no children.
- It is **inline** (replaced element): it sits in the text flow, but unlike `<span>` it has intrinsic width and height.
- `src` is required for a real image. `alt` is required for accessibility.

| Attribute | Role | How you use it |
| --- | --- | --- |
| `src` | Path or URL of the file | Relative (`./images/photo.png`) or absolute |
| `alt` | Text alternative | Describe the image if it conveys meaning; use `alt=""` if it is purely decorative |
| `width` / `height` | Reserved box size | Prevents layout shift while the file loads (CLS in Core Web Vitals) |
| `loading="lazy"` | Defer offscreen images | Use on below-the-fold images for performance |

Empty `alt` in `_2_Headings_Lists.html` (`alt=""`) is correct **only** if the image adds no information. If the screenshot is content, write a real description.

**Interview Tip:** “`alt` is not an SEO trick first — it is the accessible name. Decorative images get `alt=""`. Meaningful images get a short description of what the image communicates, not ‘image of…’.”

### 4.4 Lists: `<ul>`, `<ol>`, `<li>`

> **Analogy:** `<ul>` is a grocery list — bullets, order does not change the meaning. `<ol>` is a recipe — step 1 then step 2; swapping them breaks the procedure.

From `_2_Headings_Lists.html` (created with `ul>li*3` and `ol>li*3`):

```html
<ul>
    <li>tea</li>
    <li>coffee</li>
    <li>milk</li>
</ul>

<ol>
    <li>apple</li>
    <li>banana</li>
    <li>cherry</li>
</ol>
```

| Tag | Display | Meaning |
| --- | --- | --- |
| `<ul>` | Block, bullets | Unordered collection |
| `<ol>` | Block, numbers | Ordered sequence |
| `<li>` | List item (block inside the list) | One entry; must be a child of `ul`, `ol`, or `menu` |
| `<dl>`, `<dt>`, `<dd>` | Description list | Terms and definitions (glossary, metadata) |

**Nesting:** a list item can contain another list (sub-steps, nested nav).

```html
<ul>
    <li>Frontend
        <ul>
            <li>HTML</li>
            <li>CSS</li>
        </ul>
    </li>
    <li>Backend</li>
</ul>
```

**How you will use lists:** navigation menus (`nav > ul > li > a`), feature bullets, ranked steps, FAQs. Do not fake a list with `<br>` between lines — that loses semantics for CSS and assistive tech.

**Interview Tip:** “`<li>` without `<ul>`/`<ol>` is invalid structure. I saw it in a demo `div` of inline examples; in production every `li` lives inside a list parent.”

### 4.5 Other tags you will use every week

| Tag | Default display | Use it for |
| --- | --- | --- |
| `<p>` | Block | A paragraph. Can contain inline content only — not another `<div>` or `<h2>` |
| `<div>` | Block | Generic box when no semantic tag fits (layout wrapper) |
| `<span>` | Inline | Generic hook for a few words (class, `id`, tiny style) |
| `<br>` | Inline, void | A line break inside text. Not a substitute for `<p>` |
| `<hr>` | Block, void | Thematic break (topic change), not just a visual line |
| `<header>` | Block | Intro of a page or section (logo, heading, nav) |
| `<nav>` | Block | Major navigation landmark |
| `<main>` | Block | Unique primary content of the page (one per document) |
| `<section>` | Block | Thematic grouping that usually has a heading |
| `<article>` | Block | Independently distributable content (blog post, card) |
| `<footer>` | Block | Author, copyright, related links |
| `<form>` | Block | User input |
| `<input>` | Inline | Form control (void) |
| `<label>` | Inline | Accessible name for a control |
| `<button>` | Inline | Action that is not navigation |
| `<code>` | Inline | A snippet of code |
| `<pre>` | Block | Preformatted text (keeps spaces and newlines) |

> **Analogy:** `<div>` and `<span>` are plain cardboard boxes. `<div>` is a moving carton (block). `<span>` is a small gift bag that sits on the table (inline). Semantic tags (`header`, `article`, `nav`) are labeled boxes — screen readers and SEO can read the label.

**How you will use them:** start with semantic tags. Fall back to `<div>`/`<span>` when there is no meaning to encode — only layout or a styling hook.

---

## 5. Block-level vs inline elements

This is the highest-frequency HTML interview question in this lesson. The comments at the bottom of `_2_Headings_Lists.html` already sketch the answer; this section is the version you should speak in a viva.

### 5.1 The apartment-building analogy

> **Block elements are floors of an apartment building.** Each floor stretches the full width of the building and stacks on top of the next floor. You cannot put two floors side by side without changing the architecture (CSS).
>
> **Inline elements are furniture inside a room.** A sofa, a lamp, and a chair sit on the same floor, left to right, and only occupy as much space as they need. Furniture does not become a new floor.

```text
[ ========== h1 (full-width floor) ========== ]
[ ========== p  (full-width floor) ========== ]
[  Visit Chaicode  Email Me  Call Me          ]  ← three <a> on one line
[  [img] some text [strong]                   ]  ← inline pieces inside a line
[ ========== ul (full-width floor) ========== ]
```

### 5.2 Comparison table

| Property | Block-level | Inline |
| --- | --- | --- |
| New line? | Yes — always starts on a new line | No — continues on the same line |
| Width | Stretches to the container’s full width by default | Shrinks to the content’s width |
| Height | Grows with content; you can set `height` | Height follows the line box; `height` is ignored |
| `width` / `height` in CSS | Respected | Ignored (use `inline-block` if you need them) |
| Margin / padding | All four sides affect layout | Horizontal margin/padding affect neighbors; vertical margin does not push other lines the way a block does |
| Can contain | Other blocks and inlines (with exceptions) | Text and other inlines — **not** blocks |
| Role in the page | Structure: sections, headings, lists, paragraphs | Phrasing: links, emphasis, images, tiny wrappers |
| Examples | `div`, `p`, `h1`–`h6`, `ul`, `ol`, `section`, `article`, `header`, `footer`, `form` | `a`, `span`, `img`, `strong`, `em`, `b`, `i`, `code`, `br`, `input`, `label` |

### 5.3 Code you can draw on a whiteboard

```html
<!-- BLOCK: each heading / list / div takes a full row -->
<h1>My Favorite Fruits</h1>
<ul>
    <li>tea</li>
    <li>coffee</li>
</ul>

<!-- INLINE: these sit in the sentence -->
<p>
    Here is a <a href="https://example.com">link</a>,
    a <strong>warning</strong>,
    and an <img src="./images/photo.png" alt="A scenic view">.
</p>
```

From `_2_Headings_Lists.html`, the inline demo is exactly this idea: `<strong>`, `<b>`, `<em>`, `<i>`, `<img>`, and `<a>` live *inside* list items instead of starting new “floors.”

### 5.4 Nesting rules (where students lose marks)

**Golden rule:** an inline element must not contain a block-level element.

```html
<!-- Invalid idea: block inside inline -->
<a href="/about">
    <div>About us</div>
</a>
```

HTML5 relaxed this for `<a>` in some cases (an `<a>` may wrap flow content if it has `href` and contains no other interactive content), but the **safe interview answer** is still: “Inline phrasing elements contain phrasing content. I do not put a `<div>` or `<p>` inside a `<span>`. If a link needs to wrap a card, I make the card the link carefully or use a stretched link pattern in CSS.”

**Famous exception:** `<p>` is block-level but **cannot contain other blocks**. A `<div>` or `<h2>` inside a `<p>` will cause the browser to close the paragraph early.

```html
<!-- Browser will break this: the <div> closes the <p> -->
<p>
    Hello
    <div>world</div>
</p>
```

### 5.5 CSS bridge: display is not destiny

HTML’s “block vs inline” is the **default CSS `display`**. You can override it:

```css
a { display: block; }           /* link behaves like a floor */
span { display: inline-block; } /* sits in a line, but width/height work */
li { display: inline; }         /* list items in a horizontal nav */
```

| `display` | Mental model |
| --- | --- |
| `block` | New floor, full width |
| `inline` | Furniture, width/height ignored |
| `inline-block` | A small cabinet: sits in the row, but you can set size |
| `flex` / `grid` | Modern layout on a block container; children become flex/grid items |

**Interview Tip:** “Block vs inline is about **normal flow**. Flexbox and Grid sit on top of that. I still need the HTML defaults because that is what you get before CSS, and that is what many interview questions assume.”

### 5.6 Replaced vs non-replaced (bonus, CSE-level)

Most inline tags (`span`, `em`) wrap text. `<img>` (and `<input>`, `<video>`) are **replaced elements**: the browser draws an external object. That is why an image can have `width` and `height` even though it is inline.

---

## 6. `<b>`, `<i>`, `<em>`, `<strong>` — meaning vs paint

> **Analogy:** Imagine you are speaking, not decorating a Word document.
>
> - `<strong>` is **raising your voice** because the content is serious or urgent.
> - `<em>` is **stressing one word** so the sentence means something else.
> - `<b>` is **highlighter on a keyword** in a textbook — attention, not importance.
> - `<i>` is **switching voice**: a foreign word, a thought, a technical name.

Browsers often render `<strong>`/`<b>` as bold and `<em>`/`<i>` as italic. **That coincidence is the trap.** Screen readers, outlining tools, and the HTML spec care about meaning, not the default font.

### 6.1 Side-by-side

| Tag | Spec meaning (WHATWG / MDN) | Speech analogy | Default look | Prefer when |
| --- | --- | --- | --- | --- |
| `<strong>` | Strong importance, seriousness, or urgency | “This is **critical**.” | Bold | Warnings, the key clause in a heading, legal must-dos |
| `<em>` | Stress emphasis; placement **changes the meaning** of the sentence | “I did *not* say that.” vs “I did not *say* that.” | Italic | Contrast / spoken stress |
| `<b>` | Stylistically offset, **without** extra importance | Highlighting a product name | Bold | Keywords, lead sentence, product names |
| `<i>` | Alternate voice, mood, or quality | Reading *Homo sapiens* or a French phrase | Italic | Foreign words, technical terms, thoughts. Use `<cite>` for titles of works |

### 6.2 Snippets from `_2_Headings_Lists.html`

```html
<li>This is a <strong>strong</strong> word in a paragraph.</li>
<li>same as strong tag is <b>bold</b> tag</li>
<li>This is an <b><em>emphasized</em></b> word in a paragraph.</li>
<li>same as em tag is <b><i>italic</i></b> tag</li>
```

They look similar in the browser. For interviews, treat “same as” as **visual similarity, not semantic equality**.

Better production examples:

```html
<p>
    <strong>Warning:</strong> Do not deploy to production without tests.
</p>

<p>
    I <em>love</em> carrots.   <!-- stress on love -->
    I love <em>carrots</em>.   <!-- stress on carrots — different meaning -->
</p>

<p>
    The new phone is the <b>Pixel 9</b>, not a cheaper clone.
</p>

<p>
    The bacterium <i>E. coli</i> is used in many lab protocols.
</p>
```

Nesting increases intensity: `<strong>you may <em>die</em></strong>` (MDN) is both important and stressed.

### 6.3 What not to do

- Do not use `<b>` or `<i>` (or `<strong>` / `<em>`) **only** to get bold/italic. Use CSS: `font-weight: 700` and `font-style: italic`.
- Do not use `<em>` for a book title — use `<cite>`.
- Do not use `<strong>` as a cheap `<h2>`. Importance inside a paragraph is not a section heading.

**Interview one-liner:** “`<b>`/`<i>` offset text visually; `<strong>`/`<em>` encode importance and spoken stress. If I only want paint, I use CSS.”

---

## 7. Interview quick-fire Q&A

Practice answering out loud in 20–40 seconds each.

### Q1. What is the difference between block-level and inline elements?

**A:** Block-level elements start on a new line and take the full available width. They structure the page (`div`, `p`, `h1`–`h6`, `ul`, `ol`, `section`). Inline elements stay in the text flow and take only as much width as their content (`a`, `span`, `strong`, `em`, `img`). Inline content generally cannot wrap block content. CSS `display` can change the default.

### Q2. What does `<!DOCTYPE html>` do?

**A:** It is the HTML5 document type declaration. It tells the browser to use **standards mode** instead of quirks mode. It is not an HTML element and should be the first line of the file.

### Q3. Difference between `<title>` and the `title` attribute?

**A:** `<title>` lives in `<head>` and sets the document’s name (tab, bookmark, SERP title). The `title` attribute on an element such as `<h1 title="...">` may show a hover tooltip. They are unrelated features that share a name.

```html
<title>Headings</title>
<h1 title="Welcome to My Website">Welcome to My Website</h1>
```

### Q4. Why is `alt` required on `<img>`?

**A:** `<img>` is replaced content. If the file fails, or the user cannot see it, `alt` is the textual replacement. Screen readers announce it. Use a real description for informative images and `alt=""` for decorative ones so assistive tech can skip them. `width` and `height` are separate: they reserve layout space.

### Q5. `<b>` vs `<strong>` and `<i>` vs `<em>`?

**A:** All four are inline. `<strong>` marks importance/urgency; `<em>` marks linguistic stress that can change meaning. `<b>` draws attention without implying importance (keywords, product names). `<i>` marks an alternate voice (foreign or technical terms). Default bold/italic is just styling — use CSS when there is no meaning to encode.

### Q6. What is Emmet, and how does `ul>li*3` work?

**A:** Emmet expands abbreviations into markup. `>` means “child”, `*` means “repeat”. `ul>li*3` builds an unordered list with three empty `<li>` children. In VS Code you type it and press Tab. `!` expands the HTML5 boilerplate.

### Q7. Difference between `<ul>` and `<ol>`?

**A:** `<ul>` is unordered (bullets; sequence is not part of the meaning). `<ol>` is ordered (numbers; sequence matters). Both contain `<li>`. Use `<ul>` for nav and feature lists; use `<ol>` for ranked steps and procedures.

### Q8. What is a void element? Give examples.

**A:** A void (empty) element cannot have content or a closing tag. The tag is complete by itself. Common examples: `<img>`, `<br>`, `<hr>`, `<meta>`, `<input>`, `<link>`. You write `<img src="..." alt="...">`, never `</img>`.

### Q9. Can an inline element contain a block element?

**A:** As a rule, no — phrasing (inline) content contains phrasing content. Putting a `<div>` inside a `<span>` is invalid. `<p>` is block but still cannot contain other blocks. HTML5 allows `<a href>` to wrap some flow content if it does not nest interactive elements; still avoid stuffing layout `<div>`s inside random inline tags.

### Q10. What can `href` point to besides HTTP(S) pages?

**A:** Relative paths (`../index.html`), same-page fragments (`#id`), `mailto:` email, `tel:` phone, `sms:`, and downloads (`download` attribute, same-origin). Links should describe their destination in the text, not “click here”.

---

## 8. Last-minute cheat sheet

### 8.1 Document skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page name in the tab</title>
</head>
<body>
    <!-- visible content -->
</body>
</html>
```

### 8.2 Emmet

| Type this | Get this |
| --- | --- |
| `!` | Full HTML5 boilerplate |
| `ul>li*3` | Unordered list, 3 items |
| `ol>li*3` | Ordered list, 3 items |
| `a[href="#"]{Home}` | Link with text |
| `img[src="./x.png"][alt="desc"]` | Image with src and alt |
| `nav>ul>li*3>a{Link $}` | Nav with numbered links |
| `div#app.container` | `<div id="app" class="container">` |

### 8.3 Tag → display → job

| Tag | Display | Job |
| --- | --- | --- |
| `h1`–`h6` | Block | Ranked headings (outline) |
| `p` | Block | Paragraph (inline children only) |
| `div` | Block | Generic block wrapper |
| `ul` / `ol` / `li` | Block | Lists |
| `header` `nav` `main` `section` `article` `footer` | Block | Landmarks / sections |
| `a` | Inline | Hyperlink (`href`) |
| `img` | Inline (replaced, void) | Image (`src` + `alt`) |
| `span` | Inline | Generic inline wrapper |
| `strong` | Inline | Importance |
| `em` | Inline | Stress emphasis |
| `b` | Inline | Offset, not important |
| `i` | Inline | Alternate voice |
| `br` | Inline, void | Line break |

### 8.4 One-breath revision

1. Skeleton: `DOCTYPE` → `html lang` → `head` (charset, viewport, title) → `body`.
2. `<title>` is the tab; `title=""` is a tooltip.
3. Emmet: `>` child, `*` repeat, `{}` text, `$` number, `!` boilerplate.
4. Headings = outline. Links = doors (`href`). Images = photos (`alt`). `ul` vs `ol` = grocery vs recipe.
5. Blocks are floors; inlines are furniture. No blocks inside inlines (with rare `<a>` exceptions).
6. Bold/italic look is not semantics. Prefer `<strong>`/`<em>` for meaning; CSS for paint.

---

## 9. How this lesson maps to real usage

| You learned | You will use it when |
| --- | --- |
| Boilerplate + Emmet `!` | Every new HTML file in internships and labs |
| `ul>li*3` / `ol>li*3` | Menus, pricing features, onboarding steps |
| `<a href>` variants | Nav, contact (`mailto`, `tel`), in-page jumps |
| `<img alt width height>` | Product UIs, blogs, Core Web Vitals (CLS) |
| Block vs inline | Debugging “why is this on a new line?” and CSS interviews |
| `<strong>` vs `<b>`, `<em>` vs `<i>` | Accessibility questions and semantic HTML rounds |

When you open `_1_intro.html` and `_2_Headings_Lists.html`, read each tag twice: once as **what it looks like**, and once as **what it means to a browser, a crawler, and a screen reader**. That second reading is what interviews test.
