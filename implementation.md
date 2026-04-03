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
The Before/After slider at `#results` utilizes a highly specific geometric math trick to handle a side-by-side source image (`before-after.jpg`) without cropping or distortions:
- The container `.ba-slider-container` is locked to an `aspect-ratio: 1/2` (so it is a tall portrait rectangle).
- The images inside `.ba-before` and `.ba-after` are set to `width: 200%`.
Because putting a 200% width element inside a 1:2 container perfectly squares the element's resulting geometry back to `1:1`, the square `1024x1024` source image receives `0%` vertical cropping while still stretching the left and right halves fully apart to span the container!
- **The "Before" image (`.ba-before`)** lives at `left: 0`.
- **The "After" image (`.ba-after`)** lives at `left: -100%`.
- **The JavaScript (`slider.js`)** translates the user's cursor percentage over the container to a custom CSS `clip-path` math (`50 + (percent/2)`) on the overlaid `.ba-after` image, perfectly revealing the active side.

### 3. CSS Shorthand Override Avoidance
When styling form elements across the site, stick to specific properties like `background-color:` instead of the shorthand `background:`. The component framework heavily leverages `background-image` for interactive elements (such as custom SVG drop-down arrows in `.form-select`). Using the shorthand `background` inadvertently resets `background-image`, `background-repeat`, and `background-position` resulting in unwanted visual bugs (such as repeating icon patterns).

### 4. JavaScript Modules
All interactivity is encapsulated in pure, un-bundled Vanilla JS modules during development to keep the logic completely transparent and strictly separated by concern. Vite automatically bundles and hashes these for production ensuring optimal payload reduction.

---
*Maintained by the AI Engineering Team.*
