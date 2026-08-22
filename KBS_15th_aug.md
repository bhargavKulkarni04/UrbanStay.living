# UrbanStay — Knowledge Base & Architecture Blueprint
**Date**: 15th August 2026  
**Document Version**: 2.0 (Independence Day Release)  
**Author**: Bhargav S Kulkarni (Founder) & Antigravity (Engineering Pair)

---

## 1. Executive Summary & Market Sizing

UrbanStay is a **B2B2C Vertical SaaS + Managed Hyperlocal Marketplace** platform modernizing India’s $20 Billion unorganized PG & Co-Living sector.

```
                          ┌───────────────────────────┐
                          │   URBANSTAY (THE ENGINE)  │
                          └─────────────┬─────────────┘
                                        │
        ┌───────────────────────────────┼───────────────────────────────┐
        ▼                               ▼                               ▼
  1. B2B (PG OWNERS)             2. 2C (PG TENANTS)            3. HYPERLOCAL ADS
  • Model: B2B SaaS Sub          • Model: 100% Free Super-App  • Model: Brand Sponsorships
  • Price: ₹699/mo (Micro PG)    • Utility: Rent receipts,     • Brands: Cult.fit, Zepto,
  • Value: 0% UPI + WhatsApp       gate passes, food menu,       ACT Wi-Fi, Porter
    automation                     maintenance tickets           Movers & Packers
```

### Market Sizing Matrix:
* **India PG Market TAM**: **$18 Billion to $20+ Billion** (~₹1.65 Lakh Crores).
* **Target Audience**: **37 Million (3.7 Crore)** young migrants & IT techies.
* **Bangalore Alone (SAM)**: **Over 18,000+ PGs** housing **6,00,000+ tech tenants**.

---

## 2. Work Accomplished Today (15th August 2026)

### 2.1 Dedicated Phone Verification Screen (`phone_verify.html`)
* **Clean Open Header**:
  * `Verify your` in Ink Black (`#111111`, font `'Outfit'`).
  * `Phone number` in Vibrant Emerald Green (`#08A63F`, font `'Outfit'`).
  * Top-right `help` support link.
* **Pure Phone Input**:
  * Country code pill `🇮🇳 +91` + 10-digit mobile number input with green active focus glow.
* **1-Line Terms Agreement**:
  * Compact, zero-friction single line: *"By continuing, you agree to our Terms & Privacy Policy."*
* **Interactive 6-Digit OTP Verification State**:
  * Slides in smoothly upon clicking `Continue →`.
  * Open typography phone display: `We sent a 6-digit verification code to +91 98765 43210 [Edit]`.
  * 6 individual auto-advancing digit input boxes (`[ _ ] [ _ ] [ _ ] [ _ ] [ _ ] [ _ ]`).
  * Live 28-second countdown timer + Resend button.
  * Direct transition to Role Setup upon verification.
* **Indian Heritage Skyline Marquee**:
  * Integrated **`Scrool Animatein fit.png`** in a continuous horizontal right-to-left scrolling carousel.
  * Scaled to **`215px` grand height** and anchored cleanly to the bottom.
* **Footer Signature**:
  ```
  built with love in,
  Bengaluru, Karnataka
  ```
* **Strict 1-Screen Mobile Viewport (`100dvh`)**:
  * Zero vertical scroll needed; all components fit 100% inside any mobile viewport.

---

### 2.2 End-to-End 3-Screen Live Sequence

```
┌───────────────────────────┐     ┌───────────────────────────┐     ┌───────────────────────────┐
│ 1. APP OVERVIEW           │     │ 2. PHONE VERIFICATION     │     │ 3. ROLE SWITCHER & SETUP  │
│ (app_preview.html)        ├───► │ (phone_verify.html)       ├───► │ (auth_preview.html)       │
│ • Split Phone Mockup      │     │ • Phone Number Input      │     │ • Curvy S-Curve Switcher  │
│ • 17+ Service Marquee     │     │ • 6-Digit Auto-OTP        │     │ • Tenant vs Owner Flow    │
│ • [ Continue → ] Button   │     │ • India Skyline Marquee   │     │ • Room Matrix / Check-in  │
└───────────────────────────┘     └───────────────────────────┘     └───────────────────────────┘
```

---

## 3. Financial Breakdown & Scale Economics

### 3.1 WhatsApp Meta Cloud API Economics
* **Meta 24-Hour Session Window**: Meta charges **₹0.35 once per 24-hour conversation**, NOT per message. Multiple rent reminders and receipt links sent within 24 hours cost **only 35 paise total**.
* **Free Quota**: Meta provides **1,000 free sessions every month** (covers your first 10–15 PGs at ₹0 cost).

### 3.2 Pure SaaS Financial Milestone Chart (PLAN-02: Micro PG @ ₹699/mo)

```
Scale (PGs)     Monthly Revenue (TL)     Operating Costs     Monthly Net Profit (BL)     Annual Take-Home (ARR)
─────────────────────────────────────────────────────────────────────────────────────────────────────────────
5 PGs           ₹3,495 / mo              ₹0 (Free Tier)      ₹3,345 / mo                 ₹40,140 / yr
10 PGs          ₹6,990 / mo              ₹0 (Free Tier)      ₹6,690 / mo                 ₹80,280 / yr
25 PGs          ₹17,475 / mo             ₹750                ₹16,725 / mo                ₹2.00 Lakhs / yr
50 PGs          ₹34,950 / mo             ₹1,500              ₹33,450 / mo                ₹4.01 Lakhs / yr
100 PGs         ₹69,900 / mo             ₹3,000              ₹66,900 / mo                ₹8.02 Lakhs / yr
150 PGs         ₹1,04,850 / mo           ₹4,500              ₹1,00,350 / mo              ₹12.04 Lakhs / yr ⭐ (₹1L/mo)
250 PGs         ₹1,74,750 / mo           ₹7,500              ₹1,67,250 / mo              ₹20.07 Lakhs / yr
500 PGs         ₹3,49,500 / mo           ₹15,000             ₹3,34,500 / mo              ₹40.14 Lakhs / yr ⭐ (₹40L/yr)
```

---

## 4. Architectural Decisions & Agreed Roadmap

### 4.1 Single Unified Codebase (No 2-App Split)
* Unlike RentOk’s outdated 2-app legacy split, UrbanStay operates on **1 Single App** with smart role routing (`role: 'owner'` vs `role: 'tenant'`).

### 4.2 Agreed Future Roadmap:
1. **Screen 4: Owner 4-Step Onboarding Stepper Wizard (`owner_setup.html`)**:
   * *Step 1*: Owner Identity (Legal Name, Phone, WhatsApp).
   * *Step 2*: PG Location & Ad Micro-Market (Brand Name, 6-digit Pincode, Landmark, City).
   * *Step 3*: Room & Sharing Matrix (Floors, Rooms, 1–6 Sharing, Base Rent, Deposit).
   * *Step 4*: Rules Auto-Pilot (Rent Due Day, Grace Period, Late Fee, 0% UPI VPA).
2. **Screen 5: Tenant Check-In & Code Resolver (`tenant_checkin.html`)**:
   * Resolves PG Name from Unique Code (e.g. `[ SM-101 ]`).
   * 2-Tap 3-Digit Room Selector (`Floor 2` $\rightarrow$ `Room 204` $\rightarrow$ `Bed A`).
   * Aadhaar Card KYC photo upload.
   * Auto-generates 1-page official Digital Stay Certificate PDF.
3. **Backend Integration (Supabase PostgreSQL)**:
   * Realtime WebSockets for <200ms owner notification sync.
   * Row-Level Security (RLS) for tenant data protection.
4. **Expo React Native Mobile App**:
   * Packaging HTML/CSS design tokens into React Native for physical Android / iOS testing via Expo Go.

---

## 5. Technical Scalability & Zero-Crash Architecture (1,000+ Concurrent Users)

### 5.1 The 4 Infrastructure Shields

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. POSTGRESQL ENTERPRISE ENGINE (Supabase Database Layer)                   │
│    • Handles 5,000 to 10,000 queries per second (QPS) with ease.            │
│    • 1,000 active PG tenants generate ~15-20 QPS (Under 1% database load).   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. ERLANG / ELIXIR WEBSOCKETS (The "WhatsApp Architecture")                 │
│    • Built on the BEAM virtual machine (same tech powering WhatsApp's 2B    │
│      users with 50 engineers).                                              │
│    • Delivers rent payment alerts to the owner's phone in <0.15 seconds.    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. PGBOUNCER CONNECTION POOLING (The High-Traffic Bouncer)                  │
│    • Prevents server choking during 1st-of-the-month rent day spikes.       │
│    • Queues 1,000 simultaneous user requests into fast sequential pipelines │
│      without running out of memory.                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. CLOUDFLARE EDGE CDN CACHING                                              │
│    • Static assets, Indian skyline images, and UI fonts cached in Bangalore │
│      edge nodes. Loads the screen in 10ms with zero main-server load.       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Zero-Crash Defensive Engineering Rules
1. **Button Spam Protection**: Interactive buttons lock instantly (`disabled={loading}`) upon tap, preventing duplicate API spam when impatient users double-click.
2. **ACID Row Locks**: If two tenants attempt to book the exact same bed (e.g. Room 204 Bed A) at the exact same second, PostgreSQL locks the row, completes the first booking, and shows a friendly alert to the second with **zero application crashes**.
3. **Safe Null-Guards**: Strict defensive fallbacks (`user?.name ?? 'Resident'`) across all data pipelines to prevent unhandled runtime exceptions.

---

*Built with precision and love in Bengaluru, Karnataka.* 🚀
