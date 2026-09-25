# ==============================================================================
# 🕉️ URBANSTAY — RESIDENT & TENANT SUITE MASTER SPECIFICATION (TENANT_FEATURES.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# COMPANY: UrbanStay Technologies Pvt. Ltd. (urbanstay.living)
# FOUNDER & PRODUCT ARCHITECT: Bhargav S Kulkarni (NoBrokerHood Monetization & Revenue Strategy)
# PILOT ANCHOR PARTNER: Arun (Owner of 3 PGs in Bengaluru + 40-50 PG Network in BTM/HSR)
# DATE OF RECORD: 2 September 2026
# ==============================================================================

---

## 📱 1. PRODUCT VISION & ARCHITECTURE OVERVIEW

The UrbanStay Tenant Experience is built to eliminate daily friction for 20–28 year old tech professionals, students, and interns living in Indian PGs. Modeled after enterprise community management platforms (NoBrokerHood & MyGate), the features are organized into **8 Distinct Operational Groups**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       URBANSTAY TENANT SUITE TAXONOMY                       │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ 1. Rent & Financials │ 2. Gate & Access     │ 3. Amenities & Facilities     │
├──────────────────────┼──────────────────────┼───────────────────────────────┤
│ 4. Housekeeping      │ 5. Maintenance/Help  │ 6. Community & Marketplace    │
├──────────────────────┼──────────────────────┼───────────────────────────────┤
│ 7. Notices & Rules   │ 8. Lifecycle & Exit  │ 9. High-CPM Local Deals       │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

---

## 🏛️ 2. THE 8 CORE TENANT FEATURE GROUPS

---

### GROUP 1: 💳 RENT, BILLS & FINANCIALS
*Core Objective: 0% transaction fee payments and instant corporate tax compliance.*

1. **Direct UPI Rent Payment (0% Gateway Surcharge)**:
   * **Capability**: 1-Tap integration with Google Pay, PhonePe, and Paytm.
   * **Value**: Pre-fills the owner's direct bank VPA (`owner@hdfcbank`) and exact monthly rent, bypassing the 1.5%–2% convenience fee charged by traditional aggregators.
2. **Instant HRA Tax Receipts (50ms Generation)**:
   * **Capability**: Automatically generates tax-compliant PDF rent receipts.
   * **Value**: Includes PG Owner PAN, property registration address, room/bed number, and digital verification seal for HR submission.
3. **Payment Ledger & Lifetime History**:
   * **Capability**: Comprehensive month-on-month statement of all historical transactions.
   * **Value**: Stores UTR reference numbers, payment timestamps, and payment modes (UPI / Cash) with 1-tap annual statement export.
4. **Utility & Electricity Sub-Meter Tracking**:
   * **Capability**: Room-level AC and power unit consumption calculator.
   * **Value**: Displays starting/ending meter readings with photo proof and transparent per-unit electricity cost split.

---

### GROUP 2: 🚪 GATE, ACCESS & VISITOR MANAGEMENT
*Core Objective: Seamless building access without gatekeeper friction.*

5. **Digital Visitor Pre-Approval**:
   * **Capability**: 1-Tap creation of secure visitor passes for day guests, friends, or parents.
   * **Value**: Generates a shareable entry link / pass code verified at the reception desk.
6. **Daily Help & Service Staff Verification**:
   * **Capability**: Real-time attendance log of daily maid, cook, and cleaning personnel.
   * **Value**: Informs residents when their floor's housekeeping staff is active in the building.
7. **Late Night Gate Intimation (Curfew Permission)**:
   * **Capability**: Automated notification to the on-ground warden for late arrivals past curfew.
   * **Value**: Prevents gate lockouts for tech employees working late shifts.

---

### GROUP 3: 🧺 AMENITIES & SHARED FACILITIES
*Core Objective: Zero conflict over shared resources.*

8. **Washing Machine Slot Scheduler**:
   * **Capability**: 45-Minute time-slot booking engine for floor washing machines.
   * **Value**: Includes a live in-app countdown timer and push alerts when a laundry cycle finishes, eliminating weekend laundry disputes.
9. **Common Work & Study Desk Reservation**:
   * **Capability**: Slot booking for common study lounges, high-speed work desks, or recreational spaces.
10. **1-Tap PG Wi-Fi & Network Diagnostics**:
    * **Capability**: 1-Tap copy PG high-speed Wi-Fi credentials with live network speed test and router restart requests.

---

### GROUP 4: 🧹 HOUSEKEEPING & DAILY SERVICES
*Core Objective: Predictable hygiene and room maintenance.*

11. **Room Cleaning Scheduler**:
    * **Capability**: On-demand or scheduled request for floor sweeping, mopping, and dustbin clearance with preferred morning/evening time slots.
12. **Deep Bathroom Sanitization**:
    * **Capability**: Request deep bathroom chemical wash and descaling.
13. **Linen & Bedding Replacement**:
    * **Capability**: Schedule fresh bedsheet, pillow cover, and mattress protector swaps.

---

### GROUP 5: 🛠️ MAINTENANCE & HELPDESK
*Core Objective: Fast, accountable resolution of room issues.*

14. **Photo-Based Maintenance Ticketing**:
    * **Capability**: 1-Tap ticket creation categorized by trade (*Plumbing, Electrical, Geyser, AC, Wi-Fi, Carpentry*).
    * **Value**: Allows attaching camera photos and voice notes describing the breakdown.
15. **Live Resolution Lifecycle Tracker**:
    * **Capability**: Real-time status stream: `Open` ➔ `Technician Assigned` ➔ `Work in Progress` ➔ `Resolved`.
16. **Emergency & Service Directory**:
    * **Capability**: One-tap speed dials for Warden, Owner, Plumber, Electrician, Nearest Doctor, and Local Police.

---

### GROUP 6: 🏷️ COMMUNITY & RESIDENT MARKETPLACE
*Core Objective: Hyperlocal engagement and safe peer-to-peer commerce.*

17. **PG Buy & Sell Marketplace (Second-Hand)**:
    * **Capability**: Community-gated C2C feed for listing and buying used items (study chairs, monitors, electric kettles, cycles).
    * **Value**: Scoped strictly to verified active residents in that specific PG building with in-app seller DM.
18. **Resident Community Chat Lounge**:
    * **Capability**: Building-wide real-time discussion channel with auto-revocation upon tenant checkout.
19. **Events, Weekend Hangouts & Polls**:
    * **Capability**: Coordinate weekend activities (turf cricket, badminton, movie nights) via community polls.

---

### GROUP 7: 📢 BUILDING NOTICES & COMMUNICATION
*Core Objective: Clear, transparent operational broadcasts.*

20. **Official Notice Board**:
    * **Capability**: Pinned announcements from the PG owner/warden (water tank cleaning, power maintenance, festive dinners).
21. **House Rules & Policy Handbook**:
    * **Capability**: Instant access to verified PG rules on guest policy, quiet hours, smoking/alcohol rules, and mess timings.

---

### GROUP 8: 🔄 TENANCY LIFECYCLE & MOVE-IN / MOVE-OUT
*Core Objective: Frictionless onboarding and dispute-free security deposit refunds.*

22. **Digital Stay Agreement & Deposit Record**:
    * **Capability**: View active onboarding agreement, monthly lock-in terms, and security deposit balance held (₹15,000).
23. **Internal Room Switch / Upgrade Request**:
    * **Capability**: 1-Tap request to transfer rooms or upgrade sharing type (3-sharing ➔ 2-sharing ➔ Single) as beds open up.
24. **30-Day Notice to Vacate (Move-Out & Refund)**:
    * **Capability**: Formal move-out notice submission with timestamped record and transparent exit damage deduction checklist with photos.

---

## 💰 3. MONETIZATION & IN-APP AD ENGINE (NOBROKERHOOD MODEL)

Modeled after high-CPM resident ad placements:
* **Contextual Partner Deals**: High-attention sponsor banners on the resident dashboard:
  * **Food & Grocery**: Swiggy, Zepto, Zomato, Licious.
  * **Fitness**: Cult.fit memberships in local clusters (HSR, Koramangala, BTM).
  * **Mobility**: Yulu, Bounce, Royal Brothers bike rentals.

---

*This document is the permanent single source of truth for the UrbanStay Tenant Suite.* 🕉️✨
