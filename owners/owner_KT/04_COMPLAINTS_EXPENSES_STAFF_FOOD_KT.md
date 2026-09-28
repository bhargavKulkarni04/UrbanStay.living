# 🛠️ UrbanStay Owner Knowledge Transfer: Operations, Expenses & Food
**Feature Folders**:  
1. `mobile_app/lib/features/owner_complaints/` (`owner_complaints_screen.dart`)  
2. `mobile_app/lib/features/owner_expenses/` (`owner_expenses_screen.dart`)  
3. `mobile_app/lib/features/owner_staff/` (`owner_staff_screen.dart`)  
4. `mobile_app/lib/features/owner_food_menu/` (`owner_food_menu_screen.dart`)

---

## 1. Purpose of the Screens
1. **`owner_complaints_screen.dart`**: Maintenance ticketing hub. Owner reviews tenant complaints (plumbing, electrical, Wi-Fi), views photo evidence, assigns staff, and updates progress to resolved.
2. **`owner_expenses_screen.dart`**: PG Operating P&L Ledger. Logs monthly utility bills (BESCOM power, water tankers, cook ration, Wi-Fi recharge) with receipt uploads.
3. **`owner_staff_screen.dart`**: Staff directory for wardens, cooks, housekeepers, and security with salary approval tracking.
4. **`owner_food_menu_screen.dart`**: Configures weekly breakfast, lunch, and dinner menus across 2 to 4-week rotating cycles.

---

## 2. Actual Code State Variables & Models

### Active Maintenance Ticket Model (`_activeTickets` in `owner_complaints_screen.dart`)
```dart
Map<String, dynamic> ticket = {
  'id': 'TKT-101',
  'residentName': 'Amit Verma',
  'phone': '9988776655',
  'room': 'Room 201',
  'bed': 'Bed B',
  'floor': '2nd Floor',
  'category': 'Electrical',          // 'Electrical', 'Plumbing', 'WiFi', 'Carpentry', 'Other'
  'issue': 'Geyser in bathroom is tripping MCB switch every 2 mins.',
  'reportedDate': '28 Aug 2026, 08:30 AM',
  'photoName': 'geyser_mcb_issue.jpg',
  'hasPhoto': true,
  'status': 'pending',               // 'pending', 'in_progress', 'resolved'
  'assignedStaff': 'Suresh (Warden)', // Assigned technician
  'progressNote': 'Electrician called, will inspect by 4 PM',
};
```

### Operating Expense Record (`_expenses` in `owner_expenses_screen.dart`)
```dart
Map<String, dynamic> expense = {
  'id': 'EXP-101',
  'title': 'Electricity Bill',
  'category': 'Electricity',         // 'Electricity', 'Water', 'Groceries', 'Salary', 'Maintenance', 'WiFi'
  'vendor': 'BESCOM Karnataka • Meter #48921 (3 Floors)',
  'amount': 24500,
  'date': '15 Aug 2026',
  'mode': 'Direct Bank Transfer',    // 'UPI', 'Direct Bank Transfer', 'Cash'
  'ref': 'Ref: TXN99120',
  'receiptFile': 'bescom_bill_aug2026.pdf',
  'hasReceipt': true,
};
```

### Staff Member Record (`_staffList` in `owner_staff_screen.dart`)
```dart
Map<String, dynamic> staffMember = {
  'id': 'STF-101',
  'name': 'Suresh Kumar',
  'role': 'warden',                  // 'warden', 'cook', 'cleaner', 'security'
  'workTitle': 'Warden & Operations Manager',
  'phone': '9845122334',
  'salary': 18000,
  'month': 'August Salary',
  'status': 'paid',                  // 'paid', 'pending'
  'joinedDate': 'Jan 2024',
};
```

### Food Menu Store (`_menuStore` in `owner_food_menu_screen.dart`)
```dart
// 2 to 4-Week Rotating Cycle: [WeekIndex][DayIndex (0=MON..6=SUN)][MealSlot]
Map<int, Map<int, Map<String, dynamic>>> menuStore = {
  0: { // Week 1
    0: { // Monday
      'breakfast': {'notProvided': false, 'dishes': 'Masala Dosa, Coconut Chutney, Sambar, Tea'},
      'lunch': {'notProvided': false, 'dishes': 'Rice, Sambar, Mix Veg Curry, Curd'},
      'dinner': {'notProvided': false, 'dishes': 'Chapati, Dal Tadka, Jeera Rice, Curd'},
    }
  }
};
```

---

## 3. The Shared Link (Sync with Tenant Side)

```
┌────────────────────────────────────────────────────────┐
│ OWNER OPS & FOOD                                       │
│ • owner_complaints_screen.dart                         │
│ • owner_food_menu_screen.dart                          │
└──────────────────────────┬─────────────────────────────┘
                           │ SHARED STATE & SYNC
                           ▼
┌────────────────────────────────────────────────────────┐
│ TENANT SCREENS                                         │
│ 1. Maintenance Sync:                                   │
│    • Tenant submits ticket in `raise_ticket_card.dart` │
│      with category, description, and photo.            │
│    • Appears instantly in `owner_complaints_screen`.   │
│    • When owner changes status to 'in_progress' or     │
│      'resolved', tenant's `ticket_status_screen.dart`  │
│      updates status live with progress notes.          │
│ 2. Food Menu Sync:                                     │
│    • Dishes entered by owner in `owner_food_menu`      │
│      display directly in `tenant_food_menu_screen`.    │
│    • Tenant's headcount RSVP (`_isEatingDinner`)       │
│      aggregates to cook's headcount to stop wastage.   │
└────────────────────────────────────────────────────────┘
```
