const $ = selector => document.querySelector(selector);
const menuTrigger = $('.menu-trigger');
const drawer = $('.drawer');
const drawerClose = $('.drawer-close');
const backdrop = $('.drawer-backdrop');

function setDrawer(open) {
  drawer.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', String(!open));
  menuTrigger.setAttribute('aria-expanded', String(open));
  backdrop.hidden = !open;
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) drawerClose.focus();
}
menuTrigger.addEventListener('click', () => setDrawer(true));
drawerClose.addEventListener('click', () => setDrawer(false));
backdrop.addEventListener('click', () => setDrawer(false));
drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setDrawer(false)));

const languageTrigger = $('.language-trigger');
const languageMenu = $('.language-menu');
languageTrigger.addEventListener('click', () => {
  const open = languageMenu.hidden;
  languageMenu.hidden = !open;
  languageTrigger.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', event => {
  if (!event.target.closest('.language-control')) {
    languageMenu.hidden = true;
    languageTrigger.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (drawer.classList.contains('open')) setDrawer(false);
  languageMenu.hidden = true;
});

const translations = {
  en:{art:'art',photo:'photography',design:'graphic design',video:'video',about:'about',contact:'contact',photoSocial:'social media content',photoPortraits:'portraits & professional shoots',photoPersonal:'personal projects',photoSocialIntro:'Documentary images and visual content created for digital communication.',photoPortraitsIntro:'Portrait commissions for professional identity, campaigns and social media.',photoPersonalIntro:'Personal series developed through portraiture, documentary observation and street photography.',openProject:'open project ↗',workInProgress:'SELECTED WORK IN PROGRESS',designNote:'This space is being prepared for graphic design and creative direction projects.',videoLabel:'VIDEO / SOCIAL CONTENT',videoNote:'Instagram edits and content creation — coming soon.',aboutLead:'Artist, image maker and emerging creative director working across art, graphic design and photography.',aboutBody:'I study Fine Arts and Media at Alanus Hochschule in Bonn. My practice moves between material research, visual storytelling and communication, bringing artistic sensitivity into clear images, layouts and concepts.',aboutBody2:'I am open to commissions, collaborations and roles in graphic design, creative direction, social media, photography, cultural communication and creative production.',experience:'Relevant experience',cvOrs:'Art Workshop Facilitator · ORS, Bonn · 2024—present',cvAlanus:'Fine Arts & Media Projects · Alanus Hochschule · 2024—present',cvGalatea:'Social Media & Photography · Galatea, Madrid · 2023—2024',cvShambala:'Creative Production Manager · Shambala Gatherings, Sweden · 2023',education:'Education',cvEducation:'Fine Arts and Media · Alanus Hochschule · 2024—2027',languages:'Languages',cvLanguages:'Portuguese and Spanish — native · English — C1 · German — B2',skills:'Skills & software',cvSkills:'Graphic design · layout · visual concepts · photography · video · social media · artistic documentation · creative production',contactCall:'Available for hire, collaborations and commissions.',backTop:'BACK TO TOP ↑'},
  pt:{art:'arte',photo:'fotografia',design:'design gráfico',video:'vídeo',about:'sobre mim',contact:'contato',photoSocial:'conteúdo para redes sociais',photoPortraits:'retratos & ensaios profissionais',photoPersonal:'projetos pessoais',photoSocialIntro:'Imagens documentais e conteúdo visual criados para comunicação digital.',photoPortraitsIntro:'Retratos comissionados para identidade profissional, campanhas e redes sociais.',photoPersonalIntro:'Séries pessoais desenvolvidas através de retrato, observação documental e fotografia de rua.',openProject:'abrir projeto ↗',workInProgress:'SELEÇÃO EM DESENVOLVIMENTO',designNote:'Este espaço está sendo preparado para projetos de design gráfico e direção criativa.',videoLabel:'VÍDEO / CONTEÚDO SOCIAL',videoNote:'Edições para Instagram e criação de conteúdo — em breve.',aboutLead:'Artista, criadora de imagens e diretora criativa em formação, trabalhando entre arte, design gráfico e fotografia.',aboutBody:'Estudo Belas Artes e Mídia na Alanus Hochschule, em Bonn. Minha prática circula entre pesquisa material, narrativa visual e comunicação, levando sensibilidade artística para imagens, layouts e conceitos claros.',aboutBody2:'Estou disponível para encomendas, colaborações e oportunidades em design gráfico, direção criativa, redes sociais, fotografia, comunicação cultural e produção criativa.',experience:'Experiência relevante',cvOrs:'Facilitadora de oficinas de arte · ORS, Bonn · 2024—presente',cvAlanus:'Projetos de Belas Artes e Mídia · Alanus Hochschule · 2024—presente',cvGalatea:'Redes sociais e fotografia · Galatea, Madrid · 2023—2024',cvShambala:'Gerente de produção criativa · Shambala Gatherings, Suécia · 2023',education:'Formação',cvEducation:'Belas Artes e Mídia · Alanus Hochschule · 2024—2027',languages:'Idiomas',cvLanguages:'Português e espanhol — nativos · Inglês — C1 · Alemão — B2',skills:'Competências e programas',cvSkills:'Design gráfico · diagramação · conceitos visuais · fotografia · vídeo · redes sociais · documentação artística · produção criativa',contactCall:'Disponível para contratação, colaborações e encomendas.',backTop:'VOLTAR AO TOPO ↑'},
  es:{art:'arte',photo:'fotografía',design:'diseño gráfico',video:'vídeo',about:'sobre mí',contact:'contacto',photoSocial:'contenido para redes sociales',photoPortraits:'retratos y sesiones profesionales',photoPersonal:'proyectos personales',photoSocialIntro:'Imágenes documentales y contenido visual creados para comunicación digital.',photoPortraitsIntro:'Retratos por encargo para identidad profesional, campañas y redes sociales.',photoPersonalIntro:'Series personales desarrolladas mediante retrato, observación documental y fotografía callejera.',openProject:'abrir proyecto ↗',workInProgress:'SELECCIÓN EN PROCESO',designNote:'Este espacio se está preparando para proyectos de diseño gráfico y dirección creativa.',videoLabel:'VÍDEO / CONTENIDO SOCIAL',videoNote:'Ediciones para Instagram y creación de contenido — próximamente.',aboutLead:'Artista, creadora de imágenes y directora creativa en formación que trabaja entre arte, diseño gráfico y fotografía.',aboutBody:'Estudio Bellas Artes y Medios en Alanus Hochschule, en Bonn. Mi práctica conecta investigación material, narrativa visual y comunicación, llevando sensibilidad artística a imágenes, diseños y conceptos claros.',aboutBody2:'Estoy disponible para encargos, colaboraciones y oportunidades en diseño gráfico, dirección creativa, redes sociales, fotografía, comunicación cultural y producción creativa.',experience:'Experiencia relevante',cvOrs:'Facilitadora de talleres de arte · ORS, Bonn · 2024—presente',cvAlanus:'Proyectos de Bellas Artes y Medios · Alanus Hochschule · 2024—presente',cvGalatea:'Redes sociales y fotografía · Galatea, Madrid · 2023—2024',cvShambala:'Responsable de producción creativa · Shambala Gatherings, Suecia · 2023',education:'Formación',cvEducation:'Bellas Artes y Medios · Alanus Hochschule · 2024—2027',languages:'Idiomas',cvLanguages:'Portugués y español — nativos · Inglés — C1 · Alemán — B2',skills:'Habilidades y programas',cvSkills:'Diseño gráfico · maquetación · conceptos visuales · fotografía · vídeo · redes sociales · documentación artística · producción creativa',contactCall:'Disponible para contratación, colaboraciones y encargos.',backTop:'VOLVER ARRIBA ↑'},
  de:{art:'kunst',photo:'fotografie',design:'grafikdesign',video:'video',about:'über mich',contact:'kontakt',photoSocial:'Social-Media-Inhalte',photoPortraits:'Porträts & professionelle Shootings',photoPersonal:'persönliche Projekte',photoSocialIntro:'Dokumentarische Bilder und visuelle Inhalte für digitale Kommunikation.',photoPortraitsIntro:'Auftragsporträts für professionelle Identität, Kampagnen und Social Media.',photoPersonalIntro:'Persönliche Serien aus Porträt, dokumentarischer Beobachtung und Straßenfotografie.',openProject:'projekt öffnen ↗',workInProgress:'AUSWAHL IN ARBEIT',designNote:'Dieser Bereich wird für Projekte aus Grafikdesign und Creative Direction vorbereitet.',videoLabel:'VIDEO / SOCIAL CONTENT',videoNote:'Instagram-Edits und Content Creation — demnächst.',aboutLead:'Künstlerin, Bildgestalterin und angehende Creative Director zwischen Kunst, Grafikdesign und Fotografie.',aboutBody:'Ich studiere Bildende Kunst und Medien an der Alanus Hochschule in Bonn. Meine Praxis verbindet Materialforschung, visuelles Erzählen und Kommunikation und überträgt künstlerische Sensibilität in klare Bilder, Layouts und Konzepte.',aboutBody2:'Ich bin offen für Aufträge, Kooperationen und Tätigkeiten in Grafikdesign, Creative Direction, Social Media, Fotografie, Kulturkommunikation und kreativer Produktion.',experience:'Relevante Erfahrung',cvOrs:'Leitung von Kunstworkshops · ORS, Bonn · 2024—heute',cvAlanus:'Projekte in Bildender Kunst und Medien · Alanus Hochschule · 2024—heute',cvGalatea:'Social Media und Fotografie · Galatea, Madrid · 2023—2024',cvShambala:'Leitung kreative Produktion · Shambala Gatherings, Schweden · 2023',education:'Ausbildung',cvEducation:'Bildende Kunst und Medien · Alanus Hochschule · 2024—2027',languages:'Sprachen',cvLanguages:'Portugiesisch und Spanisch — Muttersprachen · Englisch — C1 · Deutsch — B2',skills:'Fähigkeiten und Software',cvSkills:'Grafikdesign · Layout · visuelle Konzepte · Fotografie · Video · Social Media · künstlerische Dokumentation · kreative Produktion',contactCall:'Verfügbar für Anstellungen, Kooperationen und Aufträge.',backTop:'NACH OBEN ↑'}
};
let activeLanguage = 'en';
function applyProjectTitles(language) {
  document.querySelectorAll('.project-link').forEach(link => {
    const id = new URL(link.href).searchParams.get('id');
    const project = window.PORTFOLIO_PROJECTS[id];
    if (project) link.querySelector('h3').textContent = project.titles?.[language] || project.title;
  });
  document.querySelectorAll('.carousel-card').forEach(link => {
    const project = window.PORTFOLIO_PROJECTS[link.dataset.project];
    const title = project.titles?.[language] || project.title;
    link.querySelector('span').textContent = title;
    link.querySelector('img').alt = title;
  });
}
function setLanguage(language) {
  const copy = translations[language] || translations.en;
  activeLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    if (copy[element.dataset.i18n]) element.textContent = copy[element.dataset.i18n];
  });
  languageTrigger.textContent = language.toUpperCase();
  languageMenu.hidden = true;
  applyProjectTitles(language);
  try { localStorage.setItem('vittoria-language', language); } catch (_) {}
}
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
let initialLanguage = 'en';
try { initialLanguage = localStorage.getItem('vittoria-language') || 'en'; } catch (_) {}
setLanguage(initialLanguage);

const heroIds = ['warm','holistic','bettina','jenny','ceara','newyork','carnival','perforated','woven','cats','drawnlife'];
const carousel = $('[data-carousel]');
const carouselTrack = $('[data-carousel-track]');
const carouselIds = [...heroIds, ...heroIds];
carouselIds.forEach(id => {
  const project = window.PORTFOLIO_PROJECTS[id];
  const link = document.createElement('a');
  link.className = 'carousel-card';
  link.dataset.project = id;
  link.href = `project.html?v=13&id=${id}`;
  const title = project.titles?.[activeLanguage] || project.title;
  link.innerHTML = `<img src="${project.cover}" alt="${title}" /><span>${title}</span>`;
  carouselTrack.append(link);
});

function cardStep() {
  const card = carouselTrack.querySelector('.carousel-card');
  const gap = parseFloat(getComputedStyle(carouselTrack).columnGap) || 0;
  return card.getBoundingClientRect().width + gap;
}
function moveCarousel(direction) {
  carousel.scrollBy({ left: direction * cardStep(), behavior: 'smooth' });
  window.setTimeout(() => {
    if (carousel.scrollLeft >= carouselTrack.scrollWidth / 2) carousel.scrollLeft -= carouselTrack.scrollWidth / 2;
    if (carousel.scrollLeft <= 0 && direction < 0) carousel.scrollLeft += carouselTrack.scrollWidth / 2;
  }, 650);
}
$('.carousel-next').addEventListener('click', () => moveCarousel(1));
$('.carousel-previous').addEventListener('click', () => moveCarousel(-1));
carousel.addEventListener('wheel', event => {
  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    event.preventDefault();
    carousel.scrollLeft += event.deltaY;
  }
}, { passive:false });

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let carouselTimer = window.setInterval(() => moveCarousel(1), 3800);
  carousel.addEventListener('mouseenter', () => window.clearInterval(carouselTimer));
  carousel.addEventListener('mouseleave', () => { carouselTimer = window.setInterval(() => moveCarousel(1), 3800); });
}
