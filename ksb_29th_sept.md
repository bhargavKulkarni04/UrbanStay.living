# 🕉️ URBANSTAY — MASTER SESSION KNOWLEDGE & SYSTEM PLAYBOOK (KSB_29TH_SEPT.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# Date: 29 September 2026 | Active Build: urbanstay_v75.apk / Flutter Web & Mobile
# Target: India's #1 Enterprise PG & Hostel Operations Operating System (urbanstay.living)
# Founder: Bhargav S Kulkarni | Anchor Pilot: Arun (BTM Layout / HSR Network)
# ==============================================================================

---

## 📌 1. EXECUTIVE SUMMARY & STRATEGIC HIGHLIGHTS

Today's session unified **three major pillars** of the UrbanStay technology ecosystem:
1. **Dynamic Per-Bed SaaS Monetization & Sales Negotiation Engine**: Architecture for on-ground sales negotiation (₹15/bed standard scaling down to ₹13, ₹12, ₹10/bed for high-volume PG networks) with Superadmin backend overrides.
2. **Comprehensive Supabase Database & Security Matrix**: Server-side Row Level Security (RLS), multi-tenant isolation, client-side cryptographic storage, UTR replay protection, and webhook hardening.
3. **Owner Dashboard Ultra-Clean UI Refinements**: Elimination of visual clutter across Property Header, Collection Health (streamlined to 2 high-contrast cards: Paid Beds & Pending), and Payment Approvals.

---

## 💰 2. DYNAMIC PER-BED PRICING & SAAS BILLING ENGINE

### A. The On-Ground Negotiation Reality
When pitching to PG owners in high-density clusters (Koramangala, BTM Layout, HSR Layout, Electronic City), PG owners with 100+ to 500+ beds negotiate hard on unit economics.

| PG Scale Tier | Bed Range | Standard Rate | Negotiated Rate Range | Target Annual ACV |
| :--- | :--- | :--- | :--- | :--- |
| **Micro / Boutique** | 1 – 35 Beds | ₹899 / month fixed | ₹899 / mo (Zero discount) | ₹8,990 / year |
| **Mid-Market PG** | 36 – 100 Beds | ₹15 / bed / month | ₹13 – ₹14 / bed / month | ₹15,000 – ₹18,000 |
| **Cluster Network** | 101 – 300 Beds | ₹15 / bed / month | ₹12 / bed / month | ₹28,000 – ₹43,000 |
| **Enterprise Chain** | 300+ Beds | ₹15 / bed / month | ₹10 – ₹11 / bed / month | ₹45,000 – ₹65,000+ |

### B. Technical Implementation: Dynamic Billing Profile in Backend
Instead of hardcoding subscription rates in the mobile app, every property or owner entity is bound to a dynamic `saas_billing_profile` in Supabase:

```sql
-- Dynamic SaaS Pricing & Licensing Table
CREATE TABLE saas_billing_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES owners(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    billing_model VARCHAR(32) DEFAULT 'per_bed', -- 'flat_tier' | 'per_bed' | 'custom_enterprise'
    base_rate_per_bed NUMERIC(10, 2) NOT NULL DEFAULT 15.00,
    negotiated_rate_per_bed NUMERIC(10, 2), -- Overridden by Bhargav/Sales (e.g., 12.00)
    effective_rate_per_bed NUMERIC(10, 2) GENERATED ALWAYS AS (
        COALESCE(negotiated_rate_per_bed, base_rate_per_bed)
    ) STORED,
    active_licensed_beds INT NOT NULL DEFAULT 35,
    billing_cycle VARCHAR(16) DEFAULT 'monthly', -- 'monthly' | 'yearly'
    discount_pct NUMERIC(5, 2) DEFAULT 0.00,
    sac_code VARCHAR(16) DEFAULT '998315', -- 18% GST IT Software Services
    custom_notes TEXT, -- "Negotiated with Arun (3 PGs, 120 beds total)"
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### C. Admin Override Workflow
1. **Sales Rep / Founder On-Site Action**:
   - Bhargav meets PG owner $\rightarrow$ Owner agrees to onboard 80 beds at ₹12/bed/month.
   - Founder updates `negotiated_rate_per_bed = 12.00` via UrbanStay Internal Ops Portal or secure Supabase Edge Function (`/api/admin/set-custom-tier`).
2. **Client-Side Reflection**:
   - When the owner opens `owner_saas_billing.html` or the mobile Billing tab, the app queries `saas_billing_profiles`.
   - The UI automatically renders:
     * `Rate: ₹12 / bed / mo (Custom Enterprise Plan)`
     * `Total: 80 Beds × ₹12 = ₹960/mo (+ 18% GST)`
   - Razorpay subscription checkout link / mandate generates dynamically with exact calculated amount.

---

## 🛡️ 3. FULL-STACK DATABASE & SECURITY ARCHITECTURE (SUPABASE)

```
┌────────────────────────────────────────────────────────────────────────┐
│                   URBANSTAY SECURITY & MULTI-TENANCY                   │
├────────────────────────────────────────────────────────────────────────┤
│  MOBILE / WEB CLIENT                                                   │
│  • flutter_secure_storage (Encrypted Keystore / Keychain)             │
│  • Zero hardcoded service-role secrets                                │
│  • Public Anon Key + JWT Auth Token only                              │
├──────────────────────────────────┬─────────────────────────────────────┤
│  REST / GRAPHQL / RPC GATEWAY    │  SUPABASE ROW LEVEL SECURITY (RLS)  │
│  • TLS 1.3 / SSL Certificate Pin │  • auth.uid() tenant isolation      │
│  • Strict CORS whitelisting      │  • Multi-property tenancy policies │
├──────────────────────────────────┴─────────────────────────────────────┤
│  BACKEND / EDGE FUNCTIONS & QUEUES                                     │
│  • Service Role Key isolated to server execution                       │
│  • UTR Deduplication Index (Prevent double-submission replay attacks)  │
│  • Razorpay & WhatsApp Meta Cloud Webhook HMAC Signature Verification │
└────────────────────────────────────────────────────────────────────────┘
```

### A. Client-Side Security Directives
1. **Never Bundle Service Keys**:
   - The Flutter mobile build and web bundle only carry the `SUPABASE_ANON_KEY` and `SUPABASE_URL`.
   - The `SUPABASE_SERVICE_ROLE_KEY` is strictly prohibited from touching client source code or environment files distributed to users.
2. **Encrypted Local Storage**:
   - Authentication tokens, owner biometric access pins, and cached session keys use `flutter_secure_storage` (backed by Android EncryptedSharedPreferences and iOS Keychain Services).
3. **Sensitive KYC Data Scrubbing**:
   - Government Aadhaar numbers are never stored in plaintext on the client.
   - Aadhaar verification uses masked tokens (`XXXXXXXX1234`) and server-side OCR with ephemeral image destruction.
4. **Code Obfuscation**:
   - Production builds generated via `flutter build apk --obfuscate --split-debug-info=/<symbols-path>` to prevent reverse-engineering of endpoints or API contracts.

### B. Server-Side & Database Security (Row Level Security - RLS)
Every table in Supabase must have Row Level Security enabled. Tenants and owners are strictly quarantined:

#### 1. Multi-Tenant Owner Isolation Policy
```sql
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE rent_ledgers ENABLE ROW LEVEL SECURITY;

-- Owner can only see properties they own
CREATE POLICY owner_property_isolation ON properties
    FOR ALL
    USING (owner_id = auth.uid());

-- Rooms access inherited via property ownership
CREATE POLICY owner_room_isolation ON rooms
    FOR ALL
    USING (
        property_id IN (
            SELECT id FROM properties WHERE owner_id = auth.uid()
        )
    );
```

#### 2. Tenant Data Isolation Policy
```sql
-- Resident can only see their own rent dues and payment history
CREATE POLICY tenant_ledger_isolation ON rent_ledgers
    FOR SELECT
    USING (
        tenant_id = auth.uid() OR
        property_id IN (SELECT id FROM properties WHERE owner_id = auth.uid())
    );
```

### C. Financial Integrity & Fraud Prevention (UTR Deduplication)
One of the largest leakages in Indian PG operations is **duplicate UPI transaction submissions** (e.g., Tenant submits yesterday's UTR or another tenant's screenshot for a new month).

```sql
-- Unique constraint preventing any UTR from being claimed twice across the entire network
CREATE UNIQUE INDEX idx_unique_verified_utr 
ON payment_approvals(utr_number) 
WHERE status IN ('approved', 'pending');
```

* **Workflow**:
  1. Tenant inputs 12-digit UTR (`4267XXXXXXXX`).
  2. Database rejects duplicate submissions instantly at the schema level.
  3. Edge function cross-verifies timestamp and UPI beneficiary VPA before marking as approved.

### D. Webhook Security (HMAC-SHA256 Verification)
* **Razorpay Subscription Webhooks**: Validated using `X-Razorpay-Signature` HMAC-SHA256 hex digest using the webhook secret.
* **WhatsApp Meta Cloud API**: Validated using `X-Hub-Signature-256` to ensure callbacks genuinely originate from Meta servers.

---

## 🎨 4. OWNER DASHBOARD VISUAL CLEANUP & COMPACT ARCHITECTURE

Based on user feedback, the **Owner Dashboard** (`owner_dashboard_screen.dart`) received direct aesthetic refinements:

### A. Summary of Changes:
1. **Removed PG Apartment Icons**:
   - Removed the building icon container (`Icons.apartment_rounded`) from the top header property switcher.
   - Removed the large building icon container (`Icons.apartment_rounded`) from the Property & Bed Occupancy Hero Card.
   - Result: Clean, executive typography focused strictly on the property name (`Greenview PG`) and occupancy metrics.
2. **Collection Health Refactoring**:
   - **Removed Checkmark Icon**: Paid Beds now features clean, unencumbered typography.
   - **Removed Clock Icon**: Pending Dues now features clean typography.
   - **Removed Defaulters Card**: Defaulters column removed completely; the row now features **exactly 2 balanced, high-contrast cards** (`Paid Beds` and `Pending`), each taking a 50% width distribution.
   - **Removed WhatsApp Payment Links Bar**: Removed the bottom button strip (`Send WhatsApp Payment Links to 6 Pending`), eliminating vertical clutter.
3. **Payment Approvals Filter Pills**:
   - Removed icons from all 3 tactile metric blocks:
     * `Submitted` (receipt icon removed, clean text + count).
     * `Approved` (task alt icon removed, clean text + count).
     * `Pending` (pending actions icon removed, clean text + count).

---

## 📈 5. VERIFIED BUILD STATUS & RUNTIME HEALTH

* **Active Web Server**: Running on `http://localhost:8080` (Task ID `task-8516`).
* **Hot Restart**: Performed and verified without errors.
* **Static Analysis**: `flutter analyze lib/features/owner_dashboard/presentation/screens/owner_dashboard_screen.dart` returned **`No issues found!`**.

---

*Document compiled and preserved in accordance with UrbanStay Master Engineering Standards.* 🕉️✨
