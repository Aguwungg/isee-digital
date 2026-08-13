document.addEventListener('DOMContentLoaded', () => {
    // Ambil URL Parameter
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');

    if (idParam && typeof dummyArticles !== 'undefined') {
        const article = dummyArticles.find(a => a.id == idParam);

        if (article) {
            // Element target
            const titleEl = document.getElementById('article-title');
            const metaEl = document.getElementById('article-meta');
            const imageEl = document.getElementById('article-image');
            const contentEl = document.getElementById('article-content');

            // Replace content
            if (titleEl) titleEl.innerText = article.title;
            if (metaEl) metaEl.innerText = `Oleh ${article.author} / ${article.date}`;
            if (imageEl) {
                imageEl.src = article.image;
                imageEl.alt = article.title;
            }
            if (contentEl) contentEl.innerText = article.content;
        }
    }
});
