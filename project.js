const params = new URLSearchParams(window.location.search);
const projects = window.PORTFOLIO_PROJECTS;
const ids = Object.keys(projects);
const id = projects[params.get('id')] ? params.get('id') : ids[0];
const project = projects[id];
document.body.classList.add(`category-${project.category}`);
document.body.dataset.project = id;
const labels = {
  en:{back:'← overview',art:'art',photo:'photography',article:'read article ↗',technical:'Technical information'},
  pt:{back:'← visão geral',art:'arte',photo:'fotografia',article:'ler artigo ↗',technical:'Informações técnicas'},
  es:{back:'← vista general',art:'arte',photo:'fotografía',article:'leer artículo ↗',technical:'Información técnica'},
  de:{back:'← übersicht',art:'kunst',photo:'fotografie',article:'artikel lesen ↗',technical:'Technische Informationen'}
};

document.title = `${project.title} — Vittória Corulla Ferrero`;
document.querySelector('#project-title').textContent = project.title;
document.querySelector('#project-cover').src = project.cover;
document.querySelector('#project-cover').alt = project.title;
document.querySelector('#project-year').textContent = project.year || '';

const gallery = document.querySelector('#project-gallery');
const galleryItems = project.images
  .map((source, index) => ({ source, index }))
  .filter(({ source, index }) => !(index === 0 && source === project.cover));
galleryItems.forEach(({ source, index }) => {
  const figure = document.createElement('figure');
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.image = source;
  button.innerHTML = `<img src="${source}" alt="${project.title}, image ${index + 1}" loading="lazy" />`;
  const caption = document.createElement('figcaption');
  caption.dataset.captionIndex = index;
  figure.append(button, caption);
  gallery.append(figure);
});

const article = document.querySelector('#project-article');
if (project.article) { article.href = project.article; article.hidden = false; }
const currentIndex = ids.indexOf(id);
const previous = ids[(currentIndex - 1 + ids.length) % ids.length];
const next = ids[(currentIndex + 1) % ids.length];
document.querySelector('#previous-project').href = `project.html?v=13&id=${previous}`;
document.querySelector('#next-project').href = `project.html?v=13&id=${next}`;

function setLanguage(language) {
  const copy = labels[language] || labels.en;
  const title = project.titles?.[language] || project.title;
  document.documentElement.lang = language;
  document.title = `${title} — Vittória Corulla Ferrero`;
  document.querySelector('#project-title').textContent = title;
  document.querySelector('#project-cover').alt = title;
  gallery.querySelectorAll('img').forEach((image,index) => { image.alt = `${title}, image ${index + 1}`; });
  const captions = project.captions?.[language] || project.captions?.en || [];
  const captionAt = index => captions[index] || captions[captions.length - 1] || '';
  const coverCaption = document.querySelector('#project-cover-caption');
  coverCaption.textContent = captionAt(0);
  coverCaption.hidden = !captionAt(0);
  gallery.querySelectorAll('figcaption').forEach(caption => {
    const text = captionAt(Number(caption.dataset.captionIndex));
    caption.textContent = text;
    caption.hidden = !text;
  });
  document.querySelector('#previous-project span').textContent = projects[previous].titles?.[language] || projects[previous].title;
  document.querySelector('#next-project span').textContent = projects[next].titles?.[language] || projects[next].title;
  document.querySelector('.overview-link').textContent = copy.back;
  document.querySelector('#project-category').textContent = copy[project.category];
  document.querySelector('#project-copy').textContent = project.copy[language] || project.copy.en;
  article.textContent = copy.article;
  const technicalSection = document.querySelector('#project-technical');
  const technicalList = document.querySelector('#technical-list');
  const technicalRows = project.technical?.[language] || project.technical?.en;
  technicalList.replaceChildren();
  if (technicalRows) {
    technicalSection.hidden = false;
    document.querySelector('#technical-title').textContent = copy.technical;
    technicalRows.forEach(([label,value]) => {
      const row = document.createElement('div');
      row.innerHTML = `<dt>${label}</dt><dd>${value}</dd>`;
      technicalList.append(row);
    });
  } else {
    technicalSection.hidden = true;
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('active', button.dataset.lang === language));
  try { localStorage.setItem('vittoria-language', language); } catch (_) {}
}
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
let language = 'en';
try { language = localStorage.getItem('vittoria-language') || 'en'; } catch (_) {}
setLanguage(language);

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
gallery.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  lightboxImage.src = button.dataset.image;
  lightboxImage.alt = button.querySelector('img').alt;
  lightbox.showModal();
});
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
