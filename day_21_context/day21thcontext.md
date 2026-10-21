# ==============================================================================
# 🕉️ URBANSTAY — DAY 21 MASTER CONTEXT & ARCHITECTURAL LOG (21 OCT 2026)
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# Complete End-to-End Record of Everything Discussed, Audited, and Implemented
# ==============================================================================

---

## 📌 1. FOUNDER CONTEXT & SESSION OBJECTIVE

* **Founder**: Bhargav S Kulkarni (UrbanStay Technologies Pvt. Ltd.).
* **Mission**: India's #1 PG & Hostel Operations OS (Direct Bank 0% UPI, zero empty beds pipeline, landlord automation).
* **Today's Focus**: 
  1. Complete owner-side bug verification and notice period wiring.
  2. Audit hardcoded gaps across the Tenant Module.
  3. Build the dedicated Owner Move-Out Notices Pipeline with live Supabase queries and minimalist executive UI.
  4. Deep-dive into Cashfree Monthly UPI AutoPay architecture.
  5. Audit `tenant_checkin_screen.dart` and clarify its end-to-end wiring with Owner Setup.

---

## 🛠️ 2. OWNER-SIDE AUDIT & RESOLUTIONS (THE 8 MASTER FIXES)

Earlier in the session, 8 critical owner-side production gaps were identified, fixed, and verified:

1. **Expense Edit Duplicate Rows**:
   - *Problem*: Editing an existing expense created a new duplicate row instead of updating.
   - *Fix*: In `recordExpenseModel`, checked if `id.isNotEmpty` $\rightarrow$ calls `update()` on `expenses` table instead of inserting.
2. **Expense Delete Button**:
   - *Fix*: Added a red outline "Delete Expense" button inside the expense details modal with confirmation dialog and Supabase delete call.
3. **PG Name Update Cascade**:
   - *Problem*: Changing PG Name in View 1 did not reflect across rooms, beds, and expenses.
   - *Fix*: Implemented `cascadePropertyNameUpdate()` across `properties`, `property_settings`, `rooms`, `beds`, and `expenses`.
4. **Father's Name Removal**:
   - *Fix*: Cleanly removed Father's Name from UI inputs, resident cards, and database save payloads to keep resident onboarding friction-free.
5. **Emergency Contact Phone**:
   - *Fix*: Added Emergency Phone to View 1 card, edit modal, and live read/write to `property_settings.emergency_phone`.
6. **Wi-Fi SSID & Password**:
   - *Fix*: Added Wi-Fi SSID & Password to View 1 card with password eye visibility toggle, wired to `property_settings.wifi_ssid` and `wifi_password`.
7. **Active Property UPI ID In-Memory Refresh**:
   - *Fix*: Added `updateActivePropertyUpi()` in `OwnerAppState` and wired to View 4 Banking save so owner UPI changes immediately reflect app-wide without restarting.
8. **C2 vs View 1 PG Name Sync**:
   - *Fix*: Synchronized active property name in local state and memory store.

---

## 🛡️ 3. NOTICE PERIOD GAP & LIVE SUPABASE WIRING

### The Gap Spotted:
In `owner_rooms_screen.dart`, clicking "Give Move-Out Notice" had hardcoded "(30 Days)", completely ignored the Owner Setup choice (`properties.notice_period`), and never inserted any record into the `move_out_notices` table.

### The Fix Applied in `owner_rooms_screen.dart`:
* Added dynamic `_noticePeriod` state (e.g. `15 Days`, `30 Days`, `45 Days`, `60 Days`) fetched live from `properties.notice_period`.
* When **Giving Notice**:
  1. Updates `beds.status = 'Notice'`.
  2. Appends a new active row into `move_out_notices` with `reason = 'Owner Raised'`, `vacate_date = today + ownerNoticeDays`, `status = 'active'`.
* When **Cancelling Notice**:
  1. Updates `beds.status = 'Occupied'`.
  2. Updates matching row in `move_out_notices` to `status = 'cancelled'`.

---

## 📱 4. TENANT SIDE: MOVE-OUT NOTICE AUDIT (`move_out_notice_screen.dart`)

* **Current Hardcoded Gaps**:
  - Line 67: `_selectedVacateDate = now.add(Duration(days: 31));` (Blind 31-day default).
  - Line 99: `final minDate = now.add(Duration(days: 15));` (Hardcoded min 15 days).
  - Line 449: `_noticeDaysServed >= 30` (Hardcoded 30 check for warning color).
  - Line 402: `'15 Jan 2026'` (Fake hardcoded move-in date).
  - Line 154: `setState(() => _isNoticeActive = true);` (Only sets local UI variable, **zero Supabase save**).
* **The Decision**: Left untouched for now per user instruction ("no need to do anything here, i will tell").

---

## 🚀 5. NEW FEATURE BUILT: OWNER MOVE-OUT NOTICES HUB

* **Folder Created**: `mobile_app/lib/features/owner_notices/presentation/screens/`
* **File Created**: [`owner_notices_screen.dart`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/lib/features/owner_notices/presentation/screens/owner_notices_screen.dart)

### Design & Architecture Specifications:
* **Strict Minimalist Typography** (Stripe & Linear enterprise style):
  - No emojis or icons in text rows.
  - No bed label chips, no pre-book buttons, no box placeholders.
  - Middle dot (`•`) separators and subtle 1px hairline dividers (`#E5E7EB`).
* **Content Hierarchy per Resident**:
  - **Line 1**: `Tenant Name` (bold `#111111`) $\longleftrightarrow$ `Days Left` (amber `#D97706` if $\le 7$ days, else muted).
  - **Line 2**: `Floor • Room • Sharing` $\longleftrightarrow$ `Vacating DD MMM` (bold `#111111`).
  - **Line 3**: `Rent ₹X • Deposit ₹Y` (muted `#6B7280`).
  - **Line 4**: `Reason: Owner Raised` (if owner gave notice) or tenant's chosen reason (*e.g. `Reason: Returning to Hometown`*).
  - **Line 5 (The 2 Action Bars)**:
    - **Call Bar**: Background `#EBF8EE`, border 30% `#08A63F`, [`phone.svg`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/assets/images/phone.svg) icon, tenant's phone number in bold `#068237`. 1-tap dials number.
    - **WhatsApp Bar**: Background `#EBF8EE`, border 30% `#08A63F`, [`whatsapp.svg`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/assets/images/whatsapp.svg) icon, `WhatsApp` in bold `#068237`. 1-tap opens WhatsApp chat with pre-filled greeting.
* **Database Wiring (Zero New Tables)**:
  - Queries `move_out_notices` filtered by `property_id` and `status != 'cancelled'`.
  - Joins `rooms` on `room_number` for `floor_number` and `sharing_type`.
  - Joins `beds` and `tenants` for `base_price` (rent), `security_deposit`, and `phone`.
* **Resolved Errors**:
  - Fixed `SupabaseService.client` $\rightarrow$ `SupabaseService.instance.client`.
  - Fixed `UrbanLoading()` $\rightarrow$ `UrbanSpinner(size: 44)`.
  - Applied null-safe casting across all Supabase maps.

---

## 💳 6. CASHFREE MONTHLY AUTOPAY DEEP-DIVE

### Can Cashfree do monthly auto-pay?
**Yes, 100%** via **Cashfree Subscriptions & UPI AutoPay (e-Mandate)**.

### How it works:
1. **One-Time Mandate Setup**: Resident authorizes UPI AutoPay once on GPay/PhonePe using UPI PIN.
2. **Every Month**: Cashfree automatically debits the bank on the 1st or 5th (up to ₹15,000 without requiring PIN/OTP).
3. **Webhook Callback**: Cashfree sends `SUBSCRIPTION_PAYMENT_SUCCESS` to backend $\rightarrow$ marks `rent_ledgers.status = 'PAID'` $\rightarrow$ WhatsApp sends PDF receipt.

### The 3-State Interactive UI Lifecycle:
* **State 1: Before Payment (Due)**: "Rent Due: ₹11,500 by 05 Nov" with CTA buttons `[ ⚡ 1-Tap UPI (0% Fee) ]` and `[ 🔄 Enable AutoPay ]`.
* **State 2: During Payment**: Interactive loading overlay *"Confirming with Bank & Cashfree... Please do not close"*.
* **State 3: After Payment (Paid)**: Green checkmark *"Rent Status: PAID ✓"*, badge *"🟢 AutoPay Active: Next debit on 05 Dec"*, button `[ 📄 Download Receipt ]`.

---

## 🏨 7. TENANT CHECK-IN AUDIT (`tenant_checkin_screen.dart`)

### Current Hardcoded Dummy Data:
1. **Default PG Code**: Hardcodes `'AR-101'` fallback.
2. **Static Rooms**: `_getRoomsForFloor()` hardcodes `101..104` for all floors.
3. **Static Floors**: Shows 6 floors (`Ground`, `1st`, `2nd`, `3rd`, `4th`, `5+`) regardless of building size.
4. **Static Rents & Deposits**: Dummy numbers (`12000/24000`, `8500/17000`).
5. **Father's Name**: Still present in tenant check-in while removed from owner side.
6. **Zero Database Save**: Completing Step 4 shows a snackbar and opens dashboard without inserting into `onboarding_requests`.

### The End-to-End Wiring Architecture:
```
┌─────────────────────────────────┐
│ 1. owner_setup_screen.dart      │  Owner creates building, floors, rooms & beds
└────────────────┬────────────────┘
                 │ Saves to Supabase
                 ▼
     ┌───────────────────────┐
     │  SUPABASE DATABASE    │
     │  • properties         │
     │  • rooms              │
     │  • beds               │
     └───────────┬───────────┘
                 │
         ┌───────┴────────────────────────┐
         ▼                                ▼
┌──────────────────────────────┐    ┌──────────────────────────────┐
│ 2. tenant_checkin_screen     │    │ 3. owner_approvals_screen    │
│    Tenant scans QR Standee.  │    │    Owner reviews Aadhaar &   │
│    Reads real vacant beds.   │───>│    selfie, clicks "Approve". │
│    Submits check-in form.    │    │    Bed becomes 'Occupied'.   │
└──────────────────────────────┘    └──────────────────────────────┘
```

### How Check-In Works in Short:
1. Tenant enters or scans PG Code (`AR-101`).
2. App fetches real floors and vacant rooms from Supabase.
3. Tenant picks an empty bed and submits KYC photos.
4. Saves to `onboarding_requests` for Owner approval in `owner_approvals_screen.dart`.

---

*Document compiled and preserved for permanent workspace memory.* 🕉️✨
