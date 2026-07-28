# Mimari

## Nihai karar

Proje, Astro ve strict TypeScript ile derlenen tamamen statik bir ürün vitrinidir. Natro paylaşımlı hosting yalnız `dist/` içindeki HTML, CSS, istemci JavaScript’i ve görselleri sunar.

Satışın doğruluk kaynağı Shopier’dir:

- Sepet, ödeme ve sipariş Shopier’de gerçekleşir.
- Güncel fiyat ve stok Shopier ürün sayfasından doğrulanır.
- Müşteri ve sipariş verisi bu repository’de tutulmaz.
- Statik site yalnız ürünü açıklar ve geçerli Shopier ürün sayfasına yönlendirir.

## Bilinçli mimari sınırlar

- Backend veya sunucu tarafı çalışma zamanı yoktur.
- Veritabanı, CMS, kullanıcı hesabı, sepet ve yerel checkout yoktur.
- Production ortamında Node.js gerekmez.
- Analitik, izleme çerezi ve veri toplayan form varsayılan olarak yoktur.
- Shopier API’sine veya belgelenmemiş URL yapısına bağımlılık yoktur.
- Production çıktısında source map üretilmez.

## Katmanlar

```text
src/content/cards/*.md
        │
        ├─ Astro Content Collection şeması
        ├─ özel içerik ve URL doğrulaması
        └─ medya dosyası doğrulaması
                │
                ▼
Astro sayfaları ve bileşenleri
        │
        ├─ statik HTML
        ├─ küçük, ilerlemeli istemci etkileşimleri
        ├─ CSS tasarım sistemi
        └─ SEO/structured data
                │
                ▼
dist/ ──► Natro paylaşımlı hosting
                │
                └─► https://www.shopier.com/... ürün bağlantısı
```

## İçerik görünürlüğü

`src/lib/product-policy.ts` tek görünürlük ve CTA politikasını taşır.

- `available`: yalnız gerçek içerik, geçerli fiyat ve Shopier URL’si varsa satın alma CTA’sı.
- `sold`: kamuya açık arşiv kaydı olabilir; satın alma CTA’sı yoktur.
- `coming-soon`: kamuya açık olabilir; satın alma CTA’sı yoktur.
- `draft`: statik sayfa üretilmez ve katalogda görünmez.
- `hidden`: statik sayfa üretilmez ve katalogda görünmez.
- `isPlaceholder: true`: görünür biçimde “Temsili” işaretlenir ve aktif satın alma CTA’sı hiçbir durumda oluşturulmaz.

## Yerel medya

Gerçek kaynak fotoğraflar `media-source/products/<slug>/` altında veya şirketin onaylı kaynak arşivinde tutulur. Kaynak klasörde en az `front` ve `back` çifti gerekir. Sharp tabanlı işlem:

- AVIF ve WebP türevleri üretir,
- gereksiz metadatayı yeniden kodlamayla kaldırır,
- küçük görseli büyütmez,
- deterministik ürün/ölçü yolları kullanır,
- bozuk veya desteklenmeyen dosyada açık hata verir.

Kaynak fotoğrafların Git’e eklenmesi varsayılan olarak engellenmiştir; ürün sahibi ayrıca arşiv politikası belirlemelidir.

## Merkezi yapılandırma

Marka, iletişim, site URL’si ve yasal bağlantısızlık metni `src/config/store.ts` içindedir. Nihai domain WP-09’da `PUBLIC_SITE_URL` ile değiştirilir. Placeholder değerler merkezi ve görünür tutulur.

## Güvenlik ve gizlilik

- Satış URL’leri yalnız `https://www.shopier.com/` allowlist’inden geçer.
- Dış bağlantılar `noopener noreferrer` kullanır.
- Kaynakta veya build çıktısında sır bulunmamalıdır.
- Form, cookie veya tracking yoktur.
- Natro güvenlik başlıkları WP-09 için `NATRO-DEPLOYMENT-DRAFT.md` içinde hazırlanmıştır.

## Dağıtım sınırı

WP-09 askıdadır. Gerçek Natro hesabında DNS, SSL veya dosya değişikliği yapılmamıştır. Canlıya yalnız son doğrulanmış `dist/` içeriği yüklenir; repository, `.git`, `.env`, test çıktıları ve `node_modules` yüklenmez.
