# Extroverts (Nubpack) - Frontend Signup Wizard Replication

A high-fidelity, accessible, and responsive multi-step signup wizard replicated from the **Extroverts** mobile app (`com.pro.nubpack`). Built as a pure frontend solution with progressive disclosure, robust real-time validation, responsive layouts, and modern UX patterns.

---

## 🌟 Key Features & Requirements Met

### 1. Progressive Disclosure (Multi-Step Flow)
* **Step 0 — Landing & Authentication Trigger:** Clean hero interface with brand identity, Terms & Conditions modal viewer, and email entry validation.
* **Step 1 — Email Verification (OTP):** Dedicated 4-box auto-advancing OTP input with countdown timer (30s), simulated backend verification, and invalid attempt handling.
* **Step 2 — Basic Identity & Age Guard:** First name, last name, and date of birth input with a strict **`< 18 years old` gatekeeper rule** that provides real-time warning feedback.
* **Step 3 — Campus Location (Cross-Field Logic):** State selection dynamically filters and populates associated colleges/universities.
* **Step 4 — Preferences & Profile Completion:** Interactive multi-select tags with instant toggle state and loading spinner on submission to prevent duplicate clicks.
* **Step 5 — Celebration / Success Screen:** Confirmation state with profile summary and one-click reset.

### 2. Form Validation & UX Edge Cases Handled
* **Regex Email Validation:** Detects malformed emails and whitespace-only submissions before proceeding.
* **Auto-Focusing OTP Boxes:** Automatically advances cursor to the next cell upon digit entry.
* **Under-18 Hard Stop:** Calculates age based on the current date and blocks progression with an inline helper message.
* **State Persistence on Back Navigation:** Top-bar back arrow allows users to revisit earlier steps without losing entered information.
* **Subtle Loading Feedback:** Buttons trigger simulated async delays (`800ms - 1200ms`) with spinner indicators to emulate server communication.

---

## 🛠️ Tech Stack

* **Framework:** React 18 / 19 (via Vite)
* **Styling:** Tailwind CSS (configured with Google Font `Poppins`)
* **Icons:** `lucide-react`
* **Language:** JavaScript / JSX

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### Installation

1. **Clone or navigate into the project directory:**
   ```bash
   cd signup-wizard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## 🔑 Demo Credentials & Simulation Notes

Since this is a client-side frontend project without a live SMS/email backend service:
* **Demo OTP Code:** `1234`
* Any valid email format (e.g. `alex@stanford.edu`) will pass initial verification.
* Any date of birth setting age `< 18` (e.g., year 2012) will trigger the age guard error. Set birth year to 2004 or earlier to proceed.

---

## 📱 Responsive Testing

The layout is built mobile-first and scales cleanly across all device viewports:
* **Mobile:** Optimized touch targets (minimum 44px) and thumb-friendly form controls.
* **Tablet & Desktop:** Centered modern card container with glassmorphic depth and balanced padding.

To test across breakpoints in Chrome/Firefox/Safari:
1. Press `F12` or `Ctrl + Shift + I` (`Cmd + Option + I` on macOS) to open Developer Tools.
2. Toggle the Device Toolbar (`Ctrl + Shift + M` / `Cmd + Shift + M`).
3. Select presets like iPhone 14, Pixel 7, iPad, or Responsive Desktop.

---