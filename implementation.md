# Dial One Duct Cleaning – Developer Implementation Guide

This document outlines the architecture, file structure, and technical decisions for the Dial One Duct Cleaning single-page website. Its purpose is to onboard new developers and provide a quick reference to the project structure and custom implementations.

## 🛠 Tech Stack
- **Core:** HTML5, Vanilla JavaScript (ESModules)
- **Styling:** Vanilla CSS (Modular architecture using CSS Variables)
- **Build Tool:** [Vite](https://vitejs.dev/) (fast, lean dev server and highly optimized production builds)
- **Hosting/Deployment:** Configured natively for **Vercel** (and optionally GitHub Pages via GitHub Actions).

## 📁 Project Structure

```text
dial-one-duct-cleaning/
├── index.html                # Main entry point and HTML structure
├── vite.config.js            # Vite configuration (Base path set for Vercel)
├── package.json              # Dependencies and NPM scripts
├── public/
│   └── images/               # Static assets (logo, hero image, slider composite image)
└── src/
    ├── main.js               # Primary JS entry point (imports CSS and JS modules)
    ├── style.css             # Primary CSS entry point (imports other CSS files)
    ├── css/                  
    │   ├── variables.css     # CSS Custom Properties (Theme colors, spacing, fonts, animations)
    │   ├── reset.css         # Minimal browser reset
    │   ├── layout.css        # Grid and container systems
    │   ├── components.css    # Reusable UI (Buttons, Cards, Form elements)
    │   └── sections.css      # Section-specific styles (Hero, Services, Slider, Contact)
    └── js/                   
        ├── animations.js     # IntersectionObserver for scroll-based reveal animations
        ├── carousel.js       # Customer review card sliding logic
        ├── form.js           # Contact form state handlers and faux-submission
        ├── navigation.js     # Sticky navbar and mobile menu toggles
        ├── particles.js      # Hero section background floating particles
        └── slider.js         # Before/After image comparison logic
```

## 🚀 Running the Project Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *Vite will start a local server (usually at http://localhost:5173).*
3. **Build for Production:**
   ```bash
   npm run build
   ```
   *The compiled, minified output will be generated in the `/dist` folder.*

## 🧠 Key Technical Decisions & Fixes

### 1. Deployment Configuration
The project uses `vite.config.js` to define its deployment path. Currently, the `base` property is set to `'/'`. This is specifically configured for **Vercel**, which hosts the application at the root domain. 

*Note: If migrating strictly to GitHub Pages on an organization/user domain (e.g. `user.github.io/repo-name/`), the base must be updated to match the repository name (e.g., `base: '/dial-one-duct-cleaning/'`).*

### 2. Side-By-Side Image Slider implementation
The Before/After slider at `#results` uses a composite source image (`/images/before-after.jpg`) containing both the "Before" and "After" states side-by-side.
To prevent the side-by-side image from being heavily zoomed in and cropped when subjected to `object-fit: cover` within a wide container, the `.ba-slider-container` has been given an `aspect-ratio: 1/1` (square). This geometry perfectly matches the square 1024x1024 source image, ensuring 100% visibility of both the dirty and clean duct without cropping. The slider handle is positioned over this layout as an interactive focal point.

### 3. CSS Shorthand Override Avoidance
When styling form elements across the site, stick to specific properties like `background-color:` instead of the shorthand `background:`. The component framework heavily leverages `background-image` for interactive elements (such as custom SVG drop-down arrows in `.form-select`). Using the shorthand `background` inadvertently resets `background-image`, `background-repeat`, and `background-position` resulting in unwanted visual bugs (such as repeating icon patterns).

### 4. JavaScript Modules
All interactivity is encapsulated in pure, un-bundled Vanilla JS modules during development to keep the logic completely transparent and strictly separated by concern. Vite automatically bundles and hashes these for production ensuring optimal payload reduction.

---
*Maintained by the AI Engineering Team.*
