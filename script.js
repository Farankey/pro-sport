
const pages = ['home', 'football', 'hockey', 'tennis'];

const menu = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');

function showPage() {
  const requested = location.hash.slice(1);

  // #sports — це блок головної сторінки.
  const page = pages.includes(requested) ? requested : 'home';

  // Показуємо лише потрібну сторінку.
  document.querySelectorAll('.page').forEach(section => {
    section.classList.toggle('active', section.id === page);
  });

  // Підсвічуємо активний пункт меню.
  document.querySelectorAll('.nav a').forEach(link => {
    const isActive = link.dataset.page === page;

    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  // Закриваємо мобільне меню.
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');

  // Прокручування до спортивних карток.
  if (requested === 'sports') {
    requestAnimationFrame(() => {
      document.getElementById('sports').scrollIntoView({
        behavior: 'smooth'
      });
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
}

// Відкриття та закриття мобільного меню.
menuToggle.addEventListener('click', () => {
  const opened = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
});

// Перемикання розділів через адресний рядок.
window.addEventListener('hashchange', showPage);

// Відкриваємо потрібний розділ при запуску.
showPage();
