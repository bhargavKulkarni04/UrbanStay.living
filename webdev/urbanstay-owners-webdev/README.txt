URBANSTAY — /owners PAGE
========================

WHAT'S IN HERE
--------------
owners.html              The page. Drop this next to your existing index.html.
owners.css               Styles for this page only.
styles.css               Your shared stylesheet (tokens, nav, footer, buttons).
                         Same file you already have — included so the folder
                         runs on its own. If yours is newer, keep yours.
img/                     The nine app screenshots, 800x1540 WebP each.
preview-standalone.html  Everything inlined into one file. Open it directly in
                         a browser to preview — no server, no folder needed.
                         This is for previewing only. Do NOT deploy it.


WHERE THE FILES GO
------------------
  /
  |- index.html          (your home page, untouched)
  |- owners.html         <- new
  |- styles.css          (shared)
  |- owners.css          <- new
  |- img/
     |- dashboard.webp   property.webp   daywise.webp
     |- swap.webp        staff.webp      expenses.webp
     |- food.webp        announce.webp   controls.webp


ORDER OF THE STYLESHEETS MATTERS
--------------------------------
owners.html loads styles.css FIRST, then owners.css. The second file overrides
the shared tokens for this page only. Don't swap them.


LINKS THAT NEED CHECKING
------------------------
owners.html points at index.html for Features / Pricing / Contact, and at "#"
for Login, Get Started and the footer links. Repoint those to your real URLs
before going live.


THE PAGE
--------
Hero (dashboard) then eight feature sections, alternating left/right:

  1. Multiple properties      5. Expenses & P&L
  2. Day-wise rent            6. Food & mess menu
  3. Room shift & swap        7. Announcements
  4. Staff & payroll          8. Tenant controls

Three layouts: desktop (900px+), tablet (600-899px), phone (under 600px).
On every width all the words sit in one column and the phone sits in the
other. Nothing runs above or across a screenshot. Every phone on the page
renders at exactly the same size.

No build step. No framework. No GSAP — the scroll reveal runs on
IntersectionObserver with a timed fallback, so nothing can stay invisible.
The only external request is the Outfit webfont from Google Fonts.


IF YOU REPLACE A SCREENSHOT
---------------------------
Export it on the same 800x1540 canvas: phone trimmed to 1500px tall, centred,
on a transparent background. Every card is dimensionally identical because every image is the
same size — a differently shaped file will break that.
