document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.querySelector('.mobile-menu-btn');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const mobileMenu = document.getElementById('mobileMenu');
  const headerBtn = document.querySelector('.header-btn'); // desktop-кнопка
  const header = document.querySelector('.header'); // sticky header

  // Якщо в мобільному меню є кнопка або лінк до pets:
  const mobilePetsBtn = document.querySelector(
    '.mobile-nav-btn, .mobile-nav a[href="#pets"]'
  );

  const isSticky = el => {
    if (!el) return false;
    const pos = getComputedStyle(el).position;
    return pos === 'sticky' || pos === 'fixed';
  };

  const getHeaderOffset = () => (isSticky(header) ? header.offsetHeight : 0);
  const openMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const smoothScrollToId = id => {
    const target = document.getElementById(id);
    if (!target) return;
    const y =
      window.pageYOffset +
      target.getBoundingClientRect().top -
      getHeaderOffset();
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // Відкрити/закрити меню
  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  // Клік по бекдропу (поза контентом меню)
  mobileMenu?.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Закриття по Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      closeMenu();
    }
  });

  // Клік по desktop-кнопці «Взяти друга»
  headerBtn?.addEventListener('click', e => {
    e.preventDefault();
    smoothScrollToId('pets');
  });

  // Клік по пункту/кнопці в мобільному меню → скрол + закрити меню
  mobilePetsBtn?.addEventListener('click', e => {
    e.preventDefault();
    closeMenu();
    smoothScrollToId('pets');
  });

  // Універсально: всі якірні лінки в документі
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href');
      const id = hash?.slice(1);
      if (!id) return;
      e.preventDefault();
      closeMenu();
      smoothScrollToId(id);
    });
  });
});
