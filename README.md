# Paralel Arşiv — statik koleksiyon kartı vitrini

Natro paylaşımlı hosting için statik olarak derlenen, ürünleri tanıtan ve satışa açık gerçek kayıtları Shopier ürün sayfalarına yönlendiren Astro sitesi.

> `Paralel Arşiv` markası, iletişim bilgileri, kart kayıtları ve kart görselleri temsili ön izleme içeriğidir. WP-01, WP-02, WP-03, WP-09 ve WP-10 şirket bilgileri gelene kadar askıdadır.

## Kapsam

- Astro + strict TypeScript
- tamamen statik `dist/`
- yerel Markdown ürün kayıtları
- yerel ve deterministik görsel optimizasyonu
- arama, tüm katalog filtreleri ve sıralama
- statik ürün detayları ve erişilebilir ön/arka görünümü
- güvenli Shopier dış bağlantı politikası
- Vitest, Playwright ve axe kontrolleri
- sitemap, robots, canonical, OG ve breadcrumb SEO

Backend, veritabanı, üyelik, sepet, ödeme, CMS ve production Node.js runtime yoktur.

## Gereksinimler

- Node.js 24 LTS/uyumlu sürüm
- pnpm (repository’deki `packageManager` sürümü)

## Kurulum

```bash
pnpm install --frozen-lockfile
```

## Yerel çalışma

```bash
pnpm dev
```

## Ürün operasyonu

```bash
pnpm card:new --slug yeni-kart --name "Yeni Kart"
pnpm content:validate
pnpm media:check
pnpm media:optimize --slug yeni-kart
pnpm shopier:check
```

Ayrıntılı rehber: `docs/CONTENT-GUIDE.md`.

## Kalite kontrolleri

```bash
pnpm format
pnpm lint
pnpm check
pnpm test
pnpm content:validate
pnpm media:check
pnpm build
pnpm test:e2e:desktop
pnpm test:e2e:mobile
pnpm visual:capture
```

## Production build

```bash
$env:PUBLIC_SITE_URL = "https://nihai-domain.example"
pnpm build
```

Natro’ya yüklenecek dosyalar `dist/` içindedir. Natro dağıtımı WP-09 açılmadan yapılmaz.

## Önemli dosyalar

- `src/config/store.ts`: merkezî marka, iletişim ve site URL’si
- `src/content.config.ts`: Astro ürün şeması
- `src/lib/product-policy.ts`: görünürlük ve CTA politikası
- `src/content/cards/`: ürün kayıtları
- `media-source/products/`: Git dışı gerçek kaynak fotoğraf alanı
- `docs/CONTENT-GUIDE.md`: içerik ve medya operasyonu
- `docs/TESTING-STRATEGY.md`: doğrulama kapsamı
- `docs/SEO-ACCESSIBILITY.md`: SEO, erişilebilirlik ve güvenlik
- `docs/NATRO-DEPLOYMENT-DRAFT.md`: askıdaki canlı dağıtım hazırlığı
- `docs/shopier-sirket-hesabi-ve-operasyon-rehberi.md`: Shopier ana rehberi
- `deliverables/`: Word rehberi ve askıdaki paketler raporu

## Work package durumu

WP-04, WP-05, WP-06, WP-07 ve WP-08 tamamlanmıştır. Şirket/hesap/gerçek içerik bağımlı WP-01, WP-02, WP-03, WP-09 ve WP-10 askıdadır. Ayrıntılar `docs/WORK-PACKAGES.md` ve `deliverables/ASKIYA_ALINAN_WORK_PACKAGES.txt` içindedir.
