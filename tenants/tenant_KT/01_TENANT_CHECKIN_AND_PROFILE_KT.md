# 👤 UrbanStay Tenant Knowledge Transfer: Check-In, Profile & Settings
**Feature Folders**:  
1. `mobile_app/lib/features/tenant_checkin/` (`tenant_checkin_screen.dart` - 1,589 lines)  
2. `mobile_app/lib/features/tenant_profile/` (4 files: `profile_settings_screen.dart`, `personal_details_screen.dart`, `property_details_screen.dart`, `property_support_screen.dart`)

---

## 1. Purpose of the Screens
1. **`tenant_checkin_screen.dart`**: Zero-App Reception Desk QR Standee Check-In. Walk-in tenants scan a QR code at the reception desk, enter their phone, upload Aadhaar card + live selfie, select their room/bed, and generate a verified digital room key pass.
2. **`profile_settings_screen.dart`**: Master Tenant Account Hub. 7 minimal cards with trailing `>`, non-editable header (Avatar | Bifurcation Line | Name & Room), and smooth green-to-white background gradient.
3. **`personal_details_screen.dart`**: Allows tenant to update phone, alt phone, email, hometown address, refund UPI ID, and college/workplace ID. Aadhaar number is permanently locked.
4. **`property_details_screen.dart`**: Displays property name, address, sharing type, rent and deposit (view-only), and allows editing Floor & Room Number.
5. **`property_support_screen.dart`**: Direct contact info for PG Owner/Manager Arun Kumar (Phone, WhatsApp, Email) with clean copy actions and zero icons or emojis.

---

## 2. Actual Code State Variables & Controllers

### Check-In Wizard State (`tenant_checkin_screen.dart`)
| Code Variable | Type | Real Usage / Validation |
| :--- | :--- | :--- |
| `_pgCode` | `String` | 6-char PG Code entered or scanned (e.g. `'AR-101'`) |
| `_tenantNameController` | `TextEditingController` | Tenant Full Legal Name |
| `_gender` | `String?` | `'Male'`, `'Female'`, `'Other'` |
| `_dobController` / `_dobDate` | `TextEditingController` / `DateTime?` | Date of Birth |
| `_moveInDateController` | `TextEditingController` / `DateTime?` | Planned Move-In Date |
| `_tenantPhoneController` | `TextEditingController` | Primary 10-digit mobile number |
| `_tenantEmailController` | `TextEditingController` | Email for HRA receipts & invoices |
| `_guardianNameController` | `TextEditingController` | Emergency parent/guardian contact |
| `_permAddressController` | `TextEditingController` | Hometown street address |
| `_permCityController` | `TextEditingController` | Hometown city & state |
| `_permPincodeController` | `TextEditingController` | Hometown 6-digit PIN |
| `_tenantAadhaarController` | `TextEditingController` | 12-digit Aadhaar Number |
| `_aadhaarFrontDone`, `_aadhaarBackDone` | `bool` | Aadhaar front & back photo verification flags |
| `_selfieDone` | `bool` | Live selfie camera capture flag |
| `_occupation` | `String?` | `'Professional'`, `'Student'`, `'Job Seeker'` |
| `_companyNameController` | `TextEditingController` | Workplace or University Name |
| `_workLocationController` | `TextEditingController` | Office tech park or campus location |
| `_sharingType` | `String?` | `'1-Share'`, `'2-Share'`, `'3-Share'`, `'4-Share'` |
| `_selectedFloor`, `_selectedRoom` | `String?` | Assigned Floor and Room Number (e.g. `'1st'`, `'104'`) |
| `_bedIdentifierController` | `TextEditingController` | Specific Bed (e.g. `'Bed B'`) |
| `_rentController`, `_depositController`| `TextEditingController` | Rent (`₹8,500`) and Security Deposit (`₹17,000`) |

### Profile & Sub-Screens State (`tenant_profile`)
| Screen | Key State Variables | Real Usage in App |
| :--- | :--- | :--- |
| `personal_details_screen` | `_nameController`, `_phoneController`, `_altPhoneController`, `_emailController`, `_addressController`, `_upiController`, `_orgController` | Editable personal info + Refund UPI ID for deposit return |
| `personal_details_screen` | `_hasAadhaarFront`, `_hasAadhaarBack`, `_hasOrgIdCard` | Upload status flags for KYC documents |
| `property_details_screen` | `_floorController`, `_roomController` | Editable room location with `✎` section header |
| `property_details_screen` | `propertyName`, `propertyAddress`, `sharingType`, `rentAmount`, `depositAmount` | View-only property & financial ground truth |
| `property_support_screen` | `managerName` ('Arun Kumar'), `phoneNumber`, `whatsappNumber`, `emailId` | Direct owner contact without icons or emojis |

---

## 3. The Shared Link (Sync with Owner Side)

```
┌────────────────────────────────────────────────────────┐
│ TENANT CHECK-IN & PROFILE                              │
│ • tenant_checkin_screen.dart                           │
│ • personal_details_screen.dart                         │
│ • property_details_screen.dart                         │
└──────────────────────────┬─────────────────────────────┘
                           │ DATA SYNC TO OWNER
                           ▼
┌────────────────────────────────────────────────────────┐
│ OWNER COMMAND CENTER & ROOM MATRIX                     │
│ 1. `tenant_checkin` submits request to:                │
│    `owner_onboarding_approvals_screen.dart`            │
│ 2. When Owner approves check-in:                       │
│    • In `owner_rooms_screen.dart`, that bed flips to:  │
│      `isOccupied: true`, `status: 'Active'`            │
│    • Tenant's name, phone, workplace, and rent show    │
│      under the bed's details card.                     │
│ 3. If tenant edits Floor/Room in `property_details`:   │
│    • Reflects in `owner_rooms_screen.dart` bed matrix. │
│ 4. If tenant inputs `refund_upi_id`:                   │
│    • Shows in `owner_rooms_screen` checkout modal to   │
│      return security deposit with 1 tap.               │
└────────────────────────────────────────────────────────┘
```
