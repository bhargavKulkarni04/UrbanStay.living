# 💰 UrbanStay Owner Knowledge Transfer: Rent Approvals & Collection
**Feature Folders**:  
1. `mobile_app/lib/features/owner_approvals/` (`owner_approvals_screen.dart` - 1,510 lines)  
2. `mobile_app/lib/features/owner_rent/` (`owner_rent_collection_screen.dart` & `owner_day_collection_screen.dart`)

---

## 1. Purpose of the Screens
1. **`owner_approvals_screen.dart`**: The **0% Direct UPI Verification Hub**. When a tenant pays rent via GPay/PhonePe/Paytm straight to the owner's bank account, they submit a 12-digit UTR number and payment screenshot. The owner verifies it here with 1 tap, which auto-generates a signed HRA-stamped PDF receipt.
2. **`owner_rent_collection_screen.dart`**: The monthly rent ledger. Displays total rent collected vs pending dues for the current cycle month, with an automated 1-tap WhatsApp rent chaser button.
3. **`owner_day_collection_screen.dart`**: Warden cash collection audit. Tracks physical cash collected by on-ground staff/wardens so staff cannot pocket the money.

---

## 2. Actual Code State Variables & Models

### Approval Queue Record (`_pendingApprovals` in Code)
```dart
Map<String, dynamic> approvalItem = {
  'id': 'appr_1',
  'name': 'Rahul Sharma',
  'initials': 'RS',
  'room': 'Room 101',
  'floor': '1st',
  'amount': 8500,
  'phone': '9876543210',
  'utr': '4231 8976 5412',                // 12-digit Bank Reference
  'time': '18 Aug • 2:34 PM',
  'app': 'Google Pay to HDFC',            // UPI App used by tenant
  'proofFile': 'gpay_hdfc_transfer_proof.jpg', // Uploaded screenshot
};
```

### Approved & Settled History (`_approvalHistory` in Code)
```dart
Map<String, dynamic> historyItem = {
  'id': 'hist_1',
  'name': 'Karthik Raja',
  'room': 'Room 201',
  'amount': 9000,
  'phone': '9741234567',
  'utr': '9912 0045 8812',
  'settledTime': '18 Aug • 1:15 PM',
  'status': 'approved',                  // 'approved' or 'rejected'
  'receiptNo': 'REC-8901',               // Auto-generated receipt number
  'rejectReason': 'Incorrect UTR number provided', // If rejected
};
```

### Rent Collection Ledger Record (`_residents` in `owner_rent_collection_screen.dart`)
```dart
Map<String, dynamic> rentRecord = {
  'name': 'Rahul Sharma',
  'room': 'Room 101',
  'phone': '9876543210',
  'rentAmount': 8500,
  'dueAmount': 8500,                     // 0 if paid, >0 if pending
  'status': 'OVERDUE',                   // 'PAID', 'PENDING', 'OVERDUE'
  'dueDate': '05 Aug',
  'daysOverdue': 13,
  'paymentMode': 'UPI',                  // 'UPI' or 'Cash to Warden'
  'utrNumber': '423189765412',
};
```

### Warden Cash Audit Record (`_cashTransactions` in `owner_day_collection_screen.dart`)
```dart
Map<String, dynamic> cashRecord = {
  'id': 'CSH-401',
  'tenantName': 'Amit Verma',
  'room': 'Room 101',
  'amount': 8500,
  'collectedByWarden': 'Suresh Kumar (Warden)',
  'collectionTime': '10:30 AM, 05 Aug',
  'isDepositedToOwner': false,           // Flipped to true when warden hands cash to owner
  'cashHandoverReceipt': 'CH-8921.jpg',
};
```

---

## 3. The Shared Link (Sync with Tenant Side)

```
┌────────────────────────────────────────────────────────┐
│ TENANT PAYMENTS                                        │
│ • rent_payment_screen.dart:                            │
│   Tenant inputs `_utrController.text` and screenshot.  │
│ • paid_via_cash_screen.dart:                           │
│   Tenant enters warden name & cash amount handed over. │
└──────────────────────────┬─────────────────────────────┘
                           │ DIRECT FINANCIAL SYNC
                           ▼
┌────────────────────────────────────────────────────────┐
│ OWNER APPROVALS & COLLECTION                           │
│ 1. An entry appears in `owner_approvals_screen.dart`   │
│    under `_pendingApprovals` with `utr` & proof photo. │
│ 2. When Owner taps [Approve ✓]:                        │
│    • Status moves to `_approvalHistory` with           │
│      auto-generated `receiptNo` ('REC-8901').          │
│    • Tenant's `tenant_dashboard_screen.dart` changes   │
│      from `_paymentStatus = 'DUE'` to `'PAID'`.        │
│    • Tenant's `payment_ledger_screen.dart` unlocks the │
│      HRA-stamped PDF receipt download.                 │
│ 3. If Cash mode:                                       │
│    • Appears in `owner_day_collection_screen.dart`     │
│      pending warden cash deposit verification.         │
└────────────────────────────────────────────────────────┘
```
