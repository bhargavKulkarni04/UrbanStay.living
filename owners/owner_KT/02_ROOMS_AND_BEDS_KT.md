# 🛏️ UrbanStay Owner Knowledge Transfer: Rooms, Beds & Resident Matrix
**Feature Folder**: `mobile_app/lib/features/owner_rooms/`  
**Files**:  
1. `presentation/screens/owner_rooms_screen.dart` (2,353 lines)  
2. `presentation/screens/shift_bed_screen.dart` (Bed transfer workflow)

---

## 1. Purpose of the Screen
`owner_rooms_screen.dart` is the live **Room & Bed Matrix Command Center** of UrbanStay. It provides:
1. Instant visibility over the entire building's inventory (e.g. **31/35 Beds Occupied**, 4 Vacant, 1 Notice Period).
2. Resident profile inspection (Workplace, Aadhaar verification badge, rent, deposit).
3. 1-Tap Vacant Bed Assignment with native device contacts book integration.
4. Security deposit room damage deductions before tenant vacates.
5. Internal bed shifting (`shift_bed_screen.dart`).

---

## 2. Actual Code State Variables & Models

### Filters & UI State
* `String _selectedFloor`: Active floor tab (`'all'`, `'ground'`, `'1st'`, `'2nd'`, `'3rd'`).
* `String _selectedFilter`: Active category pill (`'all'`, `'tenants'`, `'vacant'`, `'notice'`).
* `String _searchQuery` & `_searchController`: Real-time text search across resident names, phone numbers, and room numbers.

### Room & Bed Data Structure (`_rooms` in Code)
```dart
Map<String, dynamic> room = {
  'room': 'Room 101',           // e.g. "Room 101", "Room G-01"
  'floor': '1st',               // 'ground', '1st', '2nd', '3rd'
  'floorLabel': '1st Floor',    // Clean display title
  'type': '2-Sharing',          // '1-Sharing', '2-Sharing', '3-Sharing', etc.
  'occupied': 2,                // Current headcount in this room
  'total': 2,                   // Capacity of this room
  'beds': [
    // OCCUPIED BED RECORD:
    {
      'isOccupied': true,
      'bed': 'Bed A',
      'name': 'Rahul Sharma',
      'initials': 'RS',
      'status': 'Active',       // 'Active' or 'Notice'
      'phone': '9876543210',
      'work': 'Infosys',        // Company / College name
      'rent': '8500',           // Monthly rent per bed
      'deposit': '15000',       // Deposit locked
      'docs': 'Aadhaar Verified',
      'docsVerified': true,     // Green check badge
    },
    // VACANT BED RECORD:
    {
      'isOccupied': false,
      'bed': 'Bed B',
      'title': 'Vacant Bed B — Available',
      'sub': '₹7,500/mo • Ready for Walk-In',
      'rent': '7500',
      'deposit': '15000',
    }
  ]
};
```

### Action Modal Controllers
1. **Edit Resident Modal**:
   * `_nameController`, `_phoneController`, `_workController`, `_rentController`, `_depositController`
2. **Assign Vacant Bed Modal**:
   * `_assignNameController`, `_assignPhoneController`, `_assignRentController`, `_assignDepositController`
   * `FlutterContacts.getAll()`: Auto-fills name & phone directly from owner's phonebook.
3. **Damage Deduction Modal**:
   * `_damageItemController`: Item damaged (e.g. "Geyser switch broken", "Mattress torn")
   * `_damageAmountController`: Monetary charge (e.g. ₹500)
   * `_damageDeductionMode`: `'dues'` (add to monthly rent bill) or `'deposit'` (deduct from returnable deposit).
   * `_damageAttachedPhoto`: Photo proof taken by owner or warden.
4. **Shift Bed Workflow (`shift_bed_screen.dart`)**:
   * Takes `currentRoom`, `currentBed`, `residentName`.
   * Displays all available vacant beds across other floors.
   * On confirmation, updates bed occupancy without deleting resident history.

---

## 3. The Shared Link (Sync with Tenant Side)

```
┌────────────────────────────────────────────────────────┐
│ OWNER ROOM MATRIX (owner_rooms_screen.dart)            │
│ • room ('Room 101'), floor ('1st'), bed ('Bed A')      │
│ • status ('Active', 'Notice', 'Vacant')                │
│ • rent ('8500'), deposit ('15000')                     │
│ • damage deductions (item, amount, mode)               │
└──────────────────────────┬─────────────────────────────┘
                           │ REAL-TIME SYNC
                           ▼
┌────────────────────────────────────────────────────────┐
│ TENANT SCREENS                                         │
│ • tenant_dashboard_screen.dart:                        │
│   Header displays 'Room 101 • Bed A'                   │
│ • tenant_notice/move_out_notice_screen.dart:           │
│   When tenant submits 30-day notice, the bed in        │
│   owner_rooms flips status from 'Active' to 'Notice'.  │
│ • property_details_screen.dart (tenant_profile):       │
│   Displays the floor and room assigned here.           │
│ • security_deposit_screen.dart:                        │
│   Damage charges logged by owner appear itemized       │
│   under tenant's deposit statement.                    │
└────────────────────────────────────────────────────────┘
```
