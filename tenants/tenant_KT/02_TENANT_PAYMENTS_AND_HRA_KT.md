# 💳 UrbanStay Tenant Knowledge Transfer: Payments, Ledger & HRA
**Feature Folder**: `mobile_app/lib/features/tenant_payments/`  
**Files (7 total)**:  
1. `presentation/screens/rent_payment_screen.dart` (1,856 lines)  
2. `presentation/screens/paid_via_cash_screen.dart`  
3. `presentation/screens/payment_ledger_screen.dart`  
4. `presentation/screens/security_deposit_screen.dart`  
5. `presentation/widgets/rent_payment_bottom_sheet.dart`  
6. `presentation/widgets/paid_via_cash_card.dart`  
7. `presentation/widgets/official_payment_icons.dart`

---

## 1. Purpose of the Screens
1. **`rent_payment_screen.dart`**: Resident's 0% transaction fee payment hub. Invokes native `upi://pay` deep link targeting the PG owner's personal UPI VPA (`ownerUpiId`), collects the 12-digit UTR confirmation, and lets the tenant upload a GPay/PhonePe transfer screenshot.
2. **`paid_via_cash_screen.dart`**: For tenants paying cash physically to the warden at the desk. Records recipient warden name, cash amount, and notes.
3. **`payment_ledger_screen.dart`**: Resident's financial ledger. Displays historical monthly rent payments, approval timestamps, and provides 1-tap download of **HRA-stamped PDF rent receipts** with owner PAN for tax filing.
4. **`security_deposit_screen.dart`**: Tracks the original security deposit paid (e.g. ₹17,000), any damage deductions logged by the owner, and the net refundable balance.

---

## 2. Actual Code State Variables & Inputs

### Rent Payment Inputs (`rent_payment_screen.dart`)
| Code Variable | Type | Real Usage in App |
| :--- | :--- | :--- |
| `amount` | `double` | Total rent amount due (e.g., `8500.0`) |
| `cycleMonth` | `String` | Rent billing cycle (e.g., `'September 2026'`) |
| `ownerUpiId` | `String` | Owner's UPI ID (e.g., `'arun.kumar@oksbi'`) |
| `ownerBankName` | `String` | Owner's Bank (e.g., `'State Bank of India'`) |
| `_phoneController` | `TextEditingController` | Tenant's phone number |
| `_utrController` | `TextEditingController` | 12-digit Bank UTR reference from UPI app |
| `_hasScreenshot` | `bool` | Whether payment proof screenshot is attached |
| `_screenshotName` | `String?` | Filename of uploaded payment proof |
| `_isSubmitted` | `bool` | State flips to `true` when UTR is dispatched |
| `_isCashMode` | `bool` | Toggled when resident pays cash at reception |
| `_submittedCashRecipient` | `String?` | Name of warden who received the cash |
| `_submittedCashRemarks` | `String?` | Note on cash handover |

### Ledger & HRA Record (`payment_ledger_screen.dart`)
```dart
Map<String, dynamic> ledgerEntry = {
  'month': 'September 2026',
  'amount': 8500.0,
  'status': 'PAID',                  // 'PAID', 'UNDER_REVIEW', 'DUE'
  'paidDate': '05 Sep 2026',
  'utrNumber': '425689123456',
  'paymentMode': 'UPI (Google Pay)',
  'receiptNumber': 'REC-SEP-104',    // Formatted HRA receipt number
  'ownerPan': 'ABCDE1234F',          // Stamped for tax exemption
  'hasHraStamp': true,
};
```

### Security Deposit Model (`security_deposit_screen.dart`)
```dart
Map<String, dynamic> depositState = {
  'totalDepositPaid': 17000.0,
  'lockStatus': 'LOCKED_SAFE',
  'damageDeductions': [
    {'item': 'Broken washbasin mirror', 'amount': 450.0, 'date': '12 Aug'},
  ],
  'netRefundableAmount': 16550.0,
  'refundUpiId': 'bhargav@okhdfc',
};
```

---

## 3. The Shared Link (Sync with Owner Side)

```
┌────────────────────────────────────────────────────────┐
│ TENANT PAYMENTS                                        │
│ • rent_payment_screen.dart                             │
│ • paid_via_cash_screen.dart                            │
└──────────────────────────┬─────────────────────────────┘
                           │ INSTANT FINANCIAL TRIGGER
                           ▼
┌────────────────────────────────────────────────────────┐
│ OWNER FINANCIAL ENGINE                                 │
│ 1. Direct UPI Flow:                                    │
│    • Tenant enters UTR '425689123456'.                 │
│    • Appears under `_pendingApprovals` in              │
│      `owner_approvals_screen.dart`.                    │
│    • Owner taps [Verify]:                              │
│      - Tenant's `tenant_dashboard_screen` banner flips │
│        from 'DUE' to 'PAID'.                           │
│      - Entry unlocks in tenant's `payment_ledger`.     │
│ 2. Cash Handover Flow:                                 │
│    • Cash paid to warden appears in:                   │
│      `owner_day_collection_screen.dart` for owner     │
│      to physically audit warden's cash drawer.         │
│ 3. Damage Deduction Flow:                              │
│    • Deductions added in `owner_rooms_screen.dart`     │
│      instantly update tenant's `security_deposit`.     │
└────────────────────────────────────────────────────────┘
```
