document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const items = Array.from(gallery.querySelectorAll('.gallery__item'));
  const pager = document.getElementById('galleryPagination');

  const ROWS_PER_PAGE = 3;
  const VISIBLE_PAGES = 3; // <- her zaman en fazla 3 numara göster
  let current = 1;

  // Aktif kolon sayısını CSS'ten oku
  const getCols = () => parseInt(getComputedStyle(gallery).columnCount) || 1;
  const pageSize = () => getCols() * ROWS_PER_PAGE;
  const totalPages = () => Math.max(1, Math.ceil(items.length / pageSize()));

  function icon(name) {
    if (name === 'left') {
      return `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path d="M5 12.7395L19 12.7395" stroke="#C90200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 7.7395L5 12.7395" stroke="#C90200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 17.7395L5 12.7395" stroke="#C90200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    }
    // right
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path d="M19 12.7395H5" stroke="#C90200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 17.7395L19 12.7395" stroke="#C90200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 7.7395L19 12.7395" stroke="#C90200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  }

  function makeItem({ html, enabled, onClick }) {
    const li = document.createElement('li');
    li.className = 'page-item' + (enabled ? '' : ' disabled');
    const a = document.createElement('a');
    a.className = 'page-link d-inline-flex align-items-center gap-2';
    a.href = '#';
    a.innerHTML = html;
    if (enabled) a.addEventListener('click', e => { e.preventDefault(); onClick(); });
    li.appendChild(a);
    return li;
  }

  function drawPagination() {
    pager.innerHTML = '';
    const pages = totalPages();

    // Prev
    pager.appendChild(makeItem({
      html: `${icon('left')}<span>Back</span>`,
      enabled: current > 1,
      onClick: () => showPage(current - 1)
    }));

    // --- SADECE 3 NUMARA GÖRÜNECEK ŞEKİLDE PENCERE HESABI ---
    const windowSize = Math.min(VISIBLE_PAGES, pages);
    // orta merkezli pencere: (1..pages) aralığında kalacak
    let start = Math.max(1, Math.min(current - Math.floor(windowSize / 2), pages - windowSize + 1));
    let end = start + windowSize - 1;

    for (let i = start; i <= end; i++) {
      const li = document.createElement('li');
      li.className = 'page-item' + (i === current ? ' active' : '');
      const a = document.createElement('a');
      a.className = 'page-link';
      a.href = '#';
      a.textContent = i;
      if (i === current) a.setAttribute('aria-current', 'page');
      a.addEventListener('click', e => { e.preventDefault(); showPage(i); });
      li.appendChild(a);
      pager.appendChild(li);
    }
    // --------------------------------------------------------

    // Next
    pager.appendChild(makeItem({
      html: `<span>Next</span>${icon('right')}`,
      enabled: current < pages,
      onClick: () => showPage(current + 1)
    }));
  }

  function showPage(page, doScroll = true) {
    current = Math.max(1, Math.min(page, totalPages()));
    const ps = pageSize();
    const start = (current - 1) * ps;
    const end = start + ps;

    items.forEach((el, i) => el.classList.toggle('d-none', !(i >= start && i < end)));
    drawPagination();
    if (doScroll) document.getElementById('gallerySection')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Ekran yeniden boyutlanınca kolon sayısı değişirse sayfayı yenile
  let lastCols = getCols();
  window.addEventListener('resize', () => {
    const now = getCols();
    if (now !== lastCols) {
      lastCols = now;
      // kolon sayısı değişti → sayfa boyutunu güncelle, başa dön
      showPage(1, false);
    }
  });

  showPage(1);
});
