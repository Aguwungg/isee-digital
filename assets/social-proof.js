document.addEventListener("DOMContentLoaded", () => {
    // 1. Array data dummy
    const notifications = [
        "Budi dari Jakarta baru saja mendaftar Paket Growth",
        "Klinik Sehat baru saja menghubungi Admin",
        "Siska dari Surabaya baru saja mengambil Paket Starter",
        "Toko Berkah sedang berkonsultasi via WhatsApp"
    ];

    // 2. Buat container notifikasi
    const container = document.createElement("div");
    // Tailwind classes untuk styling widget
    // Letakkan di bottom-right (bottom-6 right-6). Z-index tinggi (50).
    container.className = "hidden md:flex fixed bottom-6 right-6 z-50 max-w-sm w-72 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-100 p-4 items-start gap-3 transition-all duration-500 transform translate-y-10 opacity-0 pointer-events-none";
    
    // 3. Ikon notifikasi (Lonceng/Notif)
    const iconWrapper = document.createElement("div");
    iconWrapper.className = "flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-brand-blue";
    iconWrapper.innerHTML = `
        <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
    `;

    // 4. Tempat teks
    const textWrapper = document.createElement("div");
    textWrapper.className = "flex-1";
    
    const title = document.createElement("p");
    title.className = "text-xs font-bold text-slate-500 mb-0.5 uppercase tracking-wider";
    title.innerText = "Aktivitas Terbaru";

    const message = document.createElement("p");
    message.className = "text-sm text-brand-navy font-medium leading-snug";
    
    const time = document.createElement("p");
    time.className = "text-[10px] text-slate-400 mt-1";
    time.innerText = "Baru saja";

    textWrapper.appendChild(title);
    textWrapper.appendChild(message);
    textWrapper.appendChild(time);

    container.appendChild(iconWrapper);
    container.appendChild(textWrapper);

    // Tambahkan ke body
    document.body.appendChild(container);

    let currentIndex = 0;

    // 5. Fungsi untuk menampilkan dan menyembunyikan notifikasi
    function showNotification() {
        // Update teks
        message.innerText = notifications[currentIndex];
        
        // Munculkan
        container.classList.remove("translate-y-10", "opacity-0");
        container.classList.add("translate-y-0", "opacity-100");

        // Jadwalkan untuk hilang setelah 4 detik
        setTimeout(() => {
            container.classList.remove("translate-y-0", "opacity-100");
            container.classList.add("translate-y-10", "opacity-0");
            
            // Lanjut ke indeks berikutnya
            currentIndex = (currentIndex + 1) % notifications.length;
        }, 4000);
    }

    // Mulai siklus: Muncul setiap 8 detik (4 detik tampil + 4 detik hilang)
    setTimeout(() => {
        showNotification();
        setInterval(showNotification, 8000);
    }, 2000); // Tunda awal 2 detik
});
