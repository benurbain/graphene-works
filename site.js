const menu = document.querySelector('.Mobile-bar-menu');
const overlay = document.querySelector('.Mobile-overlay');
function setMenu(open) {
  document.body.classList.toggle('is-mobile-overlay-active', open);
  menu.setAttribute('aria-expanded', String(open));
  overlay.inert = !open;
  (open ? overlay.querySelector('a') : menu).focus();
}
if (menu && overlay) {
  overlay.inert = true;
  menu.setAttribute('aria-expanded', 'false');
  menu.addEventListener('click', () => setMenu(true));
  overlay.querySelector('.Mobile-overlay-close').addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !overlay.inert) setMenu(false);
  });
}

for (const gallery of document.querySelectorAll('.sqs-gallery-block-slideshow')) {
  const slides = Array.from(gallery.querySelectorAll('.slide'));
  let index = 0;
  const show = next => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
  };
  const controls = document.createElement('div');
  controls.className = 'gallery-controls';
  for (const [label, offset] of [['Previous', -1], ['Next', 1]]) {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', () => show(index + offset));
    controls.append(button);
  }
  gallery.after(controls);
  show(0);
}

const author = new URLSearchParams(location.search).get('author');
if (author) {
  for (const post of document.querySelectorAll('.BlogList-item')) {
    post.hidden = !Array.from(post.querySelectorAll('a')).some(link => new URL(link.href).searchParams.get('author') === author);
  }
}
