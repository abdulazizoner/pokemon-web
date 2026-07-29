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
- mobil menüde Escape ile kapatma ve odağı menü düğmesine geri verme
- aktif sayfada `aria-current="page"`
- hover gerektirmeyen ön/arka görsel kontrolü
- `aria-pressed` ile yüz durumu
- JavaScript kapalıyken iki yüzün de görünmesi
- ürün ve durum için anlamlı alt metin/etiket
- satıldı/boş sonuç bilgisinin yalnız renkle verilmemesi
- `prefers-reduced-motion` ile animasyon azaltma

## Erişilebilirlik doğrulaması

- axe otomasyonu ana sayfa, katalog ve ürün detayında E2E içinde çalışır
- desktop ve mobile klavye senaryoları
- 320/390 px mobil, tablet, 1440/1920 px masaüstü ve %200 yeniden-akış eşdeğeri görsel QA
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

## Son yerel Lighthouse denetimi

29 Temmuz 2026’da Lighthouse 12.8.2 mobil profili, production preview üzerinde çalıştırıldı:

| Sayfa       | Performance | Accessibility | Best Practices | SEO |    LCP | CLS |
| ----------- | ----------: | ------------: | -------------: | --: | -----: | --: |
| Ana sayfa   |         100 |           100 |            100 | 100 | 1.3 sn |   0 |
| Katalog     |         100 |           100 |            100 | 100 | 0.8 sn |   0 |
| Ürün detayı |         100 |           100 |            100 | 100 | 1.3 sn |   0 |

Bu değerler localhost laboratuvar ölçümüdür; Natro ağı ve gerçek kullanıcı koşullarını temsil etmez. WP-09’da canlı domain açıldığında mobil Lighthouse ve mümkünse gerçek kullanıcı verisiyle yeniden ölçüm yapılmalıdır.

Son tekrarın üç JSON raporu eksiksiz ve `runtimeError` olmadan üretildi. Windows, raporlar yazıldıktan sonra Lighthouse geçici Chrome profilini silerken `EPERM` temizlik uyarısı verdi; bu uyarı ölçümü veya site çalışmasını etkilemedi.
