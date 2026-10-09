# 🗄️ UrbanStay Master Database Schema & Code Mapping
**Document**: `MASTER_DATABASE_SCHEMA.md`  
**Purpose**: 100% Verified, End-to-End mapping between Flutter Dart code variables, mock structures, and production PostgreSQL / Supabase tables. Zero assumptions, zero hallucinations.

---

## 📑 Index of Verified Tables (15 Tables Total)

1. [Pillar 1: Identity & Authentication](#pillar-1-identity--authentication)
   * [`users`](#1-users-auth--directory)
2. [Pillar 2: Property & Live Bed Inventory](#pillar-2-property--live-bed-inventory)
   * [`properties`](#2-properties-pg-buildings)
   * [`rooms`](#3-rooms)
   * [`beds`](#4-beds-live-occupancy-matrix)
3. [Pillar 3: Tenant Stays & KYC](#pillar-3-tenant-stays--kyc)
   * [`tenant_profiles`](#5-tenant_profiles-kyc--documents)
   * [`stays`](#6-stays-tenancy-lifecycle)
4. [Pillar 4: 0% Direct UPI Ledger & Approvals](#pillar-4-0-direct-upi-ledger--approvals)
   * [`rent_invoices`](#7-rent_invoices-monthly-billing-cycles)
   * [`payment_transactions`](#8-payment_transactions-approvals--receipts)
   * [`deposit_deductions`](#9-deposit_deductions-damage-ledger)
5. [Pillar 5: Operations, Helpdesk & Food Mess](#pillar-5-operations-helpdesk--food-mess)
   * [`maintenance_tickets`](#10-maintenance_tickets)
   * [`food_menus`](#11-food_menus)
   * [`meal_headcounts`](#12-meal_headcounts-stops-cook-wastage)
6. [Pillar 6: Staff, Expenses & B2B SaaS Licensing](#pillar-6-staff-expenses--b2b-saas-licensing)
   * [`staff_members`](#13-staff_members-directory--payroll)
   * [`expenses`](#14-expenses-operating-pl-ledger)
   * [`saas_subscriptions`](#15-saas_subscriptions-b2b-bed-licensing)

---

## Pillar 1: Identity & Authentication

### 1. `users` (Auth & Directory)
* **Matches Code File**: `mobile_app/lib/features/auth/presentation/screens/phone_verify_screen.dart`  
* **Matches Code File**: `mobile_app/lib/features/auth/presentation/screens/role_selector_screen.dart`

#### Exact Dart Code Variables:
```dart
// phone_verify_screen.dart (Lines 30-45)
final TextEditingController _phoneController; // 10-digit India phone number
final TextEditingController _otpController;   // 6-digit SMS OTP

// role_selector_screen.dart (Lines 20-35)
String _selectedRole = 'owner'; // 'owner' vs 'tenant'
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | System generated unique user ID |
| `phone` | `VARCHAR(15)` | **UNIQUE**, **NOT NULL** | Mapped from `_phoneController.text` |
| `full_name` | `VARCHAR(100)`| **NOT NULL** | User legal full name |
| `email` | `VARCHAR(120)`| `NULLABLE` | User email address |
| `role` | `VARCHAR(20)` | **NOT NULL**, Check: `'owner'`, `'tenant'`, `'warden'`, `'staff'` | Mapped from `_selectedRole` |
| `is_active` | `BOOLEAN` | Default: `true` | Account active state |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Registration timestamp |

---

## Pillar 2: Property & Live Bed Inventory

### 2. `properties` (PG Buildings)
* **Matches Code File**: `mobile_app/lib/features/owner_setup/presentation/screens/owner_setup_screen.dart` (Lines 63–145)  
* **Matches Code File**: `mobile_app/lib/features/owner_settings/presentation/screens/owner_settings_screen.dart`

#### Exact Dart Code Variables:
```dart
// owner_setup_screen.dart (Lines 63-145)
_pgBrandNameController.text;      // Property Brand Name
_genderCategory;                  // 'Gents', 'Ladies', 'Coliving'
_propertyStructure;               // 'Standard PG', 'Apartment Units'
_streetAddressController.text;    // Street address
_areaLocalityController.text;     // e.g. "BTM 2nd Stage"
_landmarkController.text;         // e.g. "Near Udupi Garden"
_selectedCity;                    // e.g. "Bengaluru Urban"
_selectedState;                   // e.g. "Karnataka"
_pincodeController.text;          // 6-digit PIN
_mapsUrlController.text;          // Google Maps location
_liftCount;                       // '1', '2'
_powerBackup;                     // 'Full Backup', 'Basic', 'None'
_bankHolderNameController.text;   // Legal account holder name
_bankNameController.text;         // Bank name (e.g. HDFC, SBI)
_upiIdController.text;            // 0% Direct UPI VPA (e.g. arun@okhdfcbank)
_creditingPhoneController.text;   // Bank linked phone number
_generatedPropertyCode;           // e.g. 'AR-101' (Step 4 code generator)
_dueDay;                          // e.g. '5th'
_gracePeriod;                     // e.g. '5 Days'
_lateFee;                         // e.g. '₹200'
_noticePeriod;                    // e.g. '30 Days'
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Unique Property Identifier |
| `owner_id` | `UUID` | **FK** $\rightarrow$ `users(id)` ON DELETE CASCADE | Owner who created the property |
| `property_code` | `VARCHAR(10)` | **UNIQUE**, **NOT NULL** | Mapped from `_generatedPropertyCode` (`AR-101`) |
| `brand_name` | `VARCHAR(150)`| **NOT NULL** | Mapped from `_pgBrandNameController` |
| `gender_category`| `VARCHAR(20)` | **NOT NULL** | Mapped from `_genderCategory` |
| `property_structure`| `VARCHAR(30)` | Default: `'Standard PG'` | Mapped from `_propertyStructure` |
| `street_address`| `TEXT` | **NOT NULL** | Mapped from `_streetAddressController` |
| `area_locality` | `VARCHAR(100)`| **NOT NULL** | Mapped from `_areaLocalityController` |
| `landmark` | `VARCHAR(100)`| `NULLABLE` | Mapped from `_landmarkController` |
| `city` | `VARCHAR(60)` | **NOT NULL** | Mapped from `_selectedCity` |
| `state` | `VARCHAR(60)` | **NOT NULL** | Mapped from `_selectedState` |
| `pincode` | `VARCHAR(10)` | **NOT NULL** | Mapped from `_pincodeController` |
| `maps_url` | `TEXT` | `NULLABLE` | Mapped from `_mapsUrlController` |
| `lift_count` | `VARCHAR(10)` | `NULLABLE` | Mapped from `_liftCount` |
| `power_backup` | `VARCHAR(30)` | `NULLABLE` | Mapped from `_powerBackup` |
| `upi_vpa` | `VARCHAR(60)` | **NOT NULL** | Mapped from `_upiIdController` |
| `bank_name` | `VARCHAR(100)`| **NOT NULL** | Mapped from `_bankNameController` |
| `bank_holder_name`| `VARCHAR(100)`| **NOT NULL** | Mapped from `_bankHolderNameController` |
| `crediting_phone`| `VARCHAR(15)` | `NULLABLE` | Mapped from `_creditingPhoneController` |
| `rent_due_day` | `VARCHAR(10)` | Default: `'5th'` | Mapped from `_dueDay` |
| `grace_period` | `VARCHAR(20)` | Default: `'5 Days'` | Mapped from `_gracePeriod` |
| `late_fee` | `VARCHAR(20)` | Default: `'₹200'` | Mapped from `_lateFee` |
| `notice_period` | `VARCHAR(20)` | Default: `'30 Days'` | Mapped from `_noticePeriod` |

---

### 3. `rooms`
* **Matches Code File**: `mobile_app/lib/features/owner_setup/presentation/screens/owner_setup_screen.dart` (Lines 88–128)  
* **Matches Code File**: `mobile_app/lib/features/owner_rooms/presentation/screens/owner_rooms_screen.dart` (Lines 148–184)

#### Exact Dart Code Variables:
```dart
// owner_rooms_screen.dart (Lines 148-184)
'room': 'Room 101'              // Room number
'floor': '1st'                  // Floor tag ('ground', '1st', '2nd', '3rd')
'floorLabel': '1st Floor'       // Display title
'type': '2-Sharing'             // Sharing category
'occupied': 2                   // Current headcount
'total': 2                      // Bed capacity
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Unique Room Identifier |
| `property_id` | `UUID` | **FK** $\rightarrow$ `properties(id)` ON DELETE CASCADE | Associated building |
| `floor_number` | `INT` | **NOT NULL** | `0` = Ground, `1` = 1st Floor, etc. |
| `floor_label` | `VARCHAR(30)` | **NOT NULL** | Mapped from `floorLabel` (`'1st Floor'`) |
| `room_number` | `VARCHAR(20)` | **NOT NULL** | Mapped from `room` (`'Room 101'`, `'G-01'`) |
| `sharing_type` | `VARCHAR(30)` | **NOT NULL** | Mapped from `type` (`'2-Sharing'`, `'3-Sharing'`) |
| `total_beds` | `INT` | **NOT NULL** | Mapped from `total` (`2`, `3`) |
| `rent_per_bed` | `NUMERIC(10,2)`| **NOT NULL** | Mapped from `_rentControllers[sharing]` |
| `deposit_per_bed`| `NUMERIC(10,2)`| **NOT NULL** | Mapped from `_depositControllers[sharing]` |

---

### 4. `beds` (Live Occupancy Matrix)
* **Matches Code File**: `mobile_app/lib/features/owner_rooms/presentation/screens/owner_rooms_screen.dart` (Lines 157–220)  
* **Matches Code File**: `mobile_app/lib/features/owner_rooms/presentation/screens/shift_bed_screen.dart`

#### Exact Dart Code Variables:
```dart
// owner_rooms_screen.dart (Lines 157-220)
'isOccupied': true              // bool flag
'bed': 'Bed A'                  // Bed identifier ('Bed A', 'Bed B')
'name': 'Rahul Sharma'          // Resident Name
'initials': 'RS'                // UI Initials
'status': 'Active'              // 'Active', 'Notice', 'Vacant'
'phone': '9876543210'           // Resident phone
'work': 'Infosys'               // Workplace / College
'rent': '8500'                  // Monthly rent
'deposit': '15000'              // Security deposit
'docs': 'Aadhaar Verified'      // Document status
'docsVerified': true            // Verified boolean
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Unique Bed Identifier |
| `room_id` | `UUID` | **FK** $\rightarrow$ `rooms(id)` ON DELETE CASCADE | Associated Room |
| `bed_code` | `VARCHAR(10)` | **NOT NULL** | Mapped from `'bed'` (`'Bed A'`, `'Bed B'`) |
| `is_occupied` | `BOOLEAN` | Default: `false` | Mapped from `'isOccupied'` |
| `status` | `VARCHAR(20)` | Default: `'Vacant'` | Check: `'Vacant'`, `'Active'`, `'Notice'` |
| `current_tenant_id`| `UUID` | **FK** $\rightarrow$ `users(id)`, `NULLABLE` | Currently residing tenant |

---

## Pillar 3: Tenant Stays & KYC

### 5. `tenant_profiles` (KYC & Documents)
* **Matches Code File**: `mobile_app/lib/features/tenant_checkin/presentation/screens/tenant_checkin_screen.dart` (Lines 34–58)  
* **Matches Code File**: `mobile_app/lib/features/tenant_profile/presentation/screens/personal_details_screen.dart`

#### Exact Dart Code Variables:
```dart
// tenant_checkin_screen.dart (Lines 34-58)
_tenantNameController.text;     // Legal Name
_gender;                        // 'Male', 'Female', 'Other'
_dobDate;                       // Date of birth
_tenantPhoneController.text;    // Primary Mobile
_tenantEmailController.text;    // Email Address
_guardianNameController.text;   // Emergency Parent/Guardian
_permAddressController.text;    // Hometown Address
_permCityController.text;       // Hometown City
_permPincodeController.text;    // Hometown PIN
_tenantAadhaarController.text;  // 12-digit Aadhaar Number
_aadhaarFrontDone;              // Front image uploaded bool
_aadhaarBackDone;               // Back image uploaded bool
_selfieDone;                    // Live selfie taken bool
_occupation;                    // 'Professional', 'Student', 'Job Seeker'
_companyNameController.text;    // Workplace / College
_workLocationController.text;   // Office location
_upiController.text;            // Refund UPI ID (personal_details_screen.dart)
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Profile Identifier |
| `user_id` | `UUID` | **FK** $\rightarrow$ `users(id)` ON DELETE CASCADE | Linked User |
| `gender` | `VARCHAR(10)` | `NULLABLE` | Mapped from `_gender` |
| `dob` | `DATE` | `NULLABLE` | Mapped from `_dobDate` |
| `alt_phone` | `VARCHAR(15)` | `NULLABLE` | Mapped from `_altPhoneController` |
| `guardian_name` | `VARCHAR(100)`| `NULLABLE` | Mapped from `_guardianNameController` |
| `guardian_phone`| `VARCHAR(15)` | `NULLABLE` | Secondary phone of guardian |
| `permanent_address`| `TEXT` | `NULLABLE` | Mapped from `_permAddressController` |
| `permanent_city`| `VARCHAR(60)` | `NULLABLE` | Mapped from `_permCityController` |
| `permanent_pincode`| `VARCHAR(10)` | `NULLABLE` | Mapped from `_permPincodeController` |
| `aadhaar_number`| `VARCHAR(20)` | **LOCKED IN UI** | Mapped from `_tenantAadhaarController` |
| `aadhaar_front_url`| `TEXT` | `NULLABLE` | Storage path from `_aadhaarFrontDone` |
| `aadhaar_back_url` | `TEXT` | `NULLABLE` | Storage path from `_aadhaarBackDone` |
| `selfie_url` | `TEXT` | `NULLABLE` | Storage path from `_selfieDone` |
| `is_aadhaar_verified`| `BOOLEAN`| Default: `false` | Mapped from `'docsVerified'` |
| `occupation` | `VARCHAR(30)` | `NULLABLE` | Mapped from `_occupation` |
| `company_or_college`| `VARCHAR(120)`| `NULLABLE` | Mapped from `_companyNameController` |
| `work_location` | `VARCHAR(120)`| `NULLABLE` | Mapped from `_workLocationController` |
| `refund_upi_id` | `VARCHAR(60)` | `NULLABLE` | Mapped from `_upiController` (for deposit refund) |

---

### 6. `stays` (Tenancy Lifecycle)
* **Matches Code File**: `mobile_app/lib/features/tenant_checkin/presentation/screens/tenant_checkin_screen.dart` (Lines 59–80)  
* **Matches Code File**: `mobile_app/lib/features/tenant_notice/presentation/screens/move_out_notice_screen.dart` (Lines 40–60)

#### Exact Dart Code Variables:
```dart
// tenant_checkin_screen.dart (Lines 59-80)
_moveInDate;                    // Checkin date
_rentController.text;           // Agreed monthly rent (e.g. "8500")
_depositController.text;        // Deposit paid (e.g. "17000")

// move_out_notice_screen.dart (Lines 40-60)
_isNoticeActive;                // Notice active boolean
_selectedVacateDate;            // Vacate date (exactly +31 days)
_noticeDaysServed;              // 31 days
_selectedReason;                // 'Job Relocation', 'Moving to Flat', etc.
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Tenancy Contract Identifier |
| `tenant_id` | `UUID` | **FK** $\rightarrow$ `users(id)` | Resident User ID |
| `bed_id` | `UUID` | **FK** $\rightarrow$ `beds(id)` | Assigned Bed |
| `property_id` | `UUID` | **FK** $\rightarrow$ `properties(id)` | Building |
| `checkin_date` | `DATE` | **NOT NULL** | Mapped from `_moveInDate` |
| `monthly_rent` | `NUMERIC(10,2)`| **NOT NULL** | Mapped from `_rentController` (`8500.00`) |
| `deposit_paid` | `NUMERIC(10,2)`| **NOT NULL** | Mapped from `_depositController` (`17000.00`) |
| `status` | `VARCHAR(20)` | Default: `'ACTIVE'` | Check: `'ACTIVE'`, `'NOTICE'`, `'CHECKED_OUT'` |
| `notice_date` | `DATE` | `NULLABLE` | Date tenant clicked Submit Notice |
| `vacate_date` | `DATE` | `NULLABLE` | Mapped from `_selectedVacateDate` (+31 days) |
| `vacate_reason` | `VARCHAR(100)`| `NULLABLE` | Mapped from `_selectedReason` |

---

## Pillar 4: 0% Direct UPI Ledger & Approvals

### 7. `rent_invoices` (Monthly Billing Cycles)
* **Matches Code File**: `mobile_app/lib/features/tenant_dashboard/presentation/screens/tenant_dashboard_screen.dart` (Lines 39–46)  
* **Matches Code File**: `mobile_app/lib/features/owner_rent/presentation/screens/owner_rent_collection_screen.dart`

#### Exact Dart Code Variables:
```dart
// tenant_dashboard_screen.dart (Lines 39-46)
_paymentStatus;                 // 'DUE', 'UNDER_REVIEW', 'PAID_CYCLE_OCTOBER'
_currentCycleMonth;             // e.g. 'September 2026'
_currentDueDate;                // e.g. '05 Sep'
_currentRentAmount;             // 8500.0
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Invoice Identifier |
| `stay_id` | `UUID` | **FK** $\rightarrow$ `stays(id)` ON DELETE CASCADE | Associated Tenancy |
| `cycle_month` | `VARCHAR(30)` | **NOT NULL** | Mapped from `_currentCycleMonth` |
| `rent_amount` | `NUMERIC(10,2)`| **NOT NULL** | Mapped from `_currentRentAmount` (`8500.00`) |
| `electricity_dues`| `NUMERIC(10,2)`| Default: `0.00` | Metered electricity charges |
| `late_fine` | `NUMERIC(10,2)`| Default: `0.00` | Mapped from `_lateFee` if overdue |
| `total_due` | `NUMERIC(10,2)`| **NOT NULL** | Total amount payable |
| `due_date` | `DATE` | **NOT NULL** | Mapped from `_currentDueDate` |
| `status` | `VARCHAR(20)` | Default: `'DUE'` | Check: `'DUE'`, `'UNDER_REVIEW'`, `'PAID'`, `'OVERDUE'` |

---

### 8. `payment_transactions` (Approvals & Receipts)
* **Matches Code File**: `mobile_app/lib/features/tenant_payments/presentation/screens/rent_payment_screen.dart` (Lines 53–70)  
* **Matches Code File**: `mobile_app/lib/features/owner_approvals/presentation/screens/owner_approvals_screen.dart` (Lines 25–108)  
* **Matches Code File**: `mobile_app/lib/features/tenant_payments/presentation/screens/paid_via_cash_screen.dart`

#### Exact Dart Code Variables:
```dart
// rent_payment_screen.dart (Lines 53-70)
_utrController.text;            // 12-digit UTR (e.g. '4231 8976 5412')
_screenshotName;                // Proof screenshot file
_isCashMode;                    // Cash mode bool
_submittedCashRecipient;        // Warden name if cash paid
_submittedCashRemarks;          // Cash remarks

// owner_approvals_screen.dart (Lines 25-108)
'id': 'appr_1'                  // Approval record ID
'amount': 8500                  // Amount paid
'phone': '9876543210'           // Tenant phone
'utr': '4231 8976 5412'         // Bank UTR
'time': '18 Aug • 2:34 PM'      // Payment timestamp
'app': 'Google Pay to HDFC'     // App mode
'proofFile': 'proof.jpg'        // Uploaded screenshot
'status': 'approved'            // 'approved', 'rejected'
'receiptNo': 'REC-8901'         // Auto-generated receipt number
'rejectReason': 'Incorrect UTR' // If rejected
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Transaction Identifier |
| `invoice_id` | `UUID` | **FK** $\rightarrow$ `rent_invoices(id)` | Linked Invoice |
| `amount_paid` | `NUMERIC(10,2)`| **NOT NULL** | Mapped from `'amount'` (`8500.00`) |
| `payment_mode` | `VARCHAR(20)` | **NOT NULL** | Check: `'UPI'`, `'CASH'`, `'BANK_TRANSFER'` |
| `utr_number` | `VARCHAR(30)` | `NULLABLE` | **12-digit bank UTR** from `_utrController` |
| `upi_app_name` | `VARCHAR(60)` | `NULLABLE` | Mapped from `'app'` (e.g. "Google Pay to HDFC") |
| `screenshot_url`| `TEXT` | `NULLABLE` | Mapped from `_screenshotName` / `'proofFile'` |
| `status` | `VARCHAR(20)` | Default: `'pending'`| Check: `'pending'`, `'approved'`, `'rejected'` |
| `receipt_number`| `VARCHAR(30)` | `NULLABLE` | Mapped from `'receiptNo'` (`'REC-8901'`) |
| `verified_by` | `UUID` | **FK** $\rightarrow$ `users(id)`, `NULLABLE` | Owner or Warden who approved |
| `verified_at` | `TIMESTAMPTZ`| `NULLABLE` | Mapped from `'settledTime'` |
| `reject_reason` | `TEXT` | `NULLABLE` | Mapped from `'rejectReason'` |
| `warden_name` | `VARCHAR(100)`| `NULLABLE` | Mapped from `_submittedCashRecipient` |
| `warden_deposited`| `BOOLEAN`| Default: `false` | True when warden deposits cash to owner |

---

### 9. `deposit_deductions` (Damage Ledger)
* **Matches Code File**: `mobile_app/lib/features/owner_rooms/presentation/screens/owner_rooms_screen.dart` (Lines 44–49 Damage Modal)  
* **Matches Code File**: `mobile_app/lib/features/tenant_payments/presentation/screens/security_deposit_screen.dart`

#### Exact Dart Code Variables:
```dart
// owner_rooms_screen.dart (Lines 44-49)
_damageItemController.text;     // e.g. "Broken washbasin mirror", "Mattress torn"
_damageAmountController.text;   // e.g. "450"
_damageDeductionMode;           // 'dues' (add to rent) or 'deposit' (deduct from deposit)
_damageAttachedPhoto;           // Photo proof of broken item
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Deduction Identifier |
| `stay_id` | `UUID` | **FK** $\rightarrow$ `stays(id)` ON DELETE CASCADE | Associated Tenancy |
| `item_damaged` | `VARCHAR(100)`| **NOT NULL** | Mapped from `_damageItemController` |
| `amount` | `NUMERIC(10,2)`| **NOT NULL** | Mapped from `_damageAmountController` (`450.00`) |
| `mode` | `VARCHAR(20)` | **NOT NULL** | Mapped from `_damageDeductionMode` (`'dues'`, `'deposit'`) |
| `photo_proof_url`| `TEXT` | `NULLABLE` | Mapped from `_damageAttachedPhoto` |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Timestamp |

---

## Pillar 5: Operations, Helpdesk & Food Mess

### 10. `maintenance_tickets`
* **Matches Code File**: `mobile_app/lib/features/tenant_helpdesk/presentation/widgets/raise_ticket_card.dart` (Lines 38–60)  
* **Matches Code File**: `mobile_app/lib/features/owner_complaints/presentation/screens/owner_complaints_screen.dart` (Lines 33–80)

#### Exact Dart Code Variables:
```dart
// raise_ticket_card.dart (Lines 38-60)
_categories = ['Electrical', 'Plumbing', 'WiFi', 'Carpentry', 'Other'];
_selectedCategory;              // Selected Category
_customTitleController.text;    // Custom title if 'Other'
_issueController.text;          // Description of problem
_attachedPhotoName;             // Uploaded issue photo

// owner_complaints_screen.dart (Lines 33-80)
'id': 'TKT-101'                 // Ticket code
'residentName': 'Amit Verma'    // Resident name
'phone': '9988776655'           // Resident phone
'room': 'Room 201'              // Room number
'bed': 'Bed B'                  // Bed
'category': 'Electrical'        // Category
'issue': 'Geyser tripping MCB'  // Issue text
'reportedDate': '28 Aug 2026'   // Date reported
'photoName': 'geyser_mcb.jpg'   // Photo
'status': 'pending'             // 'pending', 'in_progress', 'resolved'
'progressNote': 'Acknowledged'  // Progress notes
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Ticket Identifier |
| `ticket_code` | `VARCHAR(20)` | **NOT NULL** | Mapped from `'id'` (`'TKT-101'`) |
| `property_id` | `UUID` | **FK** $\rightarrow$ `properties(id)` | Building |
| `tenant_id` | `UUID` | **FK** $\rightarrow$ `users(id)` | Resident who raised the ticket |
| `room_number` | `VARCHAR(20)` | **NOT NULL** | Mapped from `'room'` (`'Room 201'`) |
| `bed_code` | `VARCHAR(10)` | `NULLABLE` | Mapped from `'bed'` (`'Bed B'`) |
| `category` | `VARCHAR(30)` | **NOT NULL** | Check: `'Electrical'`, `'Plumbing'`, `'WiFi'`, `'Carpentry'`, `'Other'` |
| `custom_title` | `VARCHAR(100)`| `NULLABLE` | Mapped from `_customTitleController` |
| `issue_description`| `TEXT` | **NOT NULL** | Mapped from `_issueController` / `'issue'` |
| `photo_url` | `TEXT` | `NULLABLE` | Mapped from `_attachedPhotoName` / `'photoName'` |
| `status` | `VARCHAR(20)` | Default: `'pending'`| Check: `'pending'`, `'in_progress'`, `'resolved'` |
| `assigned_staff`| `VARCHAR(100)`| `NULLABLE` | Assigned warden / technician name |
| `progress_note` | `TEXT` | `NULLABLE` | Mapped from `'progressNote'` |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Mapped from `'reportedDate'` |
| `resolved_at` | `TIMESTAMPTZ`| `NULLABLE` | Completion timestamp |

---

### 11. `food_menus`
* **Matches Code File**: `mobile_app/lib/features/owner_food_menu/presentation/screens/owner_food_menu_screen.dart`  
* **Matches Code File**: `mobile_app/lib/features/tenant_food_menu/presentation/screens/tenant_food_menu_screen.dart` (Lines 50–90)

#### Exact Dart Code Variables:
```dart
// tenant_food_menu_screen.dart (Lines 50-90)
_cycleWeeks = 2;                // 2-week rotating cycle
_dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
// Meal slots per day:
'breakfast': {'notProvided': false, 'dishes': 'Masala Dosa, Sambar, Tea'}
'lunch':     {'notProvided': false, 'dishes': 'Rice, Sambar, Mix Veg Curry'}
'dinner':    {'notProvided': false, 'dishes': 'Chapati, Dal Tadka, Jeera Rice'}
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Menu Slot Identifier |
| `property_id` | `UUID` | **FK** $\rightarrow$ `properties(id)` ON DELETE CASCADE | Associated building |
| `week_index` | `INT` | Default: `0` | Week 1 = `0`, Week 2 = `1` |
| `day_of_week` | `INT` | **NOT NULL** | `0` = Monday ... `6` = Sunday |
| `breakfast_dishes`| `TEXT` | `NULLABLE` | Dishes string (e.g. "Masala Dosa, Sambar") |
| `breakfast_provided`| `BOOLEAN`| Default: `true` | Mapped from `'notProvided'` inverted |
| `lunch_dishes` | `TEXT` | `NULLABLE` | Dishes string (e.g. "Rice, Sambar, Curry") |
| `lunch_provided` | `BOOLEAN` | Default: `true` | Mapped from `'notProvided'` inverted |
| `dinner_dishes` | `TEXT` | `NULLABLE` | Dishes string (e.g. "Chapati, Dal Tadka") |
| `dinner_provided`| `BOOLEAN` | Default: `true` | Mapped from `'notProvided'` inverted |

---

### 12. `meal_headcounts` (Stops Cook Wastage)
* **Matches Code File**: `mobile_app/lib/features/tenant_dashboard/presentation/screens/tenant_dashboard_screen.dart` (Line 48)  
* **Matches Code File**: `mobile_app/lib/features/tenant_food_menu/presentation/screens/tenant_food_menu_screen.dart`

#### Exact Dart Code Variables:
```dart
// tenant_dashboard_screen.dart (Line 48)
bool _isEatingDinner = true;    // Headcount toggle switch
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | RSVP Identifier |
| `tenant_id` | `UUID` | **FK** $\rightarrow$ `users(id)` ON DELETE CASCADE | Resident user |
| `property_id` | `UUID` | **FK** $\rightarrow$ `properties(id)` | Building |
| `meal_date` | `DATE` | **NOT NULL** | Date of the meal |
| `breakfast_rsvp`| `BOOLEAN` | Default: `true` | True if eating breakfast |
| `lunch_rsvp` | `BOOLEAN` | Default: `false` | Default false to auto-skip office dabba |
| `dinner_rsvp` | `BOOLEAN` | Default: `true` | Mapped directly from `_isEatingDinner` |

---

## Pillar 6: Staff, Expenses & B2B SaaS Licensing

### 13. `staff_members` (Directory & Payroll)
* **Matches Code File**: `mobile_app/lib/features/owner_staff/presentation/screens/owner_staff_screen.dart` (Lines 38–70)

#### Exact Dart Code Variables:
```dart
// owner_staff_screen.dart (Lines 38-70)
'id': 'STF-101'                 // Staff Identifier
'name': 'Suresh Kumar'          // Staff Name
'initials': 'SK'                // Avatar initials
'role': 'warden'                // 'warden', 'cook', 'cleaner', 'security'
'workTitle': 'Warden & Ops'     // Custom Job Title
'phone': '9845122334'           // Contact number
'salary': 18000                 // Monthly salary amount
'month': 'August Salary'        // Salary cycle month
'status': 'paid'                // 'paid', 'pending'
'joinedDate': 'Jan 2024'        // Joining month/year
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Staff Identifier |
| `property_id` | `UUID` | **FK** $\rightarrow$ `properties(id)` ON DELETE CASCADE | Associated building |
| `staff_code` | `VARCHAR(20)` | **NOT NULL** | Mapped from `'id'` (`'STF-101'`) |
| `full_name` | `VARCHAR(100)`| **NOT NULL** | Mapped from `'name'` (`'Suresh Kumar'`) |
| `role` | `VARCHAR(30)` | **NOT NULL** | Check: `'warden'`, `'cook'`, `'cleaner'`, `'security'` |
| `work_title` | `VARCHAR(100)`| **NOT NULL** | Mapped from `'workTitle'` |
| `phone` | `VARCHAR(15)` | **NOT NULL** | Mapped from `'phone'` |
| `monthly_salary`| `NUMERIC(10,2)`| **NOT NULL** | Mapped from `'salary'` (`18000.00`) |
| `salary_status` | `VARCHAR(20)` | Default: `'pending'`| Check: `'paid'`, `'pending'` |
| `joined_date` | `VARCHAR(30)` | `NULLABLE` | Mapped from `'joinedDate'` (`'Jan 2024'`) |

---

### 14. `expenses` (Operating P&L Ledger)
* **Matches Code File**: `mobile_app/lib/features/owner_expenses/presentation/screens/owner_expenses_screen.dart` (Lines 46–80)

#### Exact Dart Code Variables:
```dart
// owner_expenses_screen.dart (Lines 46-80)
'id': 'EXP-101'                 // Expense Identifier
'title': 'Electricity Bill'     // Bill title
'category': 'Electricity'       // 'Electricity', 'Water', 'Groceries', 'Salary', 'Maintenance', 'WiFi'
'vendor': 'BESCOM Karnataka'    // Vendor / Supplier name
'amount': 24500                 // Expense amount
'date': '15 Aug 2026'           // Date of bill
'mode': 'Direct Bank Transfer'  // 'Direct Bank Transfer', 'UPI', 'Cash'
'ref': 'Ref: TXN99120'          // Transaction reference
'receiptFile': 'bescom.pdf'     // Uploaded bill receipt
'hasReceipt': true              // Receipt attached flag
```

#### Database Table Schema:
| Column | Type | Constraints | Exact Code Source / Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Expense Identifier |
| `property_id` | `UUID` | **FK** $\rightarrow$ `properties(id)` ON DELETE CASCADE | Associated building |
| `expense_code` | `VARCHAR(20)` | **NOT NULL** | Mapped from `'id'` (`'EXP-101'`) |
| `title` | `VARCHAR(100)`| **NOT NULL** | Mapped from `'title'` (`'Electricity Bill'`) |
| `category` | `VARCHAR(30)` | **NOT NULL** | Check: `'Electricity'`, `'Water'`, `'Groceries'`, `'Salary'`, `'Maintenance'`, `'WiFi'` |
| `vendor` | `VARCHAR(120)`| `NULLABLE` | Mapped from `'vendor'` |
| `amount` | `NUMERIC(10,2)`| **NOT NULL** | Mapped from `'amount'` (`24500.00`) |
| `payment_mode` | `VARCHAR(30)` | **NOT NULL** | Mapped from `'mode'` (`'UPI'`, `'Cash'`, `'Direct Bank Transfer'`) |
| `reference_no` | `VARCHAR(60)` | `NULLABLE` | Mapped from `'ref'` (`'TXN99120'`) |
| `receipt_url` | `TEXT` | `NULLABLE` | Mapped from `'receiptFile'` |
| `expense_date` | `DATE` | **NOT NULL** | Mapped from `'date'` |

---

### 15. `saas_subscriptions` & `saas_invoices` (B2B Bed Licensing & Receipts)
* **Matches Code File**: `mobile_app/lib/features/owner_billing/presentation/screens/owner_saas_billing_screen.dart`

#### Exact Dart Code Variables:
```dart
// owner_saas_billing_screen.dart
pricePerBed = 15.0;            // ₹15 / bed / month
platformFee = 79.0;            // ₹79 platform fee
totalDue = (beds * 15) + 79;   // Dynamic monthly software license
sacCode = '998315';            // SAC Code 998315 (Software as a Service)
```

#### Database Table Schemas:
**`saas_subscriptions`**:
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Subscription Identifier |
| `property_id` | `UUID` | **FK** $\rightarrow$ `properties(id)` ON DELETE CASCADE | Associated Property |
| `total_beds` | `INT` | **NOT NULL**, Default: `35` | Bed quota / count |
| `price_per_bed` | `NUMERIC(10,2)`| **NOT NULL**, Default: `15.00` | ₹15/bed rate |
| `platform_fee` | `NUMERIC(10,2)`| **NOT NULL**, Default: `79.00` | Platform services |
| `total_due` | `NUMERIC(10,2)`| **NOT NULL**, Default: `604.00` | Billed amount |
| `sac_code` | `VARCHAR(10)` | Default: `'998315'` | SAC Code |
| `status` | `VARCHAR(20)` | Default: `'active'` | `'active'`, `'trial'`, `'past_due'` |
| `trial_ends_at` | `TIMESTAMPTZ` | | Free trial expiration |
| `next_billing_date`| `TIMESTAMPTZ` | | Next auto-debit date |

**`saas_invoices`**:
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, `gen_random_uuid()` | Invoice Record Identifier |
| `invoice_number` | `TEXT` | **UNIQUE**, **NOT NULL** | e.g. `'US-2026-0891'` |
| `property_id` | `UUID` | **FK** $\rightarrow$ `properties(id)` ON DELETE CASCADE | Associated Property |
| `amount` | `NUMERIC(10,2)`| **NOT NULL** | Total paid amount |
| `status` | `VARCHAR(20)` | Default: `'paid'` | Payment status |
| `payment_mode` | `TEXT` | Default: `'UPI AutoPay'` | Payment channel |
| `utr_number` | `TEXT` | `NULLABLE` | Cashfree transaction ref / UTR |
| `billing_period` | `TEXT` | | e.g. `'1 Aug 2026 – 31 Aug 2026'` |
| `created_at` | `TIMESTAMPTZ` | Default: `NOW()` | Payment timestamp |

---

## 📌 Summary: Foreign Key Relationship Map

```
users (Owners & Tenants)
  │
  ├── properties (pg_buildings)
  │     ├── rooms
  │     │     └── beds
  │     │           └── stays (Tenancy Contract)
  │     │                 ├── rent_invoices
  │     │                 │     └── payment_transactions (0% UPI Approvals)
  │     │                 └── deposit_deductions (Damages)
  │     ├── maintenance_tickets
  │     ├── food_menus
  │     ├── meal_headcounts
  │     ├── staff_members
  │     └── expenses (P&L Ledger)
  │
  └── saas_subscriptions (B2B Bed Licensing)
```
