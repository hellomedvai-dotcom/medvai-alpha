# MEDVAI — AI Clinical Spatial Digital Health Twin

MEDVAI is an advanced React + Vite + TypeScript application featuring a 3D Frosted Crystal Human Model for interactive clinical triage and anatomical region exploration, built with Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), and Postprocessing.

---

## 🚀 Getting Started locally in Cursor / VS Code

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** or **yarn**

### Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or `http://localhost:5173`) in your browser.

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run start
   ```

---

## 📁 Project Structure

```
├── public/
│   └── models/
│       └── human.glb            # 3D Human Mesh Asset
├── src/
│   ├── components/
│   │   ├── HumanModel.tsx       # 3D Spatial Digital Health Twin & Raycasting
│   │   ├── Header.tsx           # Navigation & Spatial UI controls
│   │   ├── AudioConsultation.tsx# Live Voice / Speech AI Interaction
│   │   └── ...                  # Clinical Dashboard & UI Components
│   ├── App.tsx                  # Main Application Layout
│   ├── main.tsx                 # Entry Point
│   ├── index.css                # Tailwind CSS Setup
│   └── types.ts                 # TypeScript Data Models
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🎨 Key Technical Features

- **3D Raycast Precision**: Direct mesh intersection for anatomical region identification (Head, Chest, Abdomen, Spine, Arms, Legs).
- **Physical Glass Shading**: `MeshPhysicalMaterial` tuned for an Apple Vision Pro style frosted crystal effect with transmission, clearcoat, and internal volumetric lighting.
- **Micro-Interactions**: Smooth spring-damped tilt feedback, organic breathing expansion, and subtle idle levitation.
- **Camera Zoom Controls**: Smooth camera transitions tracking active regions.
- **Post-Processing**: Optical bloom effect powered by `@react-three/postprocessing`.
- **AI Clinical Reasoning Engine**: Multi-step triage questionnaires with emergency red-flag detection.
