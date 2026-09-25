# 🕉️ URBANSTAY — MASTER SESSION KNOWLEDGE & CODE ANALYSIS PLAYBOOK (KSB_30TH.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# Date: 30 August 2026 | Active Build: urbanstay_v43.apk
# Target: India's #1 Production-Grade PG & Hostel Operations Operating System
# Founder: Bhargav S Kulkarni | Anchor Pilot: Arun (BTM Layout / HSR Network)
# ==============================================================================

---

## 📌 1. EXECUTIVE SUMMARY OF COMPLETED MODULES & SCREENS

In **`urbanstay_v43.apk`**, we refined the **Minimalist Typographic PG Switcher** (removed bulky icon boxes) and added the **Invite Co-Owner & PG Manager Hub** directly into Quick Actions:

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
│ 5    │ owner_dashboard_screen       │ Command center, Minimalist PG Switch. │
│ 6    │ owner_rooms_screen           │ 3-Tier matrix, KYC, damage deductions.│
│ 7    │ owner_approvals_screen       │ 0% Direct UPI bank verification hub.  │
│ 8    │ owner_rent_collection_screen │ 3-Tier rent chaser & salary extension.│
│ 9    │ owner_complaints_screen      │ Maintenance hub & live history ledger.│
│ 10   │ owner_expenses_screen        │ Operating costs, custom cat & CA rep. │
│ 11   │ owner_staff_screen           │ Staff directory, payroll & 1-tap pay. │
│ 12   │ owner_settings_screen        │ 7 Subviews, Policy Toggles, 0% UPI    │
│ 13   │ owner_onboarding_approvals   │ Move-In KYC, Room Block & Inline Edit │
│ 14   │ owner_reports_screen         │ Vertical Floor Bars, OTP & Rent Graph │
│ 15   │ invite_manager_modal         │ Co-Owner & Manager WhatsApp Invites   │
└──────┴──────────────────────────────┴───────────────────────────────────────┘
```

---

  3. **`Daily Late Fine Auto-Debit (₹100/day)`** *(ON/OFF)*: Adds ₹100/day penalty after 5th of every month.
  4. **`Food Mess Meal Attendance RSVP`** *(ON/OFF)*: Requires residents to confirm meals to avoid cook ration waste.
* **Instant Toast Confirmation**: Each switch provides clear haptic and toast notifications when toggled.

### C. 📊 Owner Business Intelligence & Master Reports Hub (`owner_reports_screen.dart`):
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
     * **Thick Vertical Floor Bars**: 1st Floor (100% &bull; 10/10 Beds), 2nd Floor (92% &bull; 11/12 Beds), 3rd Floor (77% &bull; 10/13 Beds) rendered as thick 44px vertical columns (dynamically scrollable).
  2. **Amount & Rent Collection Analytics**: Collected (₹2,63,500 &bull; 25 Paid), Pending (₹34,000 &bull; 6 Dues), 0% UPI Savings banner (**₹5,270 saved** vs 2% gateway cut) & 6-Month Inflow Bar Chart.
  3. **Rent Approvals & Verification Velocity**: 92.5% Approved Volume (25 of 27 Paid), Verified vs Pending vs Flagged progress breakdown, and Total Security Deposits Held (₹4,65,000).
  4. **Operating Expenses Audit**: 4-Segment custom canvas Donut Ring (Kitchen 44%, BESCOM 36%, Water 14%, Repairs 6%). Total OpEx: ₹50,400.
  5. **Staff & Worker Payroll Audit**: 4 Staff, ₹56,000 total payroll, ₹28,000 paid out, ₹28,000 pending with role-by-role payout bars.

---

## 🛡️ 3. PRE-FLIGHT COMPLIANCE & ZERO-REGRESSION CHECKLIST

Before compiling ANY new APK build:
- [x] Does the layout render with **ZERO pixel overflow** on 360px–440px viewport widths?
- [x] Is the hierarchy strictly 3-tier (`Floor ➔ Room Sub-Block ➔ Bed Cards`)?
- [x] Are Call and WhatsApp buttons placed side-by-side?
- [x] Are all colors within the verified green/ink/warm gold/red family (0% purple)?
- [x] Are there zero unicode emojis in text strings?
- [x] Are all action buttons at least 42px–44px height for easy thumb tapping?
- [x] Is the APK version bumped in `pubspec.yaml`?

---

## 📦 4. ACTIVE BUILDS & LOCAL DOWNLOAD ENDPOINTS

* **Current Master APK**: **`urbanstay_v42.apk`**
* **Local HTTP Download Server**:
  * Direct Link: `http://10.209.182.51:8080/urbanstay_v43.apk`
  * Default Link: `http://10.209.182.51:8080/app.apk`

---

## 🎯 5. MASTER TO-DO LIST (REMAINING ROADMAP)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        REMAINING ROADMAP SCREENS                       │
├──────┬──────────────────────────────┬──────────────────────────────────┤
│ 1    │ Screen 13: B2B SaaS Billing  │ Bed Licensing, ₹899/mo + GST,    │
│      │ & Razorpay SDK               │ 24h Auto-Renewal & Plan Upgrades │
├──────┼──────────────────────────────┼──────────────────────────────────┤
│ 2    │ Screen 14: Zero-App Check-In │ Reception QR Standee, Aadhaar    │
│      │ (tenant_checkin.html)        │ OCR Auto-fill, Live Selfie Pass  │
├──────┼──────────────────────────────┼──────────────────────────────────┤
│ 3    │ Screen 15: Resident Portal   │ 0% UPI Rent Pay, 50ms Offline PDF│
│      │ (tenant_portal.html)         │ Receipts, Smart 5-min Pre-Notice │
└──────┴──────────────────────────────┴──────────────────────────────────┘
```

---

*This document is the permanent single source of truth and system memory for UrbanStay as of 30 August 2026.* 🕉️✨
