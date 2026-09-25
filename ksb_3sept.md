# ==============================================================================
# 🕉️ URBANSTAY — MASTER SYSTEM PLAYBOOK & PRODUCTION LEDGER (KSB_3SEPT.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# COMPANY: UrbanStay Technologies Pvt. Ltd. (urbanstay.living)
# FOUNDER & PRODUCT ARCHITECT: Bhargav S Kulkarni (NoBrokerHood Monetization & Revenue Strategy)
# PILOT ANCHOR PARTNER: Arun (Owner of 3 PGs in Bengaluru + 40-50 PG Network in BTM/HSR)
# DATE OF RECORD: 3 September 2026
# CURRENT MASTER BUILD: Build v52 (urbanstay_v52.apk / version: 1.0.61+62)
# ==============================================================================

---

## 📱 1. CURRENT LIVE PRODUCTION STATUS & DOWNLOAD ENDPOINTS

* **Current Master APK**: **`urbanstay_v52.apk`**
* **Local HTTP Download Server**:
  * Direct Link: `http://10.209.182.51:8080/urbanstay_v52.apk`
  * Default Link: `http://10.209.182.51:8080/app.apk`
  * Directory Index: `http://10.209.182.51:8080/`
  *(Backup Port 8000)*:
  * `http://10.209.182.51:8000/urbanstay_v52.apk`
  * `http://10.209.182.51:8000/app.apk`

---

## 🚀 2. WHAT'S NEW IN BUILD V51 (3 SEPTEMBER 2026)

### A. 🎨 Standardized Executive Dashboard (Zero "Vibe-Coded" Inconsistencies)
1. **Hero Card Stat Rows**:
   * Standardized all 4 stat numbers next to the occupancy circle (`35 Beds`, `31 Beds`, `4 Beds`, `4 Staff`) to uniform, elegant `AppColors.ink` typography.
2. **Collection Health Boxes**:
   * Removed full light-green background fill from `Paid Beds` and `Defaulters`.
   * All 3 boxes now have the **exact same standard neutral container** (`#F9FAFB` with `#E5E7EB` border).
   * Number `25` is written in clean green text (`#08A63F`), while `Pending` is in solid black (`#111111`).
3. **Payment Approvals Boxes**:
   * Removed green background fill from `Approved` box. All 3 boxes now share identical neutral styling with green text for approved count.

---

### B. 🏢 Tenants & Rooms Matrix Refinements (`owner_rooms_screen.dart`)
1. **Header Cleanup**:
   * Stripped out the irrelevant `"4 Pending"` pill from the top sticky header.
2. **Floor Range Formatting**:
   * Replaced double dots `..` with clean hyphens: `1st Floor (101-104)`, `2nd Floor (201-204)`, `3rd Floor (301-304)`, `Ground Floor (G01-G04)`.
3. **Interactive 3-Card Stat Filter**:
   * **Total Tenants (31)**: Styled in **Green** (`#08A63F`). Tapping filters to show active tenants.
   * **Vacant Beds (4)**: Styled in **Black** (`#111111`). Tapping filters to show vacant beds only.
   * **Notice Period (1)**: Styled in **Amber / Yellow** (`#D97706`). Tapping filters to show residents on notice.

---

### C. 📖 Phonebook Contact Picker & Strict Bed Assignment (`_openAssignModal`)
1. **Phonebook Quick Picker (RentOK Model)**:
   * Live search bar: `Search by name or number...`.
   * Avatar contact list with initials, contact name, and phone numbers.
   * **1-Tap Auto-Fill**: Selecting any contact automatically fills **Full Name** and **Phone Number** into the form with zero typing.
2. **Strict Numeric Keypad & Data Validation**:
   * **Phone Number**: Numeric keyboard, digits-only formatter, max 10 digits.
   * **Monthly Rent & Deposit**: Numeric keyboard, digits-only formatter (`FilteringTextInputFormatter.digitsOnly`), blocking all letters/strings.
   * **Form Validation**: Checks that Name is not blank, Phone is exactly 10 digits, and Rent/Deposit are valid amounts before assigning bed.

---

*This document is the permanent single source of truth for UrbanStay Build v51.* 🕉️✨
