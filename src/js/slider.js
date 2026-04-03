// ============================================
// Before/After Image Slider
// ============================================

export function initSlider() {
  const container = document.getElementById('baSlider');
  const afterImg = document.getElementById('baAfter');
  const handle = document.getElementById('baHandle');

  if (!container || !afterImg || !handle) return;

  let isDragging = false;

  function updateSlider(x) {
    const rect = container.getBoundingClientRect();
    let pos = (x - rect.left) / rect.width;
    pos = Math.max(0.05, Math.min(0.95, pos));
    
    const percent = pos * 100;
    const insetLeft = 50 + (percent / 2);
    afterImg.style.clipPath = `inset(0 0 0 ${insetLeft}%)`;
    handle.style.left = `${percent}%`;
  }

  // Mouse events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      updateSlider(e.clientX);
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch events
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (isDragging) {
      updateSlider(e.touches[0].clientX);
    }
  }, { passive: true });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });
}
