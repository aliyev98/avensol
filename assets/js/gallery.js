document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const items = Array.from(gallery.querySelectorAll('.gallery__item'));
  const pager = document.getElementById('galleryPagination');

  // <768px mobil kabul edelim (mixindeki phone-only ile uyumlu)
  const mql = window.matchMedia('(max-width: 767.98px)');
  const DESKTOP_ROWS = 3;

  const rowsPerPage = () => (mql.matches ? 10 : DESKTOP_ROWS);

  const getCols = () => parseInt(getComputedStyle(gallery).columnCount) || 1;
  const pageSize = () => getCols() * rowsPerPage();
  const totalPages = () => Math.max(1, Math.ceil(items.length / pageSize()));

  const VISIBLE_PAGES = 3;
  let current = 1;

  function icon(name) {
    if (name === 'left') {
      return `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path d="M5 12.7395L19 12.7395" stroke="#C90200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 7.7395L5 12.7395" stroke="#C90200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 17.7395L5 12.7395" stroke="#C90200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    }
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
    pager.classList.remove('d-none');          // garanti
    pager.parentElement?.classList?.remove('d-none');
    pager.innerHTML = '';

    const pages = totalPages();

    // Prev
    pager.appendChild(makeItem({
      html: `${icon('left')}<span>Back</span>`,
      enabled: current > 1,
      onClick: () => showPage(current - 1)
    }));

    // 3’lük pencere
    const windowSize = Math.min(VISIBLE_PAGES, pages);
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

    if (doScroll) {
      const isPhone = mql.matches;
      const target = isPhone ? pager : document.getElementById('gallerySection');
      target.scrollIntoView({ behavior: 'smooth', block: isPhone ? 'nearest' : 'start' });
    }
  }

  // Değişiklikleri dinle: kolon sayısı ve breakpoint
  let lastCols = getCols();
  function handleLayoutChange() {
    const nowCols = getCols();
    if (nowCols !== lastCols) {
      lastCols = nowCols;
      showPage(1, false);
    } else {
      // Sadece breakpoint değiştiyse de yenile
      showPage(1, false);
    }
  }
  window.addEventListener('resize', handleLayoutChange);
  mql.addEventListener?.('change', handleLayoutChange);   // iOS/Safari destekli

  showPage(1);
});
