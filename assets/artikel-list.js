document.addEventListener('DOMContentLoaded', async () => {
    const articleGrid = document.getElementById('article-grid');
    const paginationContainer = document.getElementById('pagination-container');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!articleGrid || !paginationContainer) return;

    const itemsPerPage = 6;
    let currentPage = 1;
    let currentCategory = 'Semua';
    let searchQuery = '';
    let categoryMap = {}; // mapping "Name" -> ID
    let currentAbortController = null;

    // Helper: format date
    function formatDate(dateStr) {
        const dateObj = new Date(dateStr);
        if (isNaN(dateObj)) return { day: '1', month: 'Agu', full: '1 Agu 2026' };
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        return {
            day: dateObj.getDate().toString(),
            month: months[dateObj.getMonth()],
            full: `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`
        };
    }

    // Initialize
    async function init() {
        articleGrid.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mb-4"></div>
                <p class="text-slate-500 font-medium">Memuat artikel...</p>
            </div>
        `;
        
        try {
            // Fetch categories for mapping
            const catRes = await fetch('https://iseedigitalmarketing.com/wp-json/wp/v2/categories?per_page=100');
            if (catRes.ok) {
                const categories = await catRes.json();
                categories.forEach(c => {
                    categoryMap[c.name.toLowerCase()] = c.id;
                });
            }
        } catch (e) {
            console.error("Gagal memuat kategori", e);
        }

        fetchAndRender();
    }

    // Event Listener for Search
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                searchQuery = e.target.value.trim();
                currentPage = 1; 
                fetchAndRender();
            }, 500);
        });
    }

    // Event Listener for Category Buttons
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => {
                    b.classList.remove('bg-brand-navy', 'text-white', 'shadow-md');
                    b.classList.add('bg-transparent', 'text-slate-500', 'hover:text-brand-blue', 'hover:bg-slate-50');
                });
                
                btn.classList.remove('bg-transparent', 'text-slate-500', 'hover:text-brand-blue', 'hover:bg-slate-50');
                btn.classList.add('bg-brand-navy', 'text-white', 'shadow-md');
                
                currentCategory = btn.getAttribute('data-category');
                currentPage = 1;
                fetchAndRender();
            });
        });
    }

    async function fetchAndRender() {
        if (currentAbortController) {
            currentAbortController.abort();
        }
        currentAbortController = new AbortController();

        articleGrid.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mb-4"></div>
                <p class="text-slate-500 font-medium">Memuat artikel...</p>
            </div>
        `;
        paginationContainer.innerHTML = '';

        try {
            let url = `https://iseedigitalmarketing.com/wp-json/wp/v2/posts?_embed&per_page=${itemsPerPage}&page=${currentPage}`;
            
            if (searchQuery) {
                url += `&search=${encodeURIComponent(searchQuery)}`;
            }

            if (currentCategory !== 'Semua') {
                const catId = categoryMap[currentCategory.toLowerCase()];
                if (catId) {
                    url += `&categories=${catId}`;
                } else {
                    // Category not found on server, render empty
                    renderEmptyState();
                    return;
                }
            }
            
            // Cache busting
            url += `&_t=${new Date().getTime()}`;

            const response = await fetch(url, {
                signal: currentAbortController.signal,
                cache: 'no-store'
            });

            if (!response.ok) {
                if (response.status === 400 && currentPage > 1) {
                     // page out of bounds
                     renderEmptyState();
                     return;
                }
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const totalPages = parseInt(response.headers.get('X-WP-TotalPages')) || 1;
            const posts = await response.json();

            if (posts.length === 0) {
                renderEmptyState();
                return;
            }

            renderArticles(posts);
            renderPagination(totalPages);

        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Gagal mengambil data dari WordPress:", error);
                articleGrid.innerHTML = `
                    <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                        <p class="text-red-500 font-bold text-xl mb-2">Gagal Memuat Artikel</p>
                        <p class="text-slate-500">Pastikan koneksi internet stabil atau coba beberapa saat lagi.</p>
                    </div>
                `;
            }
        }
    }

    function renderEmptyState() {
        articleGrid.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <svg class="w-24 h-24 text-slate-200 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 class="text-2xl font-bold text-brand-navy mb-2">Pencarian Tidak Ditemukan</h3>
                <p class="text-slate-500 max-w-md mx-auto">Maaf, kami tidak menemukan artikel untuk kategori "<span class="font-semibold text-brand-navy">${currentCategory}</span>"${searchQuery ? ` dengan kata kunci "<span class="font-semibold text-brand-navy">${searchQuery}</span>"` : ''}.</p>
            </div>
        `;
    }

    function renderArticles(posts) {
        articleGrid.innerHTML = '';

        posts.forEach(post => {
            const dateObj = formatDate(post.date);
            const title = post.title?.rendered || 'Tanpa Judul';
            
            // Extract featured image
            let imageUrl = 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80';
            if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
                imageUrl = post._embedded['wp:featuredmedia'][0].source_url || imageUrl;
            }

            // Extract author
            let author = 'Tim Isee Digital';
            if (post._embedded && post._embedded['author'] && post._embedded['author'][0]) {
                author = post._embedded['author'][0].name;
            }

            // Extract category
            let catName = 'Digital Marketing';
            if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0][0]) {
                catName = post._embedded['wp:term'][0][0].name;
            }

            const card = document.createElement('div');
            card.className = "bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 article-card";
            card.innerHTML = `
                <a href="detail-artikel.html?id=${post.id}" class="block relative">
                    <img src="${imageUrl}" alt="${title}" class="w-full h-56 object-cover rounded-t-3xl">
                    <div class="absolute -bottom-6 left-6 w-14 h-14 bg-white rounded-full shadow-md flex flex-col justify-center items-center border border-slate-50">
                        <span class="text-brand-blue font-extrabold text-lg leading-none">${dateObj.day}</span>
                        <span class="text-slate-400 text-[10px] uppercase font-bold mt-0.5">${dateObj.month}</span>
                    </div>
                </a>
                <div class="p-6 pt-10">
                    <div class="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
                        <span class="flex items-center gap-1">👤 ${author}</span>
                        <span>•</span>
                        <span class="flex items-center gap-1 category-label">📁 ${catName}</span>
                    </div>
                    <a href="detail-artikel.html?id=${post.id}">
                        <h3 class="font-bold text-brand-navy text-lg leading-snug hover:text-brand-blue transition-colors line-clamp-2">${title}</h3>
                    </a>
                </div>
            `;
            articleGrid.appendChild(card);
        });
    }

    function renderPagination(totalPages) {
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;

        // Prev button
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '&lsaquo;';
        prevBtn.className = "w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-brand-navy transition-colors";
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                fetchAndRender();
                document.getElementById('article-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Calculate pages to show (max 5 buttons)
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);
        
        if (currentPage <= 2) endPage = Math.min(totalPages, 5);
        if (currentPage >= totalPages - 1) startPage = Math.max(1, totalPages - 4);

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.innerText = i;
            if (i === currentPage) {
                pageBtn.className = "page-btn w-8 h-8 flex items-center justify-center rounded-full bg-brand-blue text-white font-bold shadow-md";
            } else {
                pageBtn.className = "page-btn w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 transition-colors font-medium";
            }
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                fetchAndRender();
                document.getElementById('article-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                fetchAndRender();
                document.getElementById('article-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // Start
    init();
});
