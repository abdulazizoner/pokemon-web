# Test stratejisi

## Amaç

Statik ürün vitrininin içerik doğruluğunu, Shopier CTA politikasını, erişilebilirliğini ve Natro uyumlu çıktısını üçüncü taraf Shopier sayfalarının anlık erişilebilirliğine bağımlı olmadan doğrulamak.

## Test katmanları

### İçerik ve politika testleri

Vitest:

- ürün görünürlüğü
- satın alma CTA kuralları
- Shopier HTTPS/allowlist doğrulaması
- tekrar eden ID/slug/URL tespiti
- placeholder, draft, sold ve available davranışları

### Build-time doğrulama

`pnpm content:validate`:

- zorunlu metadata
- tarih ve kontrollü değerler
- ön/arka ve alt metin
- dosya varlığı, türü ve boyutu
- URL güvenliği
- tekrar eden kayıtlar

`pnpm media:check`:

- kaynak ürün klasörleri
- ön/arka çifti
- desteklenen ve okunabilir kaynaklar
- gereksiz upscaling olmadan üretim planı

### Tarayıcı E2E

Playwright masaüstü ve mobil projelerinde:

- ana ve mobil navigasyon
- arama
- set, kondisyon, dil, nadirlik ve stok filtreleri
- birleşik filtre
- sıralama, reset ve boş durum
- ürün detay render’ı
- klavyeyle ön/arka yüz geçişi
- sold ve placeholder CTA yokluğu
- draft ürünün dışlanması/404
- özel 404 sayfası
- güvenli dış bağlantı nitelikleri

### Erişilebilirlik

`@axe-core/playwright` ile ana sayfa, katalog ve ürün detayı taranır. E2E ayrıca:

- semantic landmark
- başlık ve form etiketi
- klavye erişimi
- buton adları
- focus-visible
- mobil menü davranışı
- reduced-motion

kontrollerini kapsar. Görsel QA sırasında taşma, kontrast, uzun metin ve küçük ekran davranışı elle incelenir.

### Görsel doğrulama

`pnpm visual:capture` sekiz ekran üretir:

- homepage desktop/mobile
- catalog desktop/mobile
- product detail desktop/mobile
- empty filter
- sold product

Görüntüler `artifacts/visual-qa/` altındadır ve kalıcı ürün içeriği değildir.

## Çalıştırma sırası

```bash
pnpm install --frozen-lockfile
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

## İsteğe bağlı ağ kontrolü

`pnpm shopier:check` yalnız gerçek Shopier URL’leri bulunduğunda anlamlıdır. Ağ kesintisi veya Shopier rate-limit’i production içeriğinin yapısal olarak hatalı olduğu anlamına gelmez. Yapısal URL doğrulaması her zaman yerel içerik validasyonunda çalışır.

## Kabul eşiği

- format, lint, Astro/TypeScript ve unit test sıfır hatayla geçer
- içerik ve medya validasyonu geçer
- production build ve iç link kontrolü geçer
- tüm desktop/mobile E2E senaryoları geçer
- axe kritik/ciddi ihlal bildirmez
- draft/hidden içerik build’de sayfa oluşturmaz
- placeholder/sold içerikte aktif Shopier CTA yoktur
- preview ve browser süreçleri test sonunda kapanır
