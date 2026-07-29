# Natro deployment hazırlık notu

**Durum:** WP-09 ASKIDA. Bu belge canlı hesaba uygulanmış değildir.

## Ön koşullar

- Nihai domain ve canonical tercih onaylı
- Natro hesap sahibi ve web alanı belli
- Hosting türü ve web kökü doğrulanmış
- Gerçek marka ve ürün içerikleri kabul edilmiş
- Temiz, doğrulanmış production build mevcut
- Mevcut canlı dosyaların geri alınabilir yedeği hazır

## Build

```bash
$env:PUBLIC_SITE_URL = "https://ornek-domain.example"
pnpm install --frozen-lockfile
pnpm build
pnpm assets:check
pnpm links:check
```

Yüklenecek öğe `dist/` klasörünün **içeriğidir**. Node.js production runtime gerekmez.

## Asla yüklenmeyecekler

- repository kaynak dosyaları
- `.git/`
- `.env*`
- `node_modules/`
- `tests/`, `artifacts/`, `work/`
- Playwright çıktıları
- erişim bilgileri
- müşteri/sipariş verileri

## Önerilen başlıklar

Natro hosting türüne göre `.htaccess`, Plesk veya panel başlık ayarlarıyla doğrulanacaktır:

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy:
  default-src 'self';
  img-src 'self' data:;
  style-src 'self' 'unsafe-inline';
  script-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'none'
```

HTTPS doğrulandıktan sonra uygun süreli HSTS değerlendirilebilir. Yanlış HSTS ayarı domain erişimini etkileyebileceğinden ilk dağıtımda körlemesine uygulanmaz.

## Cache önerisi

- Hash’li Astro varlıkları: uzun süreli immutable cache
- Ürün görselleri: uzun cache; değişiklikte dosya adı/hash değişmeli
- HTML, sitemap ve robots: kısa cache veya yeniden doğrulama

## Dağıtım sırası

1. Natro hesabı ve hedef web kökünü yalnız okuma kontrolüyle doğrula.
2. Mevcut web kökünün tarihli yedeğini al.
3. DNS, SSL ve canonical domaini doğrula.
4. Son build raporunu ve commit kimliğini kaydet.
5. `dist/` içeriğini FTPS/SFTP veya panelin güvenli aktarımıyla yükle.
6. HTTP → HTTPS ve www/kök yönlendirmesini uygula.
7. Ana sayfa, katalog, gerçek ürün, 404, sitemap ve robots’u test et.
8. Shopier bağlantısını dış ağ ve mobilde doğrula.
9. Kaynak/gizli dosya sızıntısı olmadığını kontrol et.
10. Canlı sürüm kaydını ve rollback paketini sakla.

## Smoke test

- `/`
- `/kartlar/`
- gerçek bir `/kartlar/<slug>/`
- `/hakkimizda/`
- `/sss/`
- `/iletisim/`
- `/kargo-ve-iade/`
- bilinmeyen URL → özel 404
- `/robots.txt`
- `/sitemap-index.xml`
- `/favicon.svg`
- Shopier CTA → yalnız `https://www.shopier.com/`

## Rollback

Önceki doğrulanmış web kökü arşivi korunur. Rollback:

1. Hatalı yayın dosyalarını hedef kökte açıkça belirle.
2. Önceki arşivin bütünlüğünü doğrula.
3. Önceki içeriği aynı web köküne geri yükle.
4. Cache temizliği/yeniden doğrulama yap.
5. Smoke testi tekrarla.

Parola veya erişim anahtarı hiçbir deployment dokümanına veya Git kaydına yazılmaz.
