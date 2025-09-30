document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.our-news-video').forEach(el => {
        el.addEventListener('click', () => {
            if (el.classList.contains('is-playing')) return;

            const id = el.dataset.yt;
            const title = el.dataset.title || 'YouTube video';
            const iframe = document.createElement('iframe');

            iframe.src="https://www.youtube-nocookie.com/embed/FV4e5tcitIs?rel=0&loop=1&playlist=FV4e5tcitIs&modestbranding=1&playsinline=1&autoplay=1&mute=1";
            iframe.title = title;
            iframe.allow =
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';

            el.innerHTML = '';
            el.appendChild(iframe);
            el.classList.add('is-playing');
        }, { once: true });
    });
});