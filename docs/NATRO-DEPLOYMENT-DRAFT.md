# Natro deployment draft

Bu belge WP-09'da Natro hesabının gerçek yapılandırmasına göre kesinleştirilecektir.

1. Production URL'sini `PUBLIC_SITE_URL` olarak tanımlayın.
2. Temiz ve doğrulanmış bir statik build alın.
3. `dist/` klasörünün içeriğini alan adının web köküne yükleyin.
4. HTTPS ve canonical alan adını doğrulayın.
5. Ana sayfa, `/kartlar`, örnek ürün detayı, 404 ve Shopier dış bağlantısını test edin.
6. Önceki yayın paketini rollback için saklayın.

Kaynak kod, `.env`, test raporları ve `node_modules` hosting'e yüklenmez.
