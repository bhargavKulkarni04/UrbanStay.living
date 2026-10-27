# ==============================================================================
# 🕉️ URBANSTAY — LEAN TWO-WAY NOTIFICATION ARCHITECTURE (APP_NOTIFICATION.MD)
# 🌟 Om Shri Raghavendraya Namaha ✨
# ==============================================================================

## 📌 1. THE FOUNDER PHILOSOPHY: ZERO NOISE, HIGH CONVERSION

Real-world PG residents (IT professionals & students in Bengaluru, Pune, Hyderabad) get annoyed by spammy apps. If an app sends 30 notifications a month for trivial things, tenants will **mute notifications or delete the app**.

In UrbanStay, we eliminate all noise and focus strictly on the **Super 6 Two-Way Operational Events** that directly impact:
1. **Cash Collection & Receipts (Money)**
2. **Move-out 30-Day Pipeline (Zero Empty Beds)**
3. **Accountability for Complaints & Extension Requests**
4. **Emergency Rain Alert for Terrace Clothes**

---

## 🎯 2. THE SUPER 6 LEAN TWO-WAY NOTIFICATIONS

| # | Event | Direction | Tenant Action / Result | Owner Action / Result | Ding Sound? |
|---|---|---|---|---|:---:|
| **1** | **Rent Submit & Approval** | **Two-Way** | Tenant submits UPI UTR or Cash handover. When owner approves, tenant gets **"Rent Approved & Cleared ✓"** with instant PDF receipt. | Owner gets instant alert: *"Malla Reddy (Room 101) submitted ₹366 for Oct"*. Owner clicks **Verify & Approve**. | 🔔 **YES** (on Approval) |
| **2** | **Rent Extension Granted** | **Owner ➔ Tenant** | Tenant requests extension on dashboard. When owner accepts, tenant gets **"Extension Approved till 10th by owner"**. | Owner sees extension request in collection hub; clicking approve sends silent confirmation to tenant. | 🔔 **YES** (on Approval) |
| **3** | **Maintenance Ticket Lifecycle** | **Two-Way** | Tenant raises ticket (e.g. tap leak, geyser down). When marked resolved, tenant gets **"Ticket #104 Marked Resolved"**. | Owner/warden receives new ticket with room number. Resolving it notifies tenant automatically. | 🔔 **YES** (on Resolved) |
| **4** | **30-Day Move-Out & Deposit Refund** | **Two-Way** | Tenant submits move-out notice. Owner gets exit date to refill the bed. When deposit is refunded, tenant gets **"Deposit refund of ₹X processed"** with UTR. | Owner receives 30-day vacate notice in pipeline. On checkout, owner enters deduction/refund info. | 🔔 **YES** (on Refund) |
| **5** | **Rain Alert (Terrace Laundry)** | **Owner ➔ All Beds** | Every tenant in the building gets an urgent alert: *"Sudden rain starting! Please collect clothes from terrace."* | Owner or warden taps 1-tap **"Send Rain Alert"** button on dashboard when rain starts. | 🔔 **YES** (Urgent Ding) |
| **6** | **Owner Broadcast Announcements** | **Owner ➔ All Beds** | Appears as a top banner ding and pins to the in-app **Notice Board** (e.g. tank cleaning, power cut, gate curfew). | Owner types title & message in **+ New Announcement** and taps **Broadcast**. | 🔔 **YES** (Soft Ding) |

---

## 🚫 3. WHAT WE DELIBERATELY EXCLUDED (AND WHY)

1. **Washing Machine Booking / Blocking Alerts (EXCLUDED)**:
   * Real Indian PGs do not have IoT smart washing machines. Manual booking in an app adds unnecessary friction that tenants bypass in real life.
2. **Per-Room Maid Cleaning Tracking (EXCLUDED)**:
   * Maids clean on fixed schedules (e.g. alternate days). Tracking individual broom sweeps per bed in the app is unnecessary bloat. Announcements cover floor-wide schedules cleanly.
3. **Daily Food Menu Pings (EXCLUDED)**:
   * Daily breakfast/lunch/dinner menus stay passively in the **Food Menu Tab** without vibrating phones 3 times a day.

---

## ⚡ 4. LEAN TECHNICAL PIPELINE (ZERO CUSTOM SERVERS)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    URBANSTAY REALTIME NOTIFICATION PIPELINE                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. TRIGGER                                                                  │
│    • Owner clicks "Approve Payment", "Accept Notice", or "Send Rain Alert"  │
│    • Inserts 1 row into Supabase: `public.notifications`                   │
│                                                                             │
│ 2. DELIVERY (<100ms via Supabase WebSockets)                                │
│    • Supabase Realtime pushes payload directly to connected Flutter apps    │
│    • ZERO backend cron jobs or custom servers required                      │
│                                                                             │
│ 3. PRESENTATION (Mobile App)                                                │
│    • Plays soft audio ding (`SystemSound.play` or alert asset)              │
│    • Slides down executive green top banner (`UrbanStayNoticeBanner`)       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ 5. MINIMALIST SUPABASE SCHEMA (`public.notifications`)

```sql
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE, -- NULL = Broadcast to ALL beds in PG
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'GENERAL', -- 'RENT_APPROVED', 'RENT_EXTENSION', 'TICKET_RESOLVED', 'MOVE_OUT', 'RAIN_ALERT', 'ANNOUNCEMENT'
    has_sound BOOLEAN NOT NULL DEFAULT true,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Fast index lookups
CREATE INDEX IF NOT EXISTS idx_notifications_tenant ON public.notifications(tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_property ON public.notifications(property_id, created_at DESC);
```
