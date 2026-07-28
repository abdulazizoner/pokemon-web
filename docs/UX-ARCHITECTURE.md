# WP-04 — UX/UI architecture

## Yön

Seçilen yaratıcı yön “Koleksiyon Arşivi”dir: editoryal tipografi, sıcak kâğıt zemini, asit yeşili vurgu, sınırlı mavi ve turuncu kullanımı. Resmî Pokémon arayüzlerine veya marka diline öykünmez; kart görsellerini ürün hiyerarşisinin merkezine koyar.

## Bilgi mimarisi

- Ana sayfa: değer önerisi, seçki, çalışma biçimi
- Kartlar: arama ve filtreli katalog
- Kart detayı: ön/arka görsel, katalog bilgisi, kondisyon, Shopier CTA
- Hakkımızda
- Sıkça sorulan sorular
- 404

## Tasarım ilkeleri

1. Gerçek ürün fotoğrafı ve kondisyon notu birincil güven öğeleridir.
2. Güncel fiyat ve stok için Shopier doğruluk kaynağıdır.
3. Satış CTA'sı dış yönlendirmeyi açıkça belirtir.
4. Temel içerik JavaScript olmadan erişilebilir kalır; JavaScript yalnız filtre ve görsel çevirme etkileşimini geliştirir.
5. Hareket azaltma tercihi desteklenir.

## Responsive yapı

- 900 px altında navigasyon sadeleşir, ana sayfa tek kolona iner.
- Katalog filtreleri mobilde içeriğin üstünde yer alır.
- 560 px altında kart grid'i tek kolondur.
- Ürün detay görselleri küçük ekranda yan yana kalır; içerik tek kolona iner.
