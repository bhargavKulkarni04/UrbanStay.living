# 📢 UrbanStay Tenant Knowledge Transfer: Food, Notice & Dashboard
**Feature Folders**:  
1. `mobile_app/lib/features/tenant_dashboard/` (`tenant_dashboard_screen.dart` - 1,624 lines)  
2. `mobile_app/lib/features/tenant_food_menu/` (`tenant_food_menu_screen.dart`)  
3. `mobile_app/lib/features/tenant_notice/` (`move_out_notice_screen.dart`)  
4. `mobile_app/lib/features/tenant_notice_board/` (`tenant_notice_board_screen.dart`)

---

## 1. Purpose of the Screens
1. **`tenant_dashboard_screen.dart`**: Resident's primary home feed. Displays Edge-to-Edge hero header image, PG Name & Location, dynamic Rent Status Banner (`'DUE'` in amber vs `'PAID'` in emerald green), Quick Action shortcuts, and bottom navigation.
2. **`tenant_food_menu_screen.dart`**: Daily mess menu across rotating weekly cycles. Crucial feature: **Daily Meal Headcount RSVP** (`_isEatingDinner = true/false`) to prevent the PG cook from cooking excess food and wasting ration.
3. **`move_out_notice_screen.dart`**: Official 30-Day Notice submission. Calculates checkout date 31 days ahead, captures move-out reason, itemizes deposit deductions, and records tenant's refund UPI ID.
4. **`tenant_notice_board_screen.dart`**: Real-time broadcasts from owner/warden for power backup maintenance, water cuts, Wi-Fi router restarts, and gate curfew alerts.

---

## 2. Actual Code State Variables & Models

### Tenant Dashboard State (`tenant_dashboard_screen.dart`)
| Code Variable | Type | Real Usage in App |
| :--- | :--- | :--- |
| `_paymentStatus` | `String` | `'DUE'`, `'UNDER_REVIEW'`, `'PAID_CYCLE_OCTOBER'` |
| `_currentRentAmount` | `double` | Monthly rent due (`8500.0`) |
| `_currentDueDate` | `String` | Due date banner (e.g. `'05 Sep'`) |
| `_currentCycleMonth` | `String` | Active billing month (e.g. `'September 2026'`) |
| `_submittedUtr` | `String` | Stored 12-digit UTR under review |
| `_activeTicket` | `Map<String, dynamic>?` | Active maintenance ticket banner |
| `_isEatingDinner` | `bool` | Quick food headcount RSVP switch |

### Meal Headcount RSVP State (`tenant_food_menu_screen.dart`)
```dart
Map<String, dynamic> todayMealRsvp = {
  'tenantId': 'USR-104',
  'roomNumber': '104',
  'date': '2026-09-28',
  'breakfast': true,
  'lunch': false,                     // Auto-skip office dabba to stop cook wastage
  'dinner': true,
  'dietPreference': 'Veg',            // 'Veg', 'Non-Veg', 'Jain'
};
```

### Move-Out Notice State (`move_out_notice_screen.dart`)
```dart
Map<String, dynamic> moveOutNotice = {
  'roomNumber': '204',
  'bedIdentifier': 'A',
  'isNoticeActive': true,
  'vacateDate': '2026-10-29',          // Exactly 31 days notice period
  'noticeDaysServed': 31,
  'selectedReason': 'Job Relocation',  // 'Job Relocation', 'Moving to Flat', etc.
  'refundUpiId': 'rahul@okhdfcbank',   // Where owner will return deposit
  'estimatedDeductions': 530.0,        // Electricity & maintenance dues
};
```

---

## 3. The Shared Link (Sync with Owner Side)

```
┌────────────────────────────────────────────────────────┐
│ TENANT DASHBOARD, FOOD & NOTICE                        │
│ • tenant_food_menu_screen.dart                         │
│ • move_out_notice_screen.dart                          │
│ • tenant_dashboard_screen.dart                         │
└──────────────────────────┬─────────────────────────────┘
                           │ TWO-WAY REAL-TIME SYNC
                           ▼
┌────────────────────────────────────────────────────────┐
│ OWNER COMMAND CENTER & ROOM MATRIX                     │
│ 1. 30-Day Notice Bed Pipeline:                         │
│    • When tenant submits notice in `move_out_notice`:  │
│      - In `owner_rooms_screen.dart`, that bed turns    │
│        into an amber badge: `status: 'Notice'`.        │
│      - `owner_dashboard` increments `1 Notice Period`. │
│      - Owner can market the bed 30 days BEFORE vacate! │
│ 2. Cook Ration Headcount:                              │
│    • When tenants toggle meal RSVPs, the total count   │
│      displays in `owner_food_menu_screen.dart` so cook │
│      only prepares food for confirmed residents.       │
│ 3. Instant Notice Broadcasting:                        │
│    • Notices posted in `owner_settings` appear live on │
│      tenant's `tenant_notice_board_screen.dart`.       │
└────────────────────────────────────────────────────────┘
```
