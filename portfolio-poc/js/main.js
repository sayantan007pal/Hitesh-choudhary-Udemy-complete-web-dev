// =========================================================
// 1. MOBILE NAV TOGGLE
//    Flip aria-expanded (for screen readers) and toggle a
//    class (for CSS) whenever the hamburger button is clicked.
// =========================================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close the menu automatically once a link is tapped —
// otherwise it stays open and covers the page you just jumped to.
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('themeToggle').onclick = () => {
  const light = document.documentElement.classList.toggle('light');
  localStorage.theme = light ? 'light' : 'dark';
};

// =========================================================
// 2. HERO TICKER
//    Cycles through short "pipeline" strings that describe
//    your real projects, typed out character by character.
//    Edit this array to match whatever you're currently building.
// =========================================================
const pipelines = [
  'resume.pdf -> parse -> embed -> match',
  'audio_stream -> deepgram_stt -> llm -> tts_response',
  'auth_request -> rate_limiter -> captcha -> session',
  'skill_list -> qlora_model -> interview_questions'
];

const tickerEl = document.getElementById('tickerText');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

async function runTicker() {
  let i = 0;
  while (true) {
    const line = pipelines[i % pipelines.length];

    if (prefersReducedMotion) {
      // Skip the typing animation entirely for users who asked for less motion —
      // just swap the text every few seconds.
      tickerEl.textContent = line;
      await wait(3000);
    } else {
      await typeText(line);
      await wait(1800);
      await eraseText();
    }
    i++;
  }
}

function typeText(text) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      tickerEl.textContent = text.slice(0, i);
      i++;
      if (i > text.length) { clearInterval(interval); resolve(); }
    }, 35);
  });
}

function eraseText() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const current = tickerEl.textContent;
      tickerEl.textContent = current.slice(0, -1);
      if (current.length === 0) { clearInterval(interval); resolve(); }
    }, 20);
  });
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

runTicker();

// =========================================================
// 3. WAVEFORM GRAPHIC
//    Builds a set of animated bars purely in JS/SVG — no image
//    file needed. Each bar gets a random height and a slightly
//    different animation delay so they don't pulse in unison.
// =========================================================
const barsGroup = document.querySelector('.waveform__bars');

if (barsGroup) {
  const barCount = 24;
  const gap = 4;
  const barWidth = (220 - gap * (barCount - 1)) / barCount;

  for (let i = 0; i < barCount; i++) {
    const height = 20 + Math.random() * 80; // random height between 20-100
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', i * (barWidth + gap));
    rect.setAttribute('y', (120 - height) / 2);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', height);
    rect.setAttribute('rx', 1.5);
    rect.style.transformOrigin = 'center';
    rect.style.animationDelay = `${Math.random() * 1.6}s`;
    barsGroup.appendChild(rect);
  }
}