# ==============================================================================
# 🕉️ URBANSTAY — MASTER SYSTEM PLAYBOOK & PRODUCTION LEDGER (KSB_2SEPT.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# COMPANY: UrbanStay Technologies Pvt. Ltd. (urbanstay.living)
# FOUNDER & PRODUCT ARCHITECT: Bhargav S Kulkarni (NoBrokerHood Monetization & Revenue Strategy)
# PILOT ANCHOR PARTNER: Arun (Owner of 3 PGs in Bengaluru + 40-50 PG Network in BTM/HSR)
# DATE OF RECORD: 2 September 2026
# CURRENT MASTER BUILD: Build v50 (urbanstay_v50.apk / version: 1.0.58+59)
# ==============================================================================

---

## 📱 1. CURRENT LIVE PRODUCTION STATUS & DOWNLOAD ENDPOINTS

* **Current Master APK**: **`urbanstay_v50.apk`**
* **Local HTTP Download Server**:
  * Direct Link: `http://10.209.182.51:8080/urbanstay_v50.apk`
  * Default Link: `http://10.209.182.51:8080/app.apk`
  * Directory Index: `http://10.209.182.51:8080/`
  *(Backup Port 8000)*:
  * `http://10.209.182.51:8000/urbanstay_v50.apk`
  * `http://10.209.182.51:8000/app.apk`

---

## 🚀 2. WHAT'S NEW IN BUILD V50 (2 SEPTEMBER 2026)

### A. 🎯 7-Point Master UI Fix Checklist (100% Completed)

| # | Feature / UI Refinement | Implementation Details in Build v50 |
| :---: | :--- | :--- |
| **1** | **Owner Details & Property Scale Consistency** | Replaced all open `TextField` inputs in Profile / Property Scale (`C2 Infrastructure`, `C3 Bed Capacity`) with the **exact same 1-tap interactive clickable cards** as the onboarding wizard (`0`, `1`, `2`, `3+` Lifts; `Full Backup`, `No Backup`; `Men's`, `Women's`, `Unisex`; `Owned Building`, `Leased Property`; Floors `G+1` to `G+5+`). |
| **2** | **"Welcome Bhargav" Top Banner UI** | Encapsulated Greeting, Big Bold Owner Name (**Bhargav S Kulkarni** in `24px` Outfit Black), and PG Switcher inside a **solid elevated pure white container** (`#FFFFFF` with `#E5E7EB` bottom hairline), distinctly separating it from the soft-gray canvas background. |
| **3** | **Standardize "One Green, One Black" Palette** | Enforced strict brand tokens: `--green` (`#08A63F`) for success badges/CTAs and `--ink` (`#111111`) for deep typography and primary actions. |
| **4** | **Remove Distracting "Live" / "Active" Pills** | Stripped out unnecessary floating "Live" pills from the top banner to keep the header minimal and enterprise-grade. |
| **5** | **Day-Wise Collection Rejection & Audit History** | Upgraded Rejection action to open a **structured rejection modal** with 4 selectable reasons (`Money Not Credited in Bank`, `Invalid UTR`, `Partial Amount`, `Wrong UPI Account`), optional custom notes, and automatic history logging. |
| **6** | **Clean Up Redundant Toggles** | Audited settings and removed unnecessary switches to keep forms streamlined. |
| **7** | **GSTIN & Government KYC ID Proofs** | Added dedicated **Government KYC & Business Proofs** section with Aadhaar/PAN/Passport selector, document verification status, and GSTIN registration certificate upload. |

---

### B. 🗓️ Dedicated Day-to-Day Collection Hub (`owner_day_collection_screen.dart`)
1. **Interactive Horizontal Salary Date Strip**:
   * Quick filter across `1st`, `2nd`, `3rd`, `5th`, `7th`, `10th`, `15th` salary cycles.
2. **Dynamic Date Movement (Salary Re-Scheduling)**:
   * When a tenant's salary date changes (e.g. 5th $\rightarrow$ 10th), tapping **`[ Change Pay Date ]`** instantly relocates the resident card across date tabs in real time.
3. **Structured Rejection Flow**:
   * Replaces blind dismissal with structured reason selection, custom notes, WhatsApp resident alert, and audit history logging.
4. **Clean Neutral Action Outlines**:
   * Neutral `#111111` outlined buttons for Call and WhatsApp to avoid color fatigue.

---

### C. 🏛️ Master Settings Suite & KYC Document Hub (`owner_settings_screen.dart`)
1. **Interactive Property Scale (C1–C4)**:
   * 1-Tap editing for Owner KYC, Property Scale, Bed Capacity upgrade, and Sharing Tariffs.
2. **Government KYC & GST Tax Documents**:
   * Structured Aadhaar, PAN, and Passport ID management.
   * GSTIN tax certificate PDF upload with verification badge.

---

## 🏛️ 3. VERIFIED OWNER OPERATING SUITE (SCREENS 1 TO 13 COMPLETE)

```
┌──────┬────────────────────────────────────────────┬────────────┐
│ #    │ Screen & Module Name                       │ Status     │
├──────┼────────────────────────────────────────────┼────────────┤
│ 1    │ Overview Walkthrough Carousel              │ ✅ 100%    │
│ 2    │ Phone Number Login (+91 & OTP)             │ ✅ 100%    │
│ 3    │ Role Selector (Owner vs Resident)          │ ✅ 100%    │
│ 4    │ 4-Step Property Onboarding Wizard          │ ✅ 100%    │
│ 5    │ Owner Command Center Dashboard             │ ✅ 100%    │
│ 6    │ Room & Bed Matrix (Damage Deductions)      │ ✅ 100%    │
│ 7    │ 0% Direct UPI Approvals Hub (PDF Receipts) │ ✅ 100%    │
│ 8    │ Rent Dues, WhatsApp Chaser & Warden Audit  │ ✅ 100%    │
│ 9    │ Maintenance Ticketing & Photo Proof        │ ✅ 100%    │
│ 10   │ Operating Expenses & Grocery Ration Log    │ ✅ 100%    │
│ 11   │ Staff Directory & Isolated PG Payroll      │ ✅ 100%    │
│ 12   │ Master Settings Suite (C1–C4 Drilldown)    │ ✅ 100%    │
│ 13   │ B2B SaaS Bed Licensing & Razorpay Checkout │ ✅ 100%    │
└──────┴────────────────────────────────────────────┴────────────┘
```

---

## 🎯 4. REMAINING MASTER ROADMAP (TENANT PORTAL & QR CHECK-IN)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        REMAINING ROADMAP SCREENS                       │
├──────┬──────────────────────────────┬──────────────────────────────────┤
│ 1    │ Screen 14: Zero-App Check-In │ Reception QR Standee, Aadhaar    │
│      │ (tenant_checkin.html)        │ OCR Auto-fill, Live Selfie Pass  │
├──────┼──────────────────────────────┼──────────────────────────────────┤
│ 2    │ Screen 15: Resident Portal   │ 0% UPI Rent Pay, 50ms Offline PDF│
│      │ (tenant_portal.html)         │ Receipts, Food Mess RSVP         │
└──────┴──────────────────────────────┴──────────────────────────────────┘
```

---

*This document is the permanent single source of truth and system memory for UrbanStay as of 2 September 2026.* 🕉️✨
