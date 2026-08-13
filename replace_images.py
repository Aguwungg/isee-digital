import re

def update_testimoni():
    with open('testimoni.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Dashboard Analytics mockup
    content = content.replace(
        '<img src="https://via.placeholder.com/600x350/0F172A/046BD2?text=Dashboard+Analytics+Mockup" alt="Dashboard Analytics Isee" class="w-full h-auto object-cover hover:scale-105 transition-transform duration-700">',
        '<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Grafik dashboard analitik pemasaran Isee Digital" class="w-full h-auto object-cover hover:scale-105 transition-transform duration-700">'
    )

    # 14 Klien logos
    # Using generic company/abstract icons or just keeping the alt tags updated, wait, unsplash doesn't have good transparent logos.
    # The prompt says: "Ganti semua gambar placeholder statis... dengan URL gambar dummy bernuansa profesional dan estetik dari sumber online (seperti Unsplash)"
    # I can just use some clean architecture/abstract patterns for client logos or keep via.placeholder? No, the prompt says "Ganti semua gambar placeholder statis (seperti via.placeholder.com)..."
    # So I MUST replace them. I will use random abstract unsplash images and crop them square.
    
    # Wait, the placeholder is "https://via.placeholder.com/150x80/F1F5F9/94A3B8?text=Logo+Klien"
    logo_replacement = '<img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=150&h=80&q=80" alt="Logo Klien Isee Digital" class="w-32 md:w-40 filter grayscale hover:grayscale-0 hover:scale-105 opacity-60 hover:opacity-100 transition-all duration-300 object-cover">'
    
    content = content.replace(
        '<img src="https://via.placeholder.com/150x80/F1F5F9/94A3B8?text=Logo+Klien" alt="Klien Isee" class="w-32 md:w-40 filter grayscale hover:grayscale-0 hover:scale-105 opacity-60 hover:opacity-100 transition-all duration-300">',
        logo_replacement
    )

    # Avatars (SW, AL, MI, BS, DP)
    avatars = {
        'SW': ('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', 'Sarah W.'),
        'AL': ('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80', 'Andi L.'),
        'MI': ('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', 'Maya I.'),
        'BS': ('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', 'Budi S.'),
        'DP': ('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', 'Diana P.')
    }

    for initials, (url, alt_name) in avatars.items():
        old_tag = f'<img src="https://via.placeholder.com/48/E2E8F0/64748B?text={initials}" alt="Avatar" class="w-12 h-12 rounded-full border border-slate-200">'
        new_tag = f'<img src="{url}" alt="Foto Profil Klien {alt_name}" class="w-12 h-12 rounded-full border border-slate-200 object-cover">'
        content = content.replace(old_tag, new_tag)

    with open('testimoni.html', 'w', encoding='utf-8') as f:
        f.write(content)

def update_articles():
    with open('assets/articles.js', 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+SEO"': '"https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Facebook+Ads"': '"https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Data+Driven"': '"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Tiktok+Marketing"': '"https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Personal+Branding"': '"https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Email+Marketing"': '"https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Video+Marketing"': '"https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Copywriting"': '"https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Local+SEO"': '"https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"',
        '"https://via.placeholder.com/600x400/E2E8F0/64748B?text=Ilustrasi+Influencer+Marketing"': '"https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80"'
    }

    for old, new in replacements.items():
        content = content.replace(old, new)

    with open('assets/articles.js', 'w', encoding='utf-8') as f:
        f.write(content)

update_testimoni()
update_articles()
