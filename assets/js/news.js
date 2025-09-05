document.addEventListener('DOMContentLoaded', () => {
  const PAGE_SIZE = 9;
  const VISIBLE_PAGES = 3;
  const grid = document.getElementById('newsGrid');
  const cards = Array.from(grid.querySelectorAll('.news-card'));
  const pager = document.getElementById('newsPagination');
  const section = document.getElementById('newsSection');

  if (!cards.length) return;

  let current = 1;
  const pages = Math.max(1, Math.ceil(cards.length / PAGE_SIZE));

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

  function drawPagination() {
    pager.innerHTML = '';

    pager.appendChild(
      makeItem({
        html: `${icon('left')} <span>Back</span>`,
        enabled: current > 1,
        onClick: () => showPage(current - 1)
      })
    );

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

    pager.appendChild(
      makeItem({
        html: `<span>Next</span> ${icon('right')} `,
        enabled: current < pages,
        onClick: () => showPage(current + 1)
      })
    );

    pager.parentElement.classList.toggle('d-none', pages <= 1);
  }

  function showPage(page) {
    current = Math.max(1, Math.min(page, pages));
    const start = (current - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    cards.forEach((card, i) => {
      card.classList.toggle('d-none', !(i >= start && i < end));
    });

    drawPagination();
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  showPage(1);
});
