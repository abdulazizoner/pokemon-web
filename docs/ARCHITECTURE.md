# Architecture decision

## Karar

Astro statik çıktı, TypeScript strict mode ve içerik koleksiyonları kullanılacaktır. Natro yalnızca derlenmiş dosyaları sunacaktır.

## Sınırlar

- Sunucu tarafı çalışma zamanı yoktur.
- Veritabanı yoktur.
- Müşteri verisi toplanmaz.
- Ürünler yerel Markdown kayıtlarıdır.
- Shopier bağlantısı şema doğrulamasından geçer.
- Üretim URL'si `PUBLIC_SITE_URL` ile build sırasında verilir.

## İçerik akışı

1. Ürün Shopier'de oluşturulur.
2. Gerçek ön/arka fotoğraflar hazırlanır.
3. `src/content/cards` altında ürün kaydı eklenir.
4. Statik build doğrulamaları çalışır.
5. `dist/` Natro'ya yüklenir.
