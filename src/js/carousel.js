// ============================================
// Reviews Carousel
// ============================================

export function initCarousel() {
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('reviewPrev');
  const nextBtn = document.getElementById('reviewNext');
  const dotsContainer = document.getElementById('reviewsDots');

  if (!track) return;

  const cards = track.querySelectorAll('.review-card');
  let currentIndex = 0;
  let cardsPerView = getCardsPerView();
  let totalPages = Math.ceil(cards.length / cardsPerView);

  // Create dots
  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.className = `dot${i === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateCarousel() {
    const gap = 24; // var(--space-6) = 1.5rem ≈ 24px
    const cardWidth = (track.parentElement.offsetWidth - gap * (cardsPerView - 1)) / cardsPerView;
    
    cards.forEach(card => {
      card.style.minWidth = `${cardWidth}px`;
    });

    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset})`;

    // Update dots
    const dots = dotsContainer?.querySelectorAll('.dot');
    dots?.forEach((dot, i) => {
      dot.classList.toggle('active', i === Math.floor(currentIndex / cardsPerView));
    });
  }

  function goTo(pageIndex) {
    currentIndex = pageIndex * cardsPerView;
    if (currentIndex > cards.length - cardsPerView) {
      currentIndex = cards.length - cardsPerView;
    }
    updateCarousel();
  }

  function next() {
    currentIndex += cardsPerView;
    if (currentIndex >= cards.length) {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function prev() {
    currentIndex -= cardsPerView;
    if (currentIndex < 0) {
      currentIndex = Math.max(0, cards.length - cardsPerView);
    }
    updateCarousel();
  }

  // Event listeners
  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  // Auto-play
  let autoPlay = setInterval(next, 5000);

  track.parentElement?.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.parentElement?.addEventListener('mouseleave', () => {
    autoPlay = setInterval(next, 5000);
  });

  // Touch swipe
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }, { passive: true });

  // Resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cardsPerView = getCardsPerView();
      totalPages = Math.ceil(cards.length / cardsPerView);
      currentIndex = 0;
      createDots();
      updateCarousel();
    }, 250);
  });

  // Init
  createDots();
  updateCarousel();
}
