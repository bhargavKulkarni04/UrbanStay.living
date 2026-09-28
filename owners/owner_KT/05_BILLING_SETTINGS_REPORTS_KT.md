# ⚖️ UrbanStay Owner Knowledge Transfer: SaaS Billing, Settings & Reports
**Feature Folders**:  
1. `mobile_app/lib/features/owner_billing/` (`owner_saas_billing_screen.dart`)  
2. `mobile_app/lib/features/owner_settings/` (`owner_settings_screen.dart`)  
3. `mobile_app/lib/features/owner_reports/` (`owner_reports_screen.dart`)  
4. `mobile_app/lib/features/owner_onboarding/` (`owner_onboarding_approvals_screen.dart`)

---

## 1. Purpose of the Screens
1. **`owner_saas_billing_screen.dart`**: UrbanStay's B2B SaaS licensing engine. Flat-rate software bed tiers (`₹899/mo` for $\le 35$ beds, `₹1,999/mo` for 36–100 beds, `₹9,999/mo` for 101–500 beds). Features 18% GST calculation under SAC Code `998315` and Razorpay SDK integration.
2. **`owner_settings_screen.dart`**: Property control hub. Allows editing house rules, gate curfew hours, Wi-Fi password, direct UPI VPA, and emergency contacts.
3. **`owner_onboarding_approvals_screen.dart`**: Reviews new check-in requests submitted by walk-in tenants via the reception desk QR standee (`tenant_checkin_screen.dart`).
4. **`owner_reports_screen.dart`**: Generates monthly P&L summaries, occupancy percentage, and rent collection speed.

---

## 2. Actual Code State Variables & Models

### B2B SaaS Licensing Tiers (`owner_saas_billing_screen.dart`)
```dart
class SaasPlan {
  final String tierName;        // 'Micro Scale', 'Mid Scale', 'Multi-PG Network'
  final int maxBeds;            // 35, 100, 500
  final double basePrice;       // 899.0, 1999.0, 9999.0
  final double gstAmount;       // 18% GST (e.g. ₹161.82 on ₹899)
  final double totalPayable;    // ₹1,060.82
  final String sacCode;         // '998315' (SaaS Software Licensing)
}
```

### Property Settings Model (`owner_settings_screen.dart`)
```dart
Map<String, dynamic> settingsData = {
  'gateClosingTime': '10:30 PM',
  'visitorAllowed': false,
  'alcoholSmokingAllowed': false,
  'wifiSsid': 'UrbanStay_HighSpeed_5G',
  'wifiPassword': 'StaySecure@2026',
  'directUpiVpa': 'arun@okhdfcbank',
  'emergencyPhone': '+91 98450 12345',
};
```

### Onboarding Approval Request (`owner_onboarding_approvals_screen.dart`)
```dart
Map<String, dynamic> checkinRequest = {
  'id': 'CHK-901',
  'tenantName': 'Bhargav S Kulkarni',
  'phone': '8618818322',
  'gender': 'Male',
  'occupation': 'Professional',
  'company': 'NoBroker',
  'requestedRoom': '104',
  'requestedBed': 'Bed B',
  'sharingType': '2-Sharing',
  'monthlyRent': 8500,
  'depositAmount': 17000,
  'aadhaarNumber': 'XXXX-XXXX-4892',
  'aadhaarFrontUrl': 'aadhaar_front.jpg',
  'selfieUrl': 'selfie_live.jpg',
  'status': 'PENDING_APPROVAL', // 'PENDING_APPROVAL', 'APPROVED', 'REJECTED'
};
```

---

## 3. The Shared Link (Sync with Tenant Side)

```
┌────────────────────────────────────────────────────────┐
│ OWNER ONBOARDING & SETTINGS                            │
│ • owner_onboarding_approvals_screen.dart               │
│ • owner_settings_screen.dart                           │
└──────────────────────────┬─────────────────────────────┘
                           │ SHARED STATE & SYNC
                           ▼
┌────────────────────────────────────────────────────────┐
│ TENANT SCREENS                                         │
│ 1. Check-In Pass Sync:                                 │
│    • Tenant fills `tenant_checkin_screen.dart`.        │
│    • Appears in `owner_onboarding_approvals_screen`.   │
│    • When Owner approves, tenant gets an instant       │
│      active digital room pass with room key unlocked.  │
│ 2. House Rules & WiFi Sync:                            │
│    • Gate curfew time (10:30 PM) & WiFi password set   │
│      by owner automatically populate tenant's          │
│      `property_details_screen.dart` and notice board.  │
└────────────────────────────────────────────────────────┘
```
