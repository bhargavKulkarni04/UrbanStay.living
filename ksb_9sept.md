# ==============================================================================
# 🕉️ URBANSTAY — MASTER SYSTEM PLAYBOOK & PRODUCTION LEDGER (KSB_9SEPT.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# COMPANY: UrbanStay Technologies Pvt. Ltd. (urbanstay.living)
# FOUNDER & PRODUCT ARCHITECT: Bhargav S Kulkarni (NoBrokerHood Monetization & Revenue Strategy)
# PILOT ANCHOR PARTNER: Arun (Owner of 3 PGs in Bengaluru + 40-50 PG Network in BTM/HSR)
# DATE OF RECORD: 9 September 2026
# CURRENT MASTER BUILD: Build v56 (urbanstay_v56.apk / version: 1.0.64+65)
# ==============================================================================

---

## 📱 1. CURRENT LIVE PRODUCTION STATUS

* **Current Master APK**: **`urbanstay_v56.apk`** (55.9 MB)
* **Owner Suite Status**: ✅ **COMPLETE** — All 14 owner modules fully built and verified in Flutter.
* **Tenant Suite Status**: 🟢 **IN PROGRESS** — Module 1 (`tenant_checkin_screen.dart`) 100% Complete & Built into Release APK!

---

## ✅ 2. OWNER SIDE — COMPLETED MODULES (14 Features)

| # | Module | Screen File | Status |
| :--- | :--- | :--- | :--- |
| 1 | App Walkthrough | `onboarding_walkthrough_screen.dart` | ✅ Done |
| 2 | Phone OTP Login | `phone_verify_screen.dart` | ✅ Done |
| 3 | Role Selector | `role_selector_screen.dart` | ✅ Done |
| 4 | Property Setup Wizard | `owner_setup_screen.dart` | ✅ Done |
| 5 | Owner Dashboard | `owner_dashboard_screen.dart` | ✅ Done |
| 6 | Rooms & Bed Matrix | `owner_rooms_screen.dart` | ✅ Done |
| 7 | UPI Approvals | `owner_approvals_screen.dart` | ✅ Done |
| 8 | Rent Collection | `owner_rent_collection_screen.dart` | ✅ Done |
| 9 | Complaints | `owner_complaints_screen.dart` | ✅ Done |
| 10 | Expenses & P&L | `owner_expenses_screen.dart` | ✅ Done |
| 11 | Staff Directory | `owner_staff_screen.dart` | ✅ Done |
| 12 | Settings (6 Views) | `owner_settings_screen.dart` | ✅ Done |
| 13 | SaaS Billing | `owner_saas_billing_screen.dart` | ✅ Done |
| 14 | Reports & Analytics | `owner_reports_screen.dart` | ✅ Done |

---

## 🎯 3. TENANT SIDE — EOM (30 SEPT) DELIVERY PLAN

### Phase Transition: Owner OS → Tenant App

The Owner Operating Suite is complete. Now building the **Tenant-Facing App** — the resident's daily-use interface for rent, complaints, and communication with the PG owner.

---

### 3.1 Existing Reference (HTML Prototype)

The `ProductionCode/tenant_checkin.html` contains a fully designed 3-step tenant check-in flow:
* **Step 1 — User Details**: PG Code, Full Name, Gender, DOB, Move-In Date, WhatsApp (+91), Email, Guardian Name, Permanent Address (Optional), Aadhaar Number + Front/Back Photo Upload, Live Selfie.
* **Step 2 — Work & Study**: Occupation Type (Professional / Student / Job Seeker), Company/College Name, Office/Campus Location, Work/Student ID Upload.
* **Step 3 — Room & Stay**: Sharing Type (1-Share to 6-Share), Floor Selection (Ground to 5+), Dynamic Room Grid per floor, Bed Identifier.
* **Step 4 — Digital Resident Pass**: Completion screen showing Room, Floor, Bed, PG Code, Resident Name with "Active Resident" badge.

---

### 3.2 New Tenant Modules to Build (6 Modules)

```
features/
├── tenant_checkin/              ← 🆕 P0 (Week 1: 10-14 Sept)
│   └── presentation/screens/
│       └── tenant_checkin_screen.dart
│       Port the 3-step form from tenant_checkin.html to Flutter.
│       Entry point after "I am a Resident" role selection.
│
├── tenant_dashboard/            ← 🆕 P0 (Week 1-2: 14-17 Sept)
│   └── presentation/screens/
│       └── tenant_dashboard_screen.dart
│       Home screen: PG name & room info, Rent status card
│       (Green = Paid / Red = Due), Quick action buttons.
│
├── tenant_rent/                 ← 🆕 P0 (Week 2: 17-20 Sept)
│   └── presentation/screens/
│       └── tenant_rent_screen.dart
│       Current month dues (Rent + Electricity + Extras).
│       Payment history with past months.
│       HRA-compliant PDF rent receipt download.
│
├── tenant_complaints/           ← 🆕 P1 (Week 3: 21-24 Sept)
│   └── presentation/screens/
│       └── tenant_complaints_screen.dart
│       Raise complaint: Photo + Category (Plumbing/Electrical/Cleaning).
│       Track status: Submitted → In Progress → Resolved.
│
├── tenant_notices/              ← 🆕 P1 (Week 3: 24-26 Sept)
│   └── presentation/screens/
│       └── tenant_notices_screen.dart
│       Owner-pushed announcements (water cut, WiFi, events).
│       Read/Unread status indicators.
│
└── tenant_profile/              ← 🆕 P2 (Week 4: 27-30 Sept)
    └── presentation/screens/
        └── tenant_profile_screen.dart
        Personal details, KYC documents view, Room & lease info.
        Leave PG (30-day notice trigger), Logout.
```

---

### 3.3 Week-by-Week Delivery Timeline

| Week | Dates | Deliverables | Priority |
| :--- | :--- | :--- | :--- |
| **Week 1** | 10 Sept | `tenant_checkin_screen.dart` (3-step onboarding + Digital Pass) | P0 | ✅ **Done (Build v55)** |
| **Week 1-2** | 11 – 15 Sept | `tenant_dashboard_screen.dart` (Home screen with rent status) | P0 | 🟡 Next Up |
| **Week 2** | 17 – 20 Sept | `tenant_rent_screen.dart` (Dues, history, HRA receipt) | P0 |
| **Week 3** | 21 – 24 Sept | `tenant_complaints_screen.dart` (Raise & track maintenance) | P1 |
| **Week 3** | 24 – 26 Sept | `tenant_notices_screen.dart` (Owner announcements) | P1 |
| **Week 4** | 27 – 30 Sept | `tenant_profile_screen.dart` (Profile, KYC, Leave PG) | P2 |

---

### 3.4 Navigation Flow (Role Selector → Tenant Journey)

```
role_selector_screen.dart
    │
    ├── "I am a PG Owner" → owner_setup_screen → owner_dashboard_screen
    │
    └── "I am a Resident" → tenant_checkin_screen (first time, enter PG Code)
                           → tenant_dashboard_screen (returning user)
                                ├── Rent & Payments
                                ├── Raise Complaint
                                ├── Notices
                                └── Profile & Settings
```

---

### 3.5 Architecture Rules for Tenant Build

1. **Zero changes to any `owner_*` module.** Owner code is frozen and production-ready.
2. **Same `core/theme/` (app_colors.dart + app_typography.dart)** shared between Owner and Tenant.
3. **Same folder pattern**: `tenant_feature/presentation/screens/screen.dart`.
4. **Same design system**: UrbanStay brand green (`#08A63F`), Outfit font, white cards, hairline borders. No dark mode, no neon, no vibe-coding.
5. **PG Code is the bridge**: Tenant enters owner's unique property code to link to the correct PG. No browsing, no searching.

---

## 💼 4. BUSINESS DEVELOPMENT UPDATE (9 SEPT 2026)

### Shelterly PG Connection (Sahil Sharma — Co-Founder)
* **Who**: Shelterly is a PG **marketplace/aggregator** platform (NOT a PG owner). Incorporated August 2026, Bengaluru.
* **What they do**: List PG properties on their website for tenant discovery. No operational management.
* **Network**: Claims 150+ PG listings across BTM Layout (14), Koramangala (13), Whitefield (12).
* **Conversation Summary**: Sahil expressed interest in UrbanStay for his PG network. Wants customizable pricing. Bhargav proposed a 10-15 PG pilot first before scaling.
* **Strategy**: Use Shelterly as a **referral/distribution channel** (door opener to PG owners), NOT as a business partner. Get direct introductions to actual PG owners. Simple referral fee structure.
* **Next Step**: Sahil connecting again on 10th September. Goal: Get 5-10 PG owner WhatsApp contacts for direct demo.

---

## 🛡️ 5. PRODUCTION STABILITY & ENTERPRISE TELEMETRY (ZERO VIBE-CODING LAWS)

### 5.1 Real-World Reliability Standards (Budget Android Hardware)
* **Target Environment**: Indian PG residents primarily use ₹10k–₹15k budget Android smartphones (Redmi, Realme, Samsung M-series, Vivo) with congested, intermittent PG Wi-Fi.
* **Non-Negotiable Stability**: The app must never crash, drop frames, or display unhandled red exception screens during financial moments of truth (paying rent, generating HRA receipts).
* **Offline-First & Graceful Degradation**: Cached data displays with an "Offline / Reconnecting" pill if Wi-Fi drops; local PDF receipts remain downloadable from local cache even with zero connectivity.

---

### 5.2 Enterprise Multi-Tenant Observability Architecture
To pinpoint issues across multiple PG buildings and residents without manual guesswork:

1. **Mobile Observability (Sentry Flutter SDK)**:
   * Initializes in `main.dart` and attaches an identity passport on login:
     * `pg_id` & `pg_name` (e.g., `PG_BALAJI_BTM_01`, Sri Balaji Luxury PG)
     * `user_id` / masked phone number
     * `room_bed` (e.g., Room 204, Bed B)
     * `device_model` & OS version
   * Automatically captures native OS crashes, memory kills, and unhandled Flutter exceptions with full stack traces.
2. **End-to-End Correlation IDs (`X-Correlation-ID`)**:
   * Every request initiated by the Flutter client generates a unique UUID.
   * Passed from **Flutter Client ➔ Fastify Backend ➔ Supabase Database**.
   * Any failure across the pipeline can be located instantly by searching that single correlation ID.
3. **Database & Telemetry via Supabase**:
   * Multi-tenancy strictly enforced via **Supabase Row Level Security (RLS)**.
   * Query performance, RLS rejections, and server-side errors tracked via Supabase Logflare.
4. **1-Tap Self-Serve Resident Diagnostics**:
   * "Report Issue" button inside the tenant app auto-attaches property ID, room number, app build number, and the last 20 network logs so residents never have to manually explain where or who they are.

---

### 5.3 Mandatory 4-Tier Release Pipeline (Pre-Store Verification)

```
┌─────────────────────────────────────────────────────────────┐
│                 URBANSTAY RELEASE CRITERIA                  │
├─────────────────────────────────────────────────────────────┤
│ 1. Static Analysis  │ zero flutter analyze warnings/lints   │
│ 2. Unit Tests       │ rent ledger, tax calc & PDF tests     │
│ 3. Build Validation │ Release APK & AppBundle compile clean │
│ 4. Pilot Dogfooding │ 5–10 real tenants in Arun's PGs       │
└─────────────────────────────────────────────────────────────┘
```

1. **Static Analysis**: `flutter analyze` must pass with 0 errors and 0 warnings.
2. **Automated Unit & Widget Tests**: Verification for rent calculation, penalty math, and PDF receipt generation.
3. **Release Compilation**: Clean release builds for `urbanstay_v*.apk` and `.aab`.
4. **Pilot Dogfooding**: Staged rollout to 5–10 real tenants in Arun's BTM Layout PGs before any public Google Play / Apple App Store release.

---

### 5.4 Master Build Tracker: Build v57 (Tenant Check-in Flex Polish & Dynamic Rent)
* **Date & Time**: 10 September 2026, 22:49 IST
* **Artifact**: `urbanstay_v57.apk` (56.0 MB)
* **Version**: `1.0.65+66`
* **Changes Delivered**:
  1. **Moved PG Code Input**: Relocated from Step 1 personal details into Tenant Create Account on `role_selector_screen.dart` with uppercase auto-formatting.
  2. **Universal Flex Alignment (`Expanded`)**: Wrapped all selectable cards in `Expanded` across 3-column rows (Gender, Occupation, Sharings, Floors) and 4-column row (Rooms), ensuring mathematically identical symmetric margins and 100% responsive width on all Android & iOS devices.
  3. **Strict Numeric Formatter Locking**: Implemented `FilteringTextInputFormatter.digitsOnly` for WhatsApp Mobile (10 digits), Aadhaar (12 digits with 4-4-4 spacing), Pincode (6 digits), and Rent/Deposit inputs.
  4. **Dynamic Sharing Rent & Deposit Card**: Integrated dynamic rent and deposit inputs directly underneath the selected sharing type (modeled 1-to-1 after `owner_setup_screen.dart`).
  5. **Removed `+ Custom` Room Option**: Room selection strictly displays standard floor-based rooms (`G-01..G-04`, `101..104`, etc.) with zero manual room button.

---

*This document is the permanent single source of truth for UrbanStay Build v57.* 🕉️✨


