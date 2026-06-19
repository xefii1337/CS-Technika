// Obsługa przezroczystości navbaru podczas przewijania
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Prosta animacja pojawiania się elementów podczas przewijania
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section-title, .about-text, .about-image, .service-card, .info-item, .map-container').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// Obsługa karuzeli dla podnośników
const track = document.getElementById('podnosniki-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (track && prevBtn && nextBtn) {
  const getScrollAmount = () => {
    const card = track.querySelector('.fleet-grid-card');
    if (card) {
      const style = window.getComputedStyle(track);
      const gap = parseInt(style.gap) || 0;
      return card.offsetWidth + gap;
    }
    return 300;
  };

  let isScrolling = false;

  nextBtn.addEventListener('click', () => {
    if (isScrolling) return;
    isScrolling = true;
    
    const scrollAmount = getScrollAmount();
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // Po zakończeniu animacji przesuwamy pierwszy element na koniec
    setTimeout(() => {
      const firstItem = track.firstElementChild;
      track.style.scrollBehavior = 'auto';
      track.appendChild(firstItem);
      track.scrollLeft -= scrollAmount;
      
      void track.offsetWidth; // Wymuszenie reflow dla przeglądarki
      track.style.scrollBehavior = 'smooth';
      isScrolling = false;
    }, 400);
  });

  prevBtn.addEventListener('click', () => {
    if (isScrolling) return;
    isScrolling = true;
    
    const scrollAmount = getScrollAmount();
    const lastItem = track.lastElementChild;
    
    // Przesuwamy ostatni element na początek, dopasowując pasek ukrytym przeskokiem
    track.style.scrollBehavior = 'auto';
    track.prepend(lastItem);
    track.scrollLeft += scrollAmount;
    
    void track.offsetWidth; // Wymuszenie reflow
    track.style.scrollBehavior = 'smooth';
    
    // Płynna animacja do tyłu
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    
    setTimeout(() => {
      isScrolling = false;
    }, 400);
  });
}

// Wymuś przewinięcie strony na samą górę podczas przeładowania/odświeżania
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const isActive = question.classList.contains('active');
    
    // Zwiń wszystkie
    faqQuestions.forEach(q => {
      q.classList.remove('active');
      q.nextElementSibling.style.maxHeight = null;
    });
    
    // Jeśli nie był aktywny, rozwiń go
    if (!isActive) {
      question.classList.add('active');
      const answer = question.nextElementSibling;
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
