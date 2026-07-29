# Pokémon Web — statik koleksiyon kartı vitrini

[![CI](https://github.com/abdulazizoner/pokemon-web/actions/workflows/ci.yml/badge.svg)](https://github.com/abdulazizoner/pokemon-web/actions/workflows/ci.yml)

Natro paylaşımlı hosting için statik olarak derlenen, ürünleri tanıtan ve satışa açık gerçek kayıtları Shopier ürün sayfalarına yönlendiren Astro sitesi.

> `Paralel Arşiv` markası, iletişim bilgileri, kart kayıtları ve kart görselleri temsili ön izleme içeriğidir. Şirket, Shopier, marka, gerçek ürün ve Natro bilgilerine bağlı çalışmalar gerekli onaylar gelene kadar askıdadır.

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

- Node.js 22.12 veya üzeri (son yerel denetim: 24.11.1)
- pnpm (repository’deki `packageManager` sürümü)

## Kurulum

```bash
pnpm install --frozen-lockfile
```

## Yerel çalışma

```bash
pnpm dev
```

Production çıktısını yerel kabul testi için çalıştırmak:

```bash
pnpm build
pnpm local:test
```

Yerel adres: `http://127.0.0.1:4321/`.

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
pnpm assets:check
pnpm links:check
pnpm build
pnpm test:e2e:desktop
pnpm test:e2e:mobile
pnpm visual:capture
pnpm audit --audit-level moderate
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
- `src/lib/cards.ts`: Astro koleksiyon verisini şema tipine bağlayan tek erişim noktası
- `src/lib/product-policy.ts`: görünürlük ve CTA politikası
- `src/content/cards/`: ürün kayıtları
- `media-source/products/`: Git dışı gerçek kaynak fotoğraf alanı
- `docs/CONTENT-GUIDE.md`: içerik ve medya operasyonu
- `docs/TESTING-STRATEGY.md`: doğrulama kapsamı
- `docs/SEO-ACCESSIBILITY.md`: SEO, erişilebilirlik ve güvenlik
- `docs/NATRO-DEPLOYMENT-DRAFT.md`: askıdaki canlı dağıtım hazırlığı
- `docs/FINAL-LOCAL-AUDIT.md`: son yerel ürün denetimi ve doğrulama özeti
- `docs/shopier-sirket-hesabi-ve-operasyon-rehberi.md`: Shopier ana rehberi
- `required_fields/`: nihai Shopier rehberi, gerekli bilgi formu ve sayfa görüntüleri
- `deliverables/`: önceki teslim adlarının korunduğu tarihsel çıktı alanı
- `.github/workflows/ci.yml`: GitHub üzerinde lint, test ve statik build doğrulaması

## Work package durumu

WP-04, WP-05, WP-06, WP-07 ve WP-08 yerel olarak tamamlanmış ve son regresyonda doğrulanmıştır. Şirket/hesap/gerçek içerik bağımlı WP-01, WP-02, WP-03, WP-09 ve WP-10 askıdadır. Bu nedenle proje canlıda veya nihai kabul edilmiş sayılmaz; mevcut durum yerel kabul testine hazır statik frontend’dir. Ayrıntılar `docs/WORK-PACKAGES.md` ve `deliverables/ASKIYA_ALINAN_WORK_PACKAGES.txt` içindedir.

## Lisans

Bu depoya henüz bir açık kaynak lisansı atanmadı. Deponun herkese açık olması, kaynak kodun veya görsel/içerik varlıklarının yeniden kullanımına otomatik olarak izin verildiği anlamına gelmez.
