// ============================================
// Navigation — Sticky nav, smooth scroll, mobile menu
// ============================================

export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks?.querySelectorAll('a');

  // Sticky navbar on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }, { passive: true });

  // Mobile menu toggle
  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks?.classList.toggle('open');
    document.body.style.overflow = navLinks?.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  links?.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('active');
      navLinks?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active link tracking
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links?.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}
