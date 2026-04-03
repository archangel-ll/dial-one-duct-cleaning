// ============================================
// Contact Form Validation & Handling
// ============================================

export function initForm() {
  const form = document.getElementById('contactForm');
  const formWrapper = document.getElementById('contactFormWrapper');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

    let isValid = true;

    // Validate name
    const name = form.querySelector('#name');
    if (!name?.value.trim()) {
      name?.closest('.form-group')?.classList.add('error');
      isValid = false;
    }

    // Validate phone
    const phone = form.querySelector('#phone');
    const phoneValue = phone?.value.replace(/\D/g, '');
    if (!phoneValue || phoneValue.length < 10) {
      phone?.closest('.form-group')?.classList.add('error');
      isValid = false;
    }

    // Validate email (if provided)
    const email = form.querySelector('#email');
    if (email?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email?.closest('.form-group')?.classList.add('error');
      isValid = false;
    }

    // Validate service
    const service = form.querySelector('#service');
    if (!service?.value) {
      service?.closest('.form-group')?.classList.add('error');
      isValid = false;
    }

    if (!isValid) {
      // Shake animation on the first error
      const firstError = form.querySelector('.form-group.error');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Simulate submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner"></div> Sending...';

    setTimeout(() => {
      form.style.display = 'none';
      formSuccess?.classList.add('visible');
      
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Send Request
      `;
    }, 1500);
  });

  // Real-time validation clearing
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.closest('.form-group')?.classList.remove('error');
    });
  });

  // Phone formatting
  const phoneInput = form.querySelector('#phone');
  phoneInput?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    
    if (value.length >= 7) {
      e.target.value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
      e.target.value = `(${value.slice(0,3)}) ${value.slice(3)}`;
    } else {
      e.target.value = value;
    }
  });
}
