URBANSTAY — /owners + /tenants + /pricing PAGES
===============================================

FILES
-----
owners.html            Owners page (now has a "Tenants" link in the nav,
                       mobile menu and footer).
tenants.html           NEW. Resident-facing page.
styles.css             Shared tokens, nav, footer, buttons.
owners.css             Hero, three-column strip and feature-row layout.
                       tenants.html reuses it, so keep it loaded.
tenants.css            Only the rent section (UPI <-> panel <-> cash).
pricing.html           NEW. Pricing page.
pricing.css            NEW. Styles for the pricing page only.
img/                   Owner shots (dashboard.webp ...) and tenant shots
                       (t-dashboard.webp, t-upi.webp, t-cash.webp,
                       t-notice.webp, t-food.webp, t-laundry.webp,
                       t-moveout.webp).
preview-owners.html    Single-file previews. Open directly in a browser.
preview-tenants.html   Do NOT deploy these.
preview-pricing.html

STYLESHEET ORDER on tenants.html: styles.css -> owners.css -> tenants.css

TENANTS PAGE
------------
Hero (resident home screen), three-column strip, then:
  Rent section   UPI phone | beam | receipt panel | beam | cash phone
                 Beams are inline SVG: a gradient line, soft glow, a port
                 ring on the phone, a head on the panel and a light pulse
                 travelling along it (hidden for reduced-motion users).
                 The panel is a white card with a soft green glow, a Paid -> Owner
                 approves -> Receipt track and a sample rent receipt.
                 Under 900px it stacks: UPI phone, beam down, panel,
                 beam up, cash phone.
  Notice board / Mess menu / Laundry booking / Move-out notice
                 Same alternating rows as the owners page.

TENANT SCREENSHOTS
------------------
Each phone was cut out of its original screenshot (white background removed
with a halo-free edge; the dark-background home screen masked to the exact
rounded outline of the frame), then scaled to one height and centred on an
820x1540 transparent canvas. Every phone renders at the same size.
Replacing one? Keep that canvas: phone 1500px tall, centred, transparent.

LINKS TO CHECK
--------------
"Get the app", "Ask your PG to join", Login and footer links point at "#".


PRICING PAGE
------------
Stylesheet order: styles.css -> owners.css -> pricing.css

  Hero           Price on the left, live calculator on the right.
                 Owners type a bed count (or use +/-, the slider, or the
                 20/50/100/250 chips). Monthly, yearly, per-bed-per-day and
                 "share of one bed's rent" update as they type. The rent used
                 for that share is editable (default Rs 8,500).
                 At 300+ beds a note appears pointing to Contact sales.
                 The price lives in ONE place: PRICE = 15 in the script at the
                 bottom of pricing.html. SALES_AT = 300 sets the sales note.
  Everything included   Four feature groups.
  How it compares       Table vs registers/WhatsApp and rent-collecting apps.
                        Scrolls sideways on phones, first column pinned.
  Contact sales  Copy left, form right. Validates name + 10-digit phone and
                 shows a thank-you state. NOT CONNECTED TO A BACKEND YET -
                 hook the submit in the script up to your CRM, email or
                 a Google Form before going live. The bed count from the
                 calculator is copied into the form automatically.
  FAQ            Six questions, click to open.
  Closing CTA

LINKS: "Pricing" in every nav/footer now goes to pricing.html and
"Contact" goes to pricing.html#sales.

TO CONFIRM BEFORE LAUNCH (pricing page)
  - "We'll call within one working day" (form + FAQ) - is that your promise?
  - "300+ beds" as the custom-pricing threshold.
  - "Free for residents" (also on the tenants page).
  - Not on the page yet: GST, free trial, minimum bill, whether empty beds
    are billed, yearly discount. Add to the FAQ once decided.
