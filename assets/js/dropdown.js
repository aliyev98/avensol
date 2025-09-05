document.addEventListener('DOMContentLoaded', () => {
  const KEY = 'lang';
  const toggle = document.getElementById('langToggle');
  const labelEl = toggle.querySelector('.selected-lang');
  const menu  = document.getElementById('langMenu');

  function apply(lang) {
    const item = menu.querySelector(`[data-lang="${lang}"]`);
    if (!item) return;
    const label = item.dataset.label || item.textContent.trim();

    labelEl.textContent = label;

    menu.querySelectorAll('.dropdown-item').forEach(a => {
      a.classList.remove('d-none', 'active');
    });
    item.classList.add('d-none');

    document.documentElement.lang = (lang === 'ru') ? 'ru' : 'az';
    localStorage.setItem(KEY, lang);

    if (window.i18n && typeof window.i18n.setLanguage === 'function') {
      window.i18n.setLanguage(lang).catch?.(()=>{});
    }
  }

  const saved = localStorage.getItem(KEY) || 'az';
  apply(saved);

  menu.addEventListener('click', (e) => {
    const a = e.target.closest('.dropdown-item');
    if (!a) return;
    e.preventDefault();
    apply(a.dataset.lang);
  });
});
