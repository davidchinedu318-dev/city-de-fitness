
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(
  ".program-card, .trainer-card, .pricing-card, .testimonial-card, section"
).forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});


// SVG COLOR CONTROL
const iconColors = {
  lightning: "#FFD700",    
  fire: "#ff6b00",        
  boxing: "#e63946",      
  meditation: "#4cc9f0",  
  trophy: "#f4c430",      
  lift: "#90db3b"         
};
document.querySelectorAll(".program-icon svg").forEach(svg => {
  const path = svg.innerHTML;

  if (path.includes("L3 14")) {
    svg.style.color = iconColors.lightning;
  } else if (path.includes("s1 2-1 4")) {
    svg.style.color = iconColors.fire;
  } else if (path.includes("c-2 0-4 2")) {
    svg.style.color = iconColors.boxing;
  } else if (path.includes("circle")) {
    svg.style.color = iconColors.meditation;
  } else if (path.includes("M18 2H6")) {
    svg.style.color = iconColors.trophy;
  } else {
    svg.style.color = iconColors.lift;
  }
});

document.querySelectorAll(".program-icon svg").forEach(svg => {
  svg.addEventListener("mouseenter", () => {
    svg.style.transform = "scale(1.2)";
    svg.style.transition = "0.2s ease";
  });

  svg.addEventListener("mouseleave", () => {
    svg.style.transform = "scale(1)";
  });
});
const contactIconColors = {
  location: "#e3211a",   
  phone: "#34A853",      
  email: "#EA4335",
  clock: "#b0b0b0"       
};


document.querySelectorAll(".contact-icon").forEach(iconBox => {
  const svg = iconBox.querySelector("svg");
  if (!svg) return;

  
  const wrapper = iconBox.querySelector("span");
  const type = wrapper?.classList[1]?.replace("-icon", ""); 
  

  const color = contactIconColors[type];

  if (color) {
    svg.style.color = color;
  }
});
(function () {
  const TOTAL      = 8;
  const INTERVAL   = 4200;
  const track      = document.getElementById('carousel-track');
  const slides     = Array.from(track.querySelectorAll('.carousel-slide'));
  const dotsWrap   = document.getElementById('carousel-dots');
  const thumbsWrap = document.getElementById('carousel-thumbs');
  const fill       = document.getElementById('progress-fill');
  const indexEl    = document.getElementById('current-index');
  const prevBtn    = document.getElementById('prev-btn');
  const nextBtn    = document.getElementById('next-btn');

  let current  = 0;
  let timer    = null;
  let progTimer = null;

  //thumb images 
  const thumbSrcs = slides.map(s => s.querySelector('img').src);

  //build dots 
  const dots = Array.from({ length: TOTAL }, (_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Go to slide ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
    return d;
  });

  //build thumbs 
  const thumbs = thumbSrcs.map((src, i) => {
    const t = document.createElement('div');
    t.className = 'thumb' + (i === 0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    t.appendChild(img);
    t.addEventListener('click', () => goTo(i));
    thumbsWrap.appendChild(t);
    return t;
  });

  // go to slide 
  function goTo(idx, direction) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('active');
    thumbs[current].classList.remove('active');

    current = (idx + TOTAL) % TOTAL;

    track.style.transform = `translateX(-${current * 100}%)`;

    slides[current].classList.add('is-active');
    dots[current].classList.add('active');
    thumbs[current].classList.add('active');
    indexEl.textContent = String(current + 1).padStart(2, '0');

    resetProgress();
  }

  // loading bar 
  function resetProgress() {
    clearTimeout(progTimer);
    fill.style.transition = 'none';
    fill.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.transition = `width ${INTERVAL}ms linear`;
        fill.style.width = '100%';
      });
    });
  }

  //auto-play 
  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  function stopAuto() {
    clearInterval(timer);
    clearTimeout(progTimer);
    fill.style.transition = 'none';
  }

  //arrows 
  prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  //keyboard 
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
  });

  //  pause on hover 
  document.getElementById('gallery').addEventListener('mouseenter', stopAuto);
  document.getElementById('gallery').addEventListener('mouseleave', () => {
    resetProgress(); startAuto();
  });

  //touch swipe 
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { goTo(current + (dx < 0 ? 1 : -1)); startAuto(); }
  }, { passive: true });

  // init
  resetProgress();
  startAuto();
})();
