# ==============================================================================
# 🕉️ URBANSTAY — MASTER SESSION KNOWLEDGE & ARCHITECTURE PLAYBOOK (KSB_12OCT.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# Date: 11–12 October 2026 | Active Build: Flutter Mobile & Web Engine
# Target: India's #1 Dedicated PG & Hostel Operations Operating System
# Founder: Bhargav S Kulkarni | Anchor Pilot: Arun (BTM Layout / HSR Network)
# ==============================================================================

---

## 📌 1. EXECUTIVE SUMMARY & MILESTONES (OCTOBER 11 & OCTOBER 12, 2026)

Over the past 48 hours, UrbanStay underwent its largest full-stack database and mobile modernization to date. We transitioned the entire application from loosely-typed, ad-hoc JSON dictionaries to **23 strongly-typed enterprise Dart models** mapping 1-to-1 against all **23 live PostgreSQL Supabase tables**, followed by the complete end-to-end refactoring of all **15 PG Owner screens**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 URBANSTAY FULL-STACK MODEL SYNCHRONIZATION                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  23 Supabase DB Tables  ──>  23 Strongly-Typed Dart Models (lib/core/models) │
│           ▲                                          │                      │
│           │                                          ▼                      │
│  Central API Service    <──  15 Modernized Owner Screens (lib/features/...)  │
│  (supabase_service.dart)     (Zero Mock Data • Zero UI Violations)          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ 2. DATABASE SCHEMA AUDIT & SYNCHRONIZATION (OCTOBER 11)

### A. Universal Audit Verification:
All 23 tables in Supabase were audited via live PostgreSQL queries (`audit_all_tables.py`, `check_all_23.py`). Universal operational columns (`property_id`, `property_name`, `room_number`, `tenant_name`) were unified across all relational ledgers:

| # | Supabase Table Name | `property_id` | `property_name` | `room_number` | `tenant_name` | Live Status |
|---|---|:---:|:---:|:---:|:---:|:---:|
| 1 | `properties` | ✅ YES | ✅ YES | — | — | 🟢 READY |
| 2 | `rooms` | ✅ YES | ✅ YES | ✅ YES | — | 🟢 READY |
| 3 | `beds` | ✅ YES | ✅ YES | ✅ YES | ✅ YES | 🟢 READY |
| 4 | `tenants` | ✅ YES | ✅ YES | ✅ YES | ✅ YES | 🟢 READY |
| 5 | `onboarding_requests` | ✅ YES | ✅ YES | ✅ YES | ✅ YES | 🟢 READY |
| 6 | `payment_approvals` | ✅ YES | ✅ YES | ✅ YES | ✅ YES | 🟢 READY |
| 7 | `warden_cash_collections` | ✅ YES | ✅ YES | ✅ YES | ✅ YES | 🟢 READY |
| 8 | `maintenance_tickets` | ✅ YES | ✅ YES | ✅ YES | ✅ YES | 🟢 READY |
| 9 | `damage_deductions` | ✅ YES | ✅ YES | ✅ YES | ✅ YES | 🟢 READY |
| 10 | `rent_ledgers` | ✅ YES | ✅ YES | ✅ YES | ✅ YES | 🟢 READY |
| 11 | `rent_extensions` | ✅ YES | ✅ YES | ✅ YES | ✅ YES | 🟢 READY |
| 12 | `move_out_notices` | ✅ YES | ✅ YES | ✅ YES | ✅ YES | 🟢 READY |
| 13 | `housekeeping_requests` | ✅ YES | ✅ YES | ✅ YES | ✅ YES | 🟢 READY |
| 14 | `expenses` | ✅ YES | ✅ YES | — | — | 🟢 READY |
| 15 | `staff` | ✅ YES | ✅ YES | — | — | 🟢 READY |
| 16 | `property_team` | ✅ YES | ✅ YES | — | — | 🟢 READY |
| 17 | `food_menus` | ✅ YES | ✅ YES | — | — | 🟢 READY |
| 18 | `announcements` | ✅ YES | ✅ YES | — | — | 🟢 READY |
| 19 | `property_settings` | ✅ YES | ✅ YES | — | — | 🟢 READY |
| 20 | `saas_invoices` | ✅ YES | ✅ YES | — | — | 🟢 READY |
| 21 | `saas_subscriptions` | ✅ YES | ✅ YES | — | — | 🟢 READY |
| 22 | `leads` | ✅ YES | ✅ YES | — | — | 🟢 READY |
| 23 | `profiles` | ✅ YES | — | — | — | 🟢 READY |

### B. Migrations Deployed:
* `12_create_onboarding_and_approvals.sql`: Dedicated tables for reception QR onboarding and direct bank UPI approval logs.
* `13_create_food_menus_table.sql`: Multi-week cyclic food mess schedule with breakfast, lunch, snacks, and dinner.
* `14_create_damage_deductions_table.sql`: Room damage deduction ledger with photo proof & direct security deposit deduction.
* `15_align_missing_schema_columns.sql`: Added missing indexes, foreign keys, and universal audit columns.

---

## 🧱 3. 23 STRONGLY-TYPED DART MODELS CREATED (lib/core/models/)

All models feature complete `fromJson` / `toJson` serialization, null-safe type coercions (handling both PostgreSQL `NUMERIC` strings and JSON integers/doubles), helper getters, and `copyWith`:

| Pillar | Model File | Dart Class | Description |
|---|---|---|---|
| **1. Auth & Leads** | `profile_model.dart` | `ProfileModel` | User identity, role (`owner` / `resident`), phone, avatar |
| | `lead_model.dart` | `LeadModel` | Tenant inquiry pipeline, source, budget, status |
| **2. Inventory** | `property_model.dart` | `PropertyModel` | PG details, address, capacity, rules, UPI, owner KYC |
| | `room_model.dart` | `RoomModel` | Floor, room number, sharing type, rent, deposit |
| | `bed_model.dart` | `BedModel` | Bed letter, occupancy status, tenant UUID link |
| **3. Lifecycle** | `tenant_model.dart` | `TenantModel` | Resident profile, Aadhaar, emergency contacts, rent dues |
| | `onboarding_request_model.dart` | `OnboardingRequestModel` | Reception QR standee requests, Aadhaar OCR, live selfie |
| | `move_out_notice_model.dart` | `MoveOutNoticeModel` | 30-day notice period pipeline, vacant date, refund state |
| **4. Payments** | `rent_ledger_model.dart` | `RentLedgerModel` | Monthly dues, payment status, late fees, receipt URLs |
| | `payment_approval_model.dart` | `PaymentApprovalModel` | 0% Direct UPI payment verification, UTR number, proof image |
| | `rent_extension_model.dart` | `RentExtensionModel` | Grace period extension requests with reason |
| | `warden_cash_model.dart` | `WardenCashModel` | On-ground cash collections audit ledger |
| | `damage_deduction_model.dart` | `DamageDeductionModel` | Checkout deductions, proof image, deposit settlement |
| **5. Operations** | `maintenance_ticket_model.dart` | `MaintenanceTicketModel` | Plumber/electrician tickets, photo proof, urgency |
| | `food_menu_model.dart` | `FoodMenuModel` | Daily meal menus, rotation week cycles (1-4) |
| | `housekeeping_model.dart` | `HousekeepingModel` | Daily room cleaning logs, bedsheet change tracking |
| | `announcement_model.dart` | `AnnouncementModel` | Digital notice board broadcasts, target audience |
| **6. Team & OpEx** | `staff_model.dart` | `StaffModel` | Staff directory, role, salary, disbursement status |
| | `property_team_model.dart` | `PropertyTeamModel` | Unified property operational staff roster |
| | `expense_model.dart` | `ExpenseModel` | Operating costs (groceries, electricity, repairs, Wi-Fi) |
| **7. Settings & SaaS** | `property_settings_model.dart` | `PropertySettingsModel` | Curfew time, Wi-Fi, visitor policy, tenant feature toggles |
| | `saas_subscription_model.dart` | `SaasSubscriptionModel` | Active PG tier licensing plan, bed quotas, renewal date |
| | `saas_invoice_model.dart` | `SaasInvoiceModel` | B2B SaaS tax invoices, 18% GST (SAC 998315), download URLs |
| **Barrel Export** | `models.dart` | — | Single centralized barrel import for all 23 models |

---

## ⚡ 4. CENTRAL SUPABASE SERVICE REFACTORING (lib/core/services/supabase_service.dart)

1. **Typed Query Methods Added**:
   * `getStaffMembers()` ➔ Returns `List<StaffModel>`
   * `getExpenseModels()` ➔ Returns `List<ExpenseModel>`
   * `getFoodMenuModel()` ➔ Returns `FoodMenuModel?`
   * `getOnboardingRequestModels()` ➔ Returns `List<OnboardingRequestModel>`
   * `getPaymentApprovalModels()` ➔ Returns `List<PaymentApprovalModel>`
   * `getRentLedgerModels()` ➔ Returns `List<RentLedgerModel>`
   * `getMaintenanceTicketModels()` ➔ Returns `List<MaintenanceTicketModel>`
   * `getPropertyModel()` / `getPropertyModels()` ➔ Returns `PropertyModel?` / `List<PropertyModel>`
   * `getPropertySettingsModel()` ➔ Returns `PropertySettingsModel?`
   * `getSaasInvoiceModels()` ➔ Returns `List<SaasInvoiceModel>`
   * `recordCashCollection()` ➔ Inserts into `warden_cash_collections` and returns `WardenCashModel`
2. **Critical Bug Fixes Resolved in Service**:
   * **Duplicate Method Conflict**: Removed duplicate definition of `updatePaymentApprovalStatus` (previously declared at line 674 and line 1218 with conflicting parameters `submissionId` vs `approvalId`). Unified into a single robust method supporting both.
   * **Safe Numerical Parsing**: Protected against Web/Impeller `String is not a subtype of num` exceptions when parsing PostgreSQL `NUMERIC` types.

---

## 📱 5. ALL 15 OWNER SCREENS MODERNIZED (SCREEN-BY-SCREEN AUDIT)

### BATCH 1 (Screens 1 to 5):
1. **`owner_staff_screen.dart`**:
   * Replaced ad-hoc JSON with `StaffModel`.
   * Real salary disbursement toggle syncing with `public.property_team` / `public.staff`.
2. **`owner_expenses_screen.dart`**:
   * Replaced loosely typed maps with `ExpenseModel`.
   * Real-time calculation of monthly totals, categories, and bills without risk of casting errors.
3. **`owner_rooms_screen.dart`**:
   * Replaced dynamic maps with `RoomModel` and `BedModel`.
   * Floor matrix filtering, vacant/occupied counts, and live bed assignment using real PostgreSQL UUIDs.
4. **`shift_bed_screen.dart`**:
   * Integrated `BedModel` for room shifts and bed swaps.
   * Direct validation of target bed vacancy and updated rent/deposit terms.
5. **`owner_food_menu_screen.dart`**:
   * Integrated `FoodMenuModel`.
   * Dynamic loading of weekly meal schedule; zero hardcoded fallback menu records.

### BATCH 2 (Screens 6 to 10):
6. **`owner_onboarding_approvals_screen.dart`**:
   * Integrated `OnboardingRequestModel`.
   * Reception QR standee approval flow with Aadhaar verification and room allocation.
7. **`owner_approvals_screen.dart`**:
   * Integrated `PaymentApprovalModel`.
   * Added missing `phone` mapping to initiate direct WhatsApp/call contact.
   * 1-tap UTR verification and instant receipt dispatch.
8. **`owner_rent_collection_screen.dart`**:
   * Integrated `RentLedgerModel`.
   * Real dues breakdown, paid/pending/overdue status badges, and 1-tap WhatsApp rent chaser.
9. **`owner_day_collection_screen.dart`**:
   * Integrated `WardenCashModel` and `RentLedgerModel`.
   * Cash collection modal now permanently saves cash payments to `public.warden_cash_collections` via `recordCashCollection()`.
10. **`owner_complaints_screen.dart`**:
    * Integrated `MaintenanceTicketModel`.
    * Tickets load with photos, severity badges, category icons, and staff assignment.

### BATCH 3 (Screens 11 to 15):
11. **`owner_tenant_controls_screen.dart`**:
    * Integrated `PropertySettingsModel` and `PropertyModel`.
    * Feature switches (UPI Pay, Cash Pay, Complaints, Bedsheet change, Rent Agreement) save to `public.property_settings.tenant_controls`.
12. **`owner_reports_screen.dart`**:
    * Integrated `PropertyModel`, `PaymentApprovalModel`, `ExpenseModel`, and `StaffModel`.
    * Replaced all 4 raw queries with strongly-typed service calls. Real gross potential rent, occupancy percentage, and OpEx ledger.
13. **`owner_settings_screen.dart`**:
    * Integrated `PropertyModel` and `PropertySettingsModel`.
    * All 6 subviews and 15 edit sheets populate from and save to `public.properties` and `public.property_settings`.
14. **`owner_saas_billing_screen.dart`**:
    * Integrated `SaasInvoiceModel` and `PropertyModel`.
    * Displays official invoice history with 18% GST (SAC code `998315`), bed licensing counts, and PDF download links.
15. **`owner_dashboard_screen.dart` & `owner_setup_screen.dart`**:
    * `owner_dashboard_screen.dart`: Multi-property selector loads live properties via `getPropertyModels()` and live bed occupancy metrics.
    * `owner_setup_screen.dart`: Property creation wizard deserializes created property payload into `PropertyModel` for verification before entering the Command Center.

---

## 🎨 6. STRICT DESIGN & ARCHITECTURAL INTEGRITY (ZERO VIOLATIONS)

Throughout this entire transformation, all foundational project laws were strictly maintained:
* **Zero UI Changes**: All card borders (`#E5E7EB`), paddings, layouts, and typography (`Outfit`) remain 100% executive enterprise grade.
* **Zero Artificial Neon / Dark Modes**: Strict adherence to the enterprise executive palette (Emerald Green `#08A63F`, Ink `#111111`, Pure White Cards `#FFFFFF`, Light Gray Page Background `#F4F6F9`).
* **Zero Mock Data**: Removed fake pre-selected dummy items (`UrbanStay_HighSpeed_5G`, `StaySecure@2026`, `+91 98450 12345`). All data originates from real database rows.
* **100% Sound Null-Safety**: Number, date, and boolean parsing guards prevent runtime app termination on Web, Android, and iOS.

---

*Verified and committed as the permanent source of truth for UrbanStay.* 🕉️✨
