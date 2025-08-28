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


    function drawPagination() {
        ul.innerHTML = '';

        // Prev
        ul.appendChild(makeItem('Prev', current > 1, () => showPage(current - 1)));

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

        // Next
        ul.appendChild(makeItem('Next', current < totalPages, () => showPage(current + 1)));
    }

    function makeItem(label, enabled, onClick) {
        const li = document.createElement('li');
        li.className = 'page-item' + (enabled ? '' : ' disabled');
        const a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#';
        a.textContent = label;
        if (enabled) {
            a.addEventListener('click', (e) => { e.preventDefault(); onClick(); });
        }
        li.appendChild(a);
        return li;
    }

    // İlk sayfayı göster
    showPage(1);
});