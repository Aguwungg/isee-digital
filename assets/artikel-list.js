document.addEventListener('DOMContentLoaded', () => {
    const articleGrid = document.getElementById('article-grid');
    const paginationContainer = document.getElementById('pagination-container');
    if (!articleGrid || !paginationContainer) return;

    const itemsPerPage = 6;
    let currentPage = 1;

    function renderArticles(page) {
        articleGrid.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = dummyArticles.slice(start, end);

        paginatedItems.forEach(article => {
            // Extract day and month from date
            const dateParts = article.date.split(' ');
            const day = dateParts[0];
            const month = dateParts[1] ? dateParts[1].substring(0, 3) : 'Agu';

            const card = document.createElement('div');
            card.className = "bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 article-card";
            card.innerHTML = `
                <a href="baca-artikel.html?id=${article.id}" class="block relative">
                    <img src="${article.image}" alt="${article.title}" class="w-full h-56 object-cover rounded-t-3xl">
                    <div class="absolute -bottom-6 left-6 w-14 h-14 bg-white rounded-full shadow-md flex flex-col justify-center items-center border border-slate-50">
                        <span class="text-brand-blue font-extrabold text-lg leading-none">${day}</span>
                        <span class="text-slate-400 text-[10px] uppercase font-bold mt-0.5">${month}</span>
                    </div>
                </a>
                <div class="p-6 pt-10">
                    <div class="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
                        <span class="flex items-center gap-1">👤 ${article.author}</span>
                        <span>•</span>
                        <span class="flex items-center gap-1 category-label">📁 ${article.category}</span>
                    </div>
                    <a href="baca-artikel.html?id=${article.id}"><h3 class="font-bold text-brand-navy text-lg leading-snug hover:text-brand-blue transition-colors line-clamp-2">${article.title}</h3></a>
                </div>
            `;
            articleGrid.appendChild(card);
        });
        renderPagination();
    }

    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(dummyArticles.length / itemsPerPage);

        // Prev button
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '&lsaquo;';
        prevBtn.className = "w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-brand-navy transition-colors";
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderArticles(currentPage);
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Page buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.innerText = i;
            if (i === currentPage) {
                pageBtn.className = "page-btn w-8 h-8 flex items-center justify-center rounded-full bg-brand-blue text-white font-bold shadow-md";
            } else {
                pageBtn.className = "page-btn w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 transition-colors font-medium";
            }
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderArticles(currentPage);
            });
            paginationContainer.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '&rsaquo;';
        nextBtn.className = "w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-brand-navy transition-colors";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderArticles(currentPage);
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // Initial render
    renderArticles(currentPage);
});
