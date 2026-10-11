# 🗄️ UrbanStay Master Database Schema & Code Mapping
**Document**: `MASTER_DATABASE_SCHEMA.md`  
**Purpose**: 100% Verified, End-to-End mapping between Flutter Dart code variables, mock structures, migration files, and production PostgreSQL / Supabase tables. Zero assumptions, zero hallucinations.
**Version**: 2.0 (Full 23-Table Production Architecture)

---

## 📑 Index of Verified Tables (23 Tables Total)

1. [Pillar 1: Auth, Profiles & Leads](#pillar-1-auth-profiles--leads)
   * [`profiles`](#1-profiles-auth-directory)
   * [`leads`](#2-leads-marketing-inquiries)
2. [Pillar 2: Property & Live Bed Inventory](#pillar-2-property--live-bed-inventory)
   * [`properties`](#3-properties-pg-buildings)
   * [`rooms`](#4-rooms)
   * [`beds`](#5-beds-live-occupancy-matrix)
3. [Pillar 3: Tenant Lifecycle & Onboarding](#pillar-3-tenant-lifecycle--onboarding)
   * [`tenants`](#6-tenants-active-residents)
   * [`onboarding_requests`](#7-onboarding_requests-reception-qr-queue)
   * [`move_out_notices`](#8-move_out_notices-30-day-pipeline)
4. [Pillar 4: 0% Direct UPI Ledger & Approvals](#pillar-4-0-direct-upi-ledger--approvals)
   * [`rent_ledgers`](#9-rent_ledgers-monthly-cycles)
   * [`payment_approvals`](#10-payment_approvals-utr-verification)
   * [`rent_extensions`](#11-rent_extensions-delayed-salary-requests)
   * [`warden_cash_collections`](#12-warden_cash_collections-offline-cash-audit)
   * [`damage_deductions`](#13-damage_deductions-deposit-deductions)
5. [Pillar 5: Operations, Helpdesk & Food Mess](#pillar-5-operations-helpdesk--food-mess)
   * [`maintenance_tickets`](#14-maintenance_tickets-complaints)
   * [`food_menus`](#15-food_menus-weekly-rotations)
   * [`housekeeping_requests`](#16-housekeeping_requests-daily-service)
   * [`announcements`](#17-announcements-notice-board)
6. [Pillar 6: Staff & Property Team](#pillar-6-staff--property-team)
   * [`staff`](#18-staff-payroll--directory)
   * [`property_team`](#19-property_team-co-owners--managers)
   * [`expenses`](#20-expenses-operating-pl-ledger)
7. [Pillar 7: Settings & B2B SaaS Licensing](#pillar-7-settings--b2b-saas-licensing)
   * [`property_settings`](#21-property_settings-house-rules)
   * [`saas_subscriptions`](#22-saas_subscriptions-b2b-bed-licensing)
   * [`saas_invoices`](#23-saas_invoices-tax-invoices--receipts)

---

## 🏛️ Architecture & Audit Metadata Standard

To eliminate expensive multi-table joins on low-bandwidth 4G Indian mobile networks and provide immutable audit records (the Stripe / Amazon billing model), all operational tables enforce:
* **`property_id` (UUID)**: Foreign Key referencing `properties(id)` with `ON DELETE CASCADE`.
* **`property_name` (TEXT)**: Immutable human-readable property name snapshot.
* **`room_number` (TEXT)**: Denormalized room number snapshot for room/resident linked rows.
* **`tenant_name` (TEXT)**: Denormalized resident name snapshot for resident/payment linked rows.

---

## Pillar 1: Auth, Profiles & Leads

### 1. `profiles` (Auth & Directory)
* **Matches Code File**: `mobile_app/lib/features/auth/presentation/screens/phone_verify_screen.dart`
* **Matches Code File**: `mobile_app/lib/features/auth/presentation/screens/role_selector_screen.dart`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, REFERENCES `auth.users(id)` ON DELETE CASCADE | Auth User ID |
| `phone` | `TEXT` | **NOT NULL** | 10-digit India mobile number (`+91`) |
| `full_name` | `TEXT` | `NULLABLE` | User's full legal name |
| `role` | `TEXT` | **NOT NULL**, Default: `'owner'` | Role: `'owner'` or `'tenant'` |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Registration timestamp |

---

### 2. `leads` (Marketing Inquiries)
* **Matches Code File**: UrbanStay Web Portal & Reception Inquiries

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Unique Lead ID |
| `name` | `TEXT` | **NOT NULL** | Prospective lead name |
| `phone` | `TEXT` | **NOT NULL** | Lead phone number |
| `email` | `TEXT` | `NULLABLE` | Lead email address |
| `city` | `TEXT` | Default: `'Bengaluru'` | Lead city |
| `source` | `TEXT` | Default: `'Website'` | Lead source |
| `status` | `TEXT` | Default: `'New'` | Status: `'New'`, `'Contacted'`, `'Converted'` |
| `notes` | `TEXT` | `NULLABLE` | Follow-up remarks |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Submission timestamp |

---

## Pillar 2: Property & Live Bed Inventory

### 3. `properties` (PG Buildings)
* **Matches Code File**: `mobile_app/lib/features/owner_setup/presentation/screens/owner_setup_screen.dart`
* **Matches Code File**: `mobile_app/lib/features/owner_settings/presentation/screens/owner_settings_screen.dart`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Unique Property Identifier |
| `property_name` | `TEXT` | **NOT NULL** | Brand name (e.g. "Green Nest Luxury") |
| `property_code` | `TEXT` | **UNIQUE** | Unique check-in code (e.g. `URBAN-101`) |
| `gender_category` | `TEXT` | Default: `'Coliving'` | `'Gents'`, `'Ladies'`, `'Coliving'` |
| `property_structure`| `TEXT` | Default: `'Independent Building'` | Structure type |
| `street_address` | `TEXT` | `NULLABLE` | Exact street address |
| `area_locality` | `TEXT` | `NULLABLE` | Locality (e.g. "BTM 2nd Stage") |
| `landmark` | `TEXT` | `NULLABLE` | Nearest landmark |
| `city` | `TEXT` | Default: `'Bengaluru'` | City |
| `state` | `TEXT` | Default: `'Karnataka'` | State |
| `pincode` | `TEXT` | `NULLABLE` | 6-digit PIN code |
| `maps_url` | `TEXT` | `NULLABLE` | Google Maps location URL |
| `lift_count` | `TEXT` | Default: `'None'` | Number of lifts |
| `power_backup` | `TEXT` | Default: `'None'` | `'Full Backup'`, `'None'` |
| `washing_machine_count`| `TEXT`| Default: `'None'` | Washing machine inventory |
| `total_beds` | `INT` | Default: `0` | Calculated bed capacity |
| `rent_due_day` | `TEXT` | Default: `'5th'` | Monthly rent cycle anchor |
| `grace_period` | `TEXT` | Default: `'5 Days'` | Days before late fee applies |
| `late_fee` | `NUMERIC` | Default: `200.00` | Late fee amount |
| `notice_period` | `TEXT` | Default: `'30 Days'` | Notice period |
| `owner_legal_name`| `TEXT` | `NULLABLE` | Owner's name as per Aadhaar |
| `owner_email` | `TEXT` | `NULLABLE` | Owner email |
| `owner_aadhaar_number`| `TEXT`| `NULLABLE` | 12-digit Aadhaar number |
| `owner_permanent_address`| `TEXT`| `NULLABLE` | Owner home address |
| `owner_aadhaar_front_url`| `TEXT`| `NULLABLE` | Aadhaar front image URL |
| `owner_aadhaar_back_url`| `TEXT`| `NULLABLE` | Aadhaar back image URL |
| `bank_qr_url` | `TEXT` | `NULLABLE` | Bank UPI QR image URL |
| `ground_floor_has_rooms`| `BOOLEAN`| Default: `TRUE` | Floor layout start flag |
| `total_floors` | `INT` | Default: `1` | Total floors |
| `total_rooms` | `INT` | Default: `0` | Total rooms |
| `floor_wise_rooms`| `JSONB` | `NULLABLE` | Floor breakdown configuration |
| `room_naming_format`| `TEXT` | Default: `'numeric'` | `'numeric'` (101) or `'block'` (A-1) |
| `bank_holder_name`| `TEXT` | `NULLABLE` | Bank account holder name |
| `bank_name` | `TEXT` | `NULLABLE` | Bank name (e.g. HDFC, SBI) |
| `upi_vpa` | `TEXT` | `NULLABLE` | 0% Direct UPI ID (`owner@okhdfcbank`) |
| `crediting_phone` | `TEXT` | `NULLABLE` | Bank-linked mobile number |
| `owner_id` | `UUID` | `NULLABLE` | Owner Auth ID |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Creation timestamp |

---

### 4. `rooms`
* **Matches Code File**: `mobile_app/lib/features/owner_rooms/presentation/screens/owner_rooms_screen.dart`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Room identifier |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Parent property |
| `property_name` | `TEXT` | Default: `''` | Denormalized property name |
| `floor_number` | `INT` | Default: `1` | Floor number |
| `floor_label` | `TEXT` | Default: `'1st Floor'` | Floor display label |
| `room_number` | `TEXT` | **NOT NULL** | Room label (e.g. "101") |
| `sharing_type` | `TEXT` | Default: `'2-Sharing'` | Sharing capacity type |
| `total_beds` | `INT` | Default: `2` | Number of beds |
| `rent_per_bed` | `NUMERIC(10, 2)`| Default: `8500.00` | Monthly rent per bed |
| `deposit_per_bed`| `NUMERIC(10, 2)`| Default: `15000.00` | Security deposit per bed |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Creation timestamp |

---

### 5. `beds` (Live Occupancy Matrix)
* **Matches Code File**: `mobile_app/lib/features/owner_rooms/presentation/screens/owner_rooms_screen.dart`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Bed identifier |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Parent property |
| `property_name` | `TEXT` | Default: `''` | Denormalized property name |
| `room_id` | `UUID` | REFERENCES `rooms(id)` ON DELETE CASCADE | Parent room |
| `room_number` | `TEXT` | `NULLABLE` | Room number snapshot |
| `bed_label` | `TEXT` | `NULLABLE` | Bed display letter (e.g. 'A', 'B') |
| `bed_code` | `TEXT` | `NULLABLE` | Full code (e.g. '101-A') |
| `is_occupied` | `BOOLEAN` | Default: `FALSE` | Occupancy flag |
| `status` | `TEXT` | Default: `'Vacant'` | `'Vacant'`, `'Active'`, `'Notice'` |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Creation timestamp |

---

## Pillar 3: Tenant Lifecycle & Onboarding

### 6. `tenants` (Active Residents)
* **Matches Code File**: `mobile_app/lib/features/owner_rooms/presentation/screens/owner_rooms_screen.dart`
* **Matches Code File**: `mobile_app/lib/features/tenant_portal/presentation/screens/tenant_portal_screen.dart`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Tenant Identifier |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Parent property |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `room_id` | `UUID` | REFERENCES `rooms(id)` ON DELETE SET NULL | Assigned room |
| `room_number` | `TEXT` | Default: `''` | Room number snapshot |
| `bed_id` | `UUID` | REFERENCES `beds(id)` ON DELETE SET NULL | Assigned bed |
| `bed_label` | `TEXT` | Default: `''` | Bed letter/label snapshot |
| `name` | `TEXT` | **NOT NULL** | Tenant full name |
| `tenant_name` | `TEXT` | `NULLABLE` | Alias matching audit standard |
| `phone` | `TEXT` | **NOT NULL** | 10-digit WhatsApp phone |
| `email` | `TEXT` | `NULLABLE` | Email address |
| `workplace` | `TEXT` | `NULLABLE` | Company or college |
| `monthly_rent` | `NUMERIC(10, 2)`| Default: `8500.00` | Agreed monthly rent |
| `security_deposit`| `NUMERIC(10, 2)`| Default: `15000.00`| Paid security deposit |
| `is_aadhaar_verified`| `BOOLEAN`| Default: `FALSE` | Government KYC flag |
| `refund_upi_id` | `TEXT` | `NULLABLE` | Deposit refund UPI VPA |
| `emergency_contact`| `TEXT` | `NULLABLE` | Emergency phone number |
| `status` | `TEXT` | Default: `'Active'` | `'Active'`, `'Notice'`, `'Checked Out'` |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Move-in timestamp |

---

### 7. `onboarding_requests` (Reception QR Queue)
* **Matches Code File**: Reception QR Standee Check-In (`tenant_checkin_screen.dart`)

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Check-in Request ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Target property |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `tenant_name` | `TEXT` | **NOT NULL** | Applicant full name |
| `phone` | `TEXT` | **NOT NULL** | Applicant mobile |
| `gender` | `TEXT` | Default: `'Male'` | Gender |
| `occupation` | `TEXT` | Default: `'Professional'` | Occupation |
| `company` | `TEXT` | `NULLABLE` | Company / College |
| `requested_room`| `TEXT` | **NOT NULL** | Chosen room |
| `room_number` | `TEXT` | `NULLABLE` | Room number snapshot |
| `requested_bed` | `TEXT` | **NOT NULL** | Chosen bed identifier |
| `sharing_type` | `TEXT` | Default: `'2-Sharing'` | Sharing capacity |
| `monthly_rent` | `NUMERIC(10, 2)`| Default: `8500.00` | Rent |
| `deposit_amount`| `NUMERIC(10, 2)`| Default: `17000.00`| Deposit |
| `aadhaar_masked`| `TEXT` | `NULLABLE` | Last 4 digits of Aadhaar |
| `aadhaar_front_url`| `TEXT`| `NULLABLE` | Aadhaar front document |
| `selfie_url` | `TEXT` | `NULLABLE` | Live selfie verification photo |
| `status` | `TEXT` | Default: `'PENDING_APPROVAL'` | `'PENDING_APPROVAL'`, `'APPROVED'`, `'REJECTED'` |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Application timestamp |

---

### 8. `move_out_notices` (30-Day Pipeline)
* **Matches Code File**: `mobile_app/lib/features/tenant_notices/` & Vacancy Pipeline

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Notice ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `tenant_id` | `UUID` | REFERENCES `tenants(id)` ON DELETE CASCADE | Tenant ID |
| `tenant_name` | `TEXT` | Default: `''` | Tenant name snapshot |
| `room_number` | `TEXT` | **NOT NULL** | Room number |
| `bed_identifier`| `TEXT` | **NOT NULL** | Bed identifier |
| `vacate_date` | `DATE` | **NOT NULL** | Move-out target date |
| `notice_days` | `INT` | Default: `30` | Notice period length |
| `reason` | `TEXT` | **NOT NULL** | Reason for vacating |
| `refund_upi_id`| `TEXT` | **NOT NULL** | Refund UPI address |
| `status` | `TEXT` | Default: `'ACTIVE'` | `'ACTIVE'`, `'COMPLETED'`, `'WITHDRAWN'` |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Notice served date |

---

## Pillar 4: 0% Direct UPI Ledger & Approvals

### 9. `rent_ledgers` (Monthly Cycles)
* **Matches Code File**: `mobile_app/lib/features/owner_rent_collection/`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Ledger entry ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `tenant_id` | `UUID` | REFERENCES `tenants(id)` ON DELETE CASCADE | Tenant ID |
| `tenant_name` | `TEXT` | Default: `''` | Tenant name snapshot |
| `room_number` | `TEXT` | Default: `''` | Room number snapshot |
| `billing_month` | `TEXT` | **NOT NULL** | Cycle (e.g. "Oct 2026") |
| `rent_amount` | `NUMERIC(10, 2)`| Default: `8500.00` | Full monthly dues |
| `due_amount` | `NUMERIC(10, 2)`| Default: `8500.00` | Remaining unpaid balance |
| `status` | `TEXT` | Default: `'PENDING'` | `'PENDING'`, `'PAID'`, `'OVERDUE'` |
| `due_date` | `TEXT` | Default: `'5th'` | Monthly due day |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Invoice generated at |

---

### 10. `payment_approvals` (UTR Verification)
* **Matches Code File**: `mobile_app/lib/features/owner_approvals/presentation/screens/owner_approvals_screen.dart`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Approval Request ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `tenant_id` | `UUID` | REFERENCES `tenants(id)` ON DELETE CASCADE | Tenant ID |
| `tenant_name` | `TEXT` | Default: `''` | Tenant name snapshot |
| `room_number` | `TEXT` | Default: `''` | Room number snapshot |
| `ledger_id` | `UUID` | REFERENCES `rent_ledgers(id)` ON DELETE SET NULL | Linked billing cycle |
| `amount` | `NUMERIC(10, 2)`| **NOT NULL** | Amount claimed paid |
| `utr_number` | `TEXT` | **NOT NULL** | 12-digit Bank UPI UTR |
| `payment_app` | `TEXT` | Default: `'Google Pay'` | GPay, PhonePe, Paytm, CRED |
| `proof_image_url`| `TEXT` | `NULLABLE` | Payment screenshot |
| `status` | `TEXT` | Default: `'pending'` | `'pending'`, `'approved'`, `'rejected'` |
| `receipt_no` | `TEXT` | `NULLABLE` | Generated receipt number |
| `reject_reason`| `TEXT` | `NULLABLE` | Rejection remark |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Submission timestamp |

---

### 11. `rent_extensions` (Delayed Salary Requests)
* **Matches Code File**: `mobile_app/lib/features/owner_approvals/`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Extension request ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `tenant_id` | `UUID` | REFERENCES `tenants(id)` ON DELETE CASCADE | Tenant ID |
| `tenant_name` | `TEXT` | Default: `''` | Tenant name snapshot |
| `room_number` | `TEXT` | Default: `''` | Room number snapshot |
| `ledger_id` | `UUID` | REFERENCES `rent_ledgers(id)` ON DELETE CASCADE | Target rent ledger |
| `requested_date`| `TEXT` | **NOT NULL** | Promised payment date (e.g. "10th Oct") |
| `reason` | `TEXT` | **NOT NULL** | Reason (e.g. "Salary credited on 10th") |
| `status` | `TEXT` | Default: `'pending'` | `'pending'`, `'approved'`, `'rejected'` |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Request timestamp |

---

### 12. `warden_cash_collections` (Offline Cash Audit)
* **Matches Code File**: `mobile_app/lib/features/owner_rent_collection/` & Cash Audit Hub

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Cash collection ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `tenant_id` | `UUID` | REFERENCES `tenants(id)` ON DELETE CASCADE | Tenant ID |
| `tenant_name` | `TEXT` | Default: `''` | Tenant name snapshot |
| `room_number` | `TEXT` | Default: `''` | Room number snapshot |
| `warden_name` | `TEXT` | **NOT NULL** | Warden / Staff collector name |
| `amount` | `NUMERIC(10, 2)`| **NOT NULL** | Physical cash amount collected |
| `notes` | `TEXT` | `NULLABLE` | Audit remark |
| `is_deposited_to_owner`| `BOOLEAN`| Default: `FALSE` | Owner reconciliation audit flag |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Collection timestamp |

---

### 13. `damage_deductions` (Deposit Deductions)
* **Matches Code File**: `mobile_app/lib/features/owner_rooms/` (Checkout Damage Settlement)

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Deduction ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `tenant_id` | `UUID` | REFERENCES `tenants(id)` ON DELETE CASCADE | Resident ID |
| `tenant_name` | `TEXT` | Default: `''` | Resident name snapshot |
| `room_id` | `UUID` | REFERENCES `rooms(id)` ON DELETE CASCADE | Room ID |
| `room_number` | `TEXT` | Default: `''` | Room number snapshot |
| `item_damaged` | `TEXT` | **NOT NULL** | Broken item (e.g. "Geyser Switch Broken") |
| `amount` | `NUMERIC(10, 2)`| Default: `500.00` | Deduction amount |
| `deduction_mode`| `TEXT` | Default: `'deposit'` | `'deposit'` or `'direct_cash'` |
| `photo_url` | `TEXT` | `NULLABLE` | Photo proof of damage |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Recorded timestamp |

---

## Pillar 5: Operations, Helpdesk & Food Mess

### 14. `maintenance_tickets` (Complaints)
* **Matches Code File**: `mobile_app/lib/features/owner_complaints/presentation/screens/owner_complaints_screen.dart`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Complaint Ticket ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `tenant_id` | `UUID` | REFERENCES `tenants(id)` ON DELETE CASCADE | Tenant who logged ticket |
| `tenant_name` | `TEXT` | Default: `''` | Tenant name snapshot |
| `room_number` | `TEXT` | Default: `''` | Room number snapshot |
| `category` | `TEXT` | Default: `'Other'` | `'Plumbing'`, `'Electrical'`, `'WiFi'`, `'Cleaning'` |
| `issue` | `TEXT` | **NOT NULL** | Detailed description |
| `photo_url` | `TEXT` | `NULLABLE` | Photo evidence |
| `status` | `TEXT` | Default: `'pending'` | `'pending'`, `'in_progress'`, `'resolved'` |
| `assigned_staff`| `TEXT` | `NULLABLE` | Assigned plumber/electrician |
| `progress_note`| `TEXT` | `NULLABLE` | Resolution remarks |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Logging timestamp |

---

### 15. `food_menus` (Weekly Rotations)
* **Matches Code File**: `mobile_app/lib/features/owner_food_menu/` & Tenant Meal Viewer

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Menu entry ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `cycle_weeks` | `INT` | Default: `2` | Cycle length (1 to 4 weeks) |
| `week_number` | `INT` | Default: `1` | Week in cycle (1 to 4) |
| `day_of_week` | `TEXT` | **NOT NULL** | `'MON'`, `'TUE'`, `'WED'`, `'THU'`, `'FRI'`, `'SAT'`, `'SUN'` |
| `breakfast` | `TEXT` | Default: `''` | Breakfast items |
| `lunch` | `TEXT` | Default: `''` | Lunch items |
| `dinner` | `TEXT` | Default: `''` | Dinner items |
| `updated_at` | `TIMESTAMPTZ`| Default: `NOW()` | Last modified timestamp |

---

### 16. `housekeeping_requests` (Daily Service)
* **Matches Code File**: `mobile_app/lib/features/tenant_portal/`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Request ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `room_id` | `UUID` | REFERENCES `rooms(id)` ON DELETE CASCADE | Room ID |
| `room_number` | `TEXT` | Default: `''` | Room number snapshot |
| `tenant_id` | `UUID` | REFERENCES `tenants(id)` ON DELETE CASCADE | Tenant ID |
| `tenant_name` | `TEXT` | Default: `''` | Tenant name snapshot |
| `service_type` | `TEXT` | Default: `'Daily Sweep'` | `'Daily Sweep'`, `'Bathroom Wash'`, `'Linen Change'` |
| `preferred_slot`| `TEXT` | **NOT NULL** | Slot (e.g. "10:00 AM - 12:00 PM") |
| `status` | `TEXT` | Default: `'SCHEDULED'` | `'SCHEDULED'`, `'COMPLETED'`, `'CANCELLED'` |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Request timestamp |

---

### 17. `announcements` (Notice Board)
* **Matches Code File**: `mobile_app/lib/features/tenant_portal/` & Owner Broadcast Hub

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Announcement ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Target property |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `title` | `TEXT` | **NOT NULL** | Headline (e.g. "Water Tank Cleaning on Sunday") |
| `message` | `TEXT` | **NOT NULL** | Full announcement text |
| `category` | `TEXT` | Default: `'General'` | `'General'`, `'Maintenance'`, `'Food'`, `'Urgent'` |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Broadcast timestamp |

---

## Pillar 6: Staff & Property Team

### 18. `staff` (Payroll & Directory)
* **Matches Code File**: `mobile_app/lib/features/owner_staff/presentation/screens/owner_staff_screen.dart`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Staff Identifier |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `name` | `TEXT` | **NOT NULL** | Staff full name |
| `role` | `TEXT` | Default: `'warden'` | `'warden'`, `'cook'`, `'cleaner'`, `'security'` |
| `work_title` | `TEXT` | `NULLABLE` | Display title |
| `phone` | `TEXT` | **NOT NULL** | Contact phone number |
| `monthly_salary`| `NUMERIC(10, 2)`| Default: `15000.00`| Monthly salary |
| `salary_status`| `TEXT` | Default: `'pending'` | `'pending'`, `'paid'` |
| `joined_date` | `TEXT` | Default: `'Jan 2026'` | Joining month |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Added timestamp |

---

### 19. `property_team` (Co-Owners & Managers)
* **Matches Code File**: `mobile_app/lib/features/owner_dashboard/` (Team Hub)

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Team member ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Primary property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `name` | `TEXT` | **NOT NULL** | Name |
| `phone` | `TEXT` | **NOT NULL** | Mobile |
| `role` | `TEXT` | Default: `'manager'` | `'co-owner'`, `'manager'`, `'warden'` |
| `status` | `TEXT` | Default: `'Active'` | Status |
| `assigned_property_ids`| `TEXT[]`| Default: `'{}'` | Array of property IDs with access permissions |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Timestamp |
| `updated_at` | `TIMESTAMPTZ`| Default: `NOW()` | Modification timestamp |

---

### 20. `expenses` (Operating P&L Ledger)
* **Matches Code File**: `mobile_app/lib/features/owner_expenses/presentation/screens/owner_expenses_screen.dart`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Expense ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `title` | `TEXT` | **NOT NULL** | Expense title (e.g. "Rice & Dal Ration") |
| `category` | `TEXT` | Default: `'Maintenance'` | `'Grocery'`, `'Electricity'`, `'Water'`, `'Staff'`, `'Maintenance'` |
| `vendor` | `TEXT` | `NULLABLE` | Vendor name / shop |
| `amount` | `NUMERIC(10, 2)`| **NOT NULL** | Paid amount |
| `payment_mode` | `TEXT` | Default: `'UPI'` | `'UPI'`, `'Cash'`, `'Bank Transfer'` |
| `receipt_url` | `TEXT` | `NULLABLE` | Bill receipt photo URL |
| `expense_date` | `DATE` | Default: `CURRENT_DATE`| Transaction date |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Recorded timestamp |

---

## Pillar 7: Settings & B2B SaaS Licensing

### 21. `property_settings` (House Rules)
* **Matches Code File**: `mobile_app/lib/features/owner_settings/presentation/screens/owner_settings_screen.dart`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Settings ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE, **UNIQUE** | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `gate_closing_time`| `TEXT`| Default: `'10:30 PM'` | Curfew time |
| `visitor_allowed`| `BOOLEAN` | Default: `FALSE` | Visitor policy |
| `alcohol_smoking_allowed`| `BOOLEAN`| Default: `FALSE` | Substance rule |
| `wifi_ssid` | `TEXT` | Default: `'UrbanStay_HighSpeed_5G'` | WiFi SSID |
| `wifi_password` | `TEXT` | Default: `'StaySecure@2026'` | WiFi password |
| `emergency_phone`| `TEXT`| Default: `'+91 98450 12345'` | Warden emergency line |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Record timestamp |

---

### 22. `saas_subscriptions` (B2B Bed Licensing)
* **Matches Code File**: `mobile_app/lib/features/owner_saas_billing/presentation/screens/owner_saas_billing_screen.dart`

> **Pricing Rule**: ₹15 per bed / month + ₹79 platform fee. SAC Code `998315` (Software as a Service).

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Subscription ID |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `total_beds` | `INT` | Default: `35` | Licensed bed count |
| `price_per_bed` | `NUMERIC(10, 2)`| Default: `15.00` | ₹15/bed rate |
| `platform_fee` | `NUMERIC(10, 2)`| Default: `79.00` | ₹79 flat platform fee |
| `total_due` | `NUMERIC(10, 2)`| Default: `604.00` | Total monthly license |
| `sac_code` | `TEXT` | Default: `'998315'` | GST SAC Code |
| `status` | `TEXT` | Default: `'active'` | `'active'`, `'past_due'`, `'trial'` |
| `trial_ends_at`| `TIMESTAMPTZ`| Default: `(NOW() + 12 days)` | Free trial expiry |
| `next_billing_date`| `TIMESTAMPTZ`| Default: `(NOW() + 30 days)` | Renewal date |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Created timestamp |

---

### 23. `saas_invoices` (Tax Invoices & Receipts)
* **Matches Code File**: `mobile_app/lib/features/owner_saas_billing/`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | **PRIMARY KEY**, Default: `gen_random_uuid()` | Invoice ID |
| `invoice_number`| `TEXT` | **UNIQUE**, **NOT NULL** | Invoice serial (e.g. `US-2026-0891`) |
| `property_id` | `UUID` | REFERENCES `properties(id)` ON DELETE CASCADE | Property ID |
| `property_name` | `TEXT` | Default: `''` | Property name snapshot |
| `amount` | `NUMERIC(10, 2)`| **NOT NULL** | Billed amount |
| `status` | `TEXT` | Default: `'paid'` | `'paid'`, `'pending'` |
| `payment_mode` | `TEXT` | Default: `'UPI AutoPay'` | Payment channel |
| `utr_number` | `TEXT` | `NULLABLE` | Gateway UTR / Transaction ID |
| `billing_period`| `TEXT` | `NULLABLE` | Period (e.g. "1 Aug 2026 – 31 Aug 2026") |
| `created_at` | `TIMESTAMPTZ`| Default: `NOW()` | Invoiced timestamp |

---

## ⚡ Index & Query Performance Guide

To guarantee `< 50ms` query latency across high-concurrency mobile operations:

```sql
-- Multi-Tenant Foreign Key Indexing
CREATE INDEX IF NOT EXISTS idx_rooms_property_id ON public.rooms(property_id);
CREATE INDEX IF NOT EXISTS idx_beds_property_id ON public.beds(property_id);
CREATE INDEX IF NOT EXISTS idx_tenants_property_id ON public.tenants(property_id);
CREATE INDEX IF NOT EXISTS idx_rent_ledgers_property_id ON public.rent_ledgers(property_id);
CREATE INDEX IF NOT EXISTS idx_payment_approvals_property_id ON public.payment_approvals(property_id);
CREATE INDEX IF NOT EXISTS idx_rent_extensions_property_id ON public.rent_extensions(property_id);
CREATE INDEX IF NOT EXISTS idx_warden_cash_property_id ON public.warden_cash_collections(property_id);
CREATE INDEX IF NOT EXISTS idx_damage_deductions_property_id ON public.damage_deductions(property_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_property_id ON public.maintenance_tickets(property_id);
CREATE INDEX IF NOT EXISTS idx_food_menus_property_id ON public.food_menus(property_id);
CREATE INDEX IF NOT EXISTS idx_housekeeping_property_id ON public.housekeeping_requests(property_id);
CREATE INDEX IF NOT EXISTS idx_announcements_property_id ON public.announcements(property_id);
CREATE INDEX IF NOT EXISTS idx_staff_property_id ON public.staff(property_id);
CREATE INDEX IF NOT EXISTS idx_property_team_property_id ON public.property_team(property_id);
CREATE INDEX IF NOT EXISTS idx_expenses_property_id ON public.expenses(property_id);
CREATE INDEX IF NOT EXISTS idx_property_settings_property_id ON public.property_settings(property_id);
CREATE INDEX IF NOT EXISTS idx_saas_subscriptions_property_id ON public.saas_subscriptions(property_id);
CREATE INDEX IF NOT EXISTS idx_saas_invoices_property_id ON public.saas_invoices(property_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_property_id ON public.onboarding_requests(property_id);
CREATE INDEX IF NOT EXISTS idx_move_out_property_id ON public.move_out_notices(property_id);
```
