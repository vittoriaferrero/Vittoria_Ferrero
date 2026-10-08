const categoryData = {
  social:{number:'01',cover:'assets/portfolio/photo-projects/holistic-center/01.jpg',projects:['holistic']},
  portraits:{number:'02',cover:'assets/portfolio/photo-projects/bettina-baumann/14.jpg',projects:['bettina','jenny']},
  personal:{number:'03',cover:'assets/portfolio/photo-fortaleza/01.jpg',projects:['warm','ceara','newyork','carnival']}
};

const directoryCopy = {
  en:{portfolio:'← portfolio',photography:'photography',social:'social media content',portraits:'portraits & professional shoots',personal:'personal projects',socialIntro:'Documentary images and visual content for digital communication.',portraitsIntro:'Portrait commissions for professional identity, campaigns and social media.',personalIntro:'Portraiture, documentary observation and street photography.',allCategories:'← all photography categories',open:'open project ↗'},
  pt:{portfolio:'← portfólio',photography:'fotografia',social:'conteúdo para redes sociais',portraits:'retratos & ensaios profissionais',personal:'projetos pessoais',socialIntro:'Imagens documentais e conteúdo visual para comunicação digital.',portraitsIntro:'Retratos comissionados para identidade profissional, campanhas e redes sociais.',personalIntro:'Retrato, observação documental e fotografia de rua.',allCategories:'← todas as subseções de fotografia',open:'abrir projeto ↗'},
  es:{portfolio:'← portafolio',photography:'fotografía',social:'contenido para redes sociales',portraits:'retratos y sesiones profesionales',personal:'proyectos personales',socialIntro:'Imágenes documentales y contenido visual para comunicación digital.',portraitsIntro:'Retratos por encargo para identidad profesional, campañas y redes sociales.',personalIntro:'Retrato, observación documental y fotografía callejera.',allCategories:'← todas las subsecciones de fotografía',open:'abrir proyecto ↗'},
  de:{portfolio:'← portfolio',photography:'fotografie',social:'Social-Media-Inhalte',portraits:'Porträts & professionelle Shootings',personal:'persönliche Projekte',socialIntro:'Dokumentarische Bilder und visuelle Inhalte für digitale Kommunikation.',portraitsIntro:'Auftragsporträts für professionelle Identität, Kampagnen und Social Media.',personalIntro:'Porträt, dokumentarische Beobachtung und Straßenfotografie.',allCategories:'← alle Fotografie-Bereiche',open:'projekt öffnen ↗'}
};

const params = new URLSearchParams(window.location.search);
const categoryId = categoryData[params.get('category')] ? params.get('category') : null;
const overview = document.querySelector('#category-overview');
const categoryView = document.querySelector('#category-view');
const projectList = document.querySelector('#category-projects');

function renderProjects(language) {
  if (!categoryId) return;
  const copy = directoryCopy[language] || directoryCopy.en;
  const category = categoryData[categoryId];
  projectList.dataset.count = String(category.projects.length);
  document.querySelector('#category-number').textContent = category.number;
  document.querySelector('#category-title').textContent = copy[categoryId];
  document.querySelector('#category-intro').textContent = copy[`${categoryId}Intro`];
  projectList.replaceChildren();
  category.projects.forEach(id => {
    const project = window.PORTFOLIO_PROJECTS[id];
    const title = project.titles?.[language] || project.title;
    const link = document.createElement('a');
    link.className = 'project-link';
    link.href = `project.html?v=13&id=${id}`;
    link.innerHTML = `<div class="project-cover"><img src="${project.cover}" alt="${title}" loading="lazy" /></div><div class="project-label"><h3>${title}</h3><span>${copy.open}</span></div>`;
    projectList.append(link);
  });
  document.title = `${copy[categoryId]} — Vittória Corulla Ferrero`;
}

function setLanguage(language) {
  const copy = directoryCopy[language] || directoryCopy.en;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-copy]').forEach(element => {
    const value = copy[element.dataset.copy];
    if (value) element.textContent = value;
  });
  document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('active',button.dataset.lang === language));
  if (categoryId) renderProjects(language);
  else document.title = `${copy.photography} — Vittória Corulla Ferrero`;
  try { localStorage.setItem('vittoria-language',language); } catch (_) {}
}

if (categoryId) {
  overview.hidden = true;
  categoryView.hidden = false;
}

document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click',() => setLanguage(button.dataset.lang)));
let language = 'en';
try { language = localStorage.getItem('vittoria-language') || 'en'; } catch (_) {}
setLanguage(language);
