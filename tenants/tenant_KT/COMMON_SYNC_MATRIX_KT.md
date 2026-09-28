# ⚡ UrbanStay Master Common Sync Matrix (The Single Source of Truth)
**Document**: Permanent Real-Time Data Synchronization Map between PG Owner & Tenant  
**Purpose**: Whenever any value is updated in the app, this matrix defines the **exact shared variables, foreign keys, and two-way sync triggers** across the codebase.

---

## 🧭 The 5 Core Synchronization Channels

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    URBANSTAY REAL-TIME DATA SYNCHRONIZATION                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. BED & OCCUPANCY MATRIX  : Room Number • Bed ID • Occupancy Status        │
│ 2. 0% UPI RENT & LEDGER    : UTR Number • Payment Proof • Receipt Number    │
│ 3. MAINTENANCE & HELPDESK  : Ticket ID • Staff Assignment • Status Notes    │
│ 4. FOOD MESS HEADCOUNT     : Date • Meal Slot • RSVP Headcount              │
│ 5. SECURITY DEPOSIT DEDUCT : Damage Item • Deducted Amount • Refund UPI VPA │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛏️ Channel 1: The Live Bed & Occupancy Matrix

### Shared Connection Keys:
* `property_id` (UUID / 6-char PG Code e.g. `'AR-101'`)
* `room_number` (`String`, e.g. `'104'`)
* `bed_id` (`String`, e.g. `'Bed B'`)

| User Action | Triggering File | Shared State Updated | Affected Screen & Result |
| :--- | :--- | :--- | :--- |
| **Tenant Checks In** | `tenant_checkin_screen.dart` | `bed.isOccupied = true`<br>`bed.status = 'Active'` | **Owner Rooms Matrix** (`owner_rooms_screen.dart`): Bed turns green, resident name/phone populated. **Owner Dashboard**: Occupancy increments (e.g. 31/35). |
| **Tenant Submits Notice** | `move_out_notice_screen.dart` | `bed.status = 'Notice'`<br>`vacate_date = +31 days` | **Owner Rooms Matrix**: Bed turns amber pill `Notice`. **Owner Dashboard**: `1 Notice Period` stat increments for forward marketing. |
| **Owner Shifts Bed** | `shift_bed_screen.dart` | `old_bed.isOccupied = false`<br>`new_bed.isOccupied = true` | **Tenant Dashboard & Profile** (`tenant_dashboard_screen.dart` & `profile_settings_screen.dart`): Header immediately updates to new room & floor. |
| **Tenant Edits Room** | `property_details_screen.dart` | `room_number = new_room`<br>`floor = new_floor` | **Owner Rooms Matrix**: Resident record moves under the updated floor/room group. |

---

## 💰 Channel 2: 0% Direct UPI Rent, Approvals & Receipts

### Shared Connection Keys:
* `invoice_id` (`UUID`)
* `utr_number` (`String`, 12 digits e.g. `'425689123456'`)
* `cycle_month` (`String`, e.g. `'September 2026'`)
* `tenant_phone` (`String`, 10 digits)

| User Action | Triggering File | Shared State Updated | Affected Screen & Result |
| :--- | :--- | :--- | :--- |
| **Tenant Pays Rent via UPI** | `rent_payment_screen.dart` | `invoice.status = 'UNDER_REVIEW'`<br>`utr_number = '4256...'`<br>`proof_screenshot = 'gpay.jpg'` | **Owner Approvals Hub** (`owner_approvals_screen.dart`): Item appears under `_pendingApprovals` with UTR & screenshot. |
| **Owner Approves UPI Rent** | `owner_approvals_screen.dart` | `invoice.status = 'PAID'`<br>`receipt_no = 'REC-8901'`<br>`verified_at = NOW()` | 1. **Tenant Dashboard**: Status flips from `'DUE'` to `'PAID'` (next cycle month auto-loads).<br>2. **Tenant Ledger**: Unlocks HRA-stamped PDF receipt download.<br>3. **Owner Rent Collection**: Moves resident from "Pending" to "Collected". |
| **Owner Rejects UPI Rent** | `owner_approvals_screen.dart` | `invoice.status = 'REJECTED'`<br>`reject_reason = 'Invalid UTR'` | **Tenant Dashboard**: Status reverts to `'DUE'` with alert to re-enter valid UTR. |
| **Tenant Pays Cash** | `paid_via_cash_screen.dart` | `payment_mode = 'CASH'`<br>`warden_name = 'Suresh'`<br>`warden_deposited = false` | **Owner Warden Cash Audit** (`owner_day_collection_screen.dart`): Transaction flags under warden's physical drawer pending cash handover. |

---

## 🛠️ Channel 3: Maintenance Helpdesk & Resolution

### Shared Connection Keys:
* `ticket_id` (`String`, e.g. `'TKT-101'`)
* `room_number` (`String`)
* `category` (`'Electrical'`, `'Plumbing'`, `'WiFi'`, `'Carpentry'`, `'Other'`)

| User Action | Triggering File | Shared State Updated | Affected Screen & Result |
| :--- | :--- | :--- | :--- |
| **Tenant Raises Ticket** | `raise_ticket_card.dart` | `ticket.status = 'pending'`<br>`photo = 'geyser_mcb.jpg'`<br>`description = '...'` | **Owner Complaints Hub** (`owner_complaints_screen.dart`): Pops up under active complaints queue with photo evidence. |
| **Owner Assigns Staff** | `owner_complaints_screen.dart` | `assigned_staff = 'Suresh'`<br>`ticket.status = 'in_progress'` | **Tenant Ticket Status** (`ticket_status_screen.dart`): Progress step activates with assigned staff name & inspection ETA. |
| **Owner Resolves Ticket** | `owner_complaints_screen.dart` | `ticket.status = 'resolved'`<br>`resolved_at = NOW()` | **Tenant Dashboard & Helpdesk**: Ticket clears from urgent dashboard banner; moves to resolved history. |

---

## 🍲 Channel 4: Food Mess Headcount (Stopping Cook Wastage)

### Shared Connection Keys:
* `property_id` (`UUID`)
* `meal_date` (`DATE`, e.g. `'2026-09-28'`)
* `meal_slot` (`'breakfast'`, `'lunch'`, `'dinner'`)

| User Action | Triggering File | Shared State Updated | Affected Screen & Result |
| :--- | :--- | :--- | :--- |
| **Tenant Skips Lunch / Dinner**| `tenant_food_menu_screen.dart`<br>or `tenant_dashboard_screen.dart` | `meal_rsvp.is_eating = false` | **Owner Food Menu** (`owner_food_menu_screen.dart`): The day's active headcount automatically decrements so cook reduces raw grocery ration. |
| **Owner Updates Weekly Menu** | `owner_food_menu_screen.dart` | `menuStore[week][day][slot]` | **Tenant Food Menu** (`tenant_food_menu_screen.dart`): Today's dishes immediately refresh on the resident's phone. |

---

## 🔒 Channel 5: Security Deposit, Damage Deductions & Refund

### Shared Connection Keys:
* `stay_id` (`UUID`)
* `total_deposit_paid` (`NUMERIC`, e.g. `17000.0`)
* `refund_upi_id` (`String`, e.g. `'bhargav@okhdfc'`)

| User Action | Triggering File | Shared State Updated | Affected Screen & Result |
| :--- | :--- | :--- | :--- |
| **Owner Logs Damage Deduction** | `owner_rooms_screen.dart`<br>(Damage Modal) | `deductions.add({'item': 'Mirror broken', 'amount': 450})` | **Tenant Security Deposit Hub** (`security_deposit_screen.dart`): Net refundable deposit updates (`₹17,000 - ₹450 = ₹16,550`) with itemized reason. |
| **Tenant Adds Refund UPI** | `personal_details_screen.dart`<br>or `move_out_notice_screen.dart` | `tenant_profile.refund_upi_id = 'bhargav@okhdfc'` | **Owner Checkout & Approvals**: Owner sees a 1-tap "Refund to bhargav@okhdfc" button upon final move-out clearance. |

---

## 📌 Summary for Database Designers: The Master Foreign Key Graph

```
                                [ properties ]
                                (owner_setup)
                                      │
                   ┌──────────────────┴──────────────────┐
                   ▼                                     ▼
                [ rooms ]                         [ food_menus ]
              (owner_rooms)                     (owner_food_menu)
                   │                                     │
                   ▼                                     ▼
                [ beds ]                        [ meal_headcounts ]
              (owner_rooms)                    (tenant_food_menu)
                   │
                   ▼
                [ stays ] ◄───────────────┐
              (tenant_checkin)            │
                   │                      │
         ┌─────────┴─────────┐            │
         ▼                   ▼            │
 [ rent_invoices ]   [ maintenance ] [ tenant_profiles ]
 (owner_approvals    (owner_complaints (tenant_profile &
  & tenant_payments)  & tenant_helpdesk) personal_details)
```
