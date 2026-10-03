URBANSTAY — /owners + /tenants PAGES
====================================

FILES
-----
owners.html            Owners page (now has a "Tenants" link in the nav,
                       mobile menu and footer).
tenants.html           NEW. Resident-facing page.
styles.css             Shared tokens, nav, footer, buttons.
owners.css             Hero, three-column strip and feature-row layout.
                       tenants.html reuses it, so keep it loaded.
tenants.css            NEW. Only the rent section (UPI <-> panel <-> cash).
img/                   Owner shots (dashboard.webp ...) and tenant shots
                       (t-dashboard.webp, t-upi.webp, t-cash.webp,
                       t-notice.webp, t-food.webp, t-laundry.webp,
                       t-moveout.webp).
preview-owners.html    Single-file previews. Open directly in a browser.
preview-tenants.html   Do NOT deploy these.

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
