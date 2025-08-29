document.addEventListener('DOMContentLoaded', function () {
    const PAGE_SIZE = 6;
    const grid = document.getElementById('catalogueGrid');
    // const cols = Array.from(grid.querySelectorAll('.col'));
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
        current = page;
        const start = (page - 1) * PAGE_SIZE;
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
</svg> `;
    }

    function drawPagination() {
        ul.innerHTML = '';

        // BACK (sol ok + Back)
        ul.appendChild(
            makeItem({
                html: `${icon('left')} <span>Back</span>`,
                enabled: current > 1,
                onClick: () => showPage(current - 1),
            })
        );

        // Sayfa numaraları
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = 'page-item' + (i === current ? ' active' : '');
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.textContent = i;
            a.addEventListener('click', (e) => { e.preventDefault(); showPage(i); });
            li.appendChild(a);
            ul.appendChild(li);
        }

        // NEXT (Next + sağ ok)
        ul.appendChild(
            makeItem({
                html: `<span>Next</span> ${icon('right')} `,
                enabled: current < totalPages,
                onClick: () => showPage(current + 1),
            })
        );
    }

    function makeItem({ html, enabled, onClick }) {
        const li = document.createElement('li');
        li.className = 'page-item' + (enabled ? '' : ' disabled');
        const a = document.createElement('a');
        a.className = 'page-link d-inline-flex align-items-center gap-2';
        a.href = '#';
        a.innerHTML = html; // ← metin + ikon buradan geliyor
        if (enabled) {
            a.addEventListener('click', (e) => { e.preventDefault(); onClick(); });
        }
        li.appendChild(a);
        return li;
    }

    // İlk sayfayı göster
    showPage(1);
});