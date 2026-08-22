# UrbanStay — Knowledge Base & Architecture Blueprint
**Date**: 16th August 2026  
**Document Version**: 3.0 (Owner Onboarding & Legal Standard Release)  
**Author**: Bhargav S Kulkarni (Founder) & Antigravity (Engineering Pair)

---

## 1. Design System Tokens & Typography

All UrbanStay interfaces are strictly built using the following design tokens:

### 1.1 Typography Standard
* **Font Family**: Google Fonts `'Outfit'`, `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `Roboto`, sans-serif.
* **Weights & Hierarchy**:
  * Page Headlines: `800` (Extra Bold), tracking: `-0.035em` to `-0.04em`, line-height: `1.15`
  * Section Headers / Labels: `700` (Bold), tracking: `-0.01em`
  * Floating Input Labels: `500` / `600` (Medium/SemiBold)
  * Body & Subtitles: `400` / `500` (Regular/Medium), color: `#6B7280`
  * Action Buttons: `700` (Bold), font-size: `16px`, tracking: `-0.01em`

### 1.2 Curated Color Palette
* **Primary Brand Green**: `#08A63F` (Vibrant Emerald Green)
* **Dark Green Active State**: `#068237` (Deep Forest Green for pressed states)
* **Green Glow & Tints**: `rgba(8, 166, 63, 0.16)` (Glow) / `rgba(8, 166, 63, 0.08)` (Subtle Tint)
* **Ink Black**: `#111111` (High-contrast typography)
* **Muted Grays**: `#6B7280` (Subtitles), `#9CA3AF` (Placeholders)
* **Clean Borders**: `#E5E7EB` / `#EAEAEA` (Crisp 1px borders)
* **Secondary Buttons**: `#F4F4F5` (Soft light grey with `#111111` hover)
* **Background Canvas**: Pure Milk White (`#FFFFFF`)

---

## 2. Strategic & Legal Foundations Finalized Today

### 2.1 Police Verification Legal Protocol for Bangalore PGs
* **The Mandate**: Under Karnataka Police Act and Bangalore City Police (BCP) directives, PG owners must maintain a tenant record (Full Name, Father's Name, Permanent Address, Workplace/College, Aadhaar ID).
* **Zero Physical Visits**: Neither the owner nor the tenant visits a police station. Police officers conduct routine quarterly beat visits to inspect the reception register.
* **UrbanStay Automated Solution**: UrbanStay auto-compiles tenant KYC into a certified **1-Page Official Police Verification PDF**. The owner taps `[ 📄 Export Police KYC Register ]` to display or email the record in 2 seconds.
* **Legal Grounding (Indian IT Act 2000 Section 4)**: Electronic/digital records are **100% legally recognized as equal to physical paper registers** in Indian courts and police departments.

### 2.2 Government Registrations & Regulatory Exemption
* **Trademark (Active)**: UrbanStay holds **Class 9 Registered Trademark (#7920292)**.
* **MSME / Udyam (Active)**: Registered under MSME for startup benefits.
* **0% RBI Regulation**: Because UrbanStay uses **Direct Bank UPI** (money transfers directly from tenant to owner bank), UrbanStay holds zero escrow funds and requires **zero RBI/NBFC licenses**.
* **GST Exemption**: GST registration is only mandatory once platform SaaS revenue crosses **₹20 Lakhs / year**.

### 2.3 RentOk Teardown & Competitive Edge
* **RentOk's Fatal Flaw ("Enterprise Bloat")**: Over 5 years, RentOk added biometric sync, staff attendance, and GST ledgers, turning their app into a confusing accounting tool that overwhelms 50-year-old local PG owners.
* **UrbanStay's Radical Simplicity**:
  1. *Total Collected vs Pending Rent* (₹2,40,000 / ₹35,000 Due).
  2. *Who Owes Rent?* (3 Names with 1-Tap `[ Remind on WhatsApp ]`).
  3. *Vacant Beds Count* (4 Beds Empty).
* **Tenant Advantage**: UrbanStay gives tenants 1-Tap HRA tax receipts, gate passes, and Wi-Fi credentials, turning tenants into active advocates.

---

## 3. Master Owner Setup Field Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          STAGE 1: 2-MINUTE ONBOARDING                       │
│  (Only the 4 essential steps needed to get Arun inside and generate PG QR)  │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ 1. OWNER LEGAL PROFILE               │ 2. PG PROPERTY & LOCATION            │
│ • Full Legal Name (as per Aadhaar)   │ • PG Brand Name (Master locked)      │
│ • Father / Husband Name (Police KYC) │ • PG Gender: [ Gents | Ladies | Co ] │
│ • WhatsApp Mobile Number (+91)       │ • PG System: [ Standard | Apt | Std ]│
│ • Email Address (SaaS Invoices)      │ • Ownership: [ Owned | Leased ]      │
│ • 12-Digit Aadhaar Number            │ • 6-Digit Pincode (Hyperlocal Ads)   │
│ • Permanent Home Address             │ • Area, Landmark, City & State       │
│ • Aadhaar Front & Back Upload        │ • Number of Lifts (0, 1, 2, 3+)      │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ 3. ROOMS & DYNAMIC RENT MATRIX       │ 4. 0% DIRECT UPI BANKING & RULES     │
│ • Total Floors + [✓] Ground Floor    │ • Owner Bank UPI ID / VPA            │
│ • Room Naming: [ 101, 102 | A-1, A-2]│ • Monthly Rent Due Day (5th)         │
│ • Sharing Types: [ 1 | 2 | 3 | 4 ]   │ • Grace Period (3 Days) & Late Fee   │
│ • Dynamic Rent & Deposit Cards       │ • Notice Period Rule (30 Days)       │
└──────────────────────────────────────┴──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     STAGE 2: IN-APP PROFILE & CUSTOMIZATION                 │
│  (Configured anytime later inside app settings without onboarding friction) │
│  • Mess & Meal Timings (Breakfast, Lunch, Dinner schedule)                  │
│  • Wi-Fi SSID & Password (Auto-rendered on tenant home screen)              │
│  • Staff Directory (Cook, Cleaner, Security Guard emergency contacts)       │
│  • Multi-PG Controls: [+ Add Another PG] + Co-Owner Phone Delegation        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. UI Implementation Details (`owner_setup.html`)

### 4.1 Step 1: Owner Details & KYC (Completed & Verified)
1. **Top Segmented 4-Step Progress Track**:
   * Minimal `<` back navigation chevron.
   * Ultra-thin `3.5px` segmented progress pills (`[████] [____] [____] [____]`).
2. **Smart Floating Label Interaction**:
   * Sits as an uncluttered placeholder when empty.
   * Glides smoothly to top-left (`scale(0.78)`) in **UrbanStay Emerald Green** when tapped or typed into, ensuring the owner always knows what data they are entering.
3. **Shadow-Free Minimalist Focus States**:
   * Removed all blurry green glow shadows (`box-shadow: none`).
   * Clean, crisp, hairline focus border.
4. **Minimalist Aadhaar Photo Cards**:
   * Clean dashed upload pills: `[ ⤒ Front Photo ]` and `[ ⤒ Back Photo ]` with green checkmark confirmation state.
5. **Standardized Bottom Actions**:
   * Primary Action: **`[ Continue ]`** in official UrbanStay Emerald Green (`#08A63F`, `height: 56px`, `border-radius: 16px`).
   * Secondary Action: **`[ Skip for now ]`** in soft neutral pill (`#F4F4F5`).

---

### 4.2 Step 2: Property Profile & Location (Completed & Verified)
1. **Zero-Emoji Professional Pill Selectors**:
   * **Gender Category**: `[ Gents PG ]` `[ Ladies PG ]` `[ Co-living ]`
   * **Property Structure**: `[ Standard PG ]` `[ Apartment Units ]`
   * **Ownership Type**: `[ Owned Building ]` `[ Leased Property ]`
   * **Elevator / Lift**: `[ No Lift ]` `[ 1 Lift ]` `[ 2 Lifts ]` `[ 3+ Lifts ]`
   * **Power Backup**: `[ Full Power Backup ]` `[ No Backup ]`
2. **PG Address Subheading & Location Inputs**:
   * Bold section header: **`PG Address`** (`font-weight: 700`).
   * Floating label inputs for PG Brand Name, Street Address, Area, Landmark, City & State (`Bengaluru, Karnataka`), 6-Digit Pincode, and Google Maps Link.
3. **Seamless Step Transitions**:
   * Step 1 $\rightarrow$ `Continue` $\rightarrow$ Step 2 with progress bar updating to `Step 2 of 4`.
   * Step 2 $\rightarrow$ `<` Back chevron $\rightarrow$ Smoothly returns to Step 1 without data loss.

---

## 5. Mobile Native Cross-Platform Standards (iOS & Android)

### 5.1 iPhone Dynamic Island & Notch Shield
* **`SafeAreaView` & `useSafeAreaInsets()`**: The React Native application automatically queries Apple hardware specifications to calculate top and bottom insets.
* **Zero Clipping**: The top `<` back chevron and progress bar are automatically pushed below the **iPhone 15/16 Dynamic Island, iPhone 13/14 Notches, and Android punch-hole cameras**.
* **Pixel-for-Pixel Parity**: Layout proportions, typography tracking (`-0.035em`), and button geometry render identically across iOS and Android.

---

## 6. Live Testing Verification Matrix

| Screen Name | File Path | Live Testing URL | Status |
| :--- | :--- | :--- | :--- |
| **Screen 1: Overview** | `ProductionCode/app_preview.html` | `http://10.99.9.51:8080/ProductionCode/app_preview.html` | Verified ✅ |
| **Screen 2: Phone Auth** | `ProductionCode/phone_verify.html` | `http://10.99.9.51:8080/ProductionCode/phone_verify.html` | Verified ✅ |
| **Screen 3: Role Routing**| `ProductionCode/auth_preview.html` | `http://10.99.9.51:8080/ProductionCode/auth_preview.html` | Verified ✅ |
| **Screen 4: Owner Setup** | `ProductionCode/owner_setup.html` | `http://10.99.9.51:8080/ProductionCode/owner_setup.html` | Step 1 & 2 Complete ✅ |

---
*Built with precision and love in Bengaluru, Karnataka.* 🚀
