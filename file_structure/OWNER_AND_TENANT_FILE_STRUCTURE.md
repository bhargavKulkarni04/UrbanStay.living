# 📱 UrbanStay — Complete Owner & Tenant File & Folder Structure
**Generated**: October 2026  
**Scope**: Flutter Mobile Application (`mobile_app/lib/features/`) & Web Suite  
**Standard**: Modular Feature-First Architecture (`core/` + `features/<feature_name>/presentation/`)

---

## 📊 1. High-Level Summary

| Category | Total Feature Folders | Total Files | Scope & Responsibilities |
| :--- | :---: | :---: | :--- |
| **👑 OWNER OPERATING SUITE** | **14 Folders** | **17 Files** | Property Setup, Room & Bed Matrix, Rent Dues, WhatsApp Chaser, 0% UPI Verification Hub, SaaS Bed Licensing, Staff & P&L Ledgers |
| **🏠 TENANT LIVING HUB** | **9 Folders** | **23 Files** | Reception QR Standee Check-In, Resident Dashboard, Direct UPI Rent Payment, Helpdesk & Washing Machine Slots, Housekeeping, Move-Out Notice |
| **🔐 AUTH & ONBOARDING (SHARED)** | **2 Folders** | **3 Files** | 4-Step App Walkthrough, +91 Phone OTP Login, Owner vs Tenant Role Selector |
| **TOTAL** | **25 Folders** | **43 Files** | **Complete UrbanStay Flutter Mobile Application** |

---

## 👑 2. Owner Folders & Files (14 Folders • 17 Files)

All folders reside in: `mobile_app/lib/features/`

### 1. `owner_dashboard/`
* **Purpose**: Primary Owner Command Center after login. Displays the live bed occupancy hero (e.g. 31/35 Beds), monthly rent collection cards, quick actions grid, and bottom navigation bar.
* **Files**:
  * `presentation/screens/owner_dashboard_screen.dart`

### 2. `owner_setup/`
* **Purpose**: 4-Step Onboarding Wizard for brand-new PG buildings. Collects Property Name, Category (Gents/Ladies/Coliving), Address, Floors & Room count, Direct Bank UPI VPA, and Stay Rules.
* **Files**:
  * `presentation/screens/owner_setup_screen.dart`

### 3. `owner_billing/`
* **Purpose**: B2B SaaS Software Bed Licensing engine (₹15/bed + ₹79 platform fee), UPI AutoPay activation modal, Cashfree Web SDK launcher, and the dedicated Invoice & Tax Receipt hub.
* **Files**:
  * `presentation/screens/owner_saas_billing_screen.dart` *(Contains `OwnerSaaSBillingScreen` and the dedicated full-screen `OwnerInvoiceDetailScreen`)*

### 4. `owner_rooms/`
* **Purpose**: Physical Rooms & Bed Occupancy Matrix. Floor-by-floor filter (Ground, 1st, 2nd), vacant bed indicators, resident profile cards, and bed-shifting mechanism.
* **Files**:
  * `presentation/screens/owner_rooms_screen.dart`
  * `presentation/screens/shift_bed_screen.dart`

### 5. `owner_rent/`
* **Purpose**: Financial Rent Collection command center. Tracks Paid vs Overdue residents, displays the solid red "3 Days Overdue" banners, WhatsApp reminder chaser with 1-tap UPI link, and daily cash collection logs.
* **Files**:
  * `presentation/screens/owner_rent_collection_screen.dart`
  * `presentation/screens/owner_day_collection_screen.dart`

### 6. `owner_approvals/`
* **Purpose**: 0% Direct Bank UPI Verification Hub. Displays incoming resident payment submissions with bank UTR numbers, payment screenshot proofs, 1-tap Approve & 50ms PDF receipt generation, and Reject Payment dialogs.
* **Files**:
  * `presentation/screens/owner_approvals_screen.dart`

### 7. `owner_onboarding/`
* **Purpose**: Approval queue for incoming resident check-in requests arriving live from the Reception Desk QR Standee (`tenant_checkin.html`).
* **Files**:
  * `presentation/screens/owner_onboarding_approvals_screen.dart`

### 8. `owner_complaints/`
* **Purpose**: Maintenance ticketing and repairs tracking. Displays photos of broken items (plumbing, electrical, carpentry) and allows the owner/warden to assign technicians and update resolution statuses.
* **Files**:
  * `presentation/screens/owner_complaints_screen.dart`

### 9. `owner_expenses/`
* **Purpose**: Monthly Operating P&L Ledger. Tracks daily operational costs (BESCOM electricity bills, BWSSB water tankers, grocery rations, cook salaries, and diesel generator fuel).
* **Files**:
  * `presentation/screens/owner_expenses_screen.dart`

### 10. `owner_staff/`
* **Purpose**: Staff & Warden Directory. Manages warden access permissions, salary disbursements, and warden cash collection audit ledgers.
* **Files**:
  * `presentation/screens/owner_staff_screen.dart`

### 11. `owner_settings/`
* **Purpose**: Master Property Configuration. Contains 6 Master Subviews and 15 Edit Sheets controlling Gate Closing Times, Visitor Policies, WiFi SSIDs, Direct UPI Bank VPAs, and Bank Account details.
* **Files**:
  * `presentation/screens/owner_settings_screen.dart`

### 12. `owner_food_menu/`
* **Purpose**: Food Mess Management. Sets up and publishes daily breakfast, lunch, and dinner menus to prevent ration wastage and communicate meals to residents.
* **Files**:
  * `presentation/screens/owner_food_menu_screen.dart`

### 13. `owner_reports/`
* **Purpose**: Executive monthly business analytics, occupancy percentages, collection efficiency reports, and GST audit exports.
* **Files**:
  * `presentation/screens/owner_reports_screen.dart`

### 14. `owner_tenant_controls/`
* **Purpose**: Owner/Warden administrative controls over residents (move-out approvals, security deposit damage deductions, and stay contract extensions).
* **Files**:
  * `presentation/screens/owner_tenant_controls_screen.dart`

---

## 🏠 3. Tenant Folders & Files (9 Folders • 23 Files)

All folders reside in: `mobile_app/lib/features/`

### 1. `tenant_checkin/`
* **Purpose**: Zero-App Reception Desk QR Standee Check-In. Digital room pass generation, live selfie verification, Aadhaar photo capture, and stay rule agreement.
* **Files**:
  * `presentation/screens/tenant_checkin_screen.dart`

### 2. `tenant_dashboard/`
* **Purpose**: Resident Self-Service Home Screen. Shows My Room & Bed number, live rent due countdown, today's food mess menu, and emergency warden quick-call buttons.
* **Files**:
  * `presentation/screens/tenant_dashboard_screen.dart`

### 3. `tenant_payments/`
* **Purpose**: 0% Direct UPI Rent Payment directly into the Owner's personal bank account (PhonePe, Google Pay, Paytm), cash payment receipts, extension requests, and past payment ledgers.
* **Files**:
  * `presentation/screens/rent_payment_screen.dart`
  * `presentation/screens/payment_ledger_screen.dart`
  * `presentation/screens/paid_via_cash_screen.dart`
  * `presentation/widgets/official_payment_icons.dart`
  * `presentation/widgets/paid_via_cash_card.dart`
  * `presentation/widgets/rent_payment_bottom_sheet.dart`
  * `presentation/widgets/request_extension_sheet.dart`

### 4. `tenant_helpdesk/`
* **Purpose**: Resident issue resolution and amenity scheduling. Allows tenants to snap photos of broken appliances to raise maintenance tickets and book 45-minute washing machine time slots.
* **Files**:
  * `presentation/screens/raise_ticket_screen.dart`
  * `presentation/screens/ticket_status_screen.dart`
  * `presentation/screens/washing_machine_booking_screen.dart`
  * `presentation/widgets/raise_ticket_card.dart`

### 5. `tenant_housekeeping/`
* **Purpose**: Daily room cleaning and hygiene service requests. Allows residents to schedule room sweeping, bathroom cleaning, and bedsheet replacement slots.
* **Files**:
  * `presentation/widgets/room_sweep_sheet.dart`
  * `presentation/widgets/bedsheet_change_sheet.dart`
  * `presentation/widgets/full_room_clean_sheet.dart`

### 6. `tenant_food_menu/`
* **Purpose**: Daily Food Mess Schedule viewer. Residents check breakfast, lunch, and dinner menus, and can mark "Skip Meal" so the cook does not waste grocery rations.
* **Files**:
  * `presentation/screens/tenant_food_menu_screen.dart`

### 7. `tenant_notice/`
* **Purpose**: 30-Day Move-Out Notice submission. Calculates checkout dates, initiates security deposit clearance, and tracks damage deductions.
* **Files**:
  * `presentation/screens/move_out_notice_screen.dart`

### 8. `tenant_notice_board/`
* **Purpose**: PG broadcast announcement center. Residents receive alerts about water tanker arrival times, festival celebrations, gate closing reminders, and maintenance shutdowns.
* **Files**:
  * `presentation/screens/tenant_notice_board_screen.dart`

### 9. `tenant_profile/`
* **Purpose**: Resident identity hub. Shows personal contact info, workplace details, Aadhaar verification badge, room inventory rules, and emergency contacts.
* **Files**:
  * `presentation/screens/personal_details_screen.dart`
  * `presentation/screens/profile_settings_screen.dart`
  * `presentation/screens/property_details_screen.dart`
  * `presentation/screens/property_support_screen.dart`

---

## 🔐 4. Auth & Onboarding (Shared • 2 Folders • 3 Files)

### 1. `auth/`
* **Purpose**: Identity verification and access routing.
* **Files**:
  * `presentation/screens/phone_verify_screen.dart`: India `+91` flag input with 6-digit OTP SMS verification.
  * `presentation/screens/role_selector_screen.dart`: Clear fork between "I am a PG Owner" and "I am a Resident / Tenant".

### 2. `onboarding/`
* **Purpose**: New user walkthrough.
* **Files**:
  * `presentation/screens/onboarding_walkthrough_screen.dart`: 4-step intro carousel highlighting 0% UPI direct settlements, zero empty beds pipeline, and WhatsApp automation.

---

## 🌐 5. Production Web Suite Reference (`ProductionCode/`)

For cross-platform web parity, the lightweight zero-app web equivalents in `ProductionCode/` are:

| File Name | Role | Corresponding Flutter Screen |
| :--- | :--- | :--- |
| `overview sample APP.html` | App Onboarding Carousel | `onboarding_walkthrough_screen.dart` |
| `phone_verify.html` | Phone + OTP Login | `phone_verify_screen.dart` |
| `auth_preview.html` | Role Selector | `role_selector_screen.dart` |
| `owner_setup.html` | 4-Step Property Setup Wizard | `owner_setup_screen.dart` |
| `owner_dashboard.html` | Owner Command Center | `owner_dashboard_screen.dart` |
| `owner_rooms.html` | Room & Bed Matrix | `owner_rooms_screen.dart` |
| `owner_rent_collection.html` | Rent Collection & WhatsApp Chaser | `owner_rent_collection_screen.dart` |
| `owner_approvals.html` | 0% UPI Verification Hub | `owner_approvals_screen.dart` |
| `owner_complaints.html` | Maintenance Ticketing | `owner_complaints_screen.dart` |
| `owner_expenses.html` | Operating Costs & P&L Ledger | `owner_expenses_screen.dart` |
| `owner_staff.html` | Staff Directory & Payroll | `owner_staff_screen.dart` |
| `owner_settings.html` | Property Rules & UPI Configuration | `owner_settings_screen.dart` |
| `owner_saas_billing.html` | B2B SaaS Software Bed Licensing | `owner_saas_billing_screen.dart` |
| `tenant_checkin.html` | Reception Standee QR Check-In | `tenant_checkin_screen.dart` |

---
*This report is permanently saved in `file_structure/OWNER_AND_TENANT_FILE_STRUCTURE.md`.*
