# ==============================================================================
# 🕉️ URBANSTAY — MASTER SYSTEM PLAYBOOK & DAILY EXECUTION PLAN (KSB_21SEPT.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================
# COMPANY: UrbanStay Technologies Pvt. Ltd. (urbanstay.living)
# FOUNDER & PRODUCT ARCHITECT: Bhargav S Kulkarni (NoBrokerHood Monetization & Revenue Strategy)
# PILOT ANCHOR PARTNER: Arun (Owner of 3 PGs in Bengaluru + 40-50 PG Network in BTM/HSR)
# DATE OF RECORD: 21 September 2026
# TARGET FOCUS: Current Account, PhonePe Business Webhook Integration & SaaS Pricing Restructuring
# ==============================================================================

---

## 🎯 1. TOMORROW'S CORE MISSION (21 SEPT 2026)

1. **Fintech Architecture & Banking Setup**:
   * Set up **PhonePe for Business** merchant account for ₹0 MDR UPI payments and automated instant developer webhooks.
   * Apply online for **ICICI Bank InstaBIZ Current Account** under UrbanStay Technologies using MSME/Udyam certificate.
2. **Codebase SaaS Pricing Restructuring**:
   * Implement the new **Owner Subscription Pricing Model** in Flutter and Production HTML:
     * **Under 200 Beds**: Flat **₹999 / month** (₹9,999 / year)
     * **201 to 400 Beds**: Flat **₹1,399 / month** (₹13,999 / year)
     * **401 to 600 Beds**: Flat **₹1,899 / month** (₹18,999 / year)
     * **601+ Beds**: **₹2,499 / month** or Custom Enterprise
3. **UPI Intent Deep-Linking Integration**:
   * Replace generic payment modal with 1-tap **Google Pay, PhonePe, Paytm & BHIM** buttons directly pointing to UrbanStay's merchant VPA.

---

## 🏦 2. TOMORROW'S STEP-BY-STEP BANKING & FINTECH PLAN

### Phase 1: PhonePe Business Setup (Takes 10 Mins from Home)
* **Goal**: Immediate Merchant UPI VPA + Developer API access for webhooks with ₹0 cost.
* **App**: Download **PhonePe for Business** app on mobile.
* **Business Type**: Sole Proprietorship / Individual.
* **Business Name**: `UrbanStay Technologies`.
* **Category**: Software & Web Services / Property Management.
* **KYC Uploads**:
  * Founder PAN Card
  * Aadhaar (OTP verified)
  * UrbanStay MSME / Udyam Certificate (Class 9 Trademark #7920292)
* **Initial Bank Link**: Link existing personal Savings Bank Account for Day 1 zero-blocker testing.
* **Cost / Balance**: **₹0.00** (Zero deposit, Zero maintenance charges).
* **Soundbox Prompt**: **Select "NO / Skip"** to avoid physical hardware rental.

### Phase 2: ICICI InstaBIZ Current Account (100% Online via Video KYC)
* **Goal**: Establish a dedicated corporate Current Account for UrbanStay Technologies to maintain clean books, unlimited commercial UPI credits, and tax isolation.
* **Portal**: ICICI Bank Online Current Account for Sole Proprietorship.
* **Verification**: Video KYC (Show physical PAN card + live signature on white paper).
* **Documents**:
  * PAN Card
  * Aadhaar Card
  * MSME / Udyam Certificate
* **Funding Deposit**: Initial deposit of ₹10,000 (remains in UrbanStay's account balance).
* **Turnaround Time**: Account Number and IFSC issued in 24 to 48 hours.
* **Final Cutover**: Once activated, update bank account in PhonePe Business app with 1 click.

---

## ⚡ 3. HOW THE PAYMENT & WEBHOOK SYSTEM WORKS

```
┌──────────────────────────────────────────────────────────────────────────┐
│              URBANSTAY OWNER SUBSCRIPTION PAYMENT FLOW                    │
└──────────────────────────────────────────────────────────────────────────┘
      │
      ▼
1. PG Owner selects plan (e.g. ₹999 for Under 200 Beds)
      │
      ▼
2. Taps "Google Pay" / "PhonePe" / "Paytm" in UrbanStay App
      │
      ▼
3. Deep-link triggers UPI Intent:
   upi://pay?pa=urbanstay@ybl&pn=UrbanStay%20Technologies&am=999&cu=INR
      │
      ▼
4. Owner enters 4/6-digit UPI PIN in their payment app
      │
      ▼
5. Payment completes via NPCI (0% Transaction Fee, 100% Interoperable)
      │
      ├──▶ Money settles into UrbanStay Bank Account (Instant / Daily 7 AM)
      │
      └──▶ PhonePe Server triggers automated webhook POST to UrbanStay:
           URL: https://api.urbanstay.living/api/v1/subscription/webhook
           Payload: { "status": "SUCCESS", "amount": 99900, "utr": "..." }
                │
                ▼
6. UrbanStay Backend automatically unlocks Owner Dashboard for 30 Days!
```

---

## 💻 4. CODE IMPLEMENTATION TARGETS (21 SEPT 2026)

### A. Update `owner_saas_billing_screen.dart`
* [ ] Update `_tiers` array to reflect the new bed-bracket tiers:
  * Up to 200 Beds: ₹999/mo (₹9,999/yr)
  * 200 to 400 Beds: ₹1,399/mo (₹13,999/yr)
  * 400 to 600 Beds: ₹1,899/mo (₹18,999/yr)
  * 600+ Beds: ₹2,499/mo (Custom / Enterprise)
* [ ] Replace generic Razorpay sheet with **Direct UPI Intent Sheet**:
  * Google Pay Button
  * PhonePe Button
  * Paytm Button
  * Any UPI App Intent Chooser
* [ ] Real-time GST calculation (18% under SAC Code `998315`).

### B. Update Web SaaS & System Memory
* [ ] Update `ProductionCode/owner_saas_billing.html` with new bed tiers.
* [ ] Update Section 7 of `AGENTS.md` with new pricing unit economics.

### C. Upcoming Product Roadmap Milestones
* [ ] **Item 5**: Polish Owner Dashboard for high-end executive look & feel.
* [ ] **Item 6**: Tenant Dashboard (Washing machine slot booking & Meta Cloud API WhatsApp notifications).

---

*Record committed for execution on 21 September 2026. Om Shri Raghavendraya Namaha.* 🕉️✨
