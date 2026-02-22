const translations = {
  hero_title: {
    en: "We help you develop the digital solutions yourself ",
    es: "Te ayudamos a desarrollar las soluciones digitales tú mismo "
  },
  hero_subtitle: {
    en: "you've got the questions, we'll shape the answers ",
    es: "Tienes las preguntas, nosotros damos forma a las respuestas "
  },
  placeholder_name: { en: "Name", es: "Nombre" },
  placeholder_email: { en: "Email", es: "Correo electrónico" },
  cta_btn: { en: "Let's have a meeting!  ", es: "¡Agendemos una reunión!" },
  privacy: {
    en: " We'll never share your info with anyone. ",
    es: " No compartiremos tu información con nadie. "
  },
  who_title: { en: "Who are we and who do we work for?", es: "¿Quiénes somos y para quiénes trabajamos?" },
  who_p1: {
    en: "Datanexo is a data-driven company focused on training and developing tailored solutions for organizations interested in acquiring knowledge and using artificial intelligence.",
    es: "Datanexo es una empresa data-driven centrada en capacitar y desarrollar soluciones a medida para organizaciones interesadas en la adquisición de conocimientos y uso de inteligencia artificial."
  },
  who_p2: {
    en: "We work for companies that want to transform their data into value, improve operational efficiency and optimize resources through practical and applicable solutions.",
    es: "Trabajamos para empresas que quieren transformar sus datos en valor, mejorar la eficiencia operativa y optimizar recursos mediante soluciones prácticas y aplicables."
  },
  how_title: { en: "How do we do it?", es: "¿Cómo lo hacemos?" },
  how_intro: {
    en: "We accompany companies from the initial idea to production implementation with an End-to-End approach:",
    es: "Acompañamos a las empresas desde la idea inicial hasta la implementación en producción con un enfoque End-to-End:"
  },
  how_1: { en: "Strategic data consulting.", es: "Consultoría estratégica en datos." },
  how_2: { en: "Data engineering, integration, organization and automation.", es: "Ingeniería de datos, integración, orden y automatización." },
  how_3: { en: "Data science applied to real business problems.", es: "Ciencia de datos aplicada a problemas reales de negocio." },
  how_4: { en: "Machine learning and applied artificial intelligence.", es: "Machine learning e inteligencia artificial aplicada." },
  how_5: { en: "Personalized educational calls for teams, leaders and individuals.", es: "Calls educativas personalizadas para equipos, líderes y particulares." },
  how_6: { en: "Process and reporting automation.", es: "Automatización de procesos y reportes." },
  focus_title: { en: "What do we focus on?", es: "¿En qué nos enfocamos?" },
  focus_p1: {
    en: "Training, automation and solving real processes in the company.",
    es: "Formación, automatización y resolución de procesos reales en la empresa."
  },
  focus_p2: { en: "Data and applied AI training.", es: "Capacitación en Data e IA aplicada." },
  focus_p3: {
    en: "Group and individual consulting sessions, focused on concrete objectives of the organization.",
    es: "Sesiones de consultoría grupales e individuales, enfocadas en objetivos concretos de la organización."
  },
  diff_title: { en: "What differentiates us?", es: "¿Qué nos diferencia?" },
  diff_1: {
    en: "We train the team while we develop AI solutions applied to their own processes and data.",
    es: "Formamos al equipo mientras desarrollamos soluciones de IA aplicadas a sus propios procesos y datos."
  },
  diff_2: { en: "We train practically on real business data.", es: "Capacitamos práctica sobre datos reales del negocio." },
  diff_3: {
    en: "We transfer knowledge so the team can maintain, scale and evolve what was built.",
    es: "Transferimos el conocimiento para que el equipo pueda mantener, escalar y evolucionar lo construido."
  },
  contact_title: { en: "Contact", es: "Contacto" },
  contact_instagram: { en: "Instagram", es: "Instagram" },
  contact_phone: { en: "(+54 9) 11 4075-6969", es: "(+54 9) 11 4075-6969" },
  contact_brand: { en: "Datanexo", es: "Datanexo" },
  btn_dark: { en: "Dark mode", es: "Modo oscuro" },
  btn_light: { en: "Light mode", es: "Modo claro" },
  nav_about: { en: "About Us", es: "Nosotros" },
  about_heading: { en: "Our Co-Founders", es: "Nuestros Co-Fundadores" },
  role_kevin: { en: "Data & IA Engineer", es: "Data & IA Engineer" },
  role_franco: { en: "AI Engineer & Robotics", es: "AI Engineer & Robotics" },
  role_ezequiel: { en: "Backend & Infraestructure", es: "Backend & Infraestructura" },
  role_agustin: { en: "Machine Learning & Analytics", es: "Machine Learning & Analytics" },
  role_santiago: { en: "Marketing & Communications", es: "Marketing & Comunicaciones" }
};

let currentLang = (localStorage.getItem('datanexo-lang') || 'en');
let darkMode = localStorage.getItem('datanexo-dark') === '1';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('datanexo-lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][lang]) el.textContent = translations[key][lang];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key] && translations[key][lang]) el.placeholder = translations[key][lang];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[key] && translations[key][lang]) el.innerHTML = translations[key][lang];
  });
  updateDarkBtnLabel();
}

function toggleDarkMode() {
  darkMode = !darkMode;
  localStorage.setItem('datanexo-dark', darkMode ? '1' : '0');
  document.body.classList.toggle('dark-mode', darkMode);
  updateDarkBtnLabel();
}

function updateDarkBtnLabel() {
  const btn = document.getElementById('dark-btn');
  if (!btn) return;
  const textEl = btn.querySelector('.dark-btn-text');
  const iconEl = btn.querySelector('.dark-btn-icon svg');
  const label = darkMode ? translations.btn_light[currentLang] : translations.btn_dark[currentLang];
  if (textEl) textEl.textContent = label;
  btn.setAttribute('title', label);
  btn.setAttribute('aria-label', label);
  // Sun icon in dark mode, moon in light mode
  if (iconEl) {
    iconEl.outerHTML = darkMode
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn3 = document.getElementById('hover-target');

  applyLanguage(currentLang);
  document.body.classList.toggle('dark-mode', darkMode);
  updateDarkBtnLabel();

  document.getElementById('lang-btn').addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'es' : 'en');
  });
  document.getElementById('dark-btn').addEventListener('click', toggleDarkMode);

  const revealSections = document.querySelectorAll('.scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealSections.forEach((el) => observer.observe(el));

  btn3.addEventListener('mousedown', () => {
    const name = document.getElementById('fname').value.replaceAll(" ", '%20');
    const email = document.getElementById('lname').value.replaceAll(" ", '%20');
    console.log(name, email);
    window.location = "https://calendly.com/kevinyoel9/30min?name=" + name + "&email=" + email;
  });
});



