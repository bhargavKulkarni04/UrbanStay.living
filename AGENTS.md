# ==============================================================================
# 🕉️ URBANSTAY — MASTER SYSTEM RULES & PERMANENT PROJECT MEMORY (AGENTS.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# THIS FILE IS THE PERMANENT BRAIN OF URBANSTAY.
# IT IS AUTOMATICALLY LOADED INTO EVERY AI AGENT SESSION IN THIS WORKSPACE.
# NEVER FORGET ANY OF THESE RULES, FOUNDER CONTEXT, DESIGN TOKENS, OR WORKFLOWS.
# ==============================================================================

---

## 👤 1. FOUNDER PROFILE & MISSION

* **Founder**: **Bhargav S Kulkarni**
  * Bengaluru native,DBIT graduate.
  * Currently working on Monetization & Revenue Strategy at **NoBrokerHood**.
  * Deep insider knowledge of real-world Indian property management, billing friction, and landlord psychology.
* **Company & Brand**: **UrbanStay Technologies Pvt. Ltd.** (`urbanstay.living`, MSME Registered, Class 9 Trademark #7920292).
* **Pilot Anchor Partner**: **Arun** (Owns 3 PGs in Bengaluru + connected network of 40–50 local PG owners in BTM Layout, HSR & Koramangala).
* **Core Mission**: Build India’s #1 dedicated, high-margin **PG & Hostel Operations Operating System** (NOT a broker or aggregator like OYO/Zolo).

---

## 🎯 2. WHAT WE WANT TO ACHIEVE & THE FUTURE VISION

### The Core Vision:
Transform messy, unorganized Indian PG/hostel operations into a clean, automated, zero-stress digital machine.

### Key Milestones & Roadmap:
1. **Phase 1 (Completed)**: Complete Owner Operating Suite & Minimalist B2B SaaS Billing in `ProductionCode/`.
2. **Phase 2 (Current Focus)**: Zero-Lag **Flutter Mobile Application** for iOS & Android with instant 50ms offline PDF rent receipts and 0% direct bank UPI settlement.
3. **Phase 3**: Zero-App Reception Desk QR Standee Check-In (`tenant_checkin.html`) with instant Aadhaar OCR, live selfie, and digital room keycard pass.
4. **Phase 4 (Scale)**: Expand to 10,000+ PG buildings across Bengaluru, Pune, Hyderabad, Kota, and Delhi NCR with 90%+ gross margin SaaS cashflow.

---

## 🛡️ 3. WHAT REAL PG OWNERS CARE ABOUT (GROUND TRUTH)

Real Indian PG owners do NOT care about broker gimmicks or complicated portals. They care strictly about:
1. **0% Transaction Fee (Direct Bank UPI)**: Money goes straight from tenant GPay/PhonePe into the owner's personal HDFC/SBI bank account with ₹0 gateway cut.
2. **Zero Empty Beds Pipeline**: 30-day notice period tracking to fill beds before the tenant vacates.
3. **Automated WhatsApp Rent Chaser**: Automated polite WhatsApp dues reminders with 1-tap UPI payment links.
4. **Deposit Damage Deductions**: Deducting room damage charges from security deposits before checkout with photo proof.
5. **Food Mess Headcount**: Stopping cook ration wastage by tracking daily breakfast/lunch/dinner headcount.
6. **Warden Cash Audit**: Preventing on-ground staff from pocketing cash collections.

---

## 🎨 4. STRICT DESIGN SYSTEM & AESTHETIC LAWS (ZERO VIOLATIONS)

> **CRITICAL RULE**: STRICTLY FORBIDDEN to create artificial dark/black cards, neon glows, or arbitrary "vibe-coded" gradients. The UI must look like a high-end, clean, executive enterprise product (modeled after Stripe, Linear, and Apple).

### Verified Design Tokens:
| Token | Hex Value | Exact Usage |
| :--- | :--- | :--- |
| **`--green`** | `#08A63F` | Primary brand accents, badges, success checks, action highlights |
| **`--green-dark`** | `#068237` | Button text on white, active tab headers, verified badges |
| **`--green-light`**| `#EBF8EE` | Badge backgrounds, verified icons, avatar backgrounds |
| **`--green-tint`** | `rgba(8, 166, 63, 0.08)` | Subtle card accents & hover tints |
| **`--ink`** | `#111111` | Primary headers, deep typography, primary action CTA buttons |
| **`--muted`** | `#6B7280` | Subtitles, metadata, timestamps, secondary labels |
| **`--border`** | `#E5E7EB` | Hairline card borders, input borders, divider lines |
| **`--bg-page`** | `#F4F6F9` | Canvas background (clean soft light-gray) |
| **`--card-bg`** | `#FFFFFF` | Pure white elevated cards (never dark, never neon) |
| **`--font`** | `'Outfit', sans-serif` | Google Font (`400` body, `600/700` bold, `800/900` numbers) |
| **`--max-w`** | `420px - 440px` | Centered mobile app viewport container |

---

## 📱 5. CHRONOLOGICAL SCREEN ROADMAP (SCREEN-BY-SCREEN)

When building or translating screens, ALWAYS proceed in this exact verified sequence:

1. **`overview sample APP.html`** *(Screen 1)*: App Onboarding Walkthrough (4-step carousel, animated headlines, green gradient Continue CTA).
2. **`phone_verify.html`** *(Screen 2)*: Phone Number Login with India `+91` flag and 6-digit OTP verification.
3. **`auth_preview.html`** *(Screen 3)*: Role Selector ("I am a PG Owner" vs "I am a Resident / Tenant").
4. **`owner_setup.html`** *(Screen 4)*: 4-Step Property Onboarding Wizard (Beds, Floors, Direct Bank UPI, Rules).
5. **`owner_dashboard.html`** *(Screen 5)*: Owner Command Center (Logo lockup, Live 31/35 Beds Hero, 8 Quick Actions, Plan/Pay Tab).
6. **`owner_rooms.html`** *(Screen 6)*: Room & Bed Matrix (Floor filters, KYC Aadhaar, Damage Deductions).
7. **`owner_approvals.html`** *(Screen 7)*: 0% Direct UPI Verification Hub (UTR verification & 1-tap PDF Receipt dispatch).
8. **`owner_rent_collection.html`** *(Screen 8)*: Rent Dues, WhatsApp Chaser & Warden Cash Audit.
9. **`owner_complaints.html`** *(Screen 9)*: Maintenance Ticketing (Photo proof & Plumber/Electrician assignment).
10. **`owner_expenses.html`** *(Screen 10)*: Operating Costs, Grocery Ration & Monthly P&L Ledger.
11. **`owner_staff.html`** *(Screen 11)*: Staff Directory, Warden Roles & Salary Approvals.
12. **`owner_settings.html`** *(Screen 12)*: 6 Master Subviews & 15 Edit Sheets (Stay rules, UPI setup, Security).
13. **`owner_saas_billing.html`** *(Screen 13)*: Minimalist B2B SaaS Bed Licensing (₹899/mo + GST, Razorpay SDK).
14. **`tenant_checkin.html`** *(Screen 14)*: Reception QR Standee Check-In (Aadhaar OCR, selfie & digital pass).
15. **`tenant_portal.html`** *(Screen 15)*: Resident Self-Service Hub (0% UPI Rent Pay & HRA-stamped PDF receipts).

---

## ⚡ 6. FULL-STACK TECHNICAL ARCHITECTURE

```
┌──────────────────────────────────────────────────────────────┐
│                    URBANSTAY FULL-STACK STACK                │
├──────────────────────┬───────────────────────────────────────┤
│ Frontend (Mobile)    │ Flutter (Dart + Impeller Engine)      │
│                      │ • 60/120fps locked on budget Android  │
│                      │ • 50ms offline PDF rent receipts      │
├──────────────────────┼───────────────────────────────────────┤
│ Backend API          │ Node.js (Fastify / Express)           │
│                      │ • Meta WhatsApp Cloud API webhooks    │
│                      │ • Razorpay subscription webhooks      │
├──────────────────────┼───────────────────────────────────────┤
│ Database             │ PostgreSQL (Supabase) + Redis Cache   │
│                      │ • Relational financial ledgers        │
│                      │ • Row Level Security (RLS) multi-tenancy│
├──────────────────────┼───────────────────────────────────────┤
│ Zero-App Web Portal  │ Lightweight HTML5/CSS3/Vanilla JS     │
│                      │ • Reception QR Standee Check-In       │
└──────────────────────┴───────────────────────────────────────┘
```

---

## 💰 7. B2B SAAS UNIT ECONOMICS & PRICING RULES

* **Micro / Single PG Scale ($\le$ 35 Beds)**: **`₹899 / month`** (or ₹8,990/year with 20% discount).
* **Mid Scale PG (36 to 100 Beds)**: **`₹1,999 / month`** (or ₹19,990/year).
* **Multi-PG Network Hub (101 to 500 Beds)**: **`₹9,999 / month`** (or ₹99,990/year).
* **Enterprise (500+ Beds)**: **`₹20 / bed / month`**.
* **Taxes**: 18% GST itemized under **SAC Code `998315` (Software as a Service)**.
* **Apple & Google Play Store Compliance**: Strict compliance with Apple Guideline 3.1.2/3.1.3(e) (Multiplatform B2B SaaS) with explicit 24-hour auto-renewal disclosures and 7-day refund guarantee.

---

*This document is the permanent single source of truth for UrbanStay. All agents must adhere to it unconditionally.* 🕉️✨
