# SkillForge AI — Modern E-Learning Platform

A modern, responsive e-learning platform website featuring a clean UI/UX design, Two-Step Verification (2FA), an intelligent AI Tools Scanner, an interactive Courses Dashboard & Classroom, and verifiable Certificates of Completion.

---

## 🌟 Key Features & Architectural Modules

### 1. Landing / Home Page
- **Hero Section**: High-impact headline about learning modern skills, animated pulse indicators, primary CTAs (*"Explore Courses"* & *"⚡ AI Tools Scanner"*), and live metrics (*45,000+ Learners, 120+ Curated Labs, 98.7% Satisfaction, 4.95/5 Rating*).
- **Navigation Bar**: Sticky backdrop-blurred navbar with quick navigation to **Home**, **Courses**, **AI Tools Scanner**, **Dashboard**, **About Us**, Dark/Light Theme toggle, and 2FA Login/Sign Up controls. Fully responsive with mobile hamburger drawer menu.
- **Featured Flagship Courses**: Interactive cards showcasing category tags, duration, module count, instructor bio, star ratings, and instant *"Syllabus"* & *"Enroll Free"* actions.
- **Value Propositions & Testimonials**: Highlights interactive video classrooms, 2FA security, verified credentials, and real student reviews.

### 2. Authentication & Two-Step Verification (2FA / OTP)
- **Multi-Step Security**:
  1. **Step 1**: Credentials verification (email & password) with input validation.
  2. **Step 2 (2FA Flow)**: Dispatches a simulated 6-digit OTP code to the user's masked email address.
- **6-Digit OTP UI**:
  - Individual digit input boxes with auto-advance, backspace handling, and multi-digit paste support.
  - Live 60-second expiration countdown timer with *"Resend Code"* capability.
  - Visual *"Demo Simulation Code"* helper pill for one-click instant population.
  - Shake animation on invalid code entry; celebration confetti and immediate redirection upon verification.
- **Session Persistence**: Stored via `localStorage` for persistent logins across browser refreshes.

### 3. AI Tools Scanner Feature
- **Intelligent Workflow Scanner**:
  - Natural language input bar allowing users to enter goals (e.g. *"Full-stack React UI generator"*, *"Transcribe meetings"*).
  - Neural scanning animation with an instant **Diagnostic Match Report**:
    - Compatibility Match Score (e.g., *98% Match*)
    - Recommended Primary Tool & Paired Secondary Tool
    - Benchmark diagnostics (*Speed Score, Setup Ease, API Readiness, Security Grade A+ SOC2*)
    - Recommended Platform Course link to learn that exact stack!
- **Categorized Directory**:
  - Filter by Utility: **Coding & Dev**, **Design & 3D**, **Productivity**, **Writing & Content**, **Video & Audio**, **Research & Data**.
  - Filter by Pricing: **All**, **Free**, **Freemium**, **Paid**.
  - Real-time instant search bar.
  - Interactive Tool Cards with bookmarking (persisted), official website launch links, and detailed AI analysis modals.

### 4. Courses Dashboard (Post-Login)
- **User Learning Hub**:
  - Welcome banner with user avatar, name, daily streak (*🔥 14 Days*), and experience points (*⚡ 2,840 pts*).
  - Metrics Grid: Enrolled Courses, Hours Learned, Lessons Finished, and Verified Credentials.
  - Filter enrolled programs: **All**, **In Progress**, **Completed**.
  - Interactive progress bars showing exact percentage and module counts.

### 5. Interactive Classroom & Tutorial Player
- **Working Video Player Integration**:
  - Functional, responsive 16:9 player embedded directly in the lesson viewing area.
  - Dual stream modes: **🎬 HTML5 Player** (with verified, high-speed MP4 sources) and **🎥 YouTube Tech Stream** (curated HD educational video embeds).
  - Standard HTML5 video controls (`play`, `pause`, `volume`, `fullscreen`, `seek scrubber`) plus custom quick-action controls: -10s / +10s skip, speed adjustment (*0.75x, 1x, 1.25x, 1.5x, 2.0x*), and responsive play overlays.
- **Dynamic Lesson Switching**:
  - Clicking any lesson from the right-side Course Curriculum sidebar dynamically updates the video player source, poster, lesson title, module badge, and duration without blanking out or flickering.
  - Bottom tabs (Lesson Notes, Interactive Quiz, Downloads, Q&A) update synchronously to reflect the newly active lesson.
- **Interactive Completion Checkmarks**:
  - Each lesson in the curriculum sidebar features an interactive checkmark button.
  - Clicking the checkmark directly marks the lesson as complete or incomplete, updating progress bars and XP dynamically.
  - Smooth **"← Previous Lesson"**, **"Next Lesson →"**, and **"✓ Mark Complete & Next →"** navigation controls.
- **Multi-Format Tutorials**: Video lessons, in-depth reading architecture labs with syntax-highlighted code blocks, and interactive knowledge quizzes with instant scoring and explanations.
- **Modular Curriculum Accordion**: Navigate between modules and lessons on the fly; checkmarks update dynamically.
- **Interactive Tabs**:
  - *Lesson Notes & Architecture*
  - *Knowledge Check Quiz (+50 XP)*
  - *Downloadable Code & Cheat Sheets*
  - *Community Q&A Discussion*

### 6. Course Completion & Certification
- **Conditional Unlock**: Certificates remain locked with progress indicators until all modules reach 100% completion.
- **High-Resolution Credential**:
  - Guilloche ornamental borders, metallic gold seal, student name, course title, CPE verification badge, and instructor signatures.
  - Unique Cryptographic Credential ID (e.g., `CERT-SF26-AI-ENG-84K9P1`).
- **Export & Sharing Tools**:
  - **Print / Save as PDF**: Formatted with specialized `@media print` rules for clean, borderless Letter/A4 landscape prints.
  - **Copy Credential Link**: Shareable verification URL copied to clipboard.
  - **Add to LinkedIn**: One-click sharing integration.
  - **Edit Recipient Name**: Modify certificate name live for printing preferences.

---

## 🚀 How to Run the Website

SkillForge AI is built with zero external build dependencies. You can open and run it directly in any modern web browser:

1. Double-click [index.html](file:///c:/Users/bchai/OneDrive/Desktop/E-Learning/index.html) or right-click and choose **Open with Google Chrome / Microsoft Edge / Firefox**.
2. Or open via PowerShell:
   ```powershell
   Start-Process index.html
   ```

---

## 🔑 Demo Credentials

To experience the Two-Step Verification (2FA) and Courses Dashboard immediately:

- **Email**: `alex.morgan@skillforge.ai`
- **Password**: `password123`
  *(Or click "💡 Click here to Auto-Fill Demo Account" on the Login modal)*
- **2FA OTP Code**: Displayed directly on screen in the demo helper banner (e.g. `482915`), or click the pill to auto-fill all 6 inputs instantly.

---

## 📁 Project Structure

```
E-Learning/
├── index.html                   # Single-Page Application (SPA) shell & semantic views
├── README.md                    # Project documentation & feature manual
├── css/
│   ├── main.css                 # Master typography, glassmorphism, glow effects, animations
│   ├── player.css               # Custom video player & visualizer stylesheet
│   └── certificate.css          # Certificate Guilloche frame, gold seal, and print rules
├── js/
│   ├── courses-data.js          # Curated courses, modules, lessons, notes, and quiz datasets
│   ├── ai-tools-data.js         # Curated AI tools categorized across 6 utilities
│   ├── auth.js                  # Authentication engine & 2FA OTP simulation
│   ├── dashboard.js             # User enrollment tracking and progress calculations
│   ├── classroom.js             # Classroom tutorial player, video controls, and quizzes
│   ├── certificate.js           # Certificate modal, printing engine, and credential hashes
│   ├── ai-scanner.js            # AI tools scanner, category filters, and live matchmaker
│   └── app.js                   # Application coordinator, routing, theme, and modals
└── assets/                      # Media assets, icons, and screenshots
```

