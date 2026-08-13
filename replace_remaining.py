def update_remaining_articles():
    with open('assets/articles.js', 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Media+Sosial"': '"https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Google+Ads"': '"https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+AI+Konten"': '"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Brand+Identity"': '"https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Metrik"': '"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"'
    }

    for old, new in replacements.items():
        content = content.replace(old, new)

    with open('assets/articles.js', 'w', encoding='utf-8') as f:
        f.write(content)

update_remaining_articles()
