# 🏢 UrbanStay Owner Knowledge Transfer: Setup & Property Structure
**Feature Folder**: `mobile_app/lib/features/owner_setup/`  
**Primary File**: `presentation/screens/owner_setup_screen.dart` (4,262 lines)

---

## 1. Purpose of the Screen
`owner_setup_screen.dart` is the 4-Step Onboarding Wizard where a PG Owner (like Arun) sets up a new property from scratch or adds an additional branch in Scale Mode. It collects building details, floor/room count, bed sharing types, rent pricing, stay rules, and direct bank UPI configuration.

---

## 2. Actual Code State Variables & Controllers

### Step 1: Onboarding Mode
* `int _currentStep`: Active wizard step (1 to 4).
* `bool isScaleMode`: If `true`, pre-populates default 4 floors & 2-sharing rooms for rapid onboarding.

### Step 2: Property & Geo Info
| Code Variable | Type | Real Usage / Validation |
| :--- | :--- | :--- |
| `_pgBrandNameController` | `TextEditingController` | Property Name (e.g., "UrbanStay Luxury PG") |
| `_genderCategory` | `String?` | `'Gents'`, `'Ladies'`, `'Coliving'` |
| `_propertyStructure` | `String?` | `'Standard PG'`, `'Apartment Units'` |
| `_streetAddressController` | `TextEditingController` | Door #, Cross, Main Road |
| `_areaLocalityController` | `TextEditingController` | Locality (e.g., "BTM 2nd Stage", "HSR Sector 3") |
| `_landmarkController` | `TextEditingController` | Landmark (e.g., "Near Udupi Garden") |
| `_selectedState` / `_stateController` | `String` / `TextEditingController` | State (dynamically fetched from GitHub Geo API) |
| `_selectedCity` / `_cityController` | `String` / `TextEditingController` | City/District (guarded by state selection) |
| `_pincodeController` | `TextEditingController` | 6-digit PIN code (`_pincodeResolved = code.length == 6`) |
| `_mapsUrlController` | `TextEditingController` | Google Maps location URL for directions |
| `_liftCount` | `String?` | Number of lifts (`'1'`, `'2'`, etc.) |
| `_powerBackup` | `String?` | `'Full Backup'`, `'Basic (Lights & Fans)'`, `'None'` |

### Step 3: Floor, Room & Rent Matrix
| Code Variable | Type | Real Usage / Validation |
| :--- | :--- | :--- |
| `_groundFloorHasRooms` | `bool?` | Whether Ground Floor has resident rooms |
| `_gfRoomsCountController` | `TextEditingController` | Number of rooms on Ground floor |
| `_floorCount` | `String?` | Total floors (e.g. `'3'`, `'4'`, `'5'`) |
| `_roomsEachFloorController` | `TextEditingController` | Default room count per floor |
| `_floorRoomsControllers` | `Map<String, TextEditingController>` | Custom room count override per floor |
| `_selectedSharings` | `List<String>` | `['1-Share', '2-Share', '3-Share', '4-Share']` |
| `_sharingAssignedRooms` | `Map<String, List<String>>` | Which rooms belong to which sharing (e.g. `'2-Share': ['101', '102']`) |
| `_rentControllers` | `Map<String, TextEditingController>` | Rent per bed per sharing type (e.g. `'2-Share' -> 8500`) |
| `_depositControllers` | `Map<String, TextEditingController>` | Security deposit per bed (e.g. `'2-Share' -> 15000`) |
| `_dueDay` | `String?` | Rent due date each month (e.g. `'5th'`) |
| `_gracePeriod` | `String?` | Grace days before late fee (e.g. `'5 Days'`) |
| `_lateFee` | `String?` | Late fee amount (e.g. `'₹200'`) |
| `_noticePeriod` | `String?` | Move-out notice requirement (e.g. `'30 Days'`) |

### Step 4: 0% Direct Bank UPI Settlement
| Code Variable | Type | Real Usage / Validation |
| :--- | :--- | :--- |
| `_bankHolderNameController`| `TextEditingController` | Account Holder Legal Name (e.g. "Arun Kumar") |
| `_bankNameController` | `TextEditingController` | Selected Bank (from 32 major Indian banks modal) |
| `_upiIdController` | `TextEditingController` | Direct UPI VPA (e.g. `arun@okhdfcbank` or `urbanstay@sbi`) |
| `_creditingPhoneController`| `TextEditingController` | Bank linked mobile number |
| `_qrAttached` | `bool` | Whether owner attached their personal UPI QR image |
| `_generatedPropertyCode` | `String` | Unique 6-character PG Code (e.g. `AR-101`) generated on completion |

---

## 3. The Shared Link (Sync with Tenant Side)

```
┌──────────────────────────────────────────────┐
│ OWNER SETUP (owner_setup_screen.dart)        │
│ • _generatedPropertyCode ("AR-101")          │
│ • _pgBrandNameController ("UrbanStay PG")    │
│ • _upiIdController ("arun@okhdfcbank")       │
│ • _sharingAssignedRooms (Floor/Room mapping) │
│ • _rentControllers (Rent per bed)            │
│ • _depositControllers (Deposit per bed)      │
└──────────────────────┬───────────────────────┘
                       │ SHARED FOREIGN KEYS & SYNC
                       ▼
┌──────────────────────────────────────────────┐
│ TENANT CHECK-IN & PAYMENTS                   │
│ • tenant_checkin_screen.dart:                │
│   Uses `_pgCode` to fetch property details.  │
│   Populates floor & room dropdowns.          │
│ • rent_payment_screen.dart:                  │
│   Renders `ownerUpiId` directly for 0% UPI.  │
│   Displays exact monthly rent set by owner.  │
│ • profile_settings_screen.dart:              │
│   Shows property name and address set here.  │
└──────────────────────────────────────────────┘
```
