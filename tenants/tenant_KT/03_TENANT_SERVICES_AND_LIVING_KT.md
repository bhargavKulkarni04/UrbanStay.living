# 🧹 UrbanStay Tenant Knowledge Transfer: Helpdesk & Housekeeping
**Feature Folders**:  
1. `mobile_app/lib/features/tenant_helpdesk/` (4 files)  
2. `mobile_app/lib/features/tenant_housekeeping/` (3 files)

---

## 1. Purpose of the Screens
1. **`raise_ticket_screen.dart` / `raise_ticket_card.dart`**: Resident maintenance ticketing. Allows tenant to report issues across 5 categories (Electrical, Plumbing, WiFi, Carpentry, Other) with description and camera photo proof.
2. **`ticket_status_screen.dart`**: Tracks progress of submitted tickets (`'Submitted'`, `'In Progress'`, `'Resolved'`) with technician assignment notes from the owner/warden.
3. **`washing_machine_booking_screen.dart`**: PG laundry scheduler. Prevents tenant fights by booking 45-minute slots on specific machines (e.g. Machine 1, Machine 2).
4. **Housekeeping Sheets (`room_sweep_sheet.dart`, `full_room_clean_sheet.dart`, `bedsheet_change_sheet.dart`)**: Residents schedule housekeeping visits (daily sweep, full mop, bedsheet change) to ensure cleaning staff only visit when convenient.

---

## 2. Actual Code State Variables & Inputs

### Helpdesk Ticket Input (`raise_ticket_card.dart`)
| Code Variable | Type | Real Usage in App |
| :--- | :--- | :--- |
| `_categories` | `List<String>` | `['Electrical', 'Plumbing', 'WiFi', 'Carpentry', 'Other']` |
| `_selectedCategory` | `String` | Selected problem category |
| `_customTitleController` | `TextEditingController` | Custom title if 'Other' selected |
| `_issueController` | `TextEditingController` | Detailed description of the problem |
| `_attachedPhotoName` | `String?` | Uploaded photo proof of the broken facility |
| `_isSubmitting` | `bool` | Submitting spinner flag |

### Active Ticket State (`ticket_status_screen.dart`)
```dart
Map<String, dynamic> activeTicket = {
  'ticketId': 'TKT-101',
  'category': 'Electrical',
  'title': 'Geyser MCB tripping in Room 104',
  'status': 'IN_PROGRESS',            // 'SUBMITTED', 'IN_PROGRESS', 'RESOLVED'
  'assignedStaff': 'Suresh (Warden)', // Assigned technician
  'reportedAt': '08:30 AM, 28 Aug',
  'resolutionNote': 'Technician scheduled for 4 PM inspection',
};
```

### Laundry Slot State (`washing_machine_booking_screen.dart`)
```dart
Map<String, dynamic> laundryBooking = {
  'machine': 'Machine 1 (Ground Floor)',
  'slotTime': '07:30 PM - 08:15 PM',
  'bookedByRoom': 'Room 104',
  'status': 'BOOKED',                 // 'AVAILABLE', 'BOOKED', 'IN_USE'
};
```

### Housekeeping Schedule (`room_sweep_sheet.dart`)
```dart
Map<String, dynamic> cleaningSchedule = {
  'roomNumber': '104',
  'serviceType': 'Daily Sweep & Mop', // 'Daily Sweep', 'Full Deep Clean', 'Bedsheet Change'
  'selectedSlot': '10:00 AM - 12:00 PM',
  'doNotDisturb': false,              // Toggled if tenant is sleeping/studying
  'status': 'SCHEDULED',
};
```

---

## 3. The Shared Link (Sync with Owner Side)

```
┌────────────────────────────────────────────────────────┐
│ TENANT HELPDESK & HOUSEKEEPING                         │
│ • raise_ticket_card.dart                               │
│ • room_sweep_sheet.dart                                │
└──────────────────────────┬─────────────────────────────┘
                           │ INSTANT DISPATCH
                           ▼
┌────────────────────────────────────────────────────────┐
│ OWNER COMMAND CENTER & STAFF                           │
│ 1. Ticket Submission:                                  │
│    • Ticket pops up in `owner_complaints_screen.dart`. │
│    • Owner reviews photo proof and assigns staff from  │
│      `owner_staff_screen.dart` (e.g. Suresh Kumar).    │
│    • Status changes in `owner_complaints` sync back to │
│      tenant's `ticket_status_screen.dart`.             │
│ 2. Cleaning Dispatch:                                  │
│    • Scheduled housekeeping slots alert the warden's   │
│      daily task list to prevent unannounced entry.     │
└────────────────────────────────────────────────────────┘
```
