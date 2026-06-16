/* ============================================
   COM4011 - Web Development Assignment
   Manchester United FC Website
   JavaScript File - script.js
   DOM-based interactions (LO4)
   ============================================ */


/* ============================================
   FEATURE 1: CONTACT FORM VALIDATION
   Validates all fields and shows error messages
   ============================================ */

const contactForm = document.getElementById('contactForm');

if (contactForm) {

  contactForm.addEventListener('submit', function(e) {
    /* Stop the form from submitting the normal way */
    e.preventDefault();

    /* Read all field values */
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    /* Clear any previous error messages */
    clearAllErrors();

    let isValid = true;

    /* Check: name cannot be empty */
    if (name === '') {
      showError('nameError', 'Please enter your full name.');
      document.getElementById('name').classList.add('input-error');
      isValid = false;
    }

    /* Check: email must look valid */
    if (email === '') {
      showError('emailError', 'Please enter your email address.');
      document.getElementById('email').classList.add('input-error');
      isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      showError('emailError', 'Please enter a valid email (e.g. name@email.com).');
      document.getElementById('email').classList.add('input-error');
      isValid = false;
    }

    /* Check: subject cannot be empty */
    if (subject === '') {
      showError('subjectError', 'Please enter a subject.');
      document.getElementById('subject').classList.add('input-error');
      isValid = false;
    }

    /* Check: message must be at least 10 characters */
    if (message === '') {
      showError('messageError', 'Please enter a message.');
      document.getElementById('message').classList.add('input-error');
      isValid = false;
    } else if (message.length < 10) {
      showError('messageError', 'Message must be at least 10 characters long.');
      document.getElementById('message').classList.add('input-error');
      isValid = false;
    }

    /* All valid: reset form and show success banner */
    if (isValid) {
      contactForm.reset();
      clearAllErrors();
      const banner = document.getElementById('success-banner');
      if (banner) {
        banner.style.display = 'block';
        /* Hide the banner after 5 seconds */
        setTimeout(function() {
          banner.style.display = 'none';
        }, 5000);
      }
    }
  });

  /* Remove red border as soon as the user starts typing again */
  contactForm.querySelectorAll('input, textarea').forEach(function(field) {
    field.addEventListener('input', function() {
      this.classList.remove('input-error');
    });
  });
}

/* Helper: display an error message */
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = msg;
    el.className = 'form-feedback error';
  }
}

/* Helper: clear all errors and red borders */
function clearAllErrors() {
  document.querySelectorAll('.form-feedback').forEach(function(el) {
    el.textContent = '';
    el.className = 'form-feedback';
  });
  document.querySelectorAll('.input-error').forEach(function(el) {
    el.classList.remove('input-error');
  });
}


/* ============================================
   FEATURE 2: GREATEST PLAYERS SLIDESHOW
   Previous / Next buttons to cycle through slides
   ============================================ */

const slides = document.querySelectorAll('.slide');
const slideCounter = document.getElementById('slideCounter');
let currentSlide = 0;

if (slides.length > 0) {
  /* Show the first slide on load */
  showSlide(0);

  /* Next button */
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  /* Previous button */
  const prevBtn = document.getElementById('prevBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }
}

/* Show the chosen slide, hide all others */
function showSlide(index) {
  slides.forEach(function(slide) {
    slide.classList.remove('active');
  });
  slides[index].classList.add('active');
  if (slideCounter) {
    slideCounter.textContent = (index + 1) + ' / ' + slides.length;
  }
}


/* ============================================
   ACTIVE NAV LINK HIGHLIGHT
   Marks the current page link in the nav
   ============================================ */

const currentPage = window.location.pathname.split('/').pop();

document.querySelectorAll('nav ul li a').forEach(function(link) {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
