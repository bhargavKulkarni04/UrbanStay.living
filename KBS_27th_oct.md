# UrbanStay — Master Knowledge Base (KBS — 27th October 2026)
# 🕉️ Om Shri Raghavendraya Namaha ✨

---

## 🏛️ Executive Product & Operations Profile

* **Company & Brand**: **UrbanStay Technologies Pvt. Ltd.** (`urbanstay.living`, MSME Registered, Class 9 Trademark #7920292).
* **Founder**: **Bhargav S Kulkarni** (Bengaluru native, Dayananda Sagar DBIT graduate, Monetization & Revenue at NoBrokerHood).
* **Pilot Anchor Partner**: Arun (3 PGs in Bangalore + network of 40–50 local PG owners in BTM Layout, HSR & Koramangala).
* **Core Product Identity**: India's #1 dedicated, high-margin **PG & Hostel Operations Operating System** (NOT a broker or aggregator like OYO/Zolo).
* **Frontend Tech Stack**: **Flutter (Dart + Impeller Engine)** for 60/120fps locked rendering and instant 50ms offline PDF rent receipts.
* **Backend & Database**: **PostgreSQL (Supabase)** with connection pooling and Row Level Security (RLS) multi-tenancy.

---

# 🚀 1. What Changes Were Completed Today (27th Oct 2026)

### A. Restored & Polished Single Source of Truth for Tenant Settings
* **File**: [`mobile_app/lib/features/tenant_profile/presentation/screens/profile_settings_screen.dart`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/lib/features/tenant_profile/presentation/screens/profile_settings_screen.dart)
* Cleaned up obsolete temporary experimental files (`tenant_settings_screen.dart`, `settings_group_card.dart`, `settings_tile.dart`, `stay_details_screen.dart`, `login_security_screen.dart`).
* Retained [`deposit_refund_screen.dart`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/lib/features/tenant_profile/presentation/screens/deposit_refund_screen.dart) for dedicated UPI bank settlement.

### B. Pixel-Perfect Mockup UI Translation
* **Organic Wavy Mint-Green Background**: Implemented smooth three-stage gradient (`#D8F4E0` ➔ `#EBF8EE` ➔ `Colors.white`) with subtle blurred circular wave accents.
* **Top Navigation**: Clean `< Back` button styled in brand green (`#068237`).
* **Centered Profile Lockup**:
  * 90x90 circular avatar with 3px crisp white border, light green background (`#DDF7E4`), and bold initial `R`.
  * Brand green solid camera badge button (`#08A63F`) with white camera icon.
  * Bold Resident Name (`20px`, `FontWeight.w700`, `#111111`) + PG Name (`13.5px`, `#6B7280`).
  * Non-editable Stay Capsule pill (`#F0FDF4`, border `#DCFCE7`, `⌂ Floor 1 • Standard Sharing • Room --`).

### C. The Complete 12-Card Suite
Each card is an individual elevated floating white card with 42x42 circular soft-green container (`#EBF8EE`), crisp icon, subtitle, and trailing chevron `>`:
1. **Personal details** (`Icons.person_outline_rounded`) ➔ Opens [`PersonalDetailsScreen`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/lib/features/tenant_profile/presentation/screens/personal_details_screen.dart).
2. **Deposit refund details** (`Icons.currency_rupee_rounded`) ➔ Opens [`DepositRefundScreen`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/lib/features/tenant_profile/presentation/screens/deposit_refund_screen.dart).
3. **Property details & rent** (`Icons.home_outlined`) ➔ Opens [`PropertyDetailsScreen`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/lib/features/tenant_profile/presentation/screens/property_details_screen.dart) (100% read-only; tenants cannot mutate owner-governed room/rent numbers).
4. **Payment ledger & HRA receipts** (`Icons.receipt_long_rounded`) ➔ Opens [`PaymentLedgerScreen`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/lib/features/tenant_payments/presentation/screens/payment_ledger_screen.dart).
5. **Stay agreement & house rules** (`Icons.description_outlined`) ➔ Modal bottom sheet displaying lock-in, visitor hours, and notice rules.
6. **Move-out notice (30-day)** (`Icons.event_busy_outlined`) ➔ Opens [`MoveOutNoticeScreen`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/lib/features/tenant_notice/presentation/screens/move_out_notice_screen.dart).
7. **Property management support** (`Icons.headset_mic_outlined`) ➔ Opens [`PropertySupportScreen`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/lib/features/tenant_profile/presentation/screens/property_support_screen.dart).
8. **Login & security** (`Icons.lock_outline_rounded`) ➔ Modal sheet with Google Auth status & password reset.
9. **Privacy policy** (`Icons.shield_outlined`) ➔ Data encryption & Aadhaar protection terms.
10. **Terms and conditions** (`Icons.article_outlined`) ➔ Tenancy guidelines & conduct rules.
11. **Logout** (`Icons.logout_rounded`) ➔ Supabase session signout dialog.
12. **Delete account** (`Icons.delete_outline_rounded`) ➔ Destructive card styled with `#FEF2F2` background, `#FEE2E2` icon circle, and `#DC2626` red typography to comply with Apple/Google App Store guidelines.

### D. Zero-Error Code Quality & Performance Linter Fixes
* **Resolved Import Depth**: Corrected relative imports across sibling feature folders to `../../../tenant_payments/...` and `../../../tenant_notice/...`.
* **Cleaned Const Constructors**: Changed `final cardItems = [...]` to `const cardItems = [...]`, eliminating all blue wavy underline linter hints (`prefer_const_constructors`) and improving 60fps rendering efficiency.
* **Dashboard Integration**: Wired avatar tap on [`tenant_dashboard_screen.dart`](file:///c:/Users/bharg/OneDrive/Desktop/UrbanStay/mobile_app/lib/features/tenant_dashboard/presentation/screens/tenant_dashboard_screen.dart) to push `ProfileSettingsScreen`.

---

# 🔮 2. Next Phase Plan: Real-Time Supabase Data Synchronization

### A. The Core Architectural Requirement
As confirmed by the founder: **Settings must NEVER be disconnected or dummy.**
Whatever details a tenant enters during Check-in (`tenant_checkin_screen.dart`), or whatever the PG owner enters into the `tenants` table, MUST be:
1. **Pre-filled automatically** when the resident opens `Personal Details`.
2. **Updated on the exact same row** in Supabase PostgreSQL without ever creating duplicate rows.
3. **Instantly reflected back** in the Settings UI and the Dashboard header without needing an app restart.

### B. Database Row Integrity (Zero Duplicates Guarantee)
* **SQL Query Target**:
  ```dart
  await SupabaseService.instance.client
      .from('tenants')
      .update({
        'name': newName,
        'email': newEmail,
        'emergency_contact': newEmergencyContact,
        'workplace': newWorkplace,
      })
      .eq('id', tenantId); // Primary Key targeting guarantees exact same row is updated
  ```
* Because `id` is the primary key (UUID), and `phone` has a `UNIQUE` constraint, **no duplicate rows can ever be created**.

### C. The 3-File Execution Checklist for the Next Session

| File | Exact Action Needed |
| :--- | :--- |
| **`personal_details_screen.dart`** | • Pre-populate `_nameController`, `_phoneController`, `_altPhoneController`, `_emailController`, `_orgController` from `widget.tenantId`.<br>• Replace dummy snackbar with `Supabase.client.from('tenants').update(...)`.<br>• Return `Navigator.pop(context, {'name': updatedName})` on successful save. |
| **`profile_settings_screen.dart`** | • Pass `tenantPhone`, `email`, `emergencyContact`, `workplace` when navigating to `PersonalDetailsScreen`.<br>• Await the result from `PersonalDetailsScreen` and call `setState()` so the top name and initial `R` update instantly. |
| **`tenant_dashboard_screen.dart`** | • Pass the loaded `tenantRecord` fields to `ProfileSettingsScreen`.<br>• On returning from settings, trigger `_loadLiveTenantAndPropertyData()` to keep all dashboard headers and cycle cards 100% synchronized. |

### F. Completed: PersonalDetailsScreen Pre-Fill & Live Instant Update (Done Today)
* **`personal_details_screen.dart`**:
  * **Pre-fill on Open**:
    * Automatically queries `public.tenants` by `tenantId` (or phone fallback).
    * Pre-fills `Full Name`, `Phone`, `Email Address`, and `Workplace / College`.
    * **Aadhaar**: Displays masked Aadhaar (`XXXX-XXXX-4892` or dynamic) with a green `Verified ✓` pill badge and `Front & Back Uploaded ✓` banner ("Identity verified during check-in. No re-upload needed.").
    * Provides tap-to-view document previews (`View Front` and `View Back`) with modal preview dialog.
    * **Emergency Contact & Address**: Displays blank if not yet set in DB, ready for the resident to fill.
  * **Save on Tap**:
    * Executes direct `UPDATE public.tenants SET name = ..., email = ..., emergency_contact = ..., permanent_address = ..., workplace = ..., refund_upi_id = ... WHERE id = tenantId`.
    * Shows floating green success notification.
    * Pops back returning the updated payload `{'name': updatedName, ...}`.
* **`profile_settings_screen.dart`**:
  * Awaits result from `PersonalDetailsScreen` and immediately calls `setState(() => _tenantName = res['name'])`.
  * Top Back button passes `{'name': _tenantName}` on pop.
* **`tenant_dashboard_screen.dart`**:
  * Awaits result from `ProfileSettingsScreen` and updates `_tenantName` instantly with `setState`.
  * Calls `_loadLiveTenantAndPropertyData(force: true)` to refresh live database fields without requiring an app reload.

---

*Document recorded on 27th October 2026. UrbanStay Master Knowledge Base.* 🕉️✨
