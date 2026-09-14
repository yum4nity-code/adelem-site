const menu = document.querySelector('.menu-overlay');
const openButton = document.querySelector('.menu-button');
const closeButton = document.querySelector('.menu-close');

function setMenu(open) {
  if (!menu) return;
  menu.classList.toggle('open', open);
}

if (openButton) openButton.addEventListener('click', function () { setMenu(true); });
if (closeButton) closeButton.addEventListener('click', function () { setMenu(false); });

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
