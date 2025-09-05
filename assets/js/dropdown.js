document.addEventListener('DOMContentLoaded', () => {
  const KEY = 'lang'; // localStorage anahtarı
  const toggle = document.getElementById('langToggle');
  const labelEl = toggle.querySelector('.selected-lang');
  const menu  = document.getElementById('langMenu');

  function apply(lang) {
    const item = menu.querySelector(`[data-lang="${lang}"]`);
    if (!item) return;
    const label = item.dataset.label || item.textContent.trim();

    // Buton metnini güncelle
    labelEl.textContent = label;

    // Menüde tüm dilleri görünür yap, seçileni gizle
    menu.querySelectorAll('.dropdown-item').forEach(a => {
      a.classList.remove('d-none', 'active');
    });
    item.classList.add('d-none');

    // <html lang="..."> güncelle + kalıcı yap
    document.documentElement.lang = (lang === 'ru') ? 'ru' : 'az';
    localStorage.setItem(KEY, lang);

    // Eğer daha önce kurduğumuz i18n sistemi varsa tetikle
    if (window.i18n && typeof window.i18n.setLanguage === 'function') {
      // kendi i18n dosya kodların farklıysa burada eşle
      window.i18n.setLanguage(lang).catch?.(()=>{});
    }
  }

  // Başlangıç (kayıtlı yoksa AZE)
  const saved = localStorage.getItem(KEY) || 'az';
  apply(saved);

  // Tıklandığında değiştir
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('.dropdown-item');
    if (!a) return;
    e.preventDefault();
    apply(a.dataset.lang);
  });
});
