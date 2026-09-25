# ==============================================================================
# 🕉️ URBANSTAY — MASTER SYSTEM PLAYBOOK & PRODUCTION LEDGER (KSB_1SEPT.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# COMPANY: UrbanStay Technologies Pvt. Ltd. (urbanstay.living)
# FOUNDER & PRODUCT ARCHITECT: Bhargav S Kulkarni (NoBrokerHood Monetization & Revenue Strategy)
# PILOT ANCHOR PARTNER: Arun (Owner of 3 PGs in Bengaluru + 40-50 PG Network in BTM/HSR)
# DATE OF RECORD: 1 September 2026
# CURRENT MASTER BUILD: Build v49 (urbanstay_v49.apk / version: 1.0.57+58)
# ==============================================================================

---

## 📱 1. CURRENT LIVE PRODUCTION STATUS & DOWNLOAD ENDPOINTS

* **Current Master APK**: **`urbanstay_v49.apk`**
* **Local HTTP Download Server**:
  * Direct Link: `http://10.209.182.51:8080/urbanstay_v49.apk`
  * Default Link: `http://10.209.182.51:8080/app.apk`
  * Directory Index: `http://10.209.182.51:8080/`
  *(Backup Port 8000)*:
  * `http://10.209.182.51:8000/urbanstay_v49.apk`
  * `http://10.209.182.51:8000/app.apk`

---

## 🚀 2. WHAT'S NEW IN BUILD V49 (1 SEPTEMBER 2026)

### A. 🗓️ 9th Quick Action: Dedicated Day-Wise Collection Hub (`owner_day_collection_screen.dart`)
1. **Separation of Concerns**:
   * Removed day-wise calendar logic completely from Rent Collection to restore clean 3-tier Floor $\rightarrow$ Room $\rightarrow$ Bed hierarchy.
   * Created **9th Quick Action: `Day-Wise Rent`** on Dashboard.
2. **Dynamic Date Re-Scheduling**:
   * Changing a tenant's pay date (e.g. 5th $\rightarrow$ 10th) dynamically moves the tenant across date tabs and logs an audit trail.
3. **Neutral WhatsApp Button Styling**:
   * Replaced green background with clean outlined neutral button.
4. **Audit & Collection History Ledger**:
   * Chronological log of all verified payments, date changes, and rejected payments with staff actor attribution (*Manager Ramesh / Co-Owner Arun / Owner Bhargav*).

### A. ⚡ In-Card Payment Verification Hub (`owner_rent_collection_screen.dart`)
1. **View Proof, Reject & Accept Action Bar**:
   * **`[ 👁️ View Proof ]`**: Displays submitted UTR reference (`UTR-423189765412`), payment timestamp, and verified direct bank deposit advice.
   * **`[ ✕ Reject (Not in Bank) ]`**: Rejects payment if money was not received in owner's personal HDFC/SBI bank account and dispatches an automated polite WhatsApp alert.
   * **`[ ✓ Accept ]`**: Instantly marks tenant **PAID** (or **PAID EARLY** if paid before salary date), stamps the active staff actor (*Manager Ramesh / Co-Owner Arun / Owner Bhargav*), and zeroes out balance.
2. **Early Payment Intelligence**:
   * Smart handling for tenants who pay on the 1st even when scheduled for the 3rd or 5th. Automatically clears their balance across both dates.
3. **Flexible Payment Mode (Cash vs Online UPI)**:
   * Supports manual cash recording to locker or direct UPI reference entry with 1-tap confirmation.

### A. 📅 Day-Wise Rent Collection Calendar Hub (`owner_rent_collection_screen.dart`)
1. **View Mode Switcher**:
   * Seamless toggle between **`[ 📅 Salary Date Calendar ]`** and **`[ 🏢 By Floor & Rooms ]`**.
2. **Horizontal Salary Date Strip**:
   * Interactive pills for `1st`, `2nd`, `3rd`, `5th`, `7th`, `10th`, `15th` of the month with real-time bed count badges.
3. **Selected Day Cashflow Banner**:
   * Highlights expected inflow for that salary cycle (e.g. `5th of Month • 12 Tenants • ₹1,02,000 Expected`).
4. **2-Row Action Button Layout on Every Tenant Card**:
   * **Row 1**: Side-by-side **`[ 📞 Call ]`** and **`[ 💬 WhatsApp ]`** chat.
   * **Row 2**: Side-by-side **`[ 💵 Record Payment ]`** and **`[ 🗓️ Change Date ]`** (or **`[ 📄 View Receipt ]`** if paid).
5. **Flexible Record Payment Modal (Cash or Online UPI)**:
   * Supports **Cash Payment** or **Paid Online (Direct UPI)** with optional UTR.
   * **Staff Attribution**: Select who collected/verified (*Manager Ramesh / Co-Owner Arun / Owner Bhargav*).
   * **Zero Forced Receipts**: 1-tap **`[ Confirm & Mark Paid ]`** without spamming unwanted messages.
6. **1-Tap Re-Assign Pay Date Modal**:
   * Quick chips to shift tenant's monthly pay date (e.g. 5th $\rightarrow$ 10th) with reason notes and automatic reminder pause.

### A. 💳 Spacious, Breathable Plan & Billing Hub (`owner_saas_billing_screen.dart` / Tab 3 `Plan / Pay`)
1. **Zero-Congestion Architecture**:
   * Generous 22px card padding, clean `#F6F8FA` background, large Outfit typography, and open breathing space.
2. **Focused 3-Card Starting View**:
   * **Card 1: Active Subscription & Next Payment Due**: Shows Growth PG Plan (₹999/mo + 18% GST), next auto-debit on 30 Sep 2026, and tall 50px `[ 💳 Pay & Renew Subscription (₹1,178.82) ]` CTA.
   * **Card 2: Recent Payment Receipt**: 1-Tap `[ 📄 PDF ]` download button for SAC 998315 official invoice.
   * **Card 3: Upgrade Property Capacity**: Clean card with `[ Explore & Upgrade Plans ➔ ]` CTA.
3. **Locked Plan Upgrade Modal (Higher Tiers Only)**:
   * Displays all tiers (*Starter Free, Growth ₹999, Mid-Scale ₹1,299, Multi-PG ₹1,499, Enterprise*).
   * Current active plan is marked **`Active Plan`**.
   * Lower plans are disabled with **`Current Plan is Higher`**.
   * Higher tiers have active **`[ Upgrade to {Plan} ]`** action leading to Razorpay itemized checkout!
4. **Apple & Google Play Legal Compliance Box**:
   * Itemized SAC Code 998315 18% GST, 24h auto-renewal notice, 7-day money-back refund guarantee, and 1-tap `[ Cancel Auto-Renewal ]` action.
1. **Interactive 5-Tier Pricing Matrix**:
   * `🌱 Starter / Micro (≤ 25 Beds)`: **₹0 (Free Forever)**
   * `🚀 Growth PG (26 to 100 Beds)`: **₹999 / month** (or ₹9,990/year - 20% OFF) `[MOST POPULAR]`
   * `🏢 Mid-Scale Hub (101 to 200 Beds)`: **₹1,299 / month** (or ₹12,990/year)
   * `🏙️ Multi-PG Network (201 to 1,000 Beds)`: **₹1,499 / month** (or ₹14,990/year)
   * `👑 Enterprise Coliving (1,000+ Beds)`: **Custom Enterprise SLA Quote**
2. **Bed Telemetry & License Status**:
   * Shows active property (`Greenview PG`) with `31 / 35 Active Beds`.
   * Next Renewal: `30 September 2026 (Auto-Debit Active via UPI / Card)`.
3. **1-Tap Razorpay Checkout Modal**:
   * Itemized SAC Code `998315` (Software as a Service).
   * Base Plan: ₹999.00 | CGST (9%): ₹89.91 | SGST (9%): ₹89.91 | Total: **₹1,178.82**.
   * One-tap instant payment confirmation & active license update.
4. **Tax Invoices History & PDF Downloads**:
   * Downloadable 18% GST itemized tax invoices (`INV-2026-0881`, `INV-2026-0780`).
5. **Apple App Store Guideline 3.1.2 Compliance**:
   * Explicit 24-hour auto-renewal disclosures, 7-day money-back guarantee, and 1-tap subscription cancellation.

---

### B. 🏢 Property Scale & Bed Capacity Setup (`owner_settings_screen.dart` — 2-Step C1–C4 Drilldown)
A centralized master configuration module that allows the owner to view captured onboarding data and upgrade PG bed capacity (e.g. 35 $\rightarrow$ 45 beds) without duplicate typing:

1. **Category Overview (Step 1)**:
   * **`C1: Owner Personal Identity`**: *Bhargav S Kulkarni • +91 86188 18322 • Aadhaar Verified*
   * **`C2: Property Location & Infrastructure`**: *Greenview Luxury Coliving • Koramangala 5th Block • Lift & Generator*
   * **`C3: Floors, Rooms & Bed Capacity`**: *4 Floors • 14 Rooms • 35 Total Beds* `[ EDIT CAPACITY ]`
   * **`C4: Sharing Types & Rent Structure`**: *1, 2 & 3 Sharing • ₹7,500 – ₹14,000 / mo • 30-Day Notice*

2. **Interactive Capacity & Sharing Editor (Step 2)**:
   * Tapping **`C3`** opens the full layout with the **`[ Upgrade Bed Capacity ]`** action.
   * Slides up the live editor to adjust:
     * Total Building Floors (e.g. 4 $\rightarrow$ 5).
     * Ground Floor Rooms & Upper Floor Rooms.
     * Sharing Distribution (1-Sharing, 2-Sharing, 3-Sharing, 4-Sharing).
     * **Live Green Pill auto-recalculates**: `45 Total Beds (18 Rooms)`.
     * Tapping **`[ Save & Upgrade to 45 Beds ]`** instantly updates the capacity across the entire app (Dashboard hero arc, Rooms matrix, and SaaS licensing tier).

---

### C. ⚡ Master Rent & Dues Collection Settings Subview (`owner_settings_screen.dart`)
1. **Dues Collection Rules**:
   * `Accept In-App Direct UPI Payments` `[ ON / OFF ]` (If OFF, mandates cash only at desk).
   * `Auto-Debit Daily Late Fine (₹100/day)` `[ ON / OFF ]`.
   * `Accept Partial Rent Payments` `[ ON / OFF ]`.
2. **Automated Reminders & Receipts**:
   * `Auto-Send WhatsApp PDF Receipts` `[ ON / OFF ]`.
   * `Automated Dues WhatsApp Reminders` `[ ON / OFF ]`.
3. **Receipt Terms & Conditions Customizer**:
   * Dedicated **`[ Edit ]`** bottom sheet to modify legal terms printed on 50ms PDF receipts.

---

### D. 🛡️ Tenant Onboarding & KYC Settings Subview (`owner_settings_screen.dart`)
1. **Onboarding Rules**:
   * `Auto-Send Welcome WhatsApp Pack` `[ ON / OFF ]`.
   * `Auto-Approve Move-In Bookings` `[ ON / OFF ]`.
   * `Send Advance Deposit Reminders` `[ ON / OFF ]`.
   * `Lock Resident Profile After Move-In` `[ ON / OFF ]`.
2. **Identity & KYC Verification**:
   * `Mandatory Aadhaar KYC Verification` `[ ON / OFF ]`.
   * `Require Photo Proof for Maintenance Tickets` `[ ON / OFF ]`.
   * `Apply KYC Rule To`: Dropdown (*All Residents* vs *Long-Term Only*).
3. **Digital Business Stamp & Seal**:
   * Dedicated **`[ Edit ]`** bottom sheet to configure Authorized Signatory Name & Official Business Name.

---

### E. 👥 Co-Owner & Manager Action Attribution Architecture
* Payments, cash receipts, damage deductions, and extensions are tagged with the active actor:
  * `✓ Verified by Ramesh Gowda (Manager) • Receipt #REC-8901`
  * `✓ Paid ₹8,500 Cash to Warden Ramesh (Audit #CSH-102)`
  * `⏳ Extension till 15 Aug granted by Arun (Co-Owner)`

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

*This document is the permanent single source of truth and system memory for UrbanStay as of 1 September 2026.* 🕉️✨
