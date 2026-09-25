# 🕉️ URBANSTAY — MASTER SESSION KNOWLEDGE & CODE ANALYSIS PLAYBOOK (KSB_29TH.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# Date: 29 August 2026 | Active Build: urbanstay_v41.apk
# Target: India's #1 Production-Grade PG & Hostel Operations Operating System
# Founder: Bhargav S Kulkarni | Anchor Pilot: Arun (BTM Layout / HSR Network)
# ==============================================================================

---

## 📌 1. EXECUTIVE SUMMARY OF COMPLETED MODULES & SCREENS

In **`urbanstay_v41.apk`**, we perfected the **Owner Business Intelligence & Master Reports Hub** (`owner_reports_screen.dart`), adding **Thick Vertical Floor Bars**, **Large 2x2 Square Capacity Cards**, and **Pure Rent Approval Velocity Analytics**, bringing our core operational modules to **14 production-grade hubs**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    URBANSTAY MASTER DEPLOYMENT MATRIX                       │
├──────┬──────────────────────────────┬───────────────────────────────────────┤
│ #    │ Screen & File                │ Real-World Operational Scope          │
├──────┼──────────────────────────────┼───────────────────────────────────────┤
│ 1    │ onboarding_walkthrough       │ 4-Step onboarding value proposition.  │
│ 2    │ phone_auth_screen            │ India +91 phone auth & 6-digit OTP.   │
│ 3    │ role_selector_screen         │ PG Owner vs Resident Role switch.     │
│ 4    │ owner_setup_wizard           │ 4-Step PG property onboarding wizard. │
│ 5    │ owner_dashboard_screen       │ Command center, 31/35 beds radial arc.│
│ 6    │ owner_rooms_screen           │ 3-Tier matrix, KYC, damage deductions.│
│ 7    │ owner_approvals_screen       │ 0% Direct UPI bank verification hub.  │
│ 8    │ owner_rent_collection_screen │ 3-Tier rent chaser & salary extension.│
│ 9    │ owner_complaints_screen      │ Maintenance hub & live history ledger.│
│ 10   │ owner_expenses_screen        │ Operating costs, custom cat & CA rep. │
│ 11   │ owner_staff_screen           │ Staff directory, payroll & 1-tap pay. │
│ 12   │ owner_settings_screen        │ 6 Subviews, 0% UPI, curfew, compliance│
│ 13   │ owner_onboarding_approvals   │ Move-In KYC, Room Block & Inline Edit │
│ 14   │ owner_reports_screen         │ Vertical Floor Bars, OTP & Rent Graph │
└──────┴──────────────────────────────┴───────────────────────────────────────┘
```

---

## 👥 2. DEEP DIVE INTO TODAY'S NEW MODULES

### A. 📊 Owner Business Intelligence & Master Reports Hub (`owner_reports_screen.dart`):
* **🔒 2-Step OTP Financial Security Shield**:
  * Protects sensitive monthly P&L, collections & audit statements from wardens or unauthorized persons holding the owner's phone.
  * 6 individual auto-focusing OTP boxes with numeric keypad & WhatsApp resend timer before unlocking data.
* **👁️ Privacy Eye Toggle (`[ 👁️ Show / 👁️‍🗨️ Hidden ]`)**:
  * 1-Tap masks all financial rupee balances into `••••••` across all sections for public viewing.
* **🏢 Pinned Top 1-Tap Quick Export Action Bar**:
  * **`[ 📥 Download Financial PDF Statement ]`**, **`[ 💬 WhatsApp to CA ]`**, and **`[ 👮 Police Dossier ZIP ]`** accessible at the very top of the reports hub!
* **📊 5 Refined Operational Sections**:
  1. **Beds & Vacancy Analytics**:
     * **Large 2x2 Square Capacity Cards**: Total Capacity (`35 Beds`), Active Tenants (`31 Beds`), Vacant Slots (`4 Beds`), On Notice (`3 Beds`).
     * **Thick Vertical Floor Bars**: 1st Floor (100% &bull; 10/10 Beds), 2nd Floor (92% &bull; 11/12 Beds), 3rd Floor (77% &bull; 10/13 Beds) rendered as thick 44px vertical columns.
  2. **Amount & Rent Collection Analytics**: Collected (₹2,63,500 &bull; 25 Paid), Pending (₹34,000 &bull; 6 Dues), 0% UPI Savings banner (**₹5,270 saved** vs 2% gateway cut) & 6-Month Inflow Bar Chart.
  3. **Rent Approvals & Verification Velocity**: 92.5% Approved Volume (25 of 27 Paid &bull; `~12m avg speed`), Verified vs Pending vs Flagged progress breakdown, and Total Security Deposits Held (₹4,65,000).
  4. **Operating Expenses Audit**: 4-Segment custom canvas Donut Ring (Kitchen 44%, BESCOM 36%, Water 14%, Repairs 6%). Total OpEx: ₹50,400.
  5. **Staff & Worker Payroll Audit**: 4 Staff, ₹56,000 total payroll, ₹28,000 paid out, ₹28,000 pending with role-by-role payout bars.

### B. 🛡️ Move-In KYC & Onboarding Gatekeeper Hub (`owner_onboarding_approvals_screen.dart`):
* **High-Contrast Prominent Room & Sharing Block**:
  * Displays **`ROOM 101`** (black pill with bold white text) alongside **`2-Sharing • Bed B`** and **`₹8,500/mo`** emerald badge.
  * Explicit subtitle: `1st Floor • Applied 15 mins ago`.
* **Inline Editable Fields in Accept Modal**:
  * 1-Tap **`[ ✏️ Modify Details ]`** toggle enables text fields for Room Number, Bed Label, Monthly Rent (₹), and Deposit (₹) so the owner can correct any wrong tenant entries before confirming!
* **100% Zero Aadhaar Numbers**: Removed all sensitive Aadhaar text/number strings.
* **Dual-Tab Architecture**: `Pending Requests (2)` vs `Onboarding History (3)` with **Zero Summary Strip** clutter.
* **Side-by-Side Contact Buttons**: **`[ 📞 Call Tenant ]`** and **`[ 💬 WhatsApp Chat ]`** placed **directly above** the decision action row!
* **1-Tap Actions**:
  * 🔴 **`[ Reject ]`**: Reason selection modal (*Bed already allotted, Profile mismatch*), blocks unauthorized 3rd parties.
  * 🟢 **`[ Accept & Onboard ]`**: Confirmation sheet with deposit mode toggle (**Direct UPI Paid** vs **Collect at Check-In**), locks Bed 101-B, and unlocks tenant app access.
* **Onboarding History Ledger**: Audit logs of past approved and rejected applications with timestamps and assigned rooms.

### B. Screen 12: Master Settings & Configuration Hub (`owner_settings_screen.dart`):
* **6 Dedicated Subviews**:
  1. **Property Settings**: Name, Property ID (`US-560034-A`), Address, Google Maps link, Preferred Tenants (Unisex), Gate Curfew (`10:30 PM`), and Digital Business Card.
  2. **Management & Business**: Entity Type, Legal Name, GST (`29ABCDE1234F1Z5`), BBMP License (`BBMP-TR-2025-8819`), and Admin Contact.
  3. **Renting & Stay Rules**: Rent addition cycle (`1st`), Grace period (`5th`), Daily pro-rata (`₹500/day`), Lock-in (`3 Months`), Notice period (`30 Days`), Check-in/out times.
  4. **0% Direct Bank Settlement**: Primary UPI VPA (`bhargav@hdfcbank`), Bank name, Account number, IFSC, Beneficiary name, and 1-tap Printable Reception QR Standee generator.
  5. **Move-In / Out Checklist Settings**: Digital checklist toggle, inspection deadlines (`3 Days / 1 Day`), Auto-Approve Move-In toggle, Block Deposit Refunds toggle.
  6. **Account & Security**: Passcode, Phone/Email, App Language, Logout Current Session, Logout All Devices, and **Delete Account** (Mandatory Apple Guideline 5.1.1(v) compliance).
* **Master Directory**: Real-time search box + Owner profile hero card (`BK` &bull; `Bhargav Kulkarni` &bull; `Pro 0% Fee Tier`).

### B. Screen 11: Staff Directory & Payroll Hub (`owner_staff_screen.dart`):
* **3-Pill Payroll Summary**: Active Team (`4 Staff`), Monthly Payroll (`₹56,000`), Pending Payouts (`₹28,000` in Warm Gold `#92400E`).
* **Clean Elevated Staff Cards**:
  * 42px avatar circle (`SK`, `RC`, `MD`, `NS`) + Staff Name + Specific Work Title (*Warden, Head Cook, Housekeeping, Security*).
  * Side-by-side **`[ 📞 Call ]`** and **`[ 💬 WhatsApp ]`** targets for frictionless on-ground communication.
  * Monthly salary status box (`August Salary: ₹18,000` + **Paid** in Emerald / **Pending** in Warm Gold).
  * 1-Tap **`[ Approve & Mark Paid (₹16,000) ]`** button with immediate expense sync.
* **Add Staff Modal with Custom Roles**:
  * Quick-chips for *Warden, Cook, Housekeeping, Security*, plus **`+ Other (Custom Role)`** with dynamic manual text entry.
* **Live Search & Role Filter Chips**: Instant search by name or designation.

### B. Screen 10: Operating Costs & Expenses Ledger (`owner_expenses_screen.dart`):
* **Focused Total Spent Card**: Clean summary card showing **Total Spent This Month (₹68,400 across 6 Recorded Bills)** with cycle selector (`August 2026`).
* **Premium Native Vector Icons**: Bolt (Electricity), Restaurant/Chef (Kitchen & Rations), Water Drop (Water Tankers), Staff ID Badge (Salaries), Wrench/Handyman (Repairs), Wi-Fi (Broadband), Receipt (Custom).
* **Log New PG Expense (FAB `+`)**:
  * Category quick-chips with **`+ Other (Custom)`** selector.
  * Dynamic manual text input for custom categories (*"e.g. Diesel Generator, Pest Control, Waste Disposal"*).
  * Title, Amount (₹), Date, Vendor, Payment Mode toggle (**Direct UPI / Bank** vs **Cash / Petty Cash**), and Bill receipt photo attachment.
* **Live Search & Category Filtering**: Instant filtering by keyword, vendor name, or category chips.
* **CA Tax Export Banner**: 1-tap **`[ 📥 Export CA Report ]`** statement for accountant audit.

### C. Screen 9: Complaints & Maintenance Hub (`owner_complaints_screen.dart`):
* **Pure White Elevated Cards**: Removed all harsh red/colored borders; cards are now pure white (`#FFFFFF`) with clean hairline borders (`#E5E7EB`).
* **Zero Text Overflow**: Wrapped all resident titles, categories, and resolution audit lines in `Expanded` / `Flexible` with `TextOverflow.ellipsis` and clean column layouts.
* **Explicit 3-Tier Hierarchy Subtitle**: **`Room 101 • 2-Sharing (Bed A) • 1st Floor • 2 hours ago`**.
* **Simplified PG Operational Workflow**:
  * 1-Tap **`[ Start Work (In Progress) ]`** $\rightarrow$ sends automated in-progress WhatsApp alert to resident.
  * 1-Tap **`[ Mark Resolved ]`** $\rightarrow$ moves ticket into History ledger with completion audit.
* **Side-by-Side Contact Buttons**: Standardized **`[ 📞 Call Resident ]`** and **`[ 💬 WhatsApp ]`** targets.
* **Dual-Tab Architecture**: `Active Tickets (3)` vs `Resolution History (3)`.

---

## 🧠 3. THE 5 MANDATORY MENTAL MODELS FOR URBANSTAY

When building or updating ANY screen in UrbanStay, the AI/Developer must think through these **5 Mandatory Mental Models**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THE 5 MANDATORY MENTAL MODELS FOR URBANSTAY              │
├──────────────────────┬──────────────────────────────────────────────────────┤
│ 1. Ground Truth PG   │ Think like an Indian PG owner (Arun in BTM):         │
│    Operations        │ • Money goes direct to bank (0% UPI gateway fee).    │
│                      │ • Tenants get salary on 1st, 5th, 10th, or 15th.     │
│                      │ • Cook ration waste happens without daily headcount. │
├──────────────────────┼──────────────────────────────────────────────────────┤
│ 2. Visual Hierarchy  │ NEVER render a flat list. Always use 3-Tier:         │
│                      │ 🏢 Floor ➔ 🚪 Room (Sharing Type) ➔ 🛏️ Bed / Tenant  │
├──────────────────────┼──────────────────────────────────────────────────────┤
│ 3. Design System     │ Strictly obey verified hex tokens. ZERO purple/neon. │
│    Integrity         │ Pure white elevated cards (#FFFFFF), not dark cards. │
├──────────────────────┼──────────────────────────────────────────────────────┤
│ 4. Action Ergonomics │ 44px tactile targets. Side-by-side Call + WhatsApp.  │
│                      │ Secondary action row (Record Cash / View Receipt).   │
├──────────────────────┼──────────────────────────────────────────────────────┤
│ 5. Zero Emoji Rule   │ Native vector icons + Outfit typography only.        │
└──────┴──────────────────────────────┴───────────────────────────────────────┘
```

---

## 🔄 4. DYNAMIC REAL-DATA RELATIONAL PIPELINE (HOW ONBOARDING WORKS)

When an owner onboards a real resident (e.g. **`Kunal Sharma`** $\rightarrow$ **`Room 101 • Bed A`** $\rightarrow$ **`₹8,500/mo`**), the data cascades dynamically across ALL screens while preserving identical UI beauty:

```
                     ┌──────────────────────────────────────────────┐
                     │         ONBOARD: KUNAL SHARMA (ROOM 101-A)    │
                     └──────────────────────┬───────────────────────┘
                                            │
         ┌──────────────────────────────────┼──────────────────────────────────┐
         │                                  │                                  │
         ▼                                  ▼                                  ▼
┌──────────────────┐               ┌──────────────────┐               ┌──────────────────┐
│  ROOMS MATRIX    │               │ RENT COLLECTION  │               │ OWNER DASHBOARD  │
│  (Screen 6)      │               │ (Screen 8)       │               │ (Screen 5)       │
├──────────────────┤               ├──────────────────┤               ├──────────────────┤
│ Bed 101-A turns  │               │ Room 101 sub-    │               │ Live occupancy   │
│ from "Vacant" to │               │ block adds Kunal │               │ updates instantly│
│ "Kunal Sharma"   │               │ Sharma with      │               │ from 31/35 to    │
│ with Infosys tag │               │ [Call] & [WA]    │               │ 32/35 (91% Full) │
└──────────────────┘               └──────────────────┘               └──────────────────┘
```

---

## 🛠️ 5. PRE-FLIGHT QUALITY CHECKLIST (ZERO REGRESSIONS)

Before compiling ANY new APK build:
- [x] Does the layout render with **ZERO pixel overflow** on 360px–440px viewport widths?
- [x] Is the hierarchy strictly 3-tier (`Floor ➔ Room Sub-Block ➔ Bed Cards`)?
- [x] Are Call and WhatsApp buttons placed side-by-side?
- [x] Are all colors within the verified green/ink/warm gold/red family (0% purple)?
- [x] Are there zero unicode emojis in text strings?
- [x] Are all action buttons at least 42px–44px height for easy thumb tapping?
- [x] Is the APK version bumped in `pubspec.yaml`?

---

## 📦 6. ACTIVE BUILDS & LOCAL DOWNLOAD ENDPOINTS

* **Current Master APK**: **`urbanstay_v41.apk`**
* **Local HTTP Download Server**:
  * Direct Link: `http://10.99.9.51:8080/urbanstay_v41.apk`
  * Default Link: `http://10.99.9.51:8080/app.apk`

---

## 🎯 7. MASTER TO-DO LIST (REMAINING ROADMAP & TOMORROW'S WORK)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        REMAINING ROADMAP & WORKFLOW                    │
├──────┬──────────────────────────────┬──────────────────────────────────┤
│ 1    │ Master Automation Toggles    │ State-driven policy toggles:     │
│      │ Engine (Settings)            │ • Auto-Send WhatsApp PDF Receipts│
│      │                              │ • Mandatory Tenant KYC & Aadhaar │
│      │                              │ • Daily Late Fine Auto-Debit     │
│      │                              │ • Food Mess Meal Attendance RSVP │
├──────┼──────────────────────────────┼──────────────────────────────────┤
│ 2    │ Multi-PG Building Switcher   │ Top property selector modal with │
│      │ & Isolated Staff Directory   │ isolated room matrices, bank VPAs│
│      │                              │ & dedicated staff payroll per PG │
├──────┼──────────────────────────────┼──────────────────────────────────┤
│ 3    │ Screen 13: B2B SaaS Billing  │ Bed Licensing, ₹899/mo + GST,    │
│      │ & Razorpay SDK               │ 24h Auto-Renewal & Plan Upgrades │
├──────┼──────────────────────────────┼──────────────────────────────────┤
│ 4    │ Screen 14: Zero-App Check-In │ Reception QR Standee, Aadhaar    │
│      │ (tenant_checkin.html)        │ OCR Auto-fill, Live Selfie Pass  │
├──────┼──────────────────────────────┼──────────────────────────────────┤
│ 5    │ Screen 15: Resident Portal   │ 0% UPI Rent Pay, 50ms Offline PDF│
│      │ (tenant_portal.html)         │ Receipts, Smart 5-min Pre-Notice │
└──────┴──────────────────────────────┴──────────────────────────────────┘
```

---

*This document is the permanent single source of truth and system memory for UrbanStay as of 29 August 2026.* 🕉️✨
