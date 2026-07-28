# SEO, erişilebilirlik ve frontend güvenliği

## SEO

- Her indexlenebilir sayfada benzersiz başlık ve açıklama bulunur.
- Canonical kökü `src/config/store.ts` / `PUBLIC_SITE_URL` üzerinden merkezîdir.
- Nihai domain WP-09’da değiştirilmelidir.
- `@astrojs/sitemap` build sırasında sitemap üretir.
- `robots.txt` statik endpoint olarak üretilir.
- Open Graph/Twitter için lisans güvenli `public/og.png` kullanılır.
- Ürün sayfalarında breadcrumb JSON-LD bulunur.
- Sahte fiyat, stok, puan, yorum veya resmî marka structured data’sı yayınlanmaz.
- Draft/hidden ürünler için sayfa üretilmez.
- 404 sayfası `noindex` kullanır.

## Nihai domain değiştirme

```powershell
$env:PUBLIC_SITE_URL = "https://nihai-domain.example"
pnpm build
```

Build’den sonra canonical, sitemap ve robots içindeki URL’ler kontrol edilmelidir.

## Erişilebilirlik

- `header`, `nav`, `main`, `footer` landmark’ları
- atlama bağlantısı
- mantıklı heading sırası
- görünür `:focus-visible`
- tüm filtrelerde ilişkili label
- klavyeyle açılan mobil navigasyon
- hover gerektirmeyen ön/arka görsel kontrolü
- `aria-pressed` ile yüz durumu
- JavaScript kapalıyken iki yüzün de görünmesi
- ürün ve durum için anlamlı alt metin/etiket
- satıldı/boş sonuç bilgisinin yalnız renkle verilmemesi
- `prefers-reduced-motion` ile animasyon azaltma

## Erişilebilirlik doğrulaması

- axe otomasyonu ana sayfa, katalog ve ürün detayında E2E içinde çalışır
- desktop ve mobile klavye senaryoları
- 390 px mobil, tablet ve geniş masaüstü görsel QA
- uzun Türkçe başlık ve kondisyon notu kontrolleri

## Gizlilik

- analytics/tracking yok
- cookie yok
- iletişim formu yok
- müşteri verisi yok
- üçüncü taraf font isteği yok
- yalnız kullanıcı Shopier CTA’sını seçtiğinde dış sayfaya geçilir

## Frontend güvenliği

- satın alma URL’si yalnız HTTPS Shopier allowlist’i
- dış bağlantılarda `noopener noreferrer`
- source map kapalı
- build öncesi secret taraması
- Natro için CSP, nosniff, referrer ve permissions başlıkları deployment taslağında
- `.env`, kaynak kod ve test çıktıları hosting’e yüklenmez

## Bilinen sınır

Lighthouse CLI bu çalışma ortamında zorunlu bir araç olarak bulunmamaktadır. Performans; statik build, yerel fontlar, görüntü ölçüleri, sınırlı istemci JavaScript’i, Playwright tarayıcı kontrolleri ve build çıktı envanteriyle doğrulanır. WP-09 canlı domain açıldığında Lighthouse/CrUX benzeri ağ koşullu ölçüm tekrarlanmalıdır.
