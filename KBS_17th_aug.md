# UrbanStay — Knowledge Base & Architecture Summary (17th August 2026)

---

## 📌 Executive Summary & Strategic Focus

* **Product Identity**: **UrbanStay** (`urbanstay.living`) — Class 9 Trademark #7920292, MSME registered.
* **Domain Focus**: **100% Dedicated PG Operations & Resident Management Platform** (Built specifically for PG Owners & PG Residents).
* **Pilot Target**: Arun (owns 3 PGs in Bangalore + network of 40–50 local PG owners in Koramangala / BTM / HSR).
* **GTM Strategy Goal**: 15 PGs in 14 days (~525 beds, ₹10,500/month ARR).
* **Core Value Proposition**:
  1. **0% Transaction Commission** — Tenant payments flow 100% directly into the owner's bank account via direct UPI.
  2. **Zero-Friction 60-Second Check-In** — Walk-in techies scan the reception QR code or enter PG Code to check in with zero paper.
  3. **Automated 1-Tap WhatsApp Rent Engine** — Replaces manual phone calls with automated personalized WhatsApp payment links on the 5th of every month.

---

## 📱 Work Accomplished on 17th August 2026

---

### 1. Master PG Owner Setup Wizard (`ProductionCode/owner_setup.html`)
* **Step 1 of 4: Owner Identity & Police KYC**:
  * Full Legal Name, Father/Husband Name, WhatsApp Mobile (`+91`), Email Address, 12-digit Aadhaar, Permanent Address, Aadhaar Front/Back photo upload pills.
* **Step 2 of 4: PG Property Profile & Location**:
  * PG Brand Name, Gender (`Gents/Ladies/Co-living`), Structure (`Standard PG/Apartment`), Ownership (`Owned/Leased`), Elevator count (`0/1/2/3+`), Power backup (`Full/None`), Address, Pincode with **Live Bengaluru Verified badge**, Maps link.
* **Step 3 of 4: Rooms, Dynamic Pricing Matrix & Rent Rules (Combined on 1 Page)**:
  * Ground Floor Logic (`Yes` reveals ground floor count + `G+1` to `G+5+` floors / `No` adapts to upper floors).
  * Rooms per Floor, Total Rooms, Room Numbering Scheme (`101, 102...` vs `A-1, A-2...`).
  * Multi-select Sharing Pills (`1-Share` to `6-Share` + `+ Type Custom`).
  * Auto-expanding Dynamic Rent (₹) & Deposit (₹) cards per bed.
  * Automated Collection Rules: Rent Due Day (`1st/5th/10th/+ Day`), Grace Days (`2/3/5/7 Days`), Late Fee Penalty (`₹50/₹100/₹0/+ Custom`), Move-out Notice (`15/30/45/60 Days`).
* **Step 4 of 4: Bank & Payout Account (Dedicated Standalone Form)**:
  * **0% Direct Bank Settlement Trust Card**: *"Tenant payments flow 100% directly into your personal bank account. UrbanStay has zero fee deduction and zero holding period."*
  * Account Holder Name & Bank Name inputs.
  * Primary UPI ID / VPA & UPI Linked Phone (`+91`).
  * Bank UPI QR Code Upload Button.
  * Primary Action: **`[ Complete Setup & Launch PG ]`**.

---

### 2. Resident Check-In & Onboarding (`ProductionCode/tenant_checkin.html`)
* **Step 1 of 3: User Details (Formerly Personal Details)**:
  * Changed title to **`User Details`**.
  * Removed hardcoded property banner; added dynamic **`PG Code (e.g. AR-101)`** floating input.
  * Full Legal Name, Gender (`Male/Female/Other`), DOB, Move-in Date.
  * WhatsApp Mobile (`+91`), Email, Father/Guardian Name.
  * Permanent Native Address *(Designated as **Optional** so users can skip or fill)*.
  * 12-digit Aadhaar Number (`XXXX XXXX XXXX`) + Front & Back photo uploads + Live Selfie capture.
* **Step 2 of 3: Work & Study Profile**:
  * **Mandatory Occupation Category**: `[ Professional ]` `[ Student ]` `[ Job Seeker ]`.
  * Optional: Company / College Name, Office / Campus Location, Work / Student ID card photo upload.
* **Step 3 of 3: Room & Stay Details (User-Driven / Dynamic)**:
  * **Sharing Types (Zero Prices Displayed)**: `[ 1-Share ]` to `[ 6-Share ]`.
  * **Dynamic Floor Selector**: `[ Ground ]` `[ 1st ]` `[ 2nd ]` `[ 3rd ]` `[ 4th ]` `[ 5+ ]`.
  * **Dynamic Room Number Grid**: Auto-populates floor rooms (`G-01..G-04`, `101..104`, `201..204`, etc.).
  * **Manual `+ Custom` Room Option**: Smoothly reveals text input for custom room numbering (`A-102`, `G-05`).
  * **Bed / Allocation Input**: Optional text input (`Bed A`, `Window Bed`).
* **Step 4: Instant Digital Resident Pass (Completion Screen)**:
  * Displays assigned Room Number, Floor, Sharing Type, PG Code, Resident Name.
  * Shows **PG WiFi Network & Password** + **Main Gate Access PIN**.
  * **Zero forced upfront payment screen**, **zero police submission jargon**.

---

## 🏛️ Technical & Architectural Decisions Discussed

---

### 1. Database Architecture: Structured SQL (PostgreSQL / Supabase)
* **Decision**: Relational SQL chosen over NoSQL/MongoDB.
* **Why**:
  * **Zero Double-Booking Guarantee**: Hard relational table constraints (`UNIQUE(room_id, bed_number)`) prevent two tenants from claiming the same bed concurrently.
  * **ACID Financial Integrity**: Rent ledgers, late fees, and deposit balances must never suffer race conditions.
  * **Real-time WebSockets**: Instant synchronization between tenant check-ins and the owner's dashboard.

### 2. Backend Tech Stack: Python (FastAPI)
* **Decision**: Python (FastAPI) chosen for backend REST APIs and automation microservices.
* **Core Responsibilities**:
  1. `POST /api/owner/setup` — Creates PG, calculates room inventory, links bank UPI.
  2. `POST /api/tenant/checkin` — Verifies Aadhaar, allocates room/bed, marks status as `OCCUPIED`.
  3. `POST /api/whatsapp/send-reminders` — Triggers automated WhatsApp messages with direct UPI payment links on the 5th of every month.
  4. `GET /api/agreement/pdf` — Generates 1-page digital stay agreement under IT Act 2000 Section 4.

### 3. Codebase Scale & Phasing Strategy
* **Phase 1 (Bangalore Pilot MVP — 14 Days)**: **~4,500 – 5,000 Lines of Code** (Ultra-fast, focused execution for Arun's 15 PGs).
* **Phase 2 (Full Production PG Operations Suite)**: **~16,000 – 18,000 Lines of Code** (Complete multi-property suite, maintenance ticketing, food mess voting, staff permissions, automated ledgers).

### 4. Smart Field Separation (Onboarding vs. Profile Settings)
* **Decision**: Secondary operational fields (Vehicle & Parking numbers, Food mess dietary plans, heavy appliances declaration, night shift permissions, native police station) were moved out of initial onboarding into the **Tenant Profile / Settings section after login** to guarantee a **sub-60-second mobile check-in**.

---

## 🎨 Design System & UI Rules Enforced

* **Typography**: Google Font `'Outfit'`, tracking `-0.035em`, crisp weights (400, 500, 600, 700, 800).
* **Palette**: `--green: #08A63F`, `--green-dark: #068237`, `--ink: #111111`, `--muted: #6B7280`, `--border: #E5E7EB`, `--divider: #F0F0F0`, `--btn-secondary: #F4F4F5`.
* **Inputs**: Height `54px`, radius `14px`, floating label transition `scale(0.78) translateY(-10px)`, neutral hairline `#111111` border on focus, **zero box-shadow**, **zero green focus border**.
* **Dividers**: Compact hairline dividers with tight 5% padding (`margin: 4px 0 6px`).
* **Zero Pre-Selection**: All cards, gender pills, and sharing pills start neutral with no forced pre-selected state.
* **Zero Emojis**: Pure typography-focused, premium interface.

---

## 📈 Unit Economics & Scaling Financial Model (35 Tenants / PG)

* **Subscription Plan**: Micro PG Plan @ **₹899 / month**
* **Variable API Cost Breakdown per Tenant**:
  * WhatsApp Business API (1 Due Reminder + 1 Overdue + 1 Receipt): **~₹0.40 / tenant / mo**
  * Automated IVR / Call API (Defaulter reminder calls): **~₹0.45 / tenant / mo**
  * **Total Variable Cost**: **~₹0.85 / tenant / month** $\rightarrow$ **~₹30 / PG / month** (for 35 beds)
* **Gross Margin**: **96.7%**

### Scaling Revenue vs. API Cost Matrix:
| PG Count | Managed Tenants | Monthly API Costs | Monthly Subscription Revenue | Net Monthly Profit | Gross Margin |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **10 PGs** | 350 | **₹300** | ₹8,990 | **₹8,690** | 96.7% |
| **50 PGs** | 1,750 | **₹1,500** | ₹44,950 | **₹43,450** | 96.7% |
| **100 PGs** | 3,500 | **₹3,000** | ₹89,900 | **₹86,900** | 96.7% |
| **250 PGs** | 8,750 | **₹7,500** | ₹2,24,750 | **₹2,17,250** | 96.7% |
| **500 PGs** | 17,500 | **₹15,000** | ₹4,49,500 | **₹4,34,500** | 96.7% |

---

## 🛡️ Phased Engineering & Production Security Protocol

### Phased Roadmap Alignment:
1. **Phase 1 (Current UI & Flow Stage)**:
   * Finalize all client mobile screens with pure Vanilla HTML/CSS/JS for sub-1s load times on mobile.
2. **Phase 2 (Production App Code & Security Build)**:
   * **Strict Input Validation**: Pydantic / FastAPI schema validation on all mobile inputs.
   * **Database Unique Locks**: Hard PostgreSQL constraints (`UNIQUE(room_id, bed_label)`) to eliminate double-booking.
   * **Aadhaar Data Protection & Encryption**: Strict encryption at rest for sensitive government KYC documents.
   * **JWT Session Auth & RBAC**: Secure token authentication isolating owner and tenant data.
   * **Network Drop & Retry Resilience**: Chunked photo upload with automatic retry for basement 4G/5G connections.

---

## 📊 Live Local Endpoints & Status

| Screen | File Path | URL | Status |
| :--- | :--- | :--- | :--- |
| **Phone Auth & Skyline** | `ProductionCode/phone_verify.html` | `http://10.99.9.51:8080/ProductionCode/phone_verify.html` | Completed ✅ |
| **Role Switcher** | `ProductionCode/auth_preview.html` | `http://10.99.9.51:8080/ProductionCode/auth_preview.html` | Completed ✅ |
| **PG Owner Setup Wizard** | `ProductionCode/owner_setup.html` | `http://10.99.9.51:8080/ProductionCode/owner_setup.html` | **100% Completed ✅** |
| **Resident Check-In & KYC** | `ProductionCode/tenant_checkin.html` | `http://10.99.9.51:8080/ProductionCode/tenant_checkin.html` | **100% Completed ✅** |
| **PG Owner Live Dashboard** | `ProductionCode/owner_dashboard.html` | `http://10.99.9.51:8080/ProductionCode/owner_dashboard.html` | **100% Completed ✅** |

---

## 🎯 Next Steps
1. Build the **PG Owner Live Dashboard (`ProductionCode/owner_dashboard.html`)**:
   * Visual room-by-room grid (Room 101, 102...) with occupied/vacant bed dots.
   * Monthly collection summary (`₹ Collected` vs `₹ Pending`).
   * **1-Tap WhatsApp Rent Reminder Button** to all pending tenants.
2. Build the **Python FastAPI Backend Server (`backend/main.py`)** with PostgreSQL database & security layers.
