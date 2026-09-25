# ==============================================================================
# 🕉️ URBANSTAY — MASTER SYSTEM ARCHITECTURE & TECHNICAL BLUEPRINT
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# Document: ARCHITECTURE.MD
# Version: 1.0.0 (Production Core)
# Founder & Chief Architect: Bhargav S Kulkarni
# Brand: UrbanStay Technologies Pvt. Ltd. (urbanstay.living)
# Trademark: Class 9 #7920292 | MSME Registered
# ==============================================================================

---

## 📑 TABLE OF CONTENTS
1. [Executive Architectural Summary & Mission](#1-executive-architectural-summary--mission)
2. [High-Level System Topology & Infrastructure](#2-high-level-system-topology--infrastructure)
3. [Chronological Screen Pipeline (Screens 1 to 15)](#3-chronological-screen-pipeline-screens-1-to-15)
4. [Mobile Application Architecture (Flutter / Dart)](#4-mobile-application-architecture-flutter--dart)
5. [Master Design System & Component Tokens](#5-master-design-system--component-tokens)
6. [Data Schema & Relational Entity Model (PostgreSQL / Supabase)](#6-data-schema--relational-entity-model-postgresql--supabase)
7. [Financial Ledgers, 0% Direct UPI & Razorpay Subscriptions](#7-financial-ledgers-0-direct-upi--razorpay-subscriptions)
8. [Offline-First Engine & 50ms PDF Receipt Generation](#8-offline-first-engine--50ms-pdf-receipt-generation)
9. [Automated WhatsApp Chaser & Cloud API Webhook Architecture](#9-automated-whatsapp-chaser--cloud-api-webhook-architecture)
10. [Security, Auth State Machine & Role-Based Access Control (RBAC)](#10-security-auth-state-machine--role-based-access-control-rbac)
11. [Build, Release & Versioning Pipeline](#11-build-release--versioning-pipeline)
12. [Permanent In-House Engineering Rules & Anti-Patterns](#12-permanent-in-house-engineering-rules--anti-patterns)

---

## 🏛️ 1. EXECUTIVE ARCHITECTURAL SUMMARY & MISSION

UrbanStay is **India's dedicated, high-margin PG & Hostel Operations Operating System**. It is built specifically to solve the ground-truth operational, financial, and regulatory friction experienced by PG owners and residents across Bengaluru, Pune, Hyderabad, Kota, and Delhi NCR.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           URBANSTAY ECOSYSTEM MATRIX                        │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ 🏠 PG OWNER OPERATING SYSTEM         │ 👤 RESIDENT / TENANT PORTAL          │
│ • 0% Direct Bank UPI Settlement      │ • 1-Tap UPI Rent Payment             │
│ • Live Room & Bed Matrix (31/35)     │ • Instant HRA-Stamped PDF Invoices   │
│ • WhatsApp Rent Chaser Engine        │ • Zero-App QR Reception Standee Pass │
│ • Warden Cash Audit & Salary Control │ • Maintenance Ticketing with Photos  │
│ • Expense & Food Ration Ledger       │ • Food Mess Daily Headcount RSVP     │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

### Core Architectural Axioms:
1. **Zero Gateway Deductions on Rent**: 100% of tenant rent routes directly from tenant UPI handles into the PG owner's personal/business bank account via native `upi://pay` deep links.
2. **Minimalist High-Gross Margin B2B SaaS**: Flat-rate software bed licensing (`₹899/mo` for $\le 35$ beds, `₹1,999/mo` for 36–100 beds, `₹9,999/mo` for 101–500 beds, `₹20/bed/mo` enterprise) with 90%+ gross margins.
3. **Hardware-Accelerated Mobile UX**: 60/120fps locked execution on budget Android devices through Flutter's Impeller engine, eliminating layout thrashing and animation stutter.
4. **Offline-Authoritative PDF Receipts**: Sub-50ms rent receipt rendering using embedded fonts and deterministic vector math without server round-trip dependencies.

---

## 🌐 2. HIGH-LEVEL SYSTEM TOPOLOGY & INFRASTRUCTURE

```
                                  [ MOBILE CLIENTS ]
                    ┌─────────────────────┴─────────────────────┐
                    ▼                                           ▼
         [ Flutter Android APK ]                     [ Flutter iOS IPA ]
         (Impeller Engine, Dart)                     (Metal Engine, Dart)
                    │                                           │
                    └─────────────────────┬─────────────────────┘
                                          │
                                 HTTPS / REST / WSS
                                          │
                                          ▼
                       [ BACKEND API GATEWAY & MICROSERVICES ]
                       Node.js (Fastify) • Port 3000 • Reverse Proxy
                    ┌─────────────────────┼─────────────────────┐
                    ▼                     ▼                     ▼
          [ Auth & RBAC Hub ]    [ Financial Engine ]   [ Notification Bus ]
          • JWT Token Engine     • 0% UPI Verification  • Meta WhatsApp API
          • 6-digit SMS OTP      • Razorpay Webhooks    • SMS Gateways
          • Phone Number Hash    • SAC 998315 Invoices  • Push Notifications
                    │                     │                     │
                    └─────────────────────┼─────────────────────┘
                                          │
                                          ▼
                         [ PERSISTENCE & CACHING LAYER ]
                    ┌─────────────────────┴─────────────────────┐
                    ▼                                           ▼
      [ PostgreSQL (Supabase) ]                        [ Redis In-Memory ]
      • Row-Level Security (RLS)                       • Active OTP Sessions
      • Multi-Tenant Property Isolation                • Bed Matrix Cache
      • Relational Financial Ledgers                   • Rate Limiting Hub
```

---

## 📱 3. CHRONOLOGICAL SCREEN PIPELINE (SCREENS 1 TO 15)

Every user journey in UrbanStay maps strictly from verified HTML prototypes in `ProductionCode/` to modular Flutter screen implementations in `mobile_app/lib/features/`:

| Screen # | Feature Screen | Master HTML Prototype (`ProductionCode/`) | Flutter Dart Screen (`mobile_app/lib/`) | Status |
| :---: | :--- | :--- | :--- | :---: |
| **1** | **App Onboarding Walkthrough** | `overview sample APP.html` / `app_preview.html` | `features/onboarding/presentation/screens/onboarding_walkthrough_screen.dart` | ✅ Shipped |
| **2** | **Phone Number Login & OTP** | `phone_verify.html` | `features/auth/presentation/screens/phone_verify_screen.dart` | ✅ Shipped |
| **3** | **Role Selector & Profile Auth** | `auth_preview.html` | `features/auth/presentation/screens/role_selector_screen.dart` | ✅ Shipped |
| **4** | **4-Step Property Setup Wizard** | `owner_setup.html` | `features/owner_setup/presentation/screens/owner_setup_screen.dart` | ✅ Shipped |
| **5** | **Owner Command Center Dashboard** | `owner_dashboard.html` | `features/owner_dashboard/presentation/screens/owner_dashboard_screen.dart` | ⏳ Next |
| **6** | **Room & Bed Matrix Hub** | `owner_rooms.html` | `features/owner_rooms/presentation/screens/owner_rooms_screen.dart` | ⏳ Queued |
| **7** | **0% Direct UPI Approvals Hub** | `owner_approvals.html` | `features/owner_approvals/presentation/screens/owner_approvals_screen.dart` | ⏳ Queued |
| **8** | **Rent Collection & WhatsApp Chaser** | `owner_rent_collection.html` | `features/owner_rent/presentation/screens/owner_rent_screen.dart` | ⏳ Queued |
| **9** | **Maintenance Complaints Hub** | `owner_complaints.html` | `features/owner_complaints/presentation/screens/owner_complaints_screen.dart` | ⏳ Queued |
| **10** | **Operating Expenses & P&L** | `owner_expenses.html` | `features/owner_expenses/presentation/screens/owner_expenses_screen.dart` | ⏳ Queued |
| **11** | **Staff Directory & Warden Audit** | `owner_staff.html` | `features/owner_staff/presentation/screens/owner_staff_screen.dart` | ⏳ Queued |
| **12** | **Master Settings & Rules Engine** | `owner_settings.html` | `features/owner_settings/presentation/screens/owner_settings_screen.dart` | ⏳ Queued |
| **13** | **B2B SaaS Bed Licensing Billing** | `owner_saas_billing.html` | `features/owner_billing/presentation/screens/owner_billing_screen.dart` | ⏳ Queued |
| **14** | **Zero-App Reception QR Check-In**| `tenant_checkin.html` | `features/tenant_checkin/presentation/screens/tenant_checkin_screen.dart` | ⏳ Queued |
| **15** | **Resident Self-Service Portal** | `tenant_portal.html` | `features/tenant_portal/presentation/screens/tenant_portal_screen.dart` | ⏳ Queued |

---

## 💻 4. MOBILE APPLICATION ARCHITECTURE (FLUTTER / DART)

### Folder Hierarchy (`mobile_app/lib/`):
```text
mobile_app/
├── android/                         # Native Gradle & Android manifest configuration
├── ios/                             # Native Xcode workspace configuration
├── assets/
│   ├── fonts/                       # Outfit variable Google font (400, 600, 700, 800)
│   └── icons/                       # Vector SVGs and brand assets
└── lib/
    ├── main.dart                    # Application entrypoint & global route tree
    ├── core/
    │   ├── theme/
    │   │   ├── app_colors.dart      # Verified enterprise design tokens
    │   │   ├── app_typography.dart  # Google Outfit typography scale
    │   │   └── app_theme.dart       # Global ThemeData with isolated splash factories
    │   ├── network/
    │   │   ├── api_client.dart      # HTTP REST client with JWT interceptor
    │   │   └── api_endpoints.dart   # Centralized backend URL mappings
    │   ├── utils/
    │   │   ├── formatters.dart      # Indian Currency (₹ Lakh/Crore) & Phone formatters
    │   │   └── date_utils.dart      # Rent cycle and 30-day notice calculators
    │   └── widgets/
    │       ├── loading_button.dart  # CTA button with built-in spinner transitions
    │       ├── frosted_modal.dart   # BackdropFilter glass blur modal wrapper
    │       └── responsive_box.dart  # Max-width 440px constraint container
    └── features/
        ├── onboarding/              # Screen 1: Walkthrough Carousel
        ├── auth/                    # Screen 2 & 3: Phone OTP, S-Curve Wave Auth
        ├── owner_setup/             # Screen 4: 4-Step Onboarding Wizard
        ├── owner_dashboard/         # Screen 5: Live Bed Hero, 8 Actions, Bottom Nav
        ├── owner_rooms/             # Screen 6: Floor Matrix, KYC, Damage Deductions
        ├── owner_approvals/         # Screen 7: UTR Verification & 1-Tap Receipt Dispatch
        ├── owner_rent/              # Screen 8: WhatsApp Dues Chaser & Warden Audit
        ├── owner_complaints/        # Screen 9: Maintenance Ticketing & Staff Assign
        ├── owner_expenses/          # Screen 10: Grocery Ration & Monthly P&L Ledger
        ├── owner_staff/             # Screen 11: Warden Roles & Salary Approvals
        ├── owner_settings/          # Screen 12: 6 Master Subviews & 15 Edit Sheets
        ├── owner_billing/           # Screen 13: ₹899/mo + 18% GST SaaS Razorpay SDK
        ├── tenant_checkin/          # Screen 14: QR Standee Aadhaar OCR & Digital Pass
        └── tenant_portal/           # Screen 15: Resident 0% UPI Rent Pay & HRA Receipts
```

---

## 🎨 5. MASTER DESIGN SYSTEM & COMPONENT TOKENS

UrbanStay strictly adheres to an executive enterprise visual language modeled after Stripe, Linear, and Apple. **Artificial dark backgrounds, neon glows, and arbitrary gradients are strictly prohibited.**

### Core Palette & Design Tokens:
```css
:root {
  --green:         #08A63F;  /* Primary brand accent, verified badges, active states */
  --green-dark:    #068237;  /* High-contrast active button states, selected card text */
  --green-light:   #EBF8EE;  /* Soft badge pill backgrounds, success icon containers */
  --green-tint:    rgba(8, 166, 63, 0.06); /* Subtle card highlight tint */
  --green-glow:    rgba(8, 166, 63, 0.12); /* Soft elevated button shadow glow */
  --ink:           #111111;  /* Primary headers, deep typography, action CTAs */
  --muted:         #6B7280;  /* Subtitles, secondary metadata, timestamps */
  --light-muted:   #9CA3AF;  /* Inactive placeholders, disabled icons */
  --border:        #E5E7EB;  /* Hairline card borders, input borders (1.0px) */
  --card-bg:       #FFFFFF;  /* Elevated white card surfaces */
  --bg-page:       #F4F6F9;  /* Canvas background (soft executive light-gray) */
  --font:          'Outfit', sans-serif; /* 400 Regular, 600 SemiBold, 700 Bold, 800 ExtraBold */
  --max-w:         440px;    /* Centered mobile viewport clamp */
}
```

### Component Design Specifications:
1. **Floating Input Fields (`_FloatingInput`)**:
   * Container: `54px` height, `14px` border radius, `#FFFFFF` background, `1px solid #E5E7EB`.
   * Floating Behavior: On focus or text presence, label smoothly animates to `11.5px` font size with **Emerald Green (`#08A63F`, 700 bold)**.
   * Baseline Clearance: `contentPadding: EdgeInsets.fromLTRB(16, 16, 16, 12)` guarantees zero cursor-label collision.
2. **Interactive Selection Cards (`_buildInteractiveCard`)**:
   * Height: `50px`, Radius: `12px`, Border: `1px solid #E5E7EB`.
   * Inactive: Deep Ink title (`13px`, 600 weight) + muted tag (`9.5px`, `#6B7280`).
   * Active: Emerald Green border (`1.4px`), green tint background (`rgba(8,166,63,0.06)`), title in `#068237` (700 bold).
   * Touch Isolation: `NoSplash.splashFactory` to eliminate Android grey ripple flashes.
3. **Primary CTA Buttons**:
   * Dimensions: `54px` height, `16px` border radius, `#08A63F` Emerald Green background, bold white 16px Outfit typography, elevation shadow `0 6px 18px -4px rgba(8, 166, 63, 0.35)`.
   * Press State: Micro-compression (`scale(0.985)`) with `#068237` background lerp.

---

## 🗄️ 6. DATA SCHEMA & RELATIONAL ENTITY MODEL (POSTGRESQL / SUPABASE)

```sql
-- 1. Users & Authentication Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(15) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120),
    role VARCHAR(20) NOT NULL CHECK (role IN ('owner', 'tenant', 'warden', 'admin')),
    auth_provider VARCHAR(20) DEFAULT 'phone_otp',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PG Property Buildings Table
CREATE TABLE pg_buildings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    brand_name VARCHAR(150) NOT NULL,
    gender_category VARCHAR(20) NOT NULL CHECK (gender_category IN ('gents', 'ladies', 'coliving')),
    property_structure VARCHAR(30) DEFAULT 'standard_pg',
    ownership_type VARCHAR(30) DEFAULT 'owned_building',
    street_address TEXT NOT NULL,
    area_locality VARCHAR(100) NOT NULL,
    landmark VARCHAR(100),
    city VARCHAR(60) DEFAULT 'Bengaluru',
    state VARCHAR(60) DEFAULT 'Karnataka',
    pincode VARCHAR(10) NOT NULL,
    maps_gps_url TEXT,
    lift_count VARCHAR(10) DEFAULT '1',
    power_backup VARCHAR(30) DEFAULT 'full_backup',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Floors & Rooms Table
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    building_id UUID NOT NULL REFERENCES pg_buildings(id) ON DELETE CASCADE,
    floor_number INT NOT NULL,
    room_number VARCHAR(20) NOT NULL,
    sharing_type VARCHAR(20) NOT NULL, -- '1-Share', '2-Share', '3-Share', etc.
    total_beds INT NOT NULL,
    rent_per_bed NUMERIC(10, 2) NOT NULL,
    deposit_per_bed NUMERIC(10, 2) NOT NULL,
    has_attached_washroom BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Beds Inventory Table (Live 31/35 Bed Matrix)
CREATE TABLE beds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    bed_code VARCHAR(10) NOT NULL, -- 'A', 'B', 'C'
    occupancy_status VARCHAR(20) DEFAULT 'vacant' CHECK (occupancy_status IN ('vacant', 'occupied', 'notice_period', 'reserved')),
    current_tenant_id UUID REFERENCES users(id),
    vacating_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Direct Bank UPI Accounts Table (0% Gateway Settlement)
CREATE TABLE owner_payout_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bank_account_holder VARCHAR(120) NOT NULL,
    bank_name VARCHAR(80) NOT NULL,
    account_number VARCHAR(40),
    ifsc_code VARCHAR(20),
    upi_id_vpa VARCHAR(80) NOT NULL,
    upi_phone VARCHAR(15) NOT NULL,
    qr_code_image_url TEXT,
    is_primary BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Rent Invoices & Collections Table
CREATE TABLE rent_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    building_id UUID NOT NULL REFERENCES pg_buildings(id),
    bed_id UUID NOT NULL REFERENCES beds(id),
    tenant_id UUID NOT NULL REFERENCES users(id),
    invoice_number VARCHAR(40) UNIQUE NOT NULL,
    billing_month VARCHAR(20) NOT NULL, -- 'August 2026'
    base_rent NUMERIC(10, 2) NOT NULL,
    electricity_charge NUMERIC(10, 2) DEFAULT 0,
    damage_deduction NUMERIC(10, 2) DEFAULT 0,
    late_fee NUMERIC(10, 2) DEFAULT 0,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'submitted_utr', 'verified_paid', 'overdue')),
    tenant_utr_reference VARCHAR(40),
    verified_at TIMESTAMPTZ,
    pdf_receipt_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 💳 7. FINANCIAL LEDGERS, 0% DIRECT UPI & RAZORPAY SUBSCRIPTIONS

UrbanStay implements a strict dual-channel financial processing engine:

```
                                  [ FINANCIAL ROUTING ]
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     ▼                                             ▼
       [ 0% Direct Bank UPI Channel ]              [ B2B SaaS Licensing Channel ]
       (Tenant Rent → PG Owner Account)            (PG Owner → UrbanStay SaaS)
       • Route: `upi://pay` Intent Link            • Route: Razorpay Subscription SDK
       • Cost: ₹0 Gateway Cut (0.00%)              • Pricing: ₹899 / month + 18% GST
       • Settlement: Instant (T+0 seconds)         • SAC Code: 998315 (SaaS Software)
       • Ledger: Local Owner Bank Passbook         • Compliance: Apple 3.1.3(e) / Google UCB
```

### 1. 0% Direct UPI Deep Link Format:
```text
upi://pay?pa={owner_vpa}&pn={encoded_owner_name}&am={rent_amount}&cu=INR&tn=UrbanStay_Rent_{room}_{month}
```
When a tenant taps "Pay Rent", the mobile OS opens PhonePe, GPay, Paytm, or BHIM directly with the amount and owner VPA pre-filled. The money moves peer-to-peer into the owner's bank account with **₹0 intermediary holding period or deduction**.

---

## ⚡ 8. OFFLINE-FIRST ENGINE & 50MS PDF RECEIPT GENERATION

To eliminate reliance on slow remote servers or flaky cellular connections, all official rent receipts are generated client-side using Flutter's native vector canvas:

```
[ Tenant Payment Approved / UTR Verified ]
                   │
                   ▼ (15ms)
[ Extract Room, Owner Bank & HRA Details from SQLite / Hive Cache ]
                   │
                   ▼ (20ms)
[ Compile Vector PDF (pdf package) using Pre-loaded 'Outfit' Font Glyphs ]
                   │
                   ▼ (15ms)
[ Output Binary PDF (Total Execution: ~50ms) ]
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
[ 1-Tap WhatsApp Share ]  [ Local File Storage ]
```

### Receipt Stamped Elements:
1. UrbanStay Official Digital Signature & QR Verification Token.
2. Section 10(13A) HRA Income Tax Exemption Compliance Stamp.
3. Owner Legal PAN & Direct UPI UTR Reference Number.
4. Itemized Rent, Maintenance, Electricity Sub-meter Units, and Damage Deductions.

---

## 📲 9. AUTOMATED WHATSAPP CHASER & CLOUD API WEBHOOK ARCHITECTURE

UrbanStay integrates Meta WhatsApp Cloud API webhooks for automated, polite rent collection reminders:

```
[ Daily Cron Job (9:00 AM IST) ]
               │
               ▼
[ Query Invoices WHERE payment_status = 'unpaid' AND due_date <= NOW() + 2 DAYS ]
               │
               ▼
[ Render Personalized Hindi/English WhatsApp Template ]
• Tenant Name: "Rohan Sharma"
• Due Date: "5th of August"
• Direct UPI 1-Tap Pay Link
               │
               ▼
[ Dispatch via Meta WhatsApp Cloud API (Graph API v20.0) ]
               │
               ▼
[ Tenant Taps 1-Tap Link → Completes UPI Pay → Submits UTR → Owner Verifies ]
```

---

## 🔒 10. SECURITY, AUTH STATE MACHINE & ROLE-BASED ACCESS CONTROL (RBAC)

```
                       [ USER AUTHENTICATION STATE MACHINE ]
                                         │
                                         ▼
                      [ Screen 2: Phone Verify Screen ]
                      • Enter 10-digit Indian Phone (+91)
                      • Receive 6-digit SMS OTP
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼ (OTP Incorrect / Timeout)                     ▼ (OTP Correct - HTTP 200)
       [ Horizontal Shake Animation ]                  [ Frosted Glass Verified Popup ]
       • Box borders turn Red (#DC2626)                • Green tick badge springs (Scale 1.0)
       • Error text: "Invalid OTP"                     • Text: "OTP Verified!"
       • Decrement retry attempts                      • Auto-navigates after 1.4s
                                                                 │
                                                                 ▼
                                               [ Check Database User Profile ]
                                                                 │
                                 ┌───────────────────────────────┴───────────────────────────────┐
                                 ▼ (New User)                                                    ▼ (Existing User)
                   [ Screen 3: Role Selector Screen ]                             ┌──────────────┴──────────────┐
                   • Select: Owner vs Tenant                                      ▼ (Role = Owner)              ▼ (Role = Tenant)
                   • Enter Full Legal Name                                  [ Screen 5: Dashboard ]     [ Screen 15: Tenant ]
                                 │
                 ┌───────────────┴───────────────┐
                 ▼ (Role = Owner)                ▼ (Role = Tenant)
       [ Screen 4: Setup Wizard ]       [ Screen 14: QR Check-in ]
```

---

## 🚀 11. BUILD, RELEASE & VERSIONING PIPELINE

### Automated Build Commands:
```powershell
# 1. Static Analysis & Lint Verification
flutter analyze

# 2. Compile Debug APK (Fast Local Testing)
$env:JAVA_HOME = "C:\src\jdk-17"; $env:ANDROID_HOME = "C:\src"; $env:Path = "C:\src\jdk-17\bin;C:\src\flutter\bin;C:\src\platform-tools;$env:Path"; flutter build apk --debug --no-tree-shake-icons

# 3. Compile Production Release Bundle (Play Store / App Store)
flutter build appbundle --release --no-tree-shake-icons
```

### Critical Versioning & Caching Directives:
* **Version Code Bumping**: Bump `versionCode` in `pubspec.yaml` on every build (e.g. `1.0.19+20`).
* **Unique APK Aliasing**: Output APKs must always be copied to `app.apk` AND a timestamped alias (`urbanstay_v14.apk`, `urbanstay_v15.apk`, etc.) to defeat Chrome mobile browser HTTP download caching.

---

## 🛡️ 12. PERMANENT IN-HOUSE ENGINEERING RULES & ANTI-PATTERNS

1. **NO Artificial Dark Themes or Neon Glows**: Maintain pure enterprise white `#FFFFFF` cards on soft gray `#F4F6F9` background.
2. **NO Layout-Shifting Animations**: Avoid wrapping dynamic-height widgets in unconstrained `AnimatedSwitcher` or `AnimatedScale`. Always clamp heights or animate composited GPU properties (`Opacity`, `Transform.translate`).
3. **NO Hardcoded Pixel Floating Labels**: Never use custom `Stack` layers with fixed pixel offsets for floating labels. Always use Flutter's native `InputDecoration(floatingLabelBehavior: FloatingLabelBehavior.auto)` for guaranteed GPU baseline alignment.
4. **NO Touch Leaks on Interactive Cards**: Always apply `splashFactory: NoSplash.splashFactory` and transparent highlight colors on custom interactive selection cards to prevent Android grey flash artifacts.
5. **Preserve Master HTML Prototypes**: Files inside `ProductionCode/` are the gold standard reference prototypes. They must remain 100% pristine and unaltered.

---

*This document is permanently preserved as the single architectural source of truth for UrbanStay.* 🕉️✨
