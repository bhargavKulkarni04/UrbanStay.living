# ==============================================================================
# 🕉️ URBANSTAY — MASTER SYSTEM PLAYBOOK & PRODUCTION LEDGER (KSB_13SEPT.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# COMPANY: UrbanStay Technologies Pvt. Ltd. (urbanstay.living)
# FOUNDER & PRODUCT ARCHITECT: Bhargav S Kulkarni (NoBrokerHood Monetization & Revenue Strategy)
# PILOT ANCHOR PARTNER: Arun (Owner of 3 PGs in Bengaluru + 40-50 PG Network in BTM/HSR)
# DATE OF RECORD: 13 September 2026
# CURRENT MASTER BUILD: Build v60 (urbanstay_v60.apk / version: 1.0.68+69)
# ==============================================================================

---

## 📱 1. CURRENT LIVE PRODUCTION STATUS & COMPILED ARTIFACTS

* **Current Master Release APK**: **`urbanstay_v60.apk`**
  * **Size**: **`53.2 MB`** (`55,511,760` bytes)
  * **Build Timestamp**: 13-09-2026 14:55:53 IST
  * **Version Code**: `1.0.68+69` (Build v60)
  * **Location**: Root `c:\Users\bharg\OneDrive\Desktop\UrbanStay\urbanstay_v60.apk`
* **Local Phone Download Server**:
  * **Active Wi-Fi IPv4**: `10.209.182.51`
  * **HTTP Server Daemon**: Port `8080` (Python `http.server`)
  * **Direct Download URL**: `http://10.209.182.51:8080/urbanstay_v60.apk`
* **Live Web Preview Server**:
  * **Port**: `8085` (`flutter run -d web-server --web-port 8085`)
  * **Status**: Running / Edge-to-edge Chrome responsive view
* **Owner Operating Suite Status**: ✅ **100% COMPLETE & FROZEN** (All 14 owner modules frozen and untouched).
* **Tenant Application Suite Status**: 🟢 **PHASE 2 IN ACTIVE PRODUCTION**
  * **Screen 1 (`tenant_checkin_screen.dart`)**: ✅ Complete (Universal flex layout, dynamic rent & deposit calculation, strict numeric formatting).
  * **Screen 2 (`tenant_dashboard_screen.dart`)**: ✅ Complete in Build v59 (Curved architectural header, Apple/Brex Hero Rent Banner, stepped folder-tab cards, bottom navigation).

---

## 🎨 2. THE 13TH SEPTEMBER UI/UX UPGRADES & ARCHITECTURAL REFINEMENTS

### 🏛️ Pillar A: Architectural Curved Header
1. **Asset Background Integration**:
   * Uses high-resolution `Tenant_nameBG.png` asset with edge-to-edge smooth downward bezier curve (`_SmoothHeaderClipper`).
2. **Dynamic Name Font Auto-Sizing (`_getNameFontSize`)**:
   * Prevents long Indian names from breaking across multiple lines or overflowing.
   * Locked to 1-line with smooth text truncation safety:
     * Length $\le 16$ characters: `24.0px`
     * Length $\le 22$ characters: `22.0px`
     * Length $> 22$ characters: `19.5px`
3. **Smart Initials Extractor (`_getInitials`)**:
   * Auto-extracts clean uppercase initials (`"Bhargav S Kulkarni"` $\rightarrow$ `"BK"`, `"Joy Sen"` $\rightarrow$ `"JS"`).
   * Rendered inside a clean white circular container with green dark typography.
4. **Actionable Room Pill**:
   * `[ 🛏️ Room 104 - Bed B  > ]` with subtle dark overlay (`rgba(0, 0, 0, 0.26)`), 1px white border, and medium impact haptics.
   * All unnecessary decorative icons removed from header.

---

### ⚡ Pillar B: Apple Wallet / Brex Split Hero Rent Card
1. **Eliminated Generic & Vibe-Coded Anti-Patterns**:
   * ❌ Removed thick bootstrap-style green vertical sidebars.
   * ❌ Removed oversized e-commerce CTA buttons with lightning bolts.
   * ❌ Removed yellow supermarket-style clock badges.
   * ❌ Resolved the `1.00px` bottom layout overflow error.
2. **Pruned Clutter (Zero Sub-Meter in Main View)**:
   * Indian PG rent is an all-inclusive fixed monthly package (bed, 3 daily meals, Wi-Fi, water, housekeeping).
   * Sub-meter unit breakdowns and pro-rata clutter removed from the main tenant dashboard.
3. **Executive Split Layout**:
   * **Top Row**: Metadata `SEPTEMBER RENT` on the left, paired with a prominent, dedicated soft-green badge: **`[ 🛏️ Room 104 - Bed B ]`** on the right (`#EBF8EE` bg with `#08A63F` 22% border).
   * **Middle Split**:
     * **Amount**: Styled in bold Brand Green **`₹8,500`** (`27px`, Outfit `800` weight, `#08A63F`).
     * **Due Subtitle**: `⏳ Due by 05 Sep` (`#D97706` amber text).
     * **CTA Action**: Solid Brand Green pill button: **`[ Pay Rent  ➔ ]`** (`#08A63F` background, 24px radius, white text, subtle green depth shadow).
   * **Bottom Micro-Audit Row**:
     * Direct UPI text removed to avoid redundancy.
     * Left: `All-inclusive monthly stay` (`11px` muted).
     * Right: Actionable **`Paid in cash? >`** reporting link for tenants paying the warden in cash or external NEFT/IMPS.

---

### 🗂️ Pillar C: Custom Stepped Folder-Tab Cards
1. **Physical Stepped Bezier Contour (`_FolderTabPainter`)**:
   * The top edge of each white card starts at elevated tab height, steps down smoothly via cubic bezier curve (`cubicTo`) by `16px` to the lower right shoulder, creating an authentic physical file-folder appearance.
2. **Clean Typography Tabs (Icons Removed)**:
   * Following the design system rule, leading icons on main section titles were removed.
   * Folder tabs now feature clean, bold typography:
     * **`Payments`** (`tabWidth: 125`)
     * **`Helpdesk`** (`tabWidth: 120`)
     * **`Housekeeping`** (`tabWidth: 155`)
     * **`Tenancy & Exit`** (`tabWidth: 165`)
3. **Four-Item Balanced Button Grid**:
   * Every card contains balanced action items with circular soft green backgrounds (`#EBF8EE`), `22px` brand green icons, and centered 2-line labels:
   * **Payments**: `Pay Rent via UPI`, `Payment Ledger`, `HRA Tax Receipt`, `Security Deposit`.
   * **Helpdesk**: `Raise a Service Ticket`, `Live Repair Status`, `Resident Sign-Off`, `Washing Machine Slot Booking`.
   * **Housekeeping**: `Cleaning DND Toggle`, `Room Sweep Request`, `Deep Sanitization`, `Linen Replacement`.
   * **Tenancy & Exit**: `Stay Agreement`, `Move-Out Notice (30D)`, `Deposit Settlement`.

---

### 📱 Pillar D: Streamlined Bottom Navigation Architecture
To keep the main operational dashboard clean and prevent vertical scroll fatigue:
* **Bottom Navigation Tab 0**: `Home` (Operational Command Center).
* **Bottom Navigation Tab 1**: `Food & Notices` (Dedicated view for Daily Meal RSVP, Weekly Food Menu, and Pinned DNB Broadcasts).
* **Bottom Navigation Tab 2**: `Notifications` (Rent chasers, laundry timer countdown, rain alerts).
* **Bottom Navigation Tab 3**: `More` (Community marketplace, polls, room details, profile).

---

### 💳 Pillar E: Standalone Indian Rent Payment Checkout (`RentPaymentScreen.dart`)
1. **Full-Page Decoupled Architecture**:
   * Bypasses cramped modal sheets; renders a dedicated Swiggy/Zomato Indian checkout layout.
   * Top bar features clean back navigation, property subtitle, and secure SSL badge.
2. **Apple / Swiggy Clean Rent Summary Card**:
   * Displays monthly rent, stay duration, room tag (`Room 104 - Bed B`), and all-inclusive amenities.
   * Prominent ₹0.00 Convenience Fee guarantee tag (`#EBF8EE` bg with verified shield).
3. **Verified Official Vector SVG Payment Rails**:
   * Eliminates handmade/approximate SVG paths.
   * Uses real brand SVGs registered in `assets/images/`:
     * Google Pay (`assets/images/gpay.svg`)
     * PhonePe (`assets/images/phonepe.svg`)
     * Paytm (`assets/images/paytm.svg`)
     * NPCI Official Unified Payments Interface (`assets/images/upi.svg`)
   * Rendered in 44x44px crisp white containers with `#E5E7EB` borders.
4. **NPCI Direct UPI Intent (`upi://pay`) Integration**:
   * Direct deep-link launcher configured via `url_launcher` and Android 11+ `<queries>` scheme.
   * Generates dynamic string: `upi://pay?pa=<vpa>&pn=<name>&am=<amt>&cu=INR&tn=<note>&tr=<ref>`.
   * **Test Mode Toggle**: Isolated behind 1-line flag:
     `static const bool kIsTestingUpiMode = true; static const double kTestUpiAmount = 1.0;`
     Fires ₹1.00 directly to founder UPI (`bhargavkulkarni04@oksbi`) for physical on-device validation.
5. **Temporary Manual UTR Approval vs Future Auto-Reconcile Architecture**:
   * **Current Phase (Route A - Zero KYC & 0% Fees)**:
     * Tenant pays via GPay/PhonePe and inputs 12-digit UTR.
     * Owner verifies bank SMS and taps 1-tap "Approve & Send Receipt" in `owner_approvals.html`.
     * Zero owner KYC overhead, zero regulatory risk under RBI PA/PG guidelines.
   * **Future Phase (Route B - Sub-Merchant Virtual Accounts)**:
     * Cashfree Sub-Subscriptions / Razorpay Route integration.
     * Sub-merchant in-app onboarding with PAN/Bank verification for enterprise PG chains.
     * Unique Virtual Account per bed (`urbanstay.bed104@icici`) with automated webhook status callbacks and flat ₹2/txn fee.

---

## ⚡ 3. DESIGN SYSTEM TOKEN COMPLIANCE (ZERO VIOLATIONS)

| Token | Hex Value | Exact Usage in Build v60 |
| :--- | :--- | :--- |
| **`--green`** | `#08A63F` | Rent amount (`₹8,500`), `Pay Rent` button, bottom nav active indicator |
| **`--green-dark`** | `#068237` | Room pill badge text (`Room 104 - Bed B`), avatar initials text |
| **`--green-light`** | `#EBF8EE` | Room pill badge background, action item circle backgrounds |
| **`--ink`** | `#111111` | Primary titles, card headers, deep typography |
| **`--muted`** | `#6B7280` | Metadata labels (`SEPTEMBER RENT`, subtitles, timestamps) |
| **`--border`** | `#E5E7EB` | Hairline card borders, search bar outline, divider rules |
| **`--bg-page`** | `#F4F6F9` | Clean soft light-gray canvas background |
| **`--card-bg`** | `#FFFFFF` | Pure white elevated cards (zero dark cards, zero neon glows) |
| **`--font`** | `'Outfit', sans-serif` | Google Font (`400` body, `600/700` bold, `800` numbers) |
| **`--max-w`** | `480px` | Centered mobile viewport container |

---

## 🏗️ 4. BUILD VERSION TRACKER & SYSTEM ROADMAP

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     URBANSTAY PRODUCTION BUILD LEDGER                   │
├───────┬─────────────┬───────────┬───────────────────────────────────────┤
│ Build │ Version     │ Size      │ Major Milestone Achieved              │
├───────┼─────────────┼───────────┼───────────────────────────────────────┤
│ v57   │ 1.0.65+66   │ 56.0 MB   │ Tenant Check-In Screen complete       │
│ v58   │ 1.0.66+67   │ 45.3 MB   │ Initial Folder-Tab Dashboard & Web    │
│ v59   │ 1.0.67+68   │ 48.1 MB   │ Apple/Brex Hero Pay, Green Styling,   │
│       │             │           │ Room Badge, Clean Stepped Titles      │
│ v60   │ 1.0.68+69   │ 53.2 MB   │ Dedicated Swiggy/Zomato Indian Rent   │
│       │             │           │ Checkout, Real Vector Logos, ₹1 Test  │
│       │             │           │ UPI Intent to bhargavkulkarni04@oksbi │
└───────┴─────────────┴───────────┴───────────────────────────────────────┘
```

---

*This document serves as the permanent record of production progress and design decisions for 13 September 2026. All subsequent agent turns must honor these specifications.* 🕉️✨
