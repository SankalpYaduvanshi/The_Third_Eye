# 🛵 The Third Wheel

> **Hyperlocal Vehicle Rental Platform for College Students**
> 
> A full-stack frontend application that connects college students with nearby bike and car rental shops. Think Zomato, but for vehicle rentals near campuses.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5-orange)

---

## 🎯 Overview

The Third Wheel is a **two-sided marketplace** with:

1. **Student App** — Browse vehicles near campus, book in seconds, track rides live, and earn loyalty rewards.
2. **Vendor Dashboard** — Manage fleet inventory, handle bookings with OTP verification, track earnings with rich analytics, and monitor geofence alerts.

All data is **mock/simulated** — no real backend required. Every flow is fully demonstrable end-to-end.

---

## ✨ Features

### 🎓 Student Side

| Feature | Description |
|---------|-------------|
| **Landing Page** | Premium hero with gradient backgrounds, 3-step how-it-works, feature grid, stats, and footer |
| **Auth Flow** | Multi-step signup with college ID drag-and-drop upload + simulated verification |
| **Browse** | Search, filter by type/price/distance, sort by rating/price/popularity |
| **Vehicle Detail** | Photo area, 4 pricing models (hourly/half-day/full-day/per-km), 7-day availability calendar |
| **Booking** | Instant booking with OTP generation for vendor pickup |
| **Active Ride** | Live fare meter, kilometer counter, elapsed timer, simulated map tracking |
| **Return Flow** | 4-step process: odometer photo → return OTP → fare summary → payment |
| **Trip History** | Date-filtered list of past rides with ratings and costs |
| **Profile** | Loyalty tier progress (Bronze→Platinum), referral code, edit form |

### 🏪 Vendor Side

| Feature | Description |
|---------|-------------|
| **Dashboard** | 4 stat cards, active bookings list, vehicle status overview, quick actions |
| **Inventory** | Vehicle cards with search, type/status filters, availability toggle, CRUD operations |
| **Vehicle Form** | Add/edit with full details: pricing, features chips, photo upload |
| **Bookings** | Tabbed view (upcoming/active/past) with OTP verification modal |
| **Analytics** | Recharts-powered: revenue trend, rides donut, peak hours bar chart, trend lines |
| **Geofence Alerts** | Severity-coded alert cards with acknowledge/dismiss actions |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| **Routing** | React Router v7 |
| **State Management** | Zustand |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Fonts** | Inter (Google Fonts) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # StudentLayout, VendorLayout, Navbar, Sidebar
│   └── ui/              # Button, Card, Input, Badge, Modal, Spinner, etc.
├── hooks/               # useFareMeter, useGeofence, useOTP
├── mock/                # vehicles, vendors, students, bookings, analytics
├── pages/
│   ├── student/         # Landing, Login, Signup, Browse, VehicleDetail, etc.
│   └── vendor/          # Dashboard, Inventory, VehicleForm, Bookings, etc.
├── stores/              # authStore, vehicleStore, bookingStore, vendorStore
├── utils/               # fareCalculator, formatters, validators, otpGenerator
├── index.css            # Design tokens + animations
└── main.jsx             # Router configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/the-third-wheel.git
cd the-third-wheel

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Demo Credentials

### Student Login
| Field | Value |
|-------|-------|
| Email | `arjun@student.vit.ac.in` |
| Password | `student123` |

### Vendor Login
| Field | Value |
|-------|-------|
| Email | `sneha@quickridehub.com` |
| Password | `vendor123` |

---

## 🗺️ Route Map

### Student Routes

| Route | Page |
|-------|------|
| `/` | Landing Page |
| `/login` | Student Login |
| `/signup` | Student Signup |
| `/browse` | Browse Vehicles |
| `/vehicle/:id` | Vehicle Detail |
| `/booking/:id` | Booking Confirmation |
| `/ride` | Active Ride (live tracking) |
| `/return` | Return Vehicle |
| `/trips` | Trip History |
| `/profile` | Student Profile |

### Vendor Routes

| Route | Page |
|-------|------|
| `/vendor/login` | Vendor Login |
| `/vendor/signup` | Vendor Signup |
| `/vendor/dashboard` | Dashboard |
| `/vendor/inventory` | Inventory Management |
| `/vendor/vehicle/new` | Add Vehicle |
| `/vendor/vehicle/:id/edit` | Edit Vehicle |
| `/vendor/bookings` | Manage Bookings |
| `/vendor/analytics` | Earnings & Analytics |
| `/vendor/geofence` | Geofence Alerts |

---

## 🎨 Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-800` | `#1E3A8A` | Primary brand blue |
| `accent-500` | `#F97316` | Accent orange (CTAs, highlights) |
| `success` | `#22C55E` | Available states, confirmations |
| `error` | `#EF4444` | Error states, danger actions |
| `warning` | `#EAB308` | Pending states, alerts |

### Animations

- `animate-fade-in` — Smooth entry with opacity + translateY
- `animate-fade-in-up` — Entry from below (24px)
- `animate-scale-in` — Scale from 0.95 to 1
- `animate-shimmer` — Skeleton loading effect
- `animate-bounce-subtle` — Floating badges
- `stagger-children` — Sequential child animations
- `hover-lift` — Card hover with elevation
- `glass` / `glass-dark` — Glassmorphism overlays

---

## 🔄 State Management

Four Zustand stores power the application:

- **`authStore`** — Authentication, role switching (student/vendor), loyalty points
- **`vehicleStore`** — Vehicle CRUD, availability (merges `manualOverride` + `bookingBlocks`)
- **`bookingStore`** — Booking lifecycle (create → pickup OTP → active → return OTP → complete)
- **`vendorStore`** — Geofence alerts, earnings aggregation, analytics data

---

## 📊 Key Business Logic

### Pricing Models
- **Hourly** — Pay per hour used
- **Half Day** — Flat rate for 6 hours
- **Full Day** — Flat rate for 12 hours
- **Per KM** — Distance-based pricing

### Fare Calculation
- Base fare calculated from pricing model
- GST at 12% applied
- Live fare meter runs during active rides
- Refundable deposit collected at booking

### Loyalty Tiers
| Tier | Points | Benefits |
|------|--------|----------|
| Bronze | 0-499 | Base rewards |
| Silver | 500-1499 | 5% discount |
| Gold | 1500-2999 | 10% discount + priority |
| Platinum | 3000+ | 15% discount + VIP |

---

## 📱 Responsive Design

- **Mobile-first** approach throughout
- Collapsible sidebar → bottom nav on vendor dashboard
- Touch-friendly targets (44px minimum)
- Safe area padding for notched devices
- Custom scrollbars

---

## 📄 License

MIT License. Built with ❤️ for college students.
