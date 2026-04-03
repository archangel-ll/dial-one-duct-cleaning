// ============================================
// DIAL ONE DUCT CLEANING — Main Entry Point
// ============================================

import './style.css';
import { initNavigation } from './js/navigation.js';
import { initAnimations } from './js/animations.js';
import { initSlider } from './js/slider.js';
import { initCarousel } from './js/carousel.js';
import { initForm } from './js/form.js';
import { initParticles } from './js/particles.js';

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initSlider();
  initCarousel();
  initForm();
  initParticles();
});
