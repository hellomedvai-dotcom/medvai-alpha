# MEDVAI Alpha — Architectural & Technical Project Guide

This guide provides a comprehensive overview of the **MEDVAI Alpha** repository structure, frontend components, state management, backend APIs, workflows, build environment, and key dependencies.

---

## 1. Project Structure & Directory Overview

```
├── public/                     # Static assets served directly by Vite
│   └── models/
│       ├── human.glb           # 3D Human Mesh Asset (GLTF/GLB)
│       ├── glass-human-front.png # 2D Front Anatomical Overlay Image
│       └── glass-human-back.png  # 2D Back Anatomical Overlay Image
├── src/                        # Main React application source directory
│   ├── components/             # Reusable UI components & section components
│   │   ├── ApplicationModal.tsx# Interactive multi-step job application modal
│   │   ├── BuiltForPatientsAndPros.tsx # Section comparing patient & pro workflows
│   │   ├── ContactSection.tsx  # General inquiry/contact form component
│   │   ├── CustomCursor.tsx    # Custom ring cursor component
│   │   ├── EmotionalEnding.tsx # Mission closing statement component
│   │   ├── Footer.tsx          # Site footer links and copyright
│   │   ├── FounderSection.tsx  # Founder ethos and background
│   │   ├── GlassHumanModel.tsx # Three.js/R3F 3D model canvas renderer
│   │   ├── Hero.tsx            # Hero section with interactive 3D model toggle & CTA
│   │   ├── HowMedvaiWorks.tsx  # Workflow step-by-step feature section
│   │   ├── HumanModel.tsx      # Main 2D SVG Interactive Body Map & Triage Engine
│   │   ├── InteractiveDemo.tsx # Live AI intelligence demos (conversation, reasoning, brief)
│   │   ├── IntroAnimation.tsx  # 3-second opening animation sequence
│   │   ├── JoinMedvai.tsx     # Opportunities grid & application trigger
│   │   ├── MedicalDisclaimer.tsx# Regulatory disclaimer section
│   │   ├── Navbar.tsx          # Floating header navigation & theme switcher
│   │   ├── OSCarouselFeature.tsx# OS showcase carousel
│   │   ├── ProblemSection.tsx  # Problem statement section
│   │   ├── SecuritySection.tsx # Technical security pillars
│   │   ├── SpatialGlassCard.tsx# Reusable glassmorphic card container
│   │   ├── Storytelling.tsx    # Storytelling flow component
│   │   ├── UncompromisingTrust.tsx # Trust and privacy credentials section
│   │   ├── WaitlistSection.tsx # Priority Access waitlist submission form
│   │   └── WhyMedvaiExists.tsx # Mission overview section
│   ├── App.tsx                 # Root component orchestrating page layout & theme state
│   ├── env.d.ts                # TypeScript Vite environment variable declarations
│   ├── index.css               # Global CSS stylesheet (Tailwind directives & glass styling)
│   ├── main.tsx                # Client-side DOM mounting entry point
│   └── types.ts                # Application TypeScript interfaces & type definitions
├── .env.example                # Template for environment variables (GEMINI_API_KEY, etc.)
├── index.html                  # HTML entry point for Vite build
├── server.ts                   # Node.js Express server handling API routes and Vite SSR/static hosting
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite bundler configuration
├── package.json                # Project dependencies, scripts, and metadata
└── google-apps-script.gs       # Google Apps Script reference for sheet submission handling
```

---

## 2. Navigation Flow & Page Architecture

MEDVAI Alpha is structured as a single-page application (SPA) with smooth anchor scrolling and modal overlays.

### Main Layout (`src/App.tsx`)
- **Theme Management**: State `theme` (`'dark' | 'light'`) controls global body styling classes (`bg-black` vs `spatial-light-bg`).
- **Intro Animation**: `IntroAnimation` displays a full-screen 3-second opening animation before hiding itself.
- **Floating Header (`src/components/Navbar.tsx`)**:
  - Contains navigation links (`#why-medvai`, `#how-it-works`, `#interactive-demo`, `#security`, `#careers`).
  - Toggle button for switching dark/light themes.
  - "Get Priority Pass" CTA button that invokes smooth scrolling (`scrollToWaitlist`) to `#waitlist`.
- **Main Section Flow (`src/App.tsx`)**:
  1. `Hero` (`src/components/Hero.tsx`) — Floating workspace preview & 3D/2D digital twin toggle.
  2. `ProblemSection` (`src/components/ProblemSection.tsx`)
  3. `WhyMedvaiExists` (`src/components/WhyMedvaiExists.tsx`)
  4. `HowMedvaiWorks` (`src/components/HowMedvaiWorks.tsx`)
  5. `OSCarouselFeature` (`src/components/OSCarouselFeature.tsx`)
  6. `InteractiveDemo` (`src/components/InteractiveDemo.tsx`) — Live interactive AI demos.
  7. `BuiltForPatientsAndPros` (`src/components/BuiltForPatientsAndPros.tsx`)
  8. `UncompromisingTrust` (`src/components/UncompromisingTrust.tsx`)
  9. `SecuritySection` (`src/components/SecuritySection.tsx`)
  10. `FounderSection` (`src/components/FounderSection.tsx`)
  11. `JoinMedvai` (`src/components/JoinMedvai.tsx`) — Open roles & application modal launcher.
  12. `EmotionalEnding` (`src/components/EmotionalEnding.tsx`)
  13. `WaitlistSection` (`src/components/WaitlistSection.tsx`) — Early access email sign-up.
  14. `ContactSection` (`src/components/ContactSection.tsx`)
  15. `MedicalDisclaimer` (`src/components/MedicalDisclaimer.tsx`)
  16. `Footer` (`src/components/Footer.tsx`)

---

## 3. Priority Access / Waitlist Flow

- **Component Path**: `src/components/WaitlistSection.tsx`
- **Trigger**: User inputs email in `#waitlist` section or clicks "Get Priority Pass" in `Navbar` or "Reserve Pass" in `Hero`.
- **Submission Workflow**:
  1. User enters an email address into the input field.
  2. Clicking "Join Priority Waitlist" triggers `handleSubmit`.
  3. The handler checks `import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL`.
  4. Formats a payload:
     ```json
     {
       "submissionType": "Priority Access",
       "email": "user@example.com",
       "timestamp": "2026-10-13T08:16:55.000Z"
     }
     ```
  5. Performs an HTTP `POST` fetch to `VITE_GOOGLE_SHEETS_SCRIPT_URL` with `Content-Type: text/plain;charset=utf-8`.
  6. Upon receiving `{ "success": true }`, displays the success confirmation screen ("You are on the priority waitlist!").
  7. *Note on local backend endpoint*: `server.ts` also defines a `/api/waitlist` express endpoint, but the frontend currently submits directly via fetch to `VITE_GOOGLE_SHEETS_SCRIPT_URL`.

---

## 4. Opportunities & Job Application Flow

- **Component Paths**:
  - `src/components/JoinMedvai.tsx`
  - `src/components/ApplicationModal.tsx`
- **Workflow**:
  1. `JoinMedvai.tsx` renders a grid of 6 open founding roles (`Founding AI Engineer`, `Founding Full Stack Engineer`, `Founding Product Designer`, `Clinical Advisor`, `Content & Community`, `Video Editor`).
  2. Clicking "Apply" on any role sets `selectedRoleTitle` and opens `ApplicationModal`.
  3. **Multi-Step Assessment Modal (`ApplicationModal.tsx`)**:
     - **Step 0**: Welcome screen introducing the founder conversation.
     - **Step 1**: Candidate details form (Full Name, Email, LinkedIn, GitHub, Portfolio, Resume link).
     - **Steps 2 to 16**: Sequential questions covering candidate background, motivation, technology stack, problem-solving, and availability. (Tailored flow for `Video Editor` role has 7 questions; other roles have 15 questions).
     - **Step 17 (Confirmation Step)**: Submits payload to `VITE_GOOGLE_SHEETS_SCRIPT_URL` with `submissionType: "Job Application"`.
     - *Backup storage*: Saves application data locally into `localStorage.getItem('medvai_submitted_apps')`.

---

## 5. Body Map Feature Architecture

The Body Map (Digital Health Twin) is a core protected feature enabling interactive anatomical exploration and preliminary clinical triage guidance.

### Associated Files & Component Hierarchy
- **Main Engine Component**: `src/components/HumanModel.tsx`
- **3D Canvas Component**: `src/components/GlassHumanModel.tsx`
- **3D Model Asset**: `public/models/human.glb`
- **2D Overlay Asset Files**:
  - `public/models/glass-human-front.png`
  - `public/models/glass-human-back.png`
- **Embedded Usage Locations**:
  - `src/components/Hero.tsx` (Renders `HumanModelContainer` in interactive mode).
  - `src/components/InteractiveDemo.tsx` (References Body Map in decision journey map).

### Anatomical Regions & State
`BODY_REGIONS` defined in `src/components/HumanModel.tsx`:
1. `head` ("Head & Brain")
2. `chest` ("Chest & Heart")
3. `abdomen` ("Abdomen & Gut")
4. `spine` ("Spine & Back")
5. `arms` ("Shoulders & Arms")
6. `legs` ("Hips & Legs")

### Front / Back Views & Interaction Engine
- **2D Vector Figure (`AnatomicalSVGFigure`)**:
  - Built with custom SVG paths over anatomical silhouette images (`glass-human-front.png` and `glass-human-back.png`).
  - View state (`'front' | 'back'`) toggles between front and back anatomical layers.
  - Hovering or clicking SVG paths highlights sub-structures (e.g. `heart`, `upper_abdomen`, `lower_back`, `knee`) and updates the active region.
- **3D WebGL Model (`GlassHumanModel`)**:
  - Uses `@react-three/fiber` and `@react-three/drei` (`useGLTF`).
  - Loads `public/models/human.glb`.
  - Applies a custom glass-like material (`THREE.MeshPhysicalMaterial` with `transmission: 0.9`, `clearcoat: 1`, `roughness: 0.1`, `ior: 1.5`).
- **Interactive Question Panel (`REGION_QUESTIONS`)**:
  - Maps each region (`head`, `chest`, `abdomen`, etc.) to a 3-step decision question tree.
  - Options classify risk levels as `'low'`, `'moderate'`, or `'emergency'`.
  - Selecting an `'emergency'` option immediately triggers an urgent red flag callout advising emergency medical care.

---

## 6. Backend Services, APIs, and Configuration

### Express Node Server (`server.ts`)
The project uses Express (`server.ts`) both as an API server and as a middleware layer for Vite in development or serving static files in production (`dist/`).

#### Endpoints
- `GET /api/health` — Server status check.
- `POST /api/waitlist` — In-memory waitlist entry tracking endpoint.
- `POST /api/translate-report` — Translates medical reports into plain language using Google Gemini AI (`@google/genai`). Falls back to mock analysis if `GEMINI_API_KEY` is absent.
- `POST /api/doctor-brief` — Synthesizes user symptoms and history into a doctor brief using Google Gemini AI (`@google/genai`). Falls back to mock brief if `GEMINI_API_KEY` is absent.

### External Integrations
- **Google Gemini API (`@google/genai`)**: Used for report translation and brief generation (`gemini-3.6-flash`).
- **Google Sheets Webhook (`google-apps-script.gs`)**: Handles waitlist and job application submissions via HTTP POST.

### Environment Variables
*(Documented variable names only; values are kept in local non-committed `.env` files)*
- `PORT`: Port on which the Express server runs (default `3001`).
- `NODE_ENV`: Runtime environment (`development` vs `production`).
- `GEMINI_API_KEY`: API key for Google Gemini GenAI SDK.
- `VITE_GOOGLE_SHEETS_SCRIPT_URL`: Google Apps Script web app URL for processing submissions.

---

## 7. Build Setup, Dependencies, and Testing

### Core Dependencies (`package.json`)
- **UI Framework**: `react` (^19.0.1), `react-dom` (^19.0.1)
- **3D Graphics**: `three` (^0.185.1), `@react-three/fiber` (^9.7.0), `@react-three/drei` (^10.7.8), `@react-three/postprocessing` (^3.0.4)
- **Styling & Motion**: `@tailwindcss/vite` (^4.1.14), `tailwindcss` (^4.1.14), `motion` (^12.23.24), `lucide-react` (^0.546.0)
- **Backend & AI**: `express` (^4.21.2), `@google/genai` (^2.4.0), `dotenv` (^17.2.3)
- **Build Tools**: `vite` (^6.2.3), `esbuild` (^0.25.0), `tsx` (^4.21.0), `typescript` (~5.8.2)

### Available Scripts
- `npm run dev`: Starts dev server using `tsx server.ts` (runs Express + Vite middleware).
- `npm run build`: Executes `vite build` and bundles `server.ts` to `dist/server.cjs` using `esbuild`.
- `npm run start`: Runs production server using `node dist/server.cjs`.
- `npm run clean`: Removes `dist` and `server.js`.
- `npm run lint`: Runs `tsc --noEmit` to verify TypeScript types.

---

## 8. Local Development Setup

To run MEDVAI Alpha locally:

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Set up environment variables**:
   Copy `.env.example` to `.env` and fill in necessary variable names:
   ```bash
   cp .env.example .env
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. Access the application in your browser at `http://localhost:3001` (or the port indicated in your console).

---

## 9. Critical Component Dependencies & Key Considerations

Before modifying code in this repository, keep the following architectural relationships in mind:

1. **Body Map Protection**:
   - `HumanModel.tsx` contains the anatomical region definitions (`BODY_REGIONS`), SVG figure path rendering, and clinical triage rules (`REGION_QUESTIONS`).
   - Modifying `BODY_REGIONS` IDs will break the region matching in `AnatomicalSVGFigure`, `REGION_QUESTIONS`, and `Hero.tsx`.
2. **Vite + Express Dual Server**:
   - `server.ts` integrates Vite in middleware mode during development and serves static assets from `dist/` in production. Any API routes added to Express must precede static middleware.
3. **Waitlist & Application Submissions**:
   - `WaitlistSection.tsx` and `ApplicationModal.tsx` rely on `VITE_GOOGLE_SHEETS_SCRIPT_URL`. If this environment variable is omitted or invalid, form submissions will throw user-facing errors.
4. **Gemini AI Integration**:
   - Endpoints `/api/translate-report` and `/api/doctor-brief` gracefully fall back to mock data when `GEMINI_API_KEY` is not present, allowing local frontend development without an active API key.

---

*Unconfirmed / Limitations Note*: The server-side Google Apps Script code execution inside Google Cloud/Workspace could not be directly verified at runtime since it runs on Google's external infrastructure.
