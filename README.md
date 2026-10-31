# VOQEN Studio website

Static site: `index.html`, `styles.css`, `script.js`. No build step, no dependencies except Google Fonts (falls back to system fonts if blocked).

## Preview locally
The form uses an AJAX request, so open the site over http, not by double-clicking the file.
```
cd voqen-studio
python3 -m http.server 8000
```
Open http://localhost:8000

## Publish
- **Netlify:** drag the `voqen-studio` folder onto app.netlify.com/drop.
- **GitHub Pages:** push the files to a repo, then Settings > Pages > deploy from `main` / root.
- **Cloudflare Pages / Vercel:** import the repo; no build command, output directory `/`.
- **Google Sites:** not supported. It cannot host custom HTML/JS pages or the form script.
- **Opening index.html from disk (file://):** the form will not submit reliably. Use one of the hosts above.

## Activate email delivery (required, one time)
1. Publish the site (or run it locally).
2. Submit the form once with a real message.
3. FormSubmit emails voqen.studio.in@gmail.com an activation message. Open it (check Spam/Promotions) and click **Activate Form**.
4. Submit again and confirm the message arrives. Until step 3 is done, submissions are not delivered and the form shows an error instead of a success message.

The form shows success only when FormSubmit returns `success: "true"`. No passwords or API keys are in the code.

## Before launch
- Add `<link rel="canonical">` and Open Graph `og:url` / `og:image` once you have a production domain and a share image.
- Budget options are in INR; edit them in `index.html` if needed.

## Added features
- Light/dark theme (follows system setting, remembers choice), scroll progress bar, active-section highlight in the nav.
- Concept project detail dialogs (native `<dialog>`, keyboard and Esc support; without JS the cards link to the contact section).
- FAQ section, copy-email button, JSON-LD organization data.
- Form: live character counter, draft auto-save in the visitor's browser (cleared after a successful send), 20-second resend guard, and a "Send by email instead" fallback link if delivery fails. The form also works as a plain POST without JavaScript.
- `_headers` (Netlify / Cloudflare Pages): security headers and a strict Content-Security-Policy that allows only Google Fonts and FormSubmit. Delete or adapt it if you add other third-party scripts. GitHub Pages ignores this file.
- `404.html` and `robots.txt`. Add a `sitemap.xml` once you have a production domain.

## Logo
The navbar, footer and 404 page use your logo as an inline vector (traced from `logo_only.png`, background removed). It uses `currentColor`, so it turns near-black in the light theme and off-white in the dark theme automatically, and stays sharp at any size.
`assets/` also holds `voqen-logo.svg` (themeable vector) and `voqen-logo-black.png` / `voqen-logo-white.png` (3000 px wide, transparent) for social profiles, documents, or an Open Graph image.

## Motion and device support
- One staged hero entrance, scroll reveals, a services ticker (pauses on hover), a circular theme-switch transition (where the browser supports View Transitions), hero parallax for mouse users only, a floating back-to-top button, and animated dialog/menu.
- All motion is disabled under `prefers-reduced-motion`. Content is never hidden if JavaScript fails.
- Hover effects apply only on devices that can hover, so touch screens get no stuck hover states.
- Notch and home-indicator safe areas are respected (`viewport-fit=cover`), the mobile menu locks page scroll, and layouts were checked at 320, 375, 768, 1024, 1440 and 667x375 landscape.

## Smarter and lighter
- **Offline and fast repeat visits:** `sw.js` caches the site shell (HTTPS or localhost only; form submissions are never touched). Visitors can also "install" the site as an app via `site.webmanifest`. If you rename or restructure files, change `V` in `sw.js` so old caches are dropped.
- **Low-power mode:** on Save-Data, 2G, low-memory devices or reduced-motion settings, animations, reveals switch off automatically.
- **Form helpers:** suggests a fix for mistyped email domains (e.g. gmial.com), previews a custom budget in the chosen currency, Ctrl/Cmd+Enter sends, and a returning visitor's saved draft is restored.
- **Efficiency:** the cursor loop stops when idle, and the scroll-driven About effect shares one scroll handler.

## Chat assistant ("Ask VOQEN")
- **Works out of the box, no key needed:** answers come from the site's own facts (services, process, how to start, budget, contact). It never invents prices, timelines, clients or team details. Answer buttons can pre-fill the contact form's project type. To change answers, edit the `KB` list at the top of `chat.js`.
- **Optional real AI:** a browser can't hold an API key safely, so AI mode uses a tiny server you control.
  1. Create a Cloudflare Worker and paste `worker/chat-worker.js`.
  2. In its settings add a secret `ANTHROPIC_API_KEY`, and a variable `ALLOWED_ORIGIN` (your site URL, e.g. `https://yoursite.com`, comma-separated; add `http://localhost:8000` to test).
  3. Add a Cloudflare rate-limiting rule on the Worker to cap usage and cost.
  4. Paste the Worker URL into `<meta name="chat-endpoint" content="">` in `index.html`, and add that URL to `connect-src` in `_headers`.
  If the Worker is unreachable, the chat falls back to the built-in answers automatically. Messages in AI mode pass through your Worker to Anthropic, so mention that in a privacy note if you publish one.

## Smarter assistant and quick menu
- **Chat:** tolerates typos ("wesbite"), suggests follow-up questions after each answer, and has a guided **Plan my project** flow. It asks service, budget (a range or any typed amount), name, email and a one-line brief, then fills in the contact form for review. Nothing is sent until the visitor ticks consent and presses Send. A "New chat" button resets it, and a small one-time nudge appears after 20 seconds (off in low-power mode).
- **Quick menu:** press Ctrl/Cmd+K (or the search button in the header) to jump to any section, start a project, toggle the theme, copy the email, open the chat or Instagram. Fully keyboard-driven.
- **Form:** project type now starts as "Choose a project type" instead of defaulting to one option, and the form suggests a type when your message mentions a website, logo, campaign or social content.

## Smooth scrolling
- No scroll-jacking: scrolling stays native. The sticky header no longer uses a blur filter (the main cause of scroll jank), measurements are cached instead of re-read every frame, and pointer effects are frame-throttled.
- Scroll-linked effects use CSS scroll/view timelines, which run off the main thread in Chrome, Edge and Safari 26+: progress bar, hero fade and drift as you leave it, heading underlines that draw in, project previews that settle from a slight zoom, and the footer wordmark that lifts into place. Other browsers keep the scroll reveals and a JS-driven progress bar. Everything switches off for reduced-motion and low-power mode.

## Animated logo
The header logo is split into its five letters. On load each letter's outline draws in like ink, then fills; the draw-in plays once per page load only. Hovering the logo sends a small wave through the letters. The large footer wordmark draws itself as you scroll to it (browsers with scroll timelines). Reduced-motion and low-power mode show the static logo.

## Cursor ring
On laptops and desktops with a mouse, your normal pointer stays visible and a thin circle follows it. The circle fills in over links and buttons, grows and shows "View" over project cards, shrinks while pressed, and sends out a small ripple on click. It is never created on phones and tablets, in reduced-motion, or in low-power mode. Its position uses transform only, and size, fill and press-shrink live on an inner circle, so clicking can never shift it. It hides when the mouse leaves the window, during drag-and-drop, and while a popup is open.

## Brand playground (hero)
The hero artwork is interactive:
- Type your brand name into the address bar: the headline, a monogram and an automatic accent colour follow it.
- Pick an accent colour (or keys 1-5), tap "Aa" or press T to cycle serif / sans / mono, press S or the shuffle button for a random combination.
- Drag the wordmark to move it and drag a corner square to resize it. With the frame focused use the arrow keys, plus/minus, and 0 to reset (double-click also resets).
- A contrast badge shows how readable the accent is on the board (for example "AAA 7.2").
- Copy the chosen style as CSS variables. Choices are remembered on the visitor's device and adapt to light and dark themes. The rest of the site stays black and white.

## Quality checks run on this build
Automated accessibility audit (axe-core) on desktop and phone, light and dark, plus the chat panel, quick menu and project dialog: no violations. Layouts checked from 320 px to 5760 px wide. Re-run the checks after any change; if you edit files that are listed in `sw.js`, bump `V` there.

## Crafts section (three tabs)
Video Editing, Website Development and Graphic Design each get their own look and mouse effects. Tabs work with the mouse, arrow keys, Home/End and deep links (`#video`, `#web`, `#graphics`). All three are interactive demos built for this site and are labelled as not client work.
- **Video:** cinematic monitor with grain, viewfinder and a flashlight that follows the mouse; a timeline you scrub by moving across it (touch: drag; keyboard: arrows/Home/End), live timecode and scene changes.
- **Web:** code that types itself while the page builds in a browser preview; switch Desktop/Tablet/Mobile (true container-query responsiveness); a dev-tools style inspector follows the mouse; the whole bench tilts toward the pointer.
- **Graphic:** bold artboard with layered shapes that drift at different depths, a painted ink trail that follows the mouse (click for a splash), toggleable layers and brush colours.
Demos pause when scrolled out of view or on another tab, and show a calm static state in reduced-motion/low-power mode. Edit the copy inside `index.html` (`#crafts`).

## Touch screens (phones and tablets)
Every mouse effect has a touch version. Where a finger cannot hover, the effect also runs itself as a gentle demo so it is always visible.
- **Cursor ring:** a ring and ripple appear under your finger on touch and tap.
- **Hero board:** drifts on its own (depth effect).
- **Video:** drag across the timeline to scrub; the "flashlight" follows touches and sweeps by itself when idle.
- **Web:** tap an element to inspect it; drag to tilt; otherwise the bench sways and the inspector tours the page.
- **Graphics:** tap for a splash; switch on "Paint" to draw with your finger (page scrolling stays normal while Paint is off); a ghost brush paints by itself when idle.
- **Project cards:** tap for the glow and tilt.
Reduced-motion and low-power mode turn the automatic parts off.

## Phones: effects switch, updates and performance
- **Effects switch:** if a phone asks for reduced motion (or data saving / a slow connection) the effects start calm. The Crafts section shows a notice with a **Play effects** button, and the footer always has **Play effects / Calm mode**. You can also add `?fx=on`, `?fx=off` or `?fx=auto` to the address. The choice is remembered on that device. Low-memory phones are no longer treated as low-power.
- **Always the latest files:** the service worker now tries the network first, and every CSS/JS link carries a version (`?v=25`). Change the number in `index.html` and the `V` in `sw.js` when you publish an update. A phone that already has the site reloads once on its own when an update arrives.
- **Lighter touch animations:** idle motion on phones uses CSS animation (no per-frame scripts), the timeline only updates when a frame changes, and the 3D bench is flattened.

## Crafts 04-06
- **Branding & Identity (SEO):** type a brand name and a one-line description; the brand card (monogram, palette from the name, tilt and shine that follow the mouse or touch) and a Google-style search preview update, with a four-point check of title and description length. Not a ranking promise.
- **AI & Automation (chatbots):** a demo chatbot with tap-to-ask questions and an automation flow (message, intent, reply or hand-off, save lead, notify team) that lights up step by step; it also runs by itself when idle.
- **Digital Marketing:** a budget slider and channel switches drive a sample funnel and a weekly chart you can scrub with the mouse or finger. All numbers are illustrative sample data and the page says so.
Deep links: `#brand`, `#ai`, `#market`. On phones and tablets the six tabs sit in two rows of three. When you publish, bump the `?v=27` numbers in `index.html` and `V` in `sw.js`.
