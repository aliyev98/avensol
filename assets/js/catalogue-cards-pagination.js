document.addEventListener('DOMContentLoaded', function () {
  const PAGE_SIZE = 6;
  const VISIBLE_PAGES = 3; // <- her zaman en fazla 3 numara göster
  const grid = document.getElementById('catalogueGrid');
  const cards = Array.from(grid.querySelectorAll('.catalogue-card'));
  const totalPages = Math.ceil(cards.length / PAGE_SIZE);

  const ul = document.getElementById('cataloguePagination');
  const sectionTop = document.getElementById('catalogue');

  if (totalPages <= 1) {
    ul.parentElement.classList.add('d-none');
    return;
  }

  let current = 1;

  function showPage(page) {
    // sayfa sınırlarını koru
    current = Math.max(1, Math.min(page, totalPages));
    const start = (current - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    cards.forEach((card, i) => {
      card.classList.toggle('d-none', !(i >= start && i < end));
    });

    drawPagination();
    sectionTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

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
    if (enabled) {
      a.addEventListener('click', (e) => { e.preventDefault(); onClick(); });
    }
    li.appendChild(a);
    return li;
  }

  function drawPagination() {
    ul.innerHTML = '';

    // BACK
    ul.appendChild(
      makeItem({
        html: `${icon('left')} <span>Back</span>`,
        enabled: current > 1,
        onClick: () => showPage(current - 1),
      })
    );

    // --- SADECE 3 NUMARALIK PENCERE ---
    const windowSize = Math.min(VISIBLE_PAGES, totalPages);
    let start = Math.max(1, Math.min(current - Math.floor(windowSize / 2), totalPages - windowSize + 1));
    let end = start + windowSize - 1;

    for (let i = start; i <= end; i++) {
      const li = document.createElement('li');
      li.className = 'page-item' + (i === current ? ' active' : '');
      const a = document.createElement('a');
      a.className = 'page-link';
      a.href = '#';
      a.textContent = i;
      if (i === current) a.setAttribute('aria-current', 'page');
      a.addEventListener('click', (e) => { e.preventDefault(); showPage(i); });
      li.appendChild(a);
      ul.appendChild(li);
    }
    // ----------------------------------

    // NEXT
    ul.appendChild(
      makeItem({
        html: `<span>Next</span> ${icon('right')}`,
        enabled: current < totalPages,
        onClick: () => showPage(current + 1),
      })
    );
  }

  // İlk sayfayı göster
  showPage(1);
});
