# ==============================================================================
# 🕉️ URBANSTAY — MASTER SYSTEM PLAYBOOK & PRODUCTION LEDGER (KSB_11SEPT.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# COMPANY: UrbanStay Technologies Pvt. Ltd. (urbanstay.living)
# FOUNDER & PRODUCT ARCHITECT: Bhargav S Kulkarni (NoBrokerHood Monetization & Revenue Strategy)
# PILOT ANCHOR PARTNER: Arun (Owner of 3 PGs in Bengaluru + 40-50 PG Network in BTM/HSR)
# DATE OF RECORD: 11 September 2026
# CURRENT MASTER BUILD: Build v57 (urbanstay_v57.apk / version: 1.0.65+66)
# ==============================================================================

---

## 📱 1. CURRENT LIVE PRODUCTION STATUS

* **Current Master APK**: **`urbanstay_v57.apk`** (56.0 MB)
* **Owner Suite Status**: ✅ **100% COMPLETE & FROZEN** — All 14 owner modules fully operational and verified.
* **Tenant Suite Status**: 🟢 **IN ACTIVE PRODUCTION** — 
  * **Module 1 (`tenant_checkin_screen.dart`)**: ✅ 100% complete, universal flex-alignment, dynamic rent & deposit calculation, strict numeric formatting, compiled into Build v57.
  * **Module 2 (`tenant_dashboard_screen.dart`)**: 🎯 Ready for implementation with finalized 7-pillar taxonomy.

---

## 🛡️ 2. FOUNDATION RULE: "ZERO EXTRA WORK FOR OWNER" PRINCIPLE

Real Indian PG owners will immediately uninstall an app if it creates new administrative burdens or spam notifications.

> **CRITICAL LAW**: Every tenant-facing feature MUST either:
> 1. **Automate an existing manual headache** (e.g. generating HRA tax receipts without owner involvement).
> 2. **Resolve peer-to-peer friction automatically** (e.g. washing machine queue countdown without calling warden).
> 3. **Prevent billing disputes before they happen** (e.g. transparent electricity sub-meter unit calculations).
>
> 🚫 **Deliberately Omitted**: Gate/Visitor intercom fluff, private delivery rider tracking, arbitrary ticket spams (dustbins/fridge chats), and strict maid appointment scheduling that fails in real life.

---

## 🏛️ 3. THE 7 FINALIZED TENANT MODULE PILLARS

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     URBANSTAY TENANT APPLICATION SUITE                  │
├───────────────────┬─────────────────────────────────────────────────────┤
│ 1. Financials     │ UPI Rent, History Ledger, HRA Tax PDF, Sub-Meter    │
├───────────────────┼─────────────────────────────────────────────────────┤
│ 2. Helpdesk       │ Photo Tickets, Live Plumber/Electrician, Sign-Off   │
├───────────────────┼─────────────────────────────────────────────────────┤
│ 3. DNB & Food     │ Pinned Notices, Daily Meal RSVP, Weekly Menu        │
├───────────────────┼─────────────────────────────────────────────────────┤
│ 4. Facilities     │ Washing Machine Timer, Weather Rain Alert, RO Alert │
├───────────────────┼─────────────────────────────────────────────────────┤
│ 5. Housekeeping   │ Sweep Slots, Deep Bathroom Descale, Linen, DND      │
├───────────────────┼─────────────────────────────────────────────────────┤
│ 6. Community      │ Internal PG Buy & Sell, Weekend Sports Polls        │
├───────────────────┼─────────────────────────────────────────────────────┤
│ 7. Lifecycle      │ Digital Agreement, 30-Day Notice, Deposit Refund    │
└───────────────────┴─────────────────────────────────────────────────────┘
```

---

### Pillar 1: 💳 Rent, Bills & Financials
1. **Direct UPI Rent Pay**: 1-tap payment via PhonePe / GPay directly to the owner's bank account with UTR tracking.
2. **Audited Payment Ledger & Slips**: Complete month-by-month history with downloadable receipts.
3. **Automated HRA Tax Exemption Receipt (PDF)**: 1-tap instant PDF download with **Owner PAN**, property address, and official HRA certification stamp. *Eliminates 50+ urgent owner calls during Dec–Feb tax declarations.*
4. **Electricity Sub-Meter Breakdown**: Shows previous reading, current reading, units consumed, and exact billing rate (e.g. 75 units × ₹10 = ₹750). *Stops tenant-owner AC/geyser billing arguments.*
5. **Security Deposit Balance Card**: Immutable record of security deposit paid, advance adjustments, and refundable balance.
6. **Pro-Rata / Mid-Month Rent Calculator**: Auto-calculates exact per-day rent when joining mid-month.

---

### Pillar 2: 🛠️ Maintenance & Repair Helpdesk
1. **1-Tap Photo Issue Ticket**: Select category (Plumbing, Electrical/Geyser, Wi-Fi, Furniture) + snap photo with optional note.
2. **Live SLA Resolution Tracker**: Transparent status (*Submitted ➔ Assigned to Electrician/Plumber ➔ In Progress ➔ Fixed*).
3. **Resident Sign-Off Verification**: Resident taps *"Confirm Fixed"* before the ticket is officially closed in the owner dashboard.

---

### Pillar 3: 📢 Digital Notice Board (DNB) & Food Mess
1. **Pinned Building Broadcasts (NoBrokerHood DNB Pattern)**: Important announcements (BESCOM power shutdowns, BWSSB water tanker schedules, pest control dates, festival timings).
2. **Daily Food Mess RSVP**: 1-tap toggle (*"Having Dinner Today: Yes / No"*) before the 6:00 PM cutoff.
   * *Ground-Truth Win*: Stops cook ration wastage, saving the owner ₹15,000–₹25,000/month.
3. **Weekly Food Menu**: View breakfast, lunch, and dinner timetable from Monday to Sunday.

---

### Pillar 4: 🧺 Shared Facilities & Amenities
1. **Washing Machine 45-Min Slot Scheduler & Countdown**: Real-time slot reservation with active countdown timer and notification when cycle finishes. *Peer-to-peer queue; zero owner involvement.*
2. **Smart Weather API Monsoon Rain Alert**:
   * Integrated with **Open-Meteo API** (hyperlocal coordinates for BTM/HSR/Koramangala).
   * Automatically detects incoming rain (> 70% probability in next 30 mins) and alerts residents to collect clothes from rooftop drying lines.
3. **RO Drinking Water Refill Alert**: 1-tap prompt when 20L can / dispenser on a floor is empty.
4. **Floor Wi-Fi & 1-Tap Router Reboot Alert**: Displays floor Wi-Fi credentials + 1-tap alert to staff when router requires power cycle.
5. **Shared Refrigerator Guidelines**: Shelf labeling rules & weekly cleanout notices.

---

### Pillar 5: 🧹 Housekeeping & Daily Hygiene
1. **Room Sweep & Mop Scheduler / Missed Sweep Request**: Request morning/afternoon sweep or flag missed cleaning.
2. **Deep Bathroom Sanitization (Chemical Descaling)**: Monthly request for tile/tap hard-water acid descaling.
3. **Linen & Bedding Replacement**: Scheduled swap for fresh bedsheets and pillow covers (for PGs providing linen).
4. **"Skip Cleaning Today" (DND Toggle)**: Allows night-shift or WFH residents to mark "Do Not Disturb" so maid skips the door.
5. **Pest Control & Bedbug Spray Request**: Flag room for the weekly weekend pesticide round.
6. **Geyser Hot Water / MCB Tripped Alert**: 1-tap alert during cold Bangalore mornings when geysers overload circuits.

---

### Pillar 6: 🏷️ Community & Marketplace
1. **Internal PG C2C Buy & Sell**: Verified listings to sell desk chairs, kettles, monitors, cycles to roommates/building mates without OLX strangers entering the PG.
2. **Weekend Hangouts & Sports Polls**: Coordinate turf cricket, badminton, or weekend activities.

---

### Pillar 7: 🚪 Tenancy Lifecycle & Exit
1. **Digital Stay Details**: Room number, sharing type, check-in date, locked contracted rent, and house rules.
2. **Official 30-Day Move-Out Notice**: Timestamped notice with automated 30-day countdown that immediately opens the bed for owner marketing, eliminating empty bed revenue loss.
3. **Deposit Refund & Damage Audit Summary**: Itemized checklist of room handover inspection and final refund settlement.

---

## 🏗️ 4. ARCHITECTURAL ROADMAP & NEXT SPRINT

### Milestone 1: Tenant Cockpit (`tenant_dashboard_screen.dart`)
* **Route**: Connected from `role_selector_screen.dart` ("I am a Resident" returning login & post check-in pass).
* **Visual Standards**: Modeled strictly after Apple/Linear/Stripe standards using verified design tokens (`#08A63F` green, `#FFFFFF` elevated cards, `#111111` ink, `#E5E7EB` hairline borders, Outfit typography).
* **Key Cockpit Sections**:
  1. Profile & Room Hero Header (PG Name, Room No, Bed ID, Active Resident Pill).
  2. Rent Status Banner (Paid with Download HRA Receipt vs Due with 1-tap UPI Pay).
  3. Quick Action Grid (Pay Rent, Raise Ticket, Food RSVP, Washing Machine).
  4. Active Notices & Weather Drying Alert Pill.
  5. Live Service Requests Status Tracker.

---

## 📱 5. MASTER BUILD TRACKER: BUILD v58 (CLEAN IN-HOUSE TENANT HEADER)

* **Date & Time**: 11 September 2026, 14:50 IST
* **Artifact**: `urbanstay_v58.apk` (45.3 MB / 47,458,136 bytes)
* **Version**: `1.0.66+67`
* **Changes Delivered**:
  1. **Clean Solid In-House Header**: Replaced all artificial gradients and vibe-coded frosted glass with solid Brand Green (`#08A63F`).
  2. **Official Outfit Font Hierarchy**: PG Identity in Outfit 600, Location in Outfit 400, Resident Name in bold Outfit 700 (`24px`, `-0.6` letter-spacing).
  3. **In-House Profile Avatar**: Modeled directly after `owner_dashboard_screen.dart` with bold `BK` in `--green-dark` (`#068237`) on pure white circle.
  4. **Transparent Room Pill**: Removed background tint from `Room 204 • Bed B` badge (`color: Colors.transparent` with clean white hairline border).
  5. **Pruned Clutter**: Deleted floor and active resident chips for a clean, minimalist executive feel.
  6. **Universal Responsiveness**: Wrapped in `Center` + `ConstrainedBox(maxWidth: 480)` ensuring flawless scaling across all phones, tablets, and web viewports.

---

*This document is the permanent single source of truth for UrbanStay KSB 11th Sept.* 🕉️✨
