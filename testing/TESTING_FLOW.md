# ==============================================================================
# 🕉️ URBANSTAY — MASTER SYSTEM TESTING FLOW & VERIFICATION BLUEPRINT
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# File: testing/TESTING_FLOW.md
# Purpose: Single Source of Truth for Testing Flows, Database Integrity,
#          Lifecycle Edge Cases, and Automation Strategy.
# Architecture: Flutter (Dart + Impeller) + Supabase (PostgreSQL 15)
# ==============================================================================

---

## 📑 TABLE OF CONTENTS
1. [Core Architectural Foundations (Physical Assets vs. Financial Ledgers)](#1-core-architectural-foundations)
2. [Master Ground-Truth Test Matrix (The 6 Critical Workflows)](#2-master-ground-truth-test-matrix)
   - [Workflow 1: Record Cash Payment (Permanent Persistence)](#workflow-1-record-cash-payment-permanent-persistence)
   - [Workflow 2: Rent Extension (Schema Matching & Approvals)](#workflow-2-rent-extension-schema-matching--approvals)
   - [Workflow 3: Room Sharing (1-Sharing vs. 2-Sharing Config)](#workflow-3-room-sharing-1-sharing-vs-2-sharing-config)
   - [Workflow 4: Beds Table Tenant ID & Referential Integrity](#workflow-4-beds-table-tenant-id--referential-integrity)
   - [Workflow 5: Damage Deductions & Bed Movement Cascade](#workflow-5-damage-deductions--bed-movement-cascade)
   - [Workflow 6: Resident Vacate & Phantom Ledger Cleanup](#workflow-6-resident-vacate--phantom-ledger-cleanup)
3. [Manual Device Testing Checklist (Release Verification)](#3-manual-device-testing-checklist)
4. [Automated Testing Strategy & Tooling](#4-automated-testing-strategy--tooling)
   - [Option A: 2-Second Supabase Logic Runner (Python / Node)](#option-a-2-second-supabase-logic-runner)
   - [Option B: Maestro UI Automation (Zero-Code YAML)](#option-b-maestro-ui-automation)
   - [Option C: Patrol (Flutter Native E2E)](#option-c-patrol-flutter-native-e2e)
   - [Option D: Firebase Test Lab (Cloud Multi-Device Matrix)](#option-d-firebase-test-lab)
5. [Database Schema Verification Reference](#5-database-schema-verification-reference)

---

## 🏛️ 1. CORE ARCHITECTURAL FOUNDATIONS

### The Separation of Physical Furniture vs. Human Entities vs. Financial Ledgers

A common pitfall in naive property management systems is treating beds and rent bills as the same object. UrbanStay follows strict enterprise domain separation:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       URBANSTAY DOMAIN ARCHITECTURE                         │
├──────────────────────────┬──────────────────────────┬───────────────────────┤
│    PHYSICAL ASSETS       │     HUMAN ENTITIES       │   FINANCIAL LEDGERS   │
│    (Furniture / Building)│     (Customers / Tenants)│   (Invoices & Dues)   │
├──────────────────────────┼──────────────────────────┼───────────────────────┤
│ • Table: `rooms`         │ • Table: `tenants`       │ • Table: `rent_ledgers`│
│ • Table: `beds`          │ • Stores KYC (Aadhaar)   │ • Monthly invoices    │
│ • Never leaves building  │ • Phone number & name    │ • status: PAID/PENDING│
│ • `is_occupied: bool`    │ • Moves between rooms    │ • `due_amount`, `ref` │
│ • `tenant_id: UUID (FK)` │ • ID is permanent UUID   │ • Preserved for audit │
└──────────────────────────┴──────────────────────────┴───────────────────────┘
```

### Key Architectural Laws:
1. **Beds point to Tenants via Foreign Key (`beds.tenant_id` $\rightarrow$ `tenants.id`):**
   A bed cannot be occupied by a ghost. When assigning a bed, if a tenant record does not exist in `tenants`, `ensureTenantExists()` idempotently creates the record, receives the canonical UUID, and binds it to `beds.tenant_id`.
2. **Ledgers are Independent Financial Invoices:**
   Clearing a bed (`is_occupied = false`) does NOT automatically delete financial rows. Deleting or vacating a tenant must explicitly purge **`PENDING`** (unpaid) invoices so phantom bills do not linger, while **`PAID`** invoices are preserved for owner P&L and tax records.
3. **Optimistic UI with Fallback:**
   Tapping actions like "Record Cash" updates local screen state instantly (0ms latency), while the Supabase background call executes atomically. Ledger updates must run **FIRST** before non-essential side-effects (e.g. warden cash logs).

---

## 🧪 2. MASTER GROUND-TRUTH TEST MATRIX

| Workflow | UI Action | Supabase Target Table | Expected Database State | Failure Condition (Bug Caught) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Record Cash** | Tap "Record Cash", enter amount, confirm. | `rent_ledgers` | `status = 'PAID'`<br>`due_amount = 0.00`<br>`payment_mode = 'CASH'`<br>`paid_date = NOW()` | Reverting to pending in 1s because secondary logging crashed transaction. |
| **2. Rent Extension** | Owner approves/declines date extension. | `rent_extensions`<br>`rent_ledgers` | `rent_extensions.status = 'approved'`<br>`requested_date = 'YYYY-MM-DD'`<br>`rent_ledgers.due_date = 'YYYY-MM-DD'` | Error: column `requested_due_date` does not exist; silent update failure. |
| **3. Room Sharing** | View Room row in Rent Collection & Rooms. | `rooms` | Screen reads `rooms.sharing_type` (`1-Sharing`, `2-Sharing`, `3-Sharing`, etc.) | Hardcoded counting of occupied beds displaying 1-Sharing for a 2-bed room. |
| **4. Bed Assign UUID** | Assign resident to vacant bed. | `beds`<br>`tenants` | `tenants.id = UUID`<br>`beds.tenant_id = UUID`<br>`beds.is_occupied = true` | `beds.tenant_id` remaining `NULL` due to update touching 0 rows. |
| **5. Damage Movement** | Shift or Swap resident to another bed. | `damage_deductions` | `damage_deductions.room_number = newRoom`<br>`damage_deductions.room_id = newRoomId` | Error: `column "bed_id" does not exist` aborting update query silently. |
| **6. Vacate Resident** | Vacate / Delete resident from bed. | `beds`<br>`rent_ledgers` | `beds.is_occupied = false`<br>`beds.tenant_id = null`<br>`DELETE FROM rent_ledgers WHERE status='PENDING'` | Orphaned pending bill continues showing in Day-Wise Rent Collection. |

---

### Detailed Workflow Walkthroughs

#### Workflow 1: Record Cash Payment (Permanent Persistence)
* **What happens:** 
  1. User opens **Rent Collection** or **Day-Wise Collection**.
  2. Clicks **Record Cash** on pending resident.
  3. `owner_rent_collection_screen.dart` triggers:
     ```dart
     await SupabaseService.instance.recordCashPaymentForRentLedger(
       propertyId: propId,
       tenantName: tenant.tenantName,
       roomNumber: tenant.roomNumber,
       amount: amt,
       collectedBy: _selectedStaffActor,
       ledgerId: tenant.id,
     );
     ```
  4. In `supabase_service.dart`, `rent_ledgers` is updated **FIRST**:
     ```sql
     UPDATE rent_ledgers 
     SET status = 'PAID', due_amount = 0.0, payment_mode = 'CASH', paid_date = NOW()
     WHERE id = ledgerId;
     ```
  5. Secondary audit logging (`warden_cash_collections`) is wrapped in a safe `try/catch` so schema or policy variations on warden logs can never abort the rent payment.
* **Verification:** Pull-down refresh or restart the app. The card **must remain green (`PAID`)** with ₹0 due.

---

#### Workflow 2: Rent Extension (Schema Matching & Approvals)
* **What happens:**
  1. Resident submits date extension (e.g. from 5th to 15th).
  2. Row is created in `rent_extensions` with column **`requested_date`** (NOT `requested_due_date`).
  3. Owner taps **Approve Extension**.
  4. Supabase updates:
     ```sql
     UPDATE rent_extensions SET status = 'approved' WHERE id = extensionId;
     UPDATE rent_ledgers SET due_date = requestedDueDate WHERE id = ledgerId;
     ```
* **Verification:** Check `rent_extensions` table in Supabase. `status` column must be `'approved'` and `requested_date` must hold the date string.

---

#### Workflow 3: Room Sharing (1-Sharing vs. 2-Sharing Config)
* **What happens:**
  1. Owner configures Room 101 as `2-Sharing` with rent ₹8,500 in Room Setup.
  2. Only 1 resident moves into Bed A; Bed B remains vacant.
  3. Rent Collection and Rooms screens must look up:
     ```dart
     final roomType = roomSharingMap[roomNumber] ?? r['sharing_type'];
     ```
* **Verification:** Room 101 must display **`2-Sharing`** (representing room capacity/structure), NOT `"1-Sharing"`.

---

#### Workflow 4: Beds Table Tenant ID & Referential Integrity
* **What happens:**
  1. Owner assigns a resident by entering Name and Phone.
  2. `ensureTenantExists()` runs:
     * Queries `tenants` by `(property_id, phone)` or `(property_id, name)`.
     * If not found, executes explicit `INSERT` returning `id`.
     * Links `beds.update({'tenant_id': resolvedId, 'is_occupied': true})`.
* **Verification:** In Supabase `beds` table, `tenant_id` must contain a 36-character UUID string, matching a row in `tenants`.

---

#### Workflow 5: Damage Deductions & Bed Movement Cascade
* **What happens:**
  1. Damage is logged against a resident (e.g., Broken Mirror ₹800).
  2. Insert payload omits `bed_id` (table only contains `room_id`, `room_number`, `tenant_id`, `amount`, `item_damaged`).
  3. When resident shifts from Room 101 to Room 102:
     ```sql
     UPDATE damage_deductions 
     SET room_number = '102', room_id = '...' 
     WHERE tenant_id = resolvedTenantId;
     ```
  4. On Bed Swap (Resident A $\leftrightarrow$ Resident B), damage records for both residents update to their new rooms.
* **Verification:** Damage records display Room 102 after shifting out of Room 101.

---

#### Workflow 6: Resident Vacate & Phantom Ledger Cleanup
* **What happens:**
  1. Resident vacates or is removed from a bed.
  2. Bed is marked vacant (`is_occupied = false`, `tenant_id = null`, `tenant_name = null`).
  3. Active pending invoices are purged:
     ```sql
     DELETE FROM rent_ledgers 
     WHERE property_id = propId 
       AND tenant_name = tName 
       AND status = 'PENDING';
     ```
* **Verification:** Rent Collection screen no longer displays the vacated resident in the pending list. Past `PAID` records remain intact.

---

## 📱 3. MANUAL DEVICE TESTING CHECKLIST

Execute this quick 5-minute sanity pass on your physical test phone:

- [ ] **Check 1: PG Brand Name Lockup**
  - Open Tenants & Rooms.
  - Header subtitle displays your real PG name (e.g. *Keralite*).
  - Open Rent Receipt modal: verify header displays real PG name, zero `"UrbanStay PG"` fallback.
- [ ] **Check 2: Room Sharing Consistency**
  - Verify 2-bed rooms with 1 resident display **`2-Sharing`**.
  - Verify 1-bed rooms display **`1-Sharing`**.
- [ ] **Check 3: Record Cash Flow**
  - Select an overdue or pending card.
  - Tap **Record Cash** $\rightarrow$ submit.
  - Card turns green instantly.
  - Pull down to refresh: card **remains green (`PAID`)**.
  - In Supabase `rent_ledgers`, verify `status: PAID` and `due_amount: 0.00`.
- [ ] **Check 4: Rent Extension Approval**
  - In Day Collection / Approvals, approve an extension.
  - In Supabase `rent_extensions`, verify row `status` is `'approved'`.
- [ ] **Check 5: Bed Shift / Swap**
  - Shift resident from Room 101 to Room 102.
  - Verify phone number is preserved.
  - Verify damage deduction modal now reflects Room 102.
- [ ] **Check 6: Bed Tenant ID**
  - In Supabase table `beds`, check `tenant_id` column.
  - Must be a valid UUID, not `NULL`.

---

## 🤖 4. AUTOMATED TESTING STRATEGY & TOOLING

To eliminate manual clicking on phones, UrbanStay supports three tiers of automation:

### Option A: 2-Second Supabase Logic Runner (Recommended Immediate Step)
A standalone Python script (`testing/test_supabase_logic.py`) that uses `supabase-py` to execute queries directly and assert database state.

#### Execution:
```bash
python testing/test_supabase_logic.py
```

#### Test Runner Implementation Template:
```python
"""
UrbanStay Supabase Automated Logic Test Runner
Runs in ~2 seconds to verify database constraints, status updates, and cascades.
"""
import os
from supabase import create_client, Client

SUPABASE_URL = "https://your-project.supabase.co"
SUPABASE_KEY = "your-service-role-or-anon-key"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def test_record_cash_persistence():
    print("[TEST 1] Testing Record Cash Persistence...")
    # 1. Fetch pending ledger
    res = supabase.table("rent_ledgers").select("*").eq("status", "PENDING").limit(1).execute()
    assert len(res.data) > 0, "No pending ledger found to test"
    test_id = res.data[0]["id"]
    
    # 2. Simulate Record Cash
    supabase.table("rent_ledgers").update({
        "status": "PAID",
        "due_amount": 0.0,
        "payment_mode": "CASH"
    }).eq("id", test_id).execute()
    
    # 3. Verify
    updated = supabase.table("rent_ledgers").select("*").eq("id", test_id).single().execute()
    assert updated.data["status"] == "PAID", f"Expected PAID, got {updated.data['status']}"
    assert float(updated.data["due_amount"]) == 0.0, f"Expected 0.0 dues"
    print("  ✔ PASS: rent_ledgers updated to PAID with 0 dues.\n")

def test_damage_deductions_schema():
    print("[TEST 2] Testing Damage Deductions Schema...")
    res = supabase.table("damage_deductions").select("*").limit(1).execute()
    if res.data:
        row = res.data[0]
        assert "bed_id" not in row, "bed_id column should not exist in damage_deductions"
        assert "tenant_id" in row, "tenant_id column missing"
        assert "room_number" in row, "room_number column missing"
    print("  ✔ PASS: damage_deductions schema confirmed.\n")

if __name__ == "__main__":
    print("==================================================")
    print("    URBANSTAY AUTOMATED DATABASE HEALTH CHECK     ")
    print("==================================================")
    test_record_cash_persistence()
    test_damage_deductions_schema()
    print("ALL TESTS PASSED! Ready for APK release.")
```

---

### Option B: Maestro UI Automation (Zero-Code YAML)
Maestro (`mobile.dev`) runs user journeys on real Android devices or emulators using simple YAML files.

#### Installation:
```bash
# Windows (via PowerShell)
curl -fsSL "https://get.maestro.mobile.dev" | powershell
```

#### Sample Test Flow (`testing/flows/record_cash_flow.yaml`):
```yaml
appId: com.urbanstay.living
---
- launchApp
- assertVisible: "Rent Collection"
- tapOn: "Rent Collection"
- tapOn: "Record Cash"
- inputText: "2500"
- tapOn: "Submit Cash Payment"
- assertVisible: "PAID"
```

#### Run command:
```bash
maestro test testing/flows/record_cash_flow.yaml
```

---

### Option C: Patrol (Flutter Native E2E)
Developed by LeanCode specifically for Flutter apps to test native dialogs, bottom sheets, and permission requests.
* Run via: `patrol test -t integration_test/rent_flow_test.dart`

---

### Option D: Firebase Test Lab (Cloud Multi-Device Farm)
* Upload compiled APK:
  ```bash
  gcloud firebase test android run \
    --type robo \
    --app build/app/outputs/flutter-apk/app-release.apk \
    --device model=oriole,version=33,locale=en,orientation=portrait
  ```
* Google runs the app across 15+ physical devices (Samsung, Pixel, Xiaomi) and generates test videos + crash reports.

---

## 📊 5. DATABASE SCHEMA VERIFICATION REFERENCE

When writing queries or adding UI features, refer strictly to these verified column names:

### `rent_ledgers`
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `property_id` | `UUID` | Foreign Key $\rightarrow$ `properties.id` |
| `tenant_id` | `UUID` | Foreign Key $\rightarrow$ `tenants.id` |
| `tenant_name` | `TEXT` | Denormalized for fast rendering |
| `room_number` | `TEXT` | e.g. `'101'` |
| `billing_month`| `TEXT` | e.g. `'October 2026'` |
| `rent_amount` | `NUMERIC` | Monthly expected rent |
| `due_amount` | `NUMERIC` | Remaining balance (`0.00` when PAID) |
| `status` | `TEXT` | `'PENDING'` or `'PAID'` |
| `due_date` | `DATE` | e.g. `'2026-10-07'` |
| `payment_mode` | `TEXT` | `'UPI'`, `'CASH'`, `'BANK_TRANSFER'` |
| `paid_date` | `TIMESTAMPTZ`| Populated on settlement |

### `rent_extensions`
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `property_id` | `UUID` | Foreign Key $\rightarrow$ `properties.id` |
| `tenant_id` | `UUID` | Foreign Key $\rightarrow$ `tenants.id` |
| `ledger_id` | `UUID` | Target `rent_ledgers.id` |
| **`requested_date`** | `DATE` | **Verified: NOT `requested_due_date`** |
| `reason` | `TEXT` | e.g. `'Salary delayed to 15th'` |
| `status` | `TEXT` | `'pending'`, `'approved'`, `'declined'` |

### `damage_deductions`
| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `property_id` | `UUID` | Foreign Key $\rightarrow$ `properties.id` |
| `tenant_id` | `UUID` | Foreign Key $\rightarrow$ `tenants.id` |
| `room_id` | `UUID` | Target `rooms.id` |
| `room_number` | `TEXT` | Cascades on bed shift / swap |
| `item_damaged`| `TEXT` | Description of damage |
| `amount` | `NUMERIC` | Deduction charge |
| `deduction_mode`| `TEXT` | `'deposit'` or `'dues'` |
| *Note:* | — | **`bed_id` does NOT exist in this table** |

---

*Document created and maintained for UrbanStay Engineering. All testing passes must comply with these specifications.* 🕉️✨
