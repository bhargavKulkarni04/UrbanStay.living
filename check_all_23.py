import urllib.request
import urllib.error
import json
import sys

API_KEY = "sb_publishable_MrTSiJiEUwHgohXS6jpXPQ_3QWlpV1x"
BASE_URL = "https://unkwhlpboyumsykhgoqx.supabase.co/rest/v1"

tables = [
    "announcements",
    "beds",
    "damage_deductions",
    "expenses",
    "food_menus",
    "housekeeping_requests",
    "leads",
    "maintenance_tickets",
    "move_out_notices",
    "onboarding_requests",
    "payment_approvals",
    "profiles",
    "properties",
    "property_settings",
    "property_team",
    "rent_extensions",
    "rent_ledgers",
    "rooms",
    "saas_invoices",
    "saas_subscriptions",
    "staff",
    "tenants",
    "warden_cash_collections"
]

def check_col_raw(table, col):
    url = f"{BASE_URL}/{table}?select={col}&limit=0"
    req = urllib.request.Request(url, headers={
        "apikey": API_KEY,
        "Authorization": f"Bearer {API_KEY}"
    })
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status == 200
    except urllib.error.HTTPError:
        return False
    except Exception:
        return False

def check_col(table, col):
    if table == "properties" and col == "property_id":
        return True
    if table == "tenants" and col == "tenant_name":
        return check_col_raw(table, "tenant_name") or check_col_raw(table, "name")
    if table == "onboarding_requests" and col == "room_number":
        return check_col_raw(table, "room_number") or check_col_raw(table, "requested_room")
        
    return check_col_raw(table, col)

print(f"{'#':<3} | {'Table Name':<25} | {'property_id':<11} | {'property_name':<13} | {'room_number':<11} | {'tenant_name':<11} | {'Status':<10}")
print("-" * 88)

for i, t in enumerate(tables, 1):
    pid = "YES" if check_col(t, "property_id") else "NO"
    pname = "YES" if check_col(t, "property_name") else "NO"
    rnum = "YES" if check_col(t, "room_number") else "NO"
    tname = "YES" if check_col(t, "tenant_name") else "NO"
    
    # Ready if it has building isolation
    if t in ["profiles", "leads"]:
        status = "INFO"
    elif pid == "YES" and pname == "YES":
        status = "READY"
    else:
        status = "MISSING"

    print(f"{i:<3} | {t:<25} | {pid:<11} | {pname:<13} | {rnum:<11} | {tname:<11} | {status:<10}")
