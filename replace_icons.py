import re

html_files = [
    "index.html", "layanan.html", "artikel.html", "baca-artikel.html", 
    "kontak.html", "lowongan.html", "tentang-kami.html", "testimoni.html"
]

def update_footer_and_contacts():
    # SVG Paths
    map_path = '<path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 7 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>'
    wa_path = '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>'
    gmail_path = '<path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>'
    ig_path = '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>'
    tk_path = '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.65-2.22 2.15-5.26 3.22-8.32 3.05-3.09-.17-5.99-1.65-7.9-3.99-1.92-2.35-2.83-5.46-2.5-8.54.34-3.11 1.77-6.01 4.1-8.1 2.3-2.06 5.37-3.15 8.44-2.93V8.1c-1.39-.1-2.82.07-4.14.59-1.29.5-2.45 1.34-3.26 2.45-.81 1.12-1.27 2.49-1.33 3.89-.06 1.42.32 2.85 1.07 4.04.75 1.18 1.83 2.14 3.12 2.69 1.28.54 2.72.68 4.1.4 1.37-.28 2.64-1.01 3.58-2.03.95-1.02 1.56-2.35 1.73-3.75.04-.33.05-.66.05-.99V.02z"/>'

    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Replace Maps SVG
        old_map_svg = r'<svg class="w-5 h-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
        new_map_svg = f'<svg class="w-5 h-5 inline-block hover:text-[#4285F4] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">{map_path}</svg>'
        
        # Exception for kontak.html card where it inherits group-hover
        if file == 'kontak.html':
            # in card
            card_map_svg = f'<svg class="w-5 h-5 inline-block group-hover:text-[#4285F4] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">{map_path}</svg>'
            content = content.replace(old_map_svg, card_map_svg, 1) # first instance is the card
            content = content.replace(old_map_svg, new_map_svg) # second is footer

        else:
            content = content.replace(old_map_svg, new_map_svg)

        # 2. Replace WhatsApp SVG
        old_wa_svg = r'<svg class="w-5 h-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>'
        new_wa_svg = f'<svg class="w-5 h-5 inline-block hover:text-[#25D366] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">{wa_path}</svg>'
        if file == 'kontak.html':
            card_wa_svg = f'<svg class="w-5 h-5 inline-block group-hover:text-[#25D366] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">{wa_path}</svg>'
            content = content.replace(old_wa_svg, card_wa_svg, 1)
            content = content.replace(old_wa_svg, new_wa_svg)
        else:
            content = content.replace(old_wa_svg, new_wa_svg)

        # 3. Replace Gmail SVG
        old_gmail_svg = r'<svg class="w-5 h-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'
        new_gmail_svg = f'<svg class="w-5 h-5 inline-block hover:text-[#EA4335] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">{gmail_path}</svg>'
        if file == 'kontak.html':
            card_gmail_svg = f'<svg class="w-5 h-5 inline-block group-hover:text-[#EA4335] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">{gmail_path}</svg>'
            content = content.replace(old_gmail_svg, card_gmail_svg, 1)
            content = content.replace(old_gmail_svg, new_gmail_svg)
        else:
            content = content.replace(old_gmail_svg, new_gmail_svg)

        # 4. Replace Footer Social Links
        # Instagram Footer
        old_ig_footer = r'<a href="https://www.instagram.com/isee_digitalmarketing/" target="_blank" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300">IG</a>'
        new_ig_footer = f'<a href="https://www.instagram.com/isee_digitalmarketing/" target="_blank" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#E1306C] transition-colors duration-300"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{ig_path}</svg></a>'
        content = content.replace(old_ig_footer, new_ig_footer)
        
        # TikTok Footer
        old_tk_footer = r'<a href="https://www.tiktok.com/@iseedigitalmarketing?is_from_webapp=1&sender_device=pc" target="_blank" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300">TK</a>'
        new_tk_footer = f'<a href="https://www.tiktok.com/@iseedigitalmarketing?is_from_webapp=1&sender_device=pc" target="_blank" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#ff0050] transition-colors duration-300"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{tk_path}</svg></a>'
        content = content.replace(old_tk_footer, new_tk_footer)

        # 5. Instagram & TikTok in kontak.html (Social Media section)
        if file == 'kontak.html':
            # Instagram card old svg
            old_ig_card = r'<svg class="w-8 h-8 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
            new_ig_card = f'<svg class="w-8 h-8 inline-block group-hover:text-[#E1306C] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">{ig_path}</svg>'
            content = content.replace(old_ig_card, new_ig_card)

            # TikTok card old svg
            old_tk_card = r'<svg class="w-8 h-8 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
            new_tk_card = f'<svg class="w-8 h-8 inline-block group-hover:text-[#ff0050] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">{tk_path}</svg>'
            content = content.replace(old_tk_card, new_tk_card)

        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

update_footer_and_contacts()
