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