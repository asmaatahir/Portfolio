const projects = [
  { name: "Personal Portfolio Website", desc: "Designed and developed a responsive personal portfolio website using HTML, CSS, and JavaScript. Features modern layout, contact form, and accessible navigation.", link: "https://yourusername.github.io/" }
];

function renderProjects(){
  const container = document.getElementById('projectList');
  container.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `<h3>${p.name}</h3><p>${p.desc}</p><a href="${p.link}" target="_blank" rel="noopener"><button type="button">View Project</button></a>`;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('show');
  });

  // Theme toggle (persisted). Default to dark unless user previously chose light.
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    body.classList.remove('dark');
    body.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    // default to dark
    body.classList.add('dark');
    body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }

  function updateThemeIcon(){
    if(!themeToggle) return;
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    body.classList.toggle('light', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
  });

  // Scroll spy for nav active state
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.main-nav a');
  function onScroll(){
    let current = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if(top <= 120) current = section.id;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#'+current));
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // Contact form simple validation (no network submit)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){
      status.textContent = 'Please complete all fields.';
      status.style.color = 'tomato';
      return;
    }
    status.textContent = 'Thanks — your message was recorded locally (demo).';
    status.style.color = 'lightgreen';
    form.reset();
  });
});
