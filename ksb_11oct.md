# ==============================================================================
# 🕉️ URBANSTAY — MASTER SESSION KNOWLEDGE & ARCHITECTURE PLAYBOOK (KSB_11OCT.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# Date: 11 October 2026 | Active Build: Flutter Web (Port 8090) / Mobile Engine
# Target: India's #1 Dedicated PG & Hostel Operations Operating System
# Founder: Bhargav S Kulkarni | Anchor Pilot: Arun (BTM Layout / HSR Network)
# ==============================================================================

---

## 📌 1. EXECUTIVE SUMMARY & MILESTONES ACHIEVED (OCTOBER 11, 2026)

Today's session eliminated the core data persistence disconnect across the entire **UrbanStay Owner Operating Suite**, bridging the mobile frontend with the live **Supabase PostgreSQL database**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   URBANSTAY OWNER DATA-FLOW ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Active Property Context ──> activePropertyId (Single Source of Truth)   │
│ 2. Room & Bed Matrix       ──> SELECT rooms(*, beds(*)) WHERE property_id   │
│ 3. 1-Tap Bed Assignment    ──> UPDATE beds SET ... WHERE id = bed_uuid      │
│ 4. Operating Expenses      ──> INSERT / SELECT expenses WHERE property_id   │
│ 5. Staff & Payroll Team    ──> public.property_team (Safe NUMERIC parsing)  │
│ 6. Production Web Bundle   ──> Released & verified on http://localhost:8090 │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Milestones:
* **Real UUID Bed Assignments**: Fixed the bed occupancy engine so assigning a resident permanently updates the exact bed in `public.beds` using its true PostgreSQL UUID.
* **Staff Roster Persistence**: Resolved the table name mismatch (`property_team`) and fixed the silent `String -> num` type casting crash so staff members (e.g. `sri`, `head of cook`) render persistently.
* **Operating Expense Ledger**: Verified end-to-end expense recording, categorization, and ledger arithmetic (₹44,444 + ₹322,323 = ₹366,767 across 2 recorded bills).
* **Cache-Free Production Release**: Compiled and deployed a fresh release web bundle served via dedicated port `8090` (`http://localhost:8090` and `http://192.168.0.15:8090`) to completely bypass browser caching.

---

## 🔍 2. DEEP ROOT CAUSE ANALYSIS (WHAT WAS ACTUALLY HAPPENING)

### Problem A: The "Only Property Details Are Capturing" Dilemma
**Symptom**: The owner setup wizard captured property details into `public.properties`, but all subsequent screens (Rooms, Expenses, Staff) appeared disconnected from the DB.

**Root Causes Identified**:
1. **The Multi-Property ID Trap**:
   - Because multiple test properties existed in the database (e.g., `Mantralaya PG`, `mallar PG`), the app was querying:
     ```dart
     client.from('properties').select('*').order('created_at', ascending: false).limit(1)
     ```
   - When the owner was looking at `Mantralaya PG` (which had 15 rooms & beds), child screens were secretly operating under `mallar PG` (which had 0 rooms).
2. **Fake Mock String IDs (`b101_1`) vs Real PostgreSQL UUIDs**:
   - The UI was holding dummy string IDs like `'b101_1'` and `'b101_2'`.
   - When attempting to assign a resident, PostgreSQL rejected the query with:
     ```
     ERROR: invalid input syntax for type uuid: "b101_1"
     ```
   - Caught in a generic `try/catch`, the error was silenced while the modal dismissed, giving the illusion of a save that never reached the DB.
3. **Table Name Discrepancy for Staff**:
   - The codebase was attempting to query `from('staff')`.
   - The live Supabase table is named **`public.property_team`**. PostgreSQL threw `relation "staff" does not exist`.
4. **Dart Runtime Type Cast Crash on Web**:
   - In `public.property_team`, `monthly_salary` is stored as a PostgreSQL `NUMERIC` column, returned via JSON REST API as a String (`"22.00"`).
   - The Dart client executed:
     ```dart
     s['monthly_salary'] as num?  // ❌ Throws TypeError: String is not a subtype of num
     ```
   - This caused `_loadStaffFromSupabase()` to fail silently inside its catch block. The record existed in PostgreSQL, but the UI crashed before rendering it.

---

## 🛠️ 3. IMPLEMENTED ARCHITECTURAL FIXES

### A. Global Active Property Context (`activePropertyId`):
* In **`lib/core/services/supabase_service.dart`**:
  - Introduced `String? activePropertyId` as the unified source of truth.
  - Refactored `getOwnerProperty({String? propertyId, String? ownerId})` to prioritize `targetId = propertyId ?? activePropertyId`.
* In **`lib/features/owner_dashboard/presentation/screens/owner_dashboard_screen.dart`**:
  - Added getter `_currentPropertyId`.
  - When the owner switches properties via the top selector modal, `SupabaseService.instance.activePropertyId` updates globally.
  - Passed `propertyId: _currentPropertyId` to all child screens:
    - `OwnerRoomsScreen(propertyId: _currentPropertyId)`
    - `OwnerExpensesScreen(propertyId: _currentPropertyId)`
    - `OwnerStaffScreen(propertyId: _currentPropertyId)`

### B. True PostgreSQL UUID Bed Binding:
* In **`lib/features/owner_rooms/presentation/screens/owner_rooms_screen.dart`**:
  - Constructor now receives `final String? propertyId`.
  - `_loadRoomsFromSupabase()` queries `SupabaseService.instance.getRoomsWithBeds(propId)` and extracts true PostgreSQL UUIDs (`b['id']`).
  - Strict validation added to `_showVacantBedAssignModal`:
    ```dart
    if (bedId.isEmpty) {
      _showToast('Cannot identify bed record. Please pull to refresh.');
      return;
    }
    ```
  - Upon successful assignment, automatically triggers `await _loadRoomsFromSupabase()` to pull fresh database state.

### C. Enterprise Staff & Team Roster Engine:
* In **`lib/core/services/supabase_service.dart`**:
  - Updated `getStaff()` and `addStaff()` to target `public.property_team` first, with graceful fallback to `staff`.
* In **`lib/features/owner_staff/presentation/screens/owner_staff_screen.dart`**:
  - Replaced unsafe `as num?` casts with bulletproof type parsing:
    ```dart
    final rawSalary = s['monthly_salary'] ?? s['salary'];
    final int salary = rawSalary is num
        ? rawSalary.toInt()
        : (num.tryParse(rawSalary?.toString() ?? '0')?.toInt() ?? 0);
    ```
  - Mapped PostgreSQL's `salary_status` column directly to the card status.
  - Added immediate database reload `await _loadStaffFromSupabase()` after adding any staff member.

### D. Expense Ledger Scoping & Validation:
* In **`lib/features/owner_expenses/presentation/screens/owner_expenses_screen.dart`**:
  - Scoped `_loadExpensesFromSupabase()` to `widget.propertyId ?? activePropertyId`.
  - Expense creation links directly to the selected property's UUID.
  - Live math verified: Total expense counter dynamically aggregates all recorded bills for the current month.

---

## 💻 4. VERIFIED TESTING DEPLOYMENT

* **Build Target**: Flutter Web Production Bundle (`flutter build web --release`).
* **Compiler Status**: Clean build in 163.7s, **0 compilation errors**.
* **Serving Layer**: Python 3.12 multi-interface daemon bound to `0.0.0.0:8090`.
* **Access URLs**:
  - Local: **`http://localhost:8090`** (or `http://127.0.0.1:8090`)
  - Network Wi-Fi: **`http://192.168.0.15:8090`**

---

## 🗺️ 5. STRATEGIC ROADMAP & NEXT PRIORITIES

### Phase A: Complete Owner Suite Hardening (Current Stage):
1. **Damage Deductions Hub (`owner_rooms_screen.dart`)**:
   - Added `14_create_damage_deductions_table.sql` (adds `property_id` and `property_name` to `public.damage_deductions`).
   - Added `SupabaseService.instance.addDamageDeduction()` with the 8-pillar loader.
   - Removed dead `Call Parent / Guardian` placeholder.
   - Added double confirmation dialogs for **Move-Out Notice** ([Cancel] vs [Yes, Give Notice]) and **Eviction** ([Cancel] vs [Yes, Evict]).
2. **Food Menu Hub (`owner_food_menu_screen.dart`)**:
   - Added `13_create_food_menus_table.sql` with dynamic 1, 2, 3, or 4 week cycles and `week_number` support.
   - Tied to `SupabaseService.instance.getFoodMenu()` and `saveFoodMenu()`.
3. **Rent Approvals (`owner_approvals_screen.dart`)**:
   - Scope UPI verification cards to `activePropertyId`.
   - Update `rent_approvals` / `payments` status directly in PostgreSQL.
4. **Rent Collection & Cash Ledger (`owner_rent_collection_screen.dart`)**:
   - Link tenant dues and offline cash collections to `activePropertyId`.
5. **Complaints & Maintenance Hub (`owner_complaints_screen.dart`)**:
   - Fetch and resolve tickets logged under `public.complaints`.
6. **Owner Settings (`owner_settings_screen.dart`)**:
   - ✅ **COMPLETED END-TO-END**: Replaced all 24 hardcoded mock variables (`_adminName`, `_adminPhone`, `_ownerAadhaar`, `_bankName`, `_beneficiaryName`, `_rentDueDay`, `_gracePeriod`, `_dailyRate`, `_noticePeriod`, `_scaleFloorCount`, `_scaleTotalRooms`, `_scaleTotalBeds`, `_scaleLiftCount`, `_scalePowerBackup`) with real Supabase columns from `public.properties` and `public.property_settings`.
   - ✅ **REAL PERSISTENCE IN ALL MODALS**: Wiring added to every modal (`Basic Property Details`, `Tenant Gender Preference`, `Renting Terms`, `Stay & Notice Rules`, `Banking & UPI Details`, `Owner Identity KYC`, `Building Infrastructure & Capacity`, and `Account Credentials`) to execute live `UPDATE public.properties` queries upon tapping "Save".

### Phase B: Resident / Tenant Experience (Simpler Consumer Flow):
* Since a resident only interacts with **one bed, one room, and one monthly rent bill**, the tenant flow will consume the clean relational records established here:
  - 0% Direct Bank UPI rent payment.
  - Instant HRA-compliant PDF rent receipts.
  - Maintenance ticket filing with photo attachments.

---

*Document created and verified for the UrbanStay Engineering Master Log.* 🕉️✨

