# Ürün içeriği ve medya operasyonu

## Temel ilke

Her fiziksel kart kopyası; fotoğrafı, kondisyonu, dili, baskısı, grade’i veya fiyatı farklıysa ayrı ürün kaydıdır. Gerçek ürün yayını için ön ve arka fotoğraf ile açık kondisyon notu zorunludur.

## Yeni taslak oluşturma

```bash
pnpm card:new --slug charizard-ex-223-197 --name "Charizard ex"
```

Komut:

- `src/content/cards/<slug>.md` taslağını oluşturur,
- `media-source/products/<slug>/` kaynak klasörünü hazırlar,
- durumu `draft` ve içeriği `isPlaceholder: true` yapar,
- örnek ön/arka kaynak dosya adlarını açıklar.

Komut mevcut dosyayı sessizce ezmez.

## Adlandırma

### Ürün dosyası

`src/content/cards/<slug>.md`

Slug:

- küçük harf,
- yalnız Latin harf/rakam ve tire,
- ürünün değişmeyen, okunabilir kimliği,
- başka ürünle aynı olamaz.

### Kaynak görseller

```text
media-source/products/<slug>/
├── front.jpg
├── back.jpg
├── detail-01.jpg
└── detail-02.jpg
```

Kabul edilen kaynak türleri: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.

Öneri:

- uzun kenar en az 1600 px,
- kartın tamamı görünür,
- nötr arka plan ve yumuşak ışık,
- tutarlı ön/arka kadraj,
- kaynak dosya başına en çok 12 MB.

## İçerik alanları

Şema `src/content.config.ts` içinde tanımlıdır. Kontrollü değerler `src/lib/product-policy.ts` ile paylaşılır.

Zorunlu temel alanlar:

- `productId`
- `slug`
- `name`
- `setName`
- `collectorNumber`
- `language`
- `rarity`
- `finish`
- `condition`
- `conditionNote`
- `description`
- `availability`
- `frontImage`, `backImage`
- `frontAlt`, `backAlt`
- `featured`
- `sortOrder`
- `publishedAt`
- `isPlaceholder`

Satışa açık gerçek ürün ayrıca:

- `displayPrice`
- tam `https://www.shopier.com/` URL’si
- `availability: available`
- `isPlaceholder: false`

gerektirir.

## Fotoğraf ekleme veya değiştirme

1. Gerçek kaynakları `media-source/products/<slug>/` içine yerleştirin.
2. Dosyaların fiziksel olarak doğru kartı gösterdiğini ürün sahibine onaylatın.
3. Medya üretimini çalıştırın:

   ```bash
   pnpm media:optimize --slug <slug>
   ```

4. Üretilen public yollarını Markdown kaydına yazın.
5. Alt metinleri “ön yüz görseli” gibi boş/genel ifadeler yerine ürünü tanımlayacak biçimde yazın.
6. İçerik ve build doğrulamasını çalıştırın.

## Shopier URL’si ekleme

1. Ürünü önce Shopier’de oluşturun.
2. `Ürünler > Satıştaki Ürünler` alanından tam bağlantıyı kopyalayın.
3. Bağlantının `https://www.shopier.com/` ile başladığını doğrulayın.
4. `shopierUrl` alanına tam URL’yi yazın.
5. Gerçek satışa geçerken `isPlaceholder: false` ve `availability: available` kullanın.

URL içinden ürün kimliği ayrıştırmayın ve link kısaltıcı kullanmayın.

## Ürünü satıldı yapmak

```yaml
availability: "sold"
```

Satılan ürün arşivde görünür; satın alma CTA’sı oluşmaz. Shopier stok ve satış durumu ayrıca kontrol edilmelidir.

## Ürünü gizlemek veya yayından kaldırmak

```yaml
availability: "hidden"
```

veya hazırlık aşamasında:

```yaml
availability: "draft"
```

Bu iki durum katalogdan ve statik ürün sayfası üretiminden çıkarılır.

## Doğrulama komutları

```bash
pnpm content:validate
pnpm media:check
pnpm links:check
pnpm shopier:check
pnpm build
```

`shopier:check`, kayıtlı gerçek URL varsa isteğe bağlı ağ kontrolü yapar. Ağ erişimi ve üçüncü taraf sürekliliği build’in temel koşulu değildir.

## Yaygın doğrulama hataları

| Mesaj/konu                     | Çözüm                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------- |
| Tekrar eden ID veya slug       | Her ürün için benzersiz değer kullanın                                        |
| Ön/arka görsel bulunamadı      | Public yolu ve dosya adını kontrol edin                                       |
| Placeholder üründe CTA         | `shopierUrl` alanını kaldırın; taslak/coming-soon kullanın                    |
| Available üründe URL/fiyat yok | Gerçek Shopier URL’si ve `displayPrice` ekleyin                               |
| Shopier dışı URL               | Tam `https://www.shopier.com/` bağlantısını kullanın                          |
| Güvensiz `http` URL            | HTTPS bağlantıyı kopyalayın                                                   |
| Desteklenmeyen görsel          | Kabul edilen dosya türüne dönüştürün                                          |
| Görsel çok büyük               | Kaynağı makul çözünürlük ve kaliteyle dışa aktarın                            |
| Bozuk kaynak                   | Fotoğrafı yeniden dışa aktarın; dosya uzantısını yalnız yeniden adlandırmayın |
| Geçersiz tarih                 | ISO `YYYY-MM-DD` biçimini kullanın                                            |

## Yeniden derleme

```bash
pnpm install --frozen-lockfile
pnpm build
```

Natro’ya yüklenebilir çıktı `dist/` içindedir. Canlı dağıtım WP-09 açılana kadar yapılmaz.
