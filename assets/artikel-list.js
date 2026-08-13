document.addEventListener('DOMContentLoaded', () => {
    const articleGrid = document.getElementById('article-grid');
    const paginationContainer = document.getElementById('pagination-container');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!articleGrid || !paginationContainer) return;

    const itemsPerPage = 6;
    let currentPage = 1;
    let currentCategory = 'Semua';
    let searchQuery = '';
    let filteredArticles = [...dummyArticles];

    // Initialize
    applyFilters();

    // Event Listener for Search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            currentPage = 1; // Reset to page 1 on new search
            applyFilters();
        });
    }

    // Event Listener for Category Buttons
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterButtons.forEach(b => {
                    b.classList.remove('bg-brand-blue', 'text-white', 'hover:shadow-md');
                    b.classList.add('bg-blue-50', 'text-brand-blue', 'hover:bg-brand-blue', 'hover:text-white');
                });
                
                // Add active class to clicked button
                btn.classList.remove('bg-blue-50', 'text-brand-blue', 'hover:bg-brand-blue', 'hover:text-white');
                btn.classList.add('bg-brand-blue', 'text-white', 'hover:shadow-md');
                
                currentCategory = btn.getAttribute('data-category');
                currentPage = 1; // Reset to page 1 on new filter
                applyFilters();
            });
        });
    }

    function applyFilters() {
        filteredArticles = dummyArticles.filter(article => {
            const matchCategory = currentCategory === 'Semua' || article.category === currentCategory;
            const titleMatch = article.title.toLowerCase().includes(searchQuery);
            const excerptMatch = article.excerpt.toLowerCase().includes(searchQuery);
            const matchSearch = searchQuery === '' || titleMatch || excerptMatch;
            
            return matchCategory && matchSearch;
        });
        
        renderArticles(currentPage);
    }

    function renderArticles(page) {
        articleGrid.innerHTML = '';
        
        if (filteredArticles.length === 0) {
            // Render Empty State
            articleGrid.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <svg class="w-24 h-24 text-slate-200 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 class="text-2xl font-bold text-brand-navy mb-2">Pencarian Tidak Ditemukan</h3>
                    <p class="text-slate-500 max-w-md mx-auto">Maaf, kami tidak menemukan artikel untuk kategori "<span class="font-semibold text-brand-navy">${currentCategory}</span>" dengan kata kunci "<span class="font-semibold text-brand-navy">${searchQuery}</span>".</p>
                </div>
            `;
            paginationContainer.innerHTML = '';
            return;
        }

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = filteredArticles.slice(start, end);

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
        const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
        
        if (totalPages <= 1) return; // Hide pagination if 1 page or less

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
});
