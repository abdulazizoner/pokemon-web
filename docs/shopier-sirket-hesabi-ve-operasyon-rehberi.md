# Şirketler İçin Shopier Hesabı Açılışı, Ürün Listeleme ve Operasyon Rehberi

**Belge sürümü:** 1.1
**Son doğrulama tarihi:** 30 Temmuz 2026
**Kapsam:** Türkiye’de yerleşik bir şirketin fiziksel koleksiyon kartlarını Shopier üzerinden satışa sunması  
**Proje bağlamı:** Statik tanıtım sitesi ürünleri gösterir; sepet, ödeme, sipariş ve müşteri verileri Shopier’de yönetilir.

> **Önemli sınır:** Bu belge hukuki, mali veya vergisel danışmanlık değildir. Shopier paneli ve mevzuat değişebilir. Canlı satıştan önce şirketin mali müşaviri; gerekli görülen tüketici hukuku, KVKK ve marka konularında yetkin hukukçu güncel durumu doğrulamalıdır.

## 1. Belgenin amacı ve kapsamı

Bu rehber, şirket adına doğru sahiplikle Shopier hesabı açılması, mağazanın güvenli biçimde yapılandırılması, koleksiyon kartlarının tutarlı bir standartla listelenmesi ve siparişten iadeye kadar günlük operasyonun yürütülmesi için hazırlanmıştır.

Rehber üç bilgi türünü özellikle ayırır:

- **Doğrulanmış platform davranışı:** Shopier’in resmî yardım merkezinde açıkça belirtilen özellik veya panel yolu.
- **Önerilen şirket uygulaması:** Veri bütünlüğü, ürün doğruluğu, güvenlik ve operasyon sürekliliği için proje ekibinin önerisi.
- **Uzman teyidi gereken konu:** Şirketin türü, mükellefiyeti, ürünlerin hukuki niteliği veya güncel mevzuata bağlı karar.

Bu projede tanıtım sitesi ödeme almaz, sipariş oluşturmaz ve müşteri verisi toplamaz. Ziyaretçi, yalnızca geçerli ve satışa açık ürünlerde `https://www.shopier.com/` alan adındaki ürün sayfasına yönlendirilir. Güncel fiyat, stok ve satış koşulları bakımından Shopier ürün sayfası esas kaynaktır.

## 2. Son doğrulama tarihi ve değişiklik yönetimi

Bu belgedeki platform bilgileri 30 Temmuz 2026 tarihinde resmî Shopier kayıt ekranı, resmî Shopier yardım merkezi ve resmî kamu kaynakları üzerinden yeniden doğrulanmıştır.

Canlıya çıkıştan hemen önce şu değişken bilgiler yeniden kontrol edilmelidir:

- Shopier’in istediği kayıt alanları ve doğrulama belgeleri
- İşlem/hizmet bedelleri
- Anlaşmalı kargo firmaları, alt sipariş tutarı ve kargo ücretleri
- Panel menülerinin isimleri
- Para gönderim günü ve kesim saati
- Fatura/e-Belge yükümlülükleri
- Mesafeli sözleşme ve cayma hakkı düzenlemeleri
- ETBİS kapsamı

Kontrol sonucu değişiklik bulunursa:

1. Bu Markdown dosyasındaki “Son doğrulama tarihi” güncellenir.
2. Değişen cümle resmî kaynakla birlikte düzeltilir.
3. Word belgesi yeniden üretilir.
4. Eski sürüm tarih ve sürüm numarasıyla arşivlenir.

## 3. İçindekiler

1. Belgenin amacı ve kapsamı
2. Son doğrulama tarihi ve değişiklik yönetimi
3. İçindekiler
4. Shopier nedir ve bu projede nasıl konumlanır?
5. Bireysel ve ticari hesap karşılaştırması
6. Kayıt öncesi şirket kontrol listesi
7. Ticari hesap açılışı: adım adım
8. Hesap doğrulaması ve güvenlik
9. Dükkan ayarları
10. Marka, logo ve mağaza sunumu
11. Kategori planlaması
12. Pokémon kartı ürün listeleme standardı
13. Ürün adlandırma standardı
14. Ürün açıklaması şablonu
15. Ürün fotoğrafı standardı
16. Kondisyon yönetimi
17. Shopier’e ürün ekleme: adım adım
18. Ayrı ürün mü, varyasyon mu?
19. Shopier ürün bağlantısını alma ve kaydetme
20. Shopier ürününü statik siteyle eşleştirme
21. Stok ve satılan ürün yönetimi
22. Kargo yapılandırması ve önerilen akış
23. Koleksiyon kartı paketleme standardı
24. Sipariş yönetimi
25. Ödeme ve para aktarımı
26. Platform ücretleri ve fiyatlandırma
27. İptal ve iade akışı
28. Fatura, vergi ve muhasebe
29. ETBİS değerlendirmesi
30. Tüketici hakları ve mesafeli satış
31. Marka, orijinallik ve fikrî mülkiyet
32. Günlük operasyon kontrol listesi
33. Yeni ürün kontrol listesi
34. Canlıya çıkış kontrol listesi
35. Yaygın hatalar ve sorun giderme
36. Sorumluluk matrisi
37. Karar ve teyit kayıtları
38. Kaynakça

## 4. Shopier nedir ve bu projede nasıl konumlanır?

Shopier; bireysel veya ticari üyelikle ürün/hizmet listelemeye, kartla ödeme almaya, siparişleri yönetmeye ve uygun siparişlerde anlaşmalı kargo kullanmaya imkân veren bir e-ticaret çözümüdür. Müşterinin alışveriş için Shopier üyeliği açması zorunlu değildir. [1], [2]

### Sistemler arasındaki sorumluluk ayrımı

| Alan                    | Statik tanıtım sitesi      | Shopier                           | Satıcı şirket      |
| ----------------------- | -------------------------- | --------------------------------- | ------------------ |
| Marka ve katalog sunumu | Evet                       | İkincil vitrin                    | İçerik onayı       |
| Arama ve filtreleme     | Evet                       | Platform imkânları ölçüsünde      | —                  |
| Güncel fiyat ve stok    | Bilgilendirme amaçlı kopya | **Esas kaynak**                   | Güncelleme         |
| Sepet ve ödeme          | Hayır                      | **Evet**                          | Hesap ve mutabakat |
| Sipariş/müşteri verisi  | Hayır                      | **Evet**                          | Yetkili erişim     |
| Fatura                  | Hayır                      | Satıcının yükümlülüğünü kaldırmaz | **Evet**           |
| Paketleme ve kargo      | Hayır                      | Kod/takip altyapısı               | **Evet**           |
| İptal ve iade kararı    | Hayır                      | İşlem aracı                       | **Evet**           |

> **Operasyon ilkesi:** Statik site bir “satın alma sistemi” değildir. Kullanıcıyı doğru Shopier ürün sayfasına taşır. Shopier’deki kayıtla statik sitedeki kayıt uyuşmuyorsa satıştan önce Shopier bilgisi esas alınır ve statik site düzeltilir.

## 5. Bireysel ve ticari hesap karşılaştırması

Shopier resmî yardım merkezine göre bireysel ve ticari üyelik bulunur. Bireysel üyelikte kişinin kimlik ve kişisel banka hesabı bilgileri; ticari üyelikte bunlara ek olarak şirket bilgileri ve şirket adına kayıtlı banka hesabı alınır. Ticari hesap türü şahıs şirketi, limited şirket veya anonim şirket olabilir. Ücretlendirme üyelik tipine göre değişmez. [3]

| Konu                | Bireysel üyelik            | Ticari üyelik                       |
| ------------------- | -------------------------- | ----------------------------------- |
| Hesap sahibi        | Gerçek kişi                | Şirket adına yetkili kişi ve şirket |
| Banka hesabı        | Kişinin kendi hesabı       | Şirket adına kayıtlı hesap          |
| Şirket bilgileri    | Yok                        | Gerekli                             |
| Uygun kullanım      | Şirket dışı bireysel model | Şirket üzerinden düzenli satış      |
| Bu proje için karar | Uygun değil                | **Tercih edilmelidir**              |

Shopier hesabı başka bir kişiye devredilemez; ödemeler kayıtlı kişi adına yapılır ve hesap açıldıktan sonra hesap sahibi farklı bir kişi olarak değiştirilemez. Ürün, kategori ve varyasyonların yeni bir aktif mağazaya taşınması destek üzerinden mümkün olabilir. [4]

> **Kritik karar:** Şirket üzerinden satış yapılacaksa hesap, geçici olarak bir çalışanın bireysel kimliğiyle açılmamalıdır. Hesap sahibi, yetkili e-posta, telefon ve şirket banka hesabı en başta doğru seçilmelidir.

## 6. Kayıt öncesi şirket kontrol listesi

Shopier’in kamuya açık yardım makaleleri ticari hesap için her durumda istenecek sabit bir belge paketi yayımlamaz. Bu nedenle aşağıdaki liste “hazır bulundurma” listesidir; panelde istenmeyen belge gereksiz yere yüklenmemeli, panel veya Shopier destek ekibinin güncel talebi esas alınmalıdır.

### Şirket ve yetkili bilgileri

- [ ] Ticari unvan, resmî kayıttaki biçimiyle
- [ ] Şirket türü: şahıs / limited / anonim
- [ ] Vergi dairesi ve vergi kimlik numarası
- [ ] MERSİS ve ticaret sicil bilgileri (şirket türüne göre)
- [ ] Şirket merkez adresi
- [ ] Şirket adına işlem yapmaya yetkili kişi
- [ ] Yetkilinin kimlik ve iletişim bilgileri
- [ ] Kurumsal ve sürekli erişilebilir e-posta adresi
- [ ] Doğrulama mesajı alabilen şirket kontrollü telefon

### Banka ve muhasebe

- [ ] Şirket adına kayıtlı, aktif TL IBAN
- [ ] IBAN hesap sahibi unvanının Shopier şirket kaydıyla uyumu
- [ ] Tahsilatların muhasebede izleneceği hesap planı
- [ ] Fatura/e-Arşiv yönteminin mali müşavirle kararlaştırılması
- [ ] İade ve kargo kesintilerinin mutabakat yöntemi

### Mağaza ve operasyon

- [ ] Geçici değil, kullanılabilir mağaza adı
- [ ] Logo ve banner dosyaları
- [ ] Müşteri destek e-postası ve telefonu
- [ ] İade bildirim kanalı
- [ ] Kargo ve paketleme sorumlusu
- [ ] İlk ürünlerin gerçek ön/arka fotoğrafları
- [ ] Kondisyon standardı ve onaylayacak kişi
- [ ] Satış fiyatı hesap yöntemi

**Panel açıldığında ayrıca kontrol edilecekler**

- [ ] Shopier’in istediği güncel bilgi ve belgeler
- [ ] Üyelik sözleşmeleri ve aydınlatma metinleri
- [ ] İşlem ücretleri ekranı
- [ ] Güncel anlaşmalı kargo şartları
- [ ] Hesap aktivasyon durumu

### İlk kayıt ekranında görülen temel alanlar

30 Temmuz 2026 tarihli resmî Shopier kayıt ekranında ilk hesap oluşturma adımında şu alanlar bulunur: [31]

- Dükkan adı ve bu ada bağlı mağaza bağlantısı
- E-posta adresi
- Ülke/telefon kodu ve cep telefonu
- Şifre ve şifre tekrarı
- Üyelik Sözleşmesi onayı
- Aydınlatma Metni’nin okunduğuna ilişkin beyan

Bu ilk ekran, ticari hesabın bütün şirket/doğrulama bilgilerinin tamamlandığı anlamına gelmez. İlk kayıt sonrasında hesap yönetimindeki ticari üyelik, şirket, yetkili, banka ve panelin güncel olarak istediği doğrulama alanları ayrıca tamamlanmalıdır.

## 7. Ticari hesap açılışı: adım adım

1. **Sahipliği kesinleştirin.** Hesabı hangi şirketin, hangi yetkili kişiyle ve hangi kurumsal e-postayla açacağını yazılı karara bağlayın.
2. **Kayıt sayfasını açın.** Shopier ana sayfasındaki “Ücretsiz Üye Ol” akışını veya doğrudan resmî kayıt ekranını kullanın. Üyelik oluşturmak ücretsizdir. Kayıt ekranındaki dükkan adı/linki, e-posta, telefon ve şifre alanlarını kalıcı şirket bilgileriyle doldurun. [5], [31]
3. **Kalıcı iletişim bilgilerini girin.** Çalışanın kişisel/geçici e-postası yerine şirketin kontrol ettiği adresi ve telefonu kullanın.
4. **Üyelik tipini ticari seçin.** Şirket türünü resmî kayıtla aynı belirleyin.
5. **Şirket bilgilerini eksiksiz girin.** Ticari unvanı kısaltmadan, vergi ve adres bilgilerini resmî belgelerle karşılaştırarak yazın.
6. **Yetkili kişi bilgilerini tamamlayın.** Panelin istediği doğrulama adımlarını izleyin.
7. **Şirket IBAN’ını kaydedin.** Banka hesabı Shopier’de kayıtlı hesap sahibiyle uyumlu olmalıdır; farklı kişi adına hesaba para gönderimi yapılamaz. [6]
8. **Panelde istenen güncel belgeleri yükleyin.** Kamuya açık olmayan bir belge talebi varsa Shopier ekranındaki güncel açıklamayı veya destek yanıtını esas alın.
9. **Sözleşmeleri inceleyip onaylayın.** Onaylayan kişi ve tarih şirket içi kayıt notunda tutulmalıdır.
10. **Aktivasyonu izleyin.** Shopier, kayıt sonrası üyelik bilgilerinin kontrolüyle hesabın ortalama 24 saat içinde aktif olduğunu belirtir; bu süre garanti değildir. [5]
11. **Aktivasyon kanıtını kaydedin.** Hesap aktif ekranı ve mağaza URL’si, kişisel verileri maskeleyerek şirketin erişim kayıtlarında saklanmalıdır.
12. **İlk satışa geçmeden güvenlik ve muhasebe kontrollerini tamamlayın.**

> **Doğrulanamayan nokta:** Shopier’in kamuya açık kaynaklarında her şirket için zorunlu, değişmez bir “vergi levhası + imza sirküsü + faaliyet belgesi” listesi bulunmamaktadır. Panelde veya hesap incelemesinde istenen güncel belgeler esas alınmalıdır.

## 8. Hesap doğrulaması ve güvenlik

Shopier, `Hesap Yönetimi > Hesap Güvenliği` bölümünden Google Authenticator tabanlı iki adımlı doğrulamayı destekler. [7]

### Aktivasyon sonrası zorunlu güvenlik adımları

- [ ] En az 14 karakter, benzersiz ve parola yöneticisinde saklanan parola
- [ ] İki adımlı doğrulama etkin
- [ ] Kurtarma kodları güvenli ve erişimi sınırlı yerde
- [ ] Kurumsal e-posta hesabında da MFA
- [ ] Telefon hattının şirket kontrolünde olduğunun doğrulanması
- [ ] Erişim sahibi kişinin ve yedeğinin belirlenmesi
- [ ] Cihaz ve tarayıcı güvenlik güncellemelerinin yapılması
- [ ] Ortak bilgisayarda parola kaydetmeme
- [ ] Şüpheli bağlantı ve sahte destek mesajlarına karşı kontrol

### Erişim yönetimi

- Hesap parolası mesajlaşma uygulamalarında gönderilmemelidir.
- Shopier erişim anahtarı veya entegrasyon anahtarları varsa kaynak koda yazılmamalıdır.
- Bir çalışan ayrıldığında kurumsal e-posta, telefon, parola ve MFA sahipliği derhal gözden geçirilmelidir.
- Banka hesabı değiştirilecekse `Hesap Yönetimi > Hesap Bilgileri` içindeki IBAN alanı kullanılabilir; yeni hesap yine kayıtlı kişi/şirket adına olmalıdır. [6]
- Hesap devri yapılamadığı için sahiplik kararı kayıt öncesi verilmelidir. [4]

### Olay müdahalesi

Şüpheli erişimde:

1. Shopier ve kurumsal e-posta parolalarını güvenli cihazdan değiştirin.
2. MFA cihazını ve telefon hattını kontrol edin.
3. IBAN, ürün fiyatı, kargo ve iletişim alanlarında değişiklik olup olmadığını karşılaştırın.
4. Açık siparişler ve iadeleri inceleyin.
5. Shopier resmî destek kanalıyla iletişime geçin.
6. Olay zamanını ve alınan aksiyonları şirket içi kayda yazın.

## 9. Dükkan ayarları

Hesap aktif olduğunda mağazanın temel alanları tamamlanmalıdır.

### Yapılandırma sırası

1. `Dükkan Yönetimi > Dükkan Seçenekleri` bölümünü açın.
2. Mağaza adını, başlığı/sloganı ve destek bilgilerini onaylayın.
3. Mağaza URL’sini kaydedin.
4. Müşterinin göreceği destek e-postasını ve telefonu girin.
5. Kargo ayarlarını belirleyin.
6. Kategori ve gerekiyorsa varyasyon tanımlarını oluşturun.
7. Logo ve banner yükleyin.
8. İlk test ürününü yayınlayıp üyeliksiz ziyaretçi gibi kontrol edin.

Mağaza adının değişimi panelden başlatılabilir ve e-posta onayı gerektirebilir. [8] Bu nedenle tanıtım sitesi, sosyal hesaplar ve basılı malzemeler tamamlanmadan önce ad kesinleştirilmelidir.

### Önerilen mağaza metni

- Ne satıldığı: fiziksel koleksiyon kartları
- Fotoğraf politikası: listelenen fiziksel ürüne ait ön/arka fotoğraflar
- Kondisyon politikası: standart derece + açık kusur notu
- Kargoya teslim hedefi: yalnız gerçekten uygulanabilecek süre
- Destek kanalı
- Resmî Pokémon mağazası/iş ortağı olunmadığı açıklaması

## 10. Marka, logo ve mağaza sunumu

Shopier, `Dükkan Yönetimi > Logo & Banner` bölümünden logo ve masaüstü/mobil banner yüklenmesini destekler. Resmî yardım sayfasına göre logo en az 200 × 200 piksel ve kare olmalıdır. Banner için dikey ölçü geniş ekranda en az 200 piksel, mobilde en az 100 pikseldir; Shopier, güvenli alan gözetilerek geniş ekran için 1920 × 200, mobil için 400 × 100 pikseli ideal örnek olarak verir. [9]

### Marka dosyaları

| Dosya          | Önerilen kullanım  | Operasyon notu                    |
| -------------- | ------------------ | --------------------------------- |
| Kare logo      | Shopier logo alanı | En az 200 × 200 px                |
| Geniş banner   | Masaüstü mağaza    | Metni merkez güvenli alanda tutun |
| Mobil banner   | Mobil mağaza       | Ayrı kompozisyon hazırlayın       |
| Favicon/işaret | Statik site        | Resmî Pokémon logosu kullanmayın  |

### Tasarım ilkeleri

- Özgün mağaza adı ve işareti kullanın.
- Pokémon logosunu veya resmî karakter çizimlerini mağaza markası yapmayın.
- Resmî mağaza, yetkili satıcı veya iş ortağı izlenimi vermeyin.
- Ürün fotoğrafı olarak şirketin çektiği gerçek fiziksel ürün fotoğraflarını kullanın.
- Banner’da kanıtlanamayan “%100 orijinal garanti”, “yatırım garantisi” veya “en ucuz” gibi iddialara yer vermeyin.
- Statik site ve Shopier mağazasında isim, iletişim ve görsel kimliği tutarlı tutun.

## 11. Kategori planlaması

Shopier’de kategoriler `Dükkan Yönetimi > Kategori Ayarları` bölümünden eklenebilir, sıralanabilir ve silinebilir. [10]

Başlangıç için sade kategori yapısı:

1. Tekli Kartlar
2. Derecelendirilmiş Kartlar
3. Kapalı Ürünler
4. Paket ve Lotlar
5. Aksesuarlar

“Yeni Eklenenler” ve “Öne Çıkanlar” statik sitedeki içerik alanlarıyla yönetilebilir. Shopier kategorileri gereğinden fazla parçalanmamalıdır. Set, dil, kondisyon, nadirlik ve baskı tipi gibi ayrıntılar statik sitede filtre; Shopier ürün açıklamasında metadata olarak yer alabilir.

### Kategori karar kuralları

- Bir kategoride en az birkaç ürün olmayacaksa başlangıçta açmayın.
- “Satıldı” kategorisi oluşturmak yerine stok ve görünürlük politikasını kullanın.
- Tekli kart ile kapalı ürünleri aynı kategori altında karıştırmayın.
- Farklı ürün türlerinin kargo/paketleme ihtiyacı belirginse ayrı kategori kullanın.

## 12. Pokémon kartı ürün listeleme standardı

Her ürün kaydı, müşterinin hangi fiziksel ürünü alacağını açıkça tanımlamalıdır.

### Zorunlu ürün verileri

- Benzersiz iç ürün kodu
- Kart adı
- Set adı ve varsa set kodu
- Koleksiyon numarası
- Dil
- Nadirlik
- Holo/finish/baskı tipi
- Kondisyon sınıfı
- İnsan tarafından yazılmış kondisyon notu
- Satılan adet
- Gerçek ön ve arka fotoğraf
- Belirgin kusurlar için detay fotoğrafı
- Satış fiyatı ve stok
- Kargo tipi
- Shopier ürün bağlantısı

### Derecelendirilmiş kartlarda ek veriler

- Derecelendirme kuruluşu
- Not/grade
- Sertifika numarası
- Sertifika doğrulama bağlantısı (kuruluşun resmî sayfası mevcutsa)
- Slab ön/arka fotoğrafı

### Temel kayıt ilkesi

Fiziksel kondisyonu, dili, baskısı, grade’i, görseli veya fiyatı farklı kartlar ayrı ürün kaydı olmalıdır. Tamamen eş nitelikte birden fazla kopya varsa tek Shopier ürününde stok adedi artırılabilir; ancak müşterinin göreceği fotoğrafların teslim edilecek kopyayı temsil etmesi şarttır.

## 13. Ürün adlandırma standardı

### Tekli kart

`[Kart Adı] – [Set] [Koleksiyon No.] – [Dil] – [Kondisyon]`

Örnek:

`Charizard ex – Obsidian Flames 223/197 – İngilizce – Near Mint`

### Derecelendirilmiş kart

`[Kart Adı] – [Set] [Koleksiyon No.] – [Kuruluş] [Grade] – [Dil]`

Örnek:

`Pikachu – Base Set 58/102 – PSA 9 – İngilizce`

### Kapalı ürün

`[Ürün Adı] – [Set/Seri] – [Dil] – Kapalı Ürün`

### Adlandırma kuralları

- Başlığın başına “SON FIRSAT”, “KAÇMAZ” gibi yanıltıcı pazarlama metinleri eklemeyin.
- Kart adı ve set adını resmî baskıyla uyumlu yazın.
- Koleksiyon numarasını eğik çizgiyle tam verin.
- Kondisyonu başlıkta ve açıklamada aynı kullanın.
- Emoji ve tamamı büyük harf başlıklardan kaçının.
- Aynı biçimi Shopier, statik site ve iç takip tablosunda koruyun.

## 14. Ürün açıklaması şablonu

Aşağıdaki şablon her ürün için doldurulmalı; boş alanlar ürün sayfasında bırakılmamalıdır.

> **Kart adı:**  
> **Set / seri:**  
> **Koleksiyon numarası:**  
> **Dil:**  
> **Nadirlik:**  
> **Holo / baskı tipi:**  
> **Kondisyon:**  
> **Grade / sertifika:** (varsa)
>
> **Kondisyon notu:**  
> Ön yüz:  
> Arka yüz:  
> Kenar ve köşeler:  
> Bilinen kusurlar:
>
> **Paket içeriği:** Bir adet fiziksel kart.  
> **Gönderim:** Kart sleeve ve sert koruyucu içinde, darbeye ve neme karşı destekli ambalajla gönderilir.  
> **İnceleme notu:** Satın almadan önce tüm gerçek ürün fotoğraflarını inceleyiniz.  
> **Bağlantı açıklaması:** Bu mağaza Pokémon, Nintendo, Creatures Inc. veya GAME FREAK ile resmî olarak bağlantılı değildir.

### Açıklamada kaçınılacak ifadeler

- Kanıt olmadan “kesin orijinal”, “profesyonel doğrulandı”
- “Yatırım garantili”, “kesin değerlenir”
- Görselde bulunmayan aksesuarların dahil olduğu izlenimi
- Kondisyon kusurunu gizleyen veya küçümseyen metin
- Hukuken doğrulanmamış “iade yoktur” ifadesi

## 15. Ürün fotoğrafı standardı

### Zorunlu çekimler

1. Ön yüz, tam kadraj
2. Arka yüz, tam kadraj

### Kusur varsa ek çekimler

- Dört köşe
- Kenar beyazlaması
- Yüzey çizikleri
- Bükülme/göçük
- Holo yüzey ışık açısı
- Slab etiketi ve sertifika alanı

### Teknik öneri

| Konu       | Öneri                                                    |
| ---------- | -------------------------------------------------------- |
| Arka plan  | Düz, nötr ve dikkat dağıtmayan                           |
| Işık       | Dağınık, yansıma ve sert gölge oluşturmayan              |
| Çözünürlük | Uzun kenarda en az 1600 px kaynak                        |
| Dosya      | Yüksek kaliteli JPEG/PNG kaynak; web için optimize türev |
| Kadraj     | Kartın tamamı, köşeler kesilmeden                        |
| Renk       | Aşırı filtre veya yapay doygunluk yok                    |
| Dosya adı  | İç ürün kodu + `front`, `back`, `detail-01`              |

### Operasyon kuralları

- Başka satıcının, pazar yerinin veya resmî Pokémon sitesinin görselini kopyalamayın.
- Filigran kullanılıyorsa kondisyon incelemesini engellemeyecek küçük ve tutarlı konum seçin.
- Fotoğrafları yayınlamadan önce kart kodu ve fiziksel ürünle eşleştirin.
- Gerçek ürünler için statik sitede ön ve arka fotoğraf olmadan yayın yapmayın.
- Ürün satıldıktan sonra görselleri, muhasebe ve uyuşmazlık saklama politikasına uygun süreyle arşivleyin.

## 16. Kondisyon yönetimi

Standart sınıflar:

- Mint
- Near Mint
- Lightly Played
- Moderately Played
- Heavily Played
- Damaged

Bu sınıflar tek başına yeterli değildir. Her üründe ayrıca açık, insan tarafından yazılmış kondisyon notu bulunmalıdır.

### İnceleme sırası

1. Kartı temiz ellerle ve iyi ışıkta çıkarın.
2. Ön yüzü çizik, baskı kusuru, girinti ve leke açısından inceleyin.
3. Arka yüzü beyazlama ve yüzey hasarı açısından inceleyin.
4. Dört kenar ve köşeyi kontrol edin.
5. Kartı eğik ışıkta yüzey kusurları için gözlemleyin.
6. Bükülme, su/nem veya koku belirtisini kontrol edin.
7. Kondisyon sınıfını seçin.
8. Kusurları nötr ve ölçülebilir dille yazın.
9. Gereken detay fotoğraflarını çekin.
10. Ürün sahibi/atanmış sorumludan yayın onayı alın.

> **İyi not:** “Arka sol kenarda yaklaşık 8 mm boyunca hafif beyazlama; ön yüzde eğik ışıkta görülen iki ince yüzey çizgisi.”  
> **Yetersiz not:** “Yaşına göre iyi.”

Kondisyon konusunda tereddüt varsa daha iyimser sınıf seçilmemeli; ürün askıda tutulmalı veya uzman görüşü alınmalıdır.

## 17. Shopier’e ürün ekleme: adım adım

Shopier resmî yardım merkezine göre web panelinde `Ürünler > Ürün Listeleme`, mobil uygulamada ise `Ürünler` bölümündeki `+` simgesi kullanılır. En az bir görsel, ürün adı, satış fiyatı/para birimi, stok ve kargo tipi temel alanlardır; açıklama zorunlu olmayabilir fakat bu proje standardında zorunludur. Ürün yayınlandığında kısa ürün bağlantısı oluşur. [11]

1. İç ürün kodunu ve fotoğraf klasörünü hazırlayın.
2. Ön, arka ve gerekirse detay fotoğraflarını son kez kontrol edin.
3. `Ürünler > Ürün Listeleme` bölümünü açın.
4. Ön fotoğrafı ilk görsel, arka fotoğrafı ikinci görsel olarak yükleyin.
5. Standart biçimde ürün adını yazın.
6. Şablonu kullanarak açıklamayı doldurun.
7. Satış fiyatını ve para birimini belirleyin.
8. Gerçek stok adedini girin.
9. Kargo tipini seçin.
10. Ürün türünü fiziksel ürün olarak belirleyin.
11. Doğru kategoriyi seçin.
12. Gerekliyse varyasyon/opsiyon ekleyin.
13. Görünürlük ve indirim alanlarını kontrol edin.
14. Ön izleme yapın; özellikle başlık, fiyat, stok, kondisyon ve fotoğraf eşleşmesini doğrulayın.
15. Ürünü yayınlayın.
16. Oluşan tam HTTPS Shopier bağlantısını kopyalayın.
17. Bağlantıyı ürün eşleştirme kaydına ve statik site içeriğine ekleyin.
18. Üyeliksiz/gizli pencereden ürün sayfasını açıp satın alma akışının erişilebilir olduğunu kontrol edin.

Shopier gelişmiş seçeneklerde kategori, varyasyon, ücretli/ücretsiz opsiyon, özelleştirme notu, indirim, görünürlük, kargo ve fiziksel/dijital ürün türü sunar. [12]

## 18. Ayrı ürün mü, varyasyon mu?

Shopier bir üründe en fazla iki varyasyon tanımını ve varyasyonlara özel görsel, fiyat ve stok bilgisini destekler. [13], [14]

| Senaryo                             | Karar                    | Gerekçe                                            |
| ----------------------------------- | ------------------------ | -------------------------------------------------- |
| Aynı kart, farklı kondisyon         | Ayrı ürün                | Fotoğraf, fiyat ve fiziksel nitelik farklı         |
| Aynı kart, farklı dil               | Ayrı ürün                | Koleksiyon niteliği farklı                         |
| Aynı kart, farklı grade             | Ayrı ürün                | Sertifika ve değer farklı                          |
| Aynı kartın farklı fiziksel kopyası | Ayrı ürün                | Müşteri belirli kopyayı görmeli                    |
| Tamamen eş nitelikte çoklu kopya    | Tek ürün + stok          | Fotoğraf teslim edilen ürünü doğru temsil ediyorsa |
| Aksesuarın renk/beden seçenekleri   | Varyasyon                | Standart varyant mantığına uygun                   |
| Kapalı pakette seçilebilir tasarım  | Varyasyon veya ayrı ürün | Görsel/stok doğruluğuna göre                       |

Tekil koleksiyon kartlarında varyasyon kullanımı istisna olmalıdır. Kondisyonu varyasyon olarak saklamak, müşterinin belirli fiziksel kopyayı ve kusurları doğru görmesini zorlaştırır.

## 19. Shopier ürün bağlantısını alma ve kaydetme

Ürün yayınlandığında ürüne özel kısa Shopier bağlantısı oluşur. Mevcut bağlantılar `Ürünler > Satıştaki Ürünler` bölümünden görüntülenip kopyalanabilir. Müşteri bağlantıyı üyelik açmadan inceleyebilir ve satın alabilir. [15]

### Kayıt standardı

| Alan             | Örnek                         |
| ---------------- | ----------------------------- |
| İç ürün ID       | `CARD-0042`                   |
| Shopier ürün adı | Charizard ex – ...            |
| Tam bağlantı     | `https://www.shopier.com/...` |
| Statik site slug | `charizard-ex-223-197`        |
| Durum            | Aktif / Satıldı / Gizli       |
| Son doğrulama    | 30.07.2026                    |
| Kontrol eden     | Yetkili adı/rolü              |

### Bağlantı güvenliği

- Yalnız `https://www.shopier.com/` bağlantısı kullanın.
- Kısaltıcı veya aracı yönlendirme kullanmayın.
- Bağlantının tamamını kaydedin; URL içinden ürün kimliği ayrıştırmayın.
- Aynı Shopier bağlantısını iki farklı ürün kaydına atamayın.
- Kaynak koda Shopier hesap parolası veya erişim anahtarı yazmayın.

## 20. Shopier ürününü statik siteyle eşleştirme

Bu projede statik site ürün kaydı ve Shopier ürün kaydı elle eşleştirilir.

### Yayın sırası

1. Ürün önce Shopier’de eksiksiz oluşturulur.
2. Ürün bağlantısı dışarıdan test edilir.
3. Statik sitede `pnpm card:new` ile taslak kayıt oluşturulur.
4. Gerçek ön/arka fotoğraflar kaynak klasöre yerleştirilir.
5. Medya optimizasyonu çalıştırılır.
6. Ürün metadata’sı ve tam Shopier URL’si doldurulur.
7. `availability: available`, `isPlaceholder: false` yapılır.
8. İçerik doğrulaması ve build çalıştırılır.
9. Ürün detayındaki CTA’nın doğru Shopier sayfasını yeni sekmede açtığı kontrol edilir.
10. Yayın paketi Natro’ya yalnız alan adı, hosting ve canlıya çıkış onayı tamamlandıktan sonra aktarılır.

### Doğruluk kaynağı

- Fiyat ve stok: Shopier
- Ürün fotoğrafı ve kondisyon: Satıcının onaylı ürün kaydı
- Tanıtım metni ve filtre metadata’sı: Statik site
- Sipariş ve müşteri verisi: Shopier

Statik sitedeki fiyat Shopier’den otomatik senkronize değildir. Fiyat değiştiğinde iki kayıt da kontrollü olarak güncellenmelidir.

## 21. Stok ve satılan ürün yönetimi

### Stok politikası

- Tekil kartlarda stok genellikle `1` olmalıdır.
- Aynı kartın farklı fiziksel kopyaları tek stok sayısında birleştirilmemelidir.
- Bir satış gerçekleştiğinde önce Shopier stok durumu kontrol edilir.
- Statik site `sold` durumuna alınarak yeniden derlenir.
- İptal/iade sonrası ürün tekrar satışa açılacaksa fiziksel kondisyon yeniden kontrol edilir.

### Satılan ürün görünürlüğü

Statik sitede satılan kartlar güven ve arşiv değeri için “Satıldı” etiketiyle kalabilir; aktif Shopier CTA’sı gösterilmez. Ürün tamamen kaldırılacaksa `hidden`; yayına hazırlık aşamasındaysa `draft`; ileri tarihli ürünse `coming-soon` kullanılabilir.

### Shopier tarafı

- Stok adedini doğru tutun.
- Satılan tekil ürünün bağlantısını aktif satışta bırakmayın.
- Tekrar stoklanan ürün aynı fiziksel kopya değilse yeni fotoğraf ve ürün kaydı oluşturun.
- Statik site ve Shopier arasında günlük mutabakat yapın.

## 22. Kargo yapılandırması ve önerilen akış

Shopier, kendi seçilen kargo firmasıyla manuel gönderim ve şartları sağlayan siparişlerde anlaşmalı kargo kodu kullanımını destekler. Manuel kargoda ödemenin aktarılabilmesi için takip bilgileri girilerek sipariş kapatılır; anlaşmalı kargoda gönderi şubede işlendiğinde sipariş otomatik kapanabilir. [16], [17]

30 Temmuz 2026 itibarıyla Shopier’in anlaşmalı kargo yardım sayfası şu genel şartları belirtir:

- Sipariş toplamı en az 200 TL
- Tüm ürünlerin kargo tipi “Sepette ödeme” veya “Ücretsiz kargo”
- Alıcı adresi Türkiye sınırları içinde

Shopier’in resmî ana sayfası aynı tarihte Yurtiçi Kargo, DHL eCommerce ve PTT Kargo adlarını gösterir. Buna rağmen anlaşmalı firmalar, kapsam ve ücretler değişebileceği için canlıya çıkışta Shopier panelindeki güncel seçenekler esas alınmalıdır. [17], [32]

### Önerilen başlangıç akışı

1. Ürünleri “Sepette ödeme” veya iş kararına göre “Ücretsiz kargo” ile yapılandırın.
2. Sipariş geldiğinde ürün kodu ve fiziksel kartı eşleştirin.
3. Kondisyonu fotoğraflarla tekrar karşılaştırın.
4. Faturayı hazırlayın.
5. Shopier’den güncel uygun kargo firmasını seçerek kod oluşturun.
6. Ürünü paketleme standardına göre hazırlayın.
7. Kargo koduyla şubeye teslim edin.
8. Aynı gün takip ve sipariş durumunu kontrol edin.
9. Anlaşmalı kargo kullanılamıyorsa manuel kargo takip bilgisini girip siparişi kapatın.

Shopier’de “Teslimatta Ödeme”, “Ücretsiz Kargo” ve “Sepette Ödeme” seçeneklerinin anlamı farklıdır. Teslimatta ödemede anlaşmalı kargo kullanılamaz; sepette ödemede belirlenen ücret sepete eklenir; ücretsiz kargoda müşteriye kargo tutarı yansıtılmaz. [18]

> **Öneri:** Kesin kargo bedeli ve ücretsiz kargo eşiği, paneldeki güncel ücretler ve ortalama paket desisi görülmeden sabitlenmemelidir.

## 23. Koleksiyon kartı paketleme standardı

### Tekli, derecelendirilmemiş kart

1. Temiz ve uygun ölçülü sleeve
2. Top loader veya card saver
3. Kartın çıkmasını önleyen, yapışkanı karta değmeyen sabitleme
4. Yeniden kapanabilir nem bariyerli poşet
5. İki sert karton veya koruyucu ara katman
6. Balonlu zarf veya küçük dayanıklı kutu
7. Paket içinde hareketi önleyen dolgu
8. Dış etikette doğru alıcı ve kargo kodu

### Derecelendirilmiş kart

1. Slab için çizilmeyi önleyen poşet
2. Köşe ve kenar koruması
3. Balonlu sarım
4. Ezilmeye dayanıklı kutu
5. Boşluğu engelleyen dolgu

### Paketleme kalite kontrolü

- [ ] Ürün kodu siparişle aynı
- [ ] Kartın son kondisyonu fotoğraflarla aynı
- [ ] Fatura/belge hazır
- [ ] Paket ıslanmaya karşı korunuyor
- [ ] Ürün paket içinde hareket etmiyor
- [ ] Yapışkan kart veya sleeve yüzeyine temas etmiyor
- [ ] Kargo etiketi okunaklı
- [ ] Paketleme zamanı ve sorumlusu kaydedildi

Yüksek değerli ürünlerde paketleme öncesi ve kapalı paket fotoğrafı uyuşmazlık yönetimine yardımcı olabilir; kişisel veriler gereksiz yere görüntüye alınmamalıdır.

## 24. Sipariş yönetimi

Shopier satıcı panelinde sipariş durumları “Açık”, “Kapalı”, “İptal” ve “İade” olarak açıklanır. Açık durum ödeme tamamlanmış ve teslimat bekleyen; kapalı durum fiziksel ürünün kargoya teslim edildiğini; iptal, ödeme aktarılmadan tutarın müşteriye döndüğünü; iade ise aktarım sonrası tam veya bağımsız kısmi iade yapıldığını gösterir. [19]

Müşterinin sipariş takip ekranında ise daha açıklayıcı “Sipariş alındı”, “Kargoya verildi”, “Teslim edildi”, “İptal edildi” ve “İade edildi” ifadeleri görülebilir. Satıcı paneli ile müşteri ekranındaki bu iki adlandırma seti birbirine karıştırılmamalıdır. [20]

### Yeni sipariş SOP

1. Shopier bildiriminin gerçekliğini doğrudan panelden kontrol edin.
2. Sipariş numarası, ürün, adet, alıcı ve ödeme durumunu inceleyin.
3. Fiziksel ürünü stoktan ayırın.
4. Statik sitede satıldı güncellemesini planlayın.
5. Ürünü fotoğraf ve kondisyon notuyla karşılaştırın.
6. Fatura işlemini tamamlayın.
7. Paketi hazırlayın.
8. Anlaşmalı kargo kodu oluşturun veya manuel kargoyu gönderin.
9. Takip bilgisini ve sipariş kapanışını doğrulayın.
10. Müşteri mesajlarını kurumsal ve kayıtlı kanaldan yanıtlayın.

Müşteri Shopier dükkanındaki sipariş takip alanından sipariş numarasıyla güncel durumu sorgulayabilir; kargo bilgisi e-posta veya SMS ile iletilebilir. [20]

### Sipariş verisinde güvenlik

- Sipariş ekranının görüntüsünü kişisel mesaj gruplarına göndermeyin.
- Adres ve telefonu yalnız gönderim amacıyla kullanın.
- Statik site veya Git deposuna müşteri verisi eklemeyin.
- Gereksiz kopyaları şirketin saklama politikasına göre silin.

## 25. Ödeme ve para aktarımı

Müşteri ödemeyi Shopier’de kartla tamamlar. Satıcıya para aktarımı için fiziksel siparişin teslimat sürecinin gösterilmesi ve siparişin kapanması gerekir. Shopier resmî yardım merkezine göre salı günü saat 18.00’e kadar kapatılan siparişlerin bilgileri kontrol edilir; eksik yoksa ödemeler çarşamba günü toplu olarak banka hesabına aktarılır. Resmî tatilde gün değişebilir. Güncel tahsilatlar `Tahsilatlar > Tahsilat Detayları` bölümünden izlenir. [21]

### Haftalık mutabakat

- [ ] Toplam bakiye
- [ ] Net bakiye
- [ ] Hizmet bedeli kesintileri
- [ ] Kargo kesintileri
- [ ] İadeler
- [ ] Bankaya aktarılan tutar
- [ ] Fatura toplamları
- [ ] Açık kalmış siparişler

> **Mutabakat ilkesi:** Shopier tahsilatı, satıcının fatura ve muhasebe sorumluluğunun yerine geçmez. Banka hareketi, Shopier tahsilat detayı, sipariş ve fatura kayıtları birlikte mutabık hale getirilmelidir.

## 26. Platform ücretleri ve fiyatlandırma

Shopier üyeliği ücretsizdir; aylık/yıllık zorunlu temel kullanım ücreti bulunmadığı, hizmet bedelinin sipariş gerçekleştiğinde oluştuğu resmî yardım merkezinde belirtilir. Güncel hizmet bedelleri, giriş yapıldıktan sonra mağaza logosu altındaki `Ücretlendirme > İşlem Ücretleri` alanından görülür. [22]

Bu belgede sabit komisyon yüzdesi verilmez; internet üzerindeki eski oranlar karar için kullanılmamalıdır.

### Fiyat bileşenleri

`Ürün maliyeti + Shopier hizmet bedeli + vergi etkisi + paketleme + kargo katkısı + iade/hasar payı + hedef kâr = satış fiyatı`

### Fiyat onay kontrolü

- [ ] Güncel işlem bedeli panelden görüldü
- [ ] Güncel kargo bedeli/desi görüldü
- [ ] Ürün maliyeti belgelendi
- [ ] Vergi etkisi mali müşavirle teyit edildi
- [ ] Paketleme maliyeti eklendi
- [ ] Statik site ve Shopier fiyatı aynı
- [ ] İndirim uygulanıyorsa referans fiyat gerçek ve güncel

İsteğe bağlı ücretli Shopier uygulamaları veya temaları temel üyelik ücretinden ayrı olabilir; yalnız ihtiyaç ve güncel fiyat görüldükten sonra etkinleştirilmelidir.

## 27. İptal ve iade akışı

Shopier panelinde tam veya kısmi iade yapılabilir. Web panelinde `İadeler > İade Oluştur` üzerinden sipariş bulunur, tutar seçilir ve müşteriye not eklenebilir. İadenin başlatılabilmesi için hesapta en az iade edilecek tutar kadar bakiye bulunmalıdır. İade, müşterinin ödeme yaptığı kartın bankasına gönderilir. [23], [24]

### İptal/iade SOP

1. Talebi ve sipariş numarasını yazılı/kalıcı kanaldan alın.
2. Sipariş, teslimat ve ödeme durumunu Shopier panelinden doğrulayın.
3. Ürünün kargoda/teslim edilmiş olup olmadığını kontrol edin.
4. Şirket iade politikası ve tüketici mevzuatı kapsamında karar verin.
5. Fiziksel iade gerekiyorsa adres ve paketleme talimatını iletin.
6. Gelen ürünü video/fotoğrafla değil, objektif kontrol formuyla kondisyon açısından inceleyin.
7. Yeniden satılabilir, hasarlı veya uyuşmazlık durumunu kaydedin.
8. Shopier’den tam/kısmi iade işlemini başlatın.
9. İade durumunu panelden izleyin.
10. Fatura/muhasebe düzeltmesini mali müşavir sürecine göre yapın.
11. Stok tekrar açılacaksa yeni fotoğraf ve kondisyon kontrolü yapın.

Müşteriye kart dışı havale ile keyfî iade yapılmamalı; Shopier’in orijinal ödeme aracına iade akışı kullanılmalıdır. Bankaya yansıma süresi kart türüne ve bankaya göre değişebilir. [24]

## 28. Fatura, vergi ve muhasebe

Shopier’in ödeme/sipariş altyapısını sağlaması satıcı şirketin belge düzenleme, vergi ve muhasebe yükümlülüklerini ortadan kaldırmaz.

### Şirketin teyit etmesi gerekenler

- Fatura veya e-Arşiv Fatura yöntemi
- e-Fatura/e-Arşiv uygulamasına kayıt durumu
- Fatura düzenleme zamanı
- İkinci el/kolleksiyon ürünü alış belgeleri
- KDV ve varsa özel matrah uygulamaları
- İade belgesi ve muhasebe kaydı
- Kargo ve platform kesintilerinin giderleştirilmesi
- Shopier haftalık tahsilatlarının banka mutabakatı

GİB, elektronik belge uygulamasındaki mükelleflerin faaliyetlerine uygun e-Belgeleri düzenlemesi gerektiğini; e-Fatura kayıtlı mükelleflerin kayıtlı alıcılara e-Fatura, kayıtlı olmayanlara e-Arşiv Fatura düzenlediğini açıklar. Uygulama kapsamı ve güncel tutar sınırları değişebildiği için şirketin kesin yöntemi mali müşavir tarafından belirlenmelidir. [25]

> **Uzman teyidi zorunlu:** Kartların şirket stokuna nasıl girdiği, yeni/ikinci el niteliği, alış belgesi, vergi matrahı ve fatura tipi ürünün tedarik biçimine ve şirketin statüsüne bağlıdır. Bu rehber bu konuda hüküm kurmaz.

### Muhasebe dosyası

Her dönem için aşağıdaki kayıtlar saklanmalı ve mali müşavirle mutabakat yapılmalıdır:

- Shopier sipariş listesi
- Tahsilat detayları
- Banka hareketleri
- Düzenlenen faturalar
- İade kayıtları
- Shopier hizmet bedeli belgeleri
- Kargo kesintileri/belgeleri
- Stok giriş ve çıkış kayıtları

## 29. ETBİS değerlendirmesi

Ticaret Bakanlığı ETBİS SSS’sine göre yurt içindeki bir aracı hizmet sağlayıcı üzerinden satış yapanların ayrıca ETBİS kayıt ve bildirim yükümlülüğü bulunmamaktadır. [26]

Bu projede sözleşme ve sipariş Shopier’de kuruluyor; statik site yalnız ürün tanıtıp Shopier bağlantısına yönlendiriyor. Bu nedenle mevcut mimari, yurt içindeki aracı hizmet sağlayıcı üzerinden satış modeline yakındır.

> **Hukuki değerlendirme sınırı:** Shopier’in somut faaliyetteki hukuki rolü, statik sitedeki ifadeler, başka satış kanalları ve şirketin iş modeli birlikte değerlendirilmelidir. Canlıya çıkıştan önce şirketin mali müşaviri veya e-ticaret mevzuatında yetkin hukukçu ETBİS durumunu teyit etmelidir.

Şu değişikliklerden biri olursa ETBİS yeniden değerlendirilmelidir:

- Statik siteye sepet veya sipariş formu eklenmesi
- Ödemenin kendi site altyapısında alınması
- Başka yurt dışı pazar yerlerinden sipariş alınması
- Çok satıcılı model
- Kendi alan adında sözleşmenin kurulması

## 30. Tüketici hakları ve mesafeli satış

Ticaret Bakanlığına göre mesafeli sözleşmelerde tüketici genel olarak malı teslim aldığı tarihten itibaren 14 gün içinde gerekçe göstermeksizin ve cezai şart ödemeksizin cayabilir. Cayma bildirimi yazılı veya kalıcı veri saklayıcısıyla yapılabilir. İstisnalar ürün ve somut durum bazında değerlendirilir. [27]

Taahhüt edilen farklı bir süre yoksa mal teslimine ilişkin 30 günlük sınır ve imkânsızlaşma halinde bildirim/iade yükümlülükleri de dikkate alınmalıdır. [27]

### Satıcının operasyon sorumlulukları

- Ürünü doğru ve eksiksiz tanımlamak
- Gerçek fiziksel ürünü fotoğraflamak
- Kondisyon ve kusurları açıklamak
- Kargo, teslimat ve iade bilgilerini satış öncesi görünür kılmak
- Cayma/iade başvurusunu kalıcı kanaldan alabilmek
- Süreleri ve istisnaları hukukçu teyidiyle uygulamak
- Hasar/kayıp riskini teslimata kadar yönetmek
- Stok yokluğunu rutin “imkânsızlık” gerekçesi olarak kullanmamak

Koleksiyon kartı, ikinci el veya tekil ürün olması tek başına otomatik “iade yoktur” sonucu doğurmaz. İstisna iddiası hukukçu tarafından doğrulanmadan ürün açıklamasına eklenmemelidir.

## 31. Marka, orijinallik ve fikrî mülkiyet

Pokémon’un resmî destek kaynakları sahte kartların piyasada bulunduğunu belirtir; şüpheli ürünlerin uzman mağaza tarafından değerlendirilmesini önerir. [28]

Pokémon’un resmî destek sayfası, isim, karakter ve tasarımlar dahil fikrî mülkiyetin proje kullanımına izin veremediğini belirtir. [29] Bu nedenle:

- Resmî Pokémon logosunu mağaza logosu yapmayın.
- Pokémon karakter çizimlerini, resmî web görsellerini veya paket görsellerini dekorasyon için kopyalamayın.
- Alan adı ve mağaza adı resmî ortaklık izlenimi vermemelidir.
- “Yetkili/resmî satıcı” ifadesini yazılı yetki olmadan kullanmayın.
- Ürünleri tanımlamak için gerekli marka kullanımının sınırlarını hukukçuya inceletin.
- Yalnız şirketin çektiği gerçek fiziksel ürün fotoğraflarını kullanın.
- Footer ve Shopier “Hakkında” alanında bağlantısızlık açıklaması bulundurun.

### Orijinallik kontrolü

- Kart materyali ve baskı kalitesi
- Ön/arka renk ve hizalama
- Set sembolü ve koleksiyon numarası
- Yazı/font ve enerji sembolleri
- Işık geçirgenliği gibi şüphe göstergeleri
- Kaynağı ve alış belgesi
- Derecelendirilmiş kartta sertifika doğrulaması

Şüpheli ürün satışa açılmamalı; “orijinal olabilir” gibi belirsiz ifadeyle risk müşteriye aktarılmamalıdır.

## 32. Günlük operasyon kontrol listesi

### Gün başlangıcı

- [ ] Shopier paneline güvenli cihazdan giriş
- [ ] Yeni açık siparişlerin kontrolü
- [ ] Müşteri mesajlarının kontrolü
- [ ] Stokta ayrılması gereken ürünlerin belirlenmesi
- [ ] İade/iptal taleplerinin kontrolü

### Sipariş hazırlama

- [ ] Sipariş no ve ürün kodu eşleşiyor
- [ ] Fiziksel kart fotoğraf ve kondisyonla eşleşiyor
- [ ] Fatura süreci tamam
- [ ] Paketleme standardı uygulandı
- [ ] Kargo kodu/takip bilgisi doğru

### Gün sonu

- [ ] Gönderilen siparişlerin kapanış durumu kontrol edildi
- [ ] Statik sitede satıldı yapılacak ürünler listelendi
- [ ] Shopier stokları kontrol edildi
- [ ] İade ve müşteri aksiyonları kaydedildi
- [ ] Kişisel veri içeren gereksiz yerel kopyalar temizlendi

## 33. Yeni ürün kontrol listesi

- [ ] İç ürün ID’si benzersiz
- [ ] Kart adı, set ve numara doğrulandı
- [ ] Dil, nadirlik ve baskı tipi doğrulandı
- [ ] Kondisyon sorumlusu sınıfı belirledi
- [ ] Açık kondisyon notu yazıldı
- [ ] Ön fotoğraf gerçek ürüne ait
- [ ] Arka fotoğraf gerçek ürüne ait
- [ ] Kusurlar için detay fotoğrafı eklendi
- [ ] Ürün adı standarda uygun
- [ ] Açıklama şablonu eksiksiz
- [ ] Fiyat maliyet kalemleriyle hesaplandı
- [ ] Stok doğru
- [ ] Kargo tipi doğru
- [ ] Shopier ürünü yayınlandı
- [ ] Tam Shopier URL’si kaydedildi
- [ ] Statik site kaydı oluşturuldu
- [ ] İçerik ve medya doğrulaması geçti
- [ ] Shopier CTA doğru ürün sayfasını açıyor

## 34. Canlıya çıkış kontrol listesi

### Hesap

- [ ] Ticari hesap doğru şirket ve yetkili adına
- [ ] Şirket IBAN’ı doğrulandı
- [ ] Hesap aktif
- [ ] MFA etkin
- [ ] Güncel işlem bedelleri görüldü

### Mağaza

- [ ] Ad, logo ve banner onaylı
- [ ] Kurumsal iletişim bilgileri doğru
- [ ] Kategoriler hazır
- [ ] Kargo seçenekleri güncel
- [ ] Hakkında ve bağlantısızlık metni mevcut

### Ürün

- [ ] Gerçek ön/arka fotoğraflar
- [ ] Kondisyon ve kusur notları
- [ ] Stok ve fiyat mutabakatı
- [ ] Kargo tipi
- [ ] Doğru Shopier bağlantısı

### Hukuk ve muhasebe

- [ ] Fatura/e-Belge yöntemi mali müşavirle teyit
- [ ] ETBİS değerlendirmesi teyit
- [ ] Mesafeli satış ve iade metinleri hukukçu/mali müşavirle gözden geçirildi
- [ ] KVKK ve müşteri verisi operasyonu belirlendi
- [ ] Marka/IP kullanımı incelendi

### Test

- [ ] Kontrollü test siparişi
- [ ] Kargo kodu ve sipariş kapanışı
- [ ] Tahsilat görünümü
- [ ] İade prosedürü
- [ ] Statik site → doğru Shopier ürünleri
- [ ] Mobil ve masaüstü kontrol

## 35. Yaygın hatalar ve sorun giderme

| Hata                           | Olası neden                                             | Çözüm                                                                            |
| ------------------------------ | ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Hesap yanlış kişi adına        | Geçici bireysel hesap açıldı                            | Satışa başlamadan Shopier destekle yeni doğru hesap ve taşıma sürecini planlayın |
| Para aktarımı gelmedi          | Sipariş açık, takip eksik veya kontrol bekliyor         | Siparişi, takip bilgisini ve `Tahsilatlar` ekranını kontrol edin                 |
| IBAN kabul edilmiyor           | Hesap sahibi uyuşmuyor                                  | Şirket/Shopier kayıt sahibi adına IBAN kullanın                                  |
| Anlaşmalı kargo görünmüyor     | Sipariş tutarı, kargo tipi veya adres şartı uygun değil | Güncel şartları ve ürün kargo tiplerini kontrol edin                             |
| Yanlış ürün linki              | Elle eşleştirme hatası                                  | İç ürün ID–Shopier URL tablosunu doğrulayın ve build öncesi kontrol çalıştırın   |
| Satılan ürün sitede aktif      | Statik site yeniden derlenmedi                          | `sold` durumuna alın, doğrulayıp yeniden yayınlayın                              |
| Fotoğraf ile ürün uyuşmuyor    | Kopyalar tek kayıtta birleştirildi                      | Farklı fiziksel kopyayı ayrı ürün yapın                                          |
| İade başlayamıyor              | Shopier bakiyesi yetersiz                               | Bakiye durumunu ve panel uyarısını kontrol edin                                  |
| Türkçe karakter bozuk          | Yanlış dosya kodlaması                                  | UTF-8 kullanın; içerik ve Word çıktısını görsel denetleyin                       |
| Komisyon hesabı yanlış         | Eski internet oranı kullanıldı                          | Paneldeki güncel `İşlem Ücretleri` ekranını esas alın                            |
| Müşteri “resmî mağaza” sanıyor | Marka dili/logolar yanıltıcı                            | Resmî varlıkları kaldırın, bağlantısızlık açıklamasını görünür yapın             |

## 36. Sorumluluk matrisi

| İş                        | Şirket yetkilisi | Ürün/kondisyon sorumlusu | Teknik ekip | Mali müşavir | Hukukçu |
| ------------------------- | ---------------- | ------------------------ | ----------- | ------------ | ------- |
| Shopier hesap sahipliği   | **A/R**          | I                        | I           | C            | C       |
| Şirket/IBAN bilgileri     | **A/R**          | I                        | —           | C            | —       |
| Ürün kimliği ve kondisyon | A                | **R**                    | I           | —            | —       |
| Shopier ürün girişi       | A                | **R**                    | C           | —            | —       |
| Statik site eşleştirmesi  | A                | C                        | **R**       | —            | —       |
| Kargo/paketleme           | A                | **R**                    | —           | —            | —       |
| Fatura ve mutabakat       | A                | I                        | —           | **R/C**      | —       |
| İade kararı               | **A/R**          | C                        | —           | C            | C       |
| Mesafeli satış metinleri  | A                | I                        | I           | C            | **R/C** |
| Marka/IP incelemesi       | A                | I                        | C           | —            | **R/C** |
| Natro deployment          | A                | —                        | **R**       | —            | —       |

**R:** Uygulayan, **A:** Nihai sorumlu/onaylayan, **C:** Danışılan, **I:** Bilgilendirilen.

## 37. Karar ve teyit kayıtları

Canlıya çıkıştan önce aşağıdaki tablo şirket bilgileri geldiğinde doldurulmalıdır.

| Karar                       | Durum         | Sahip               | Kanıt / tarih |
| --------------------------- | ------------- | ------------------- | ------------- |
| Hesap açılacak ticari unvan | Bekliyor      | Şirket              | —             |
| Yetkili hesap sahibi        | Bekliyor      | Şirket              | —             |
| Şirket IBAN’ı               | Bekliyor      | Şirket              | —             |
| Fatura/e-Arşiv yöntemi      | Uzman teyidi  | Mali müşavir        | —             |
| ETBİS durumu                | Uzman teyidi  | Şirket + hukuk/mali | —             |
| İade politikası             | Uzman teyidi  | Şirket + hukukçu    | —             |
| Kargo firması/ücretleri     | Panel teyidi  | Operasyon           | —             |
| Marka adı/logo/domain       | Onay bekliyor | Şirket              | —             |
| İlk ürünlerin kondisyonu    | Onay bekliyor | Ürün sahibi         | —             |
| Shopier işlem bedeli        | Panel teyidi  | Şirket              | —             |

Bu kararlar netleşmeden hesap açılışı, Shopier mağaza yapılandırması, marka onayı, Natro canlıya çıkışı ve gerçek ürün eşleştirmeleri başlatılmamalıdır.

## 38. Kaynakça

Son erişim ve doğrulama tarihi: **30 Temmuz 2026**.

1. [Shopier nedir? — Shopier Yardım Merkezi](https://help.shopier.com/help/shopier-nedir)
2. [Shopier nasıl kullanılır? — Shopier Yardım Merkezi](https://help.shopier.com/help/shopier-nasil-kullanilir)
3. [Üyelik tipleri — Shopier Yardım Merkezi](https://help.shopier.com/help/uyelik-tipleri)
4. [Hesabımı bir başkasına devredebilir miyim? — Shopier Yardım Merkezi](https://help.shopier.com/help/hesabimi-bir-baskasina-devredebilir-miyim)
5. [Nasıl üye olabilirim? — Shopier Yardım Merkezi](https://help.shopier.com/help/nasil-uye-olabilirim-fbc0b69a)
6. [Banka hesabımı nasıl değiştirebilirim? — Shopier Yardım Merkezi](https://help.shopier.com/help/banka-hesabimi-nasil-degistirebilirim)
7. [Hesabımın güvenliğini nasıl artırabilirim? — Shopier Yardım Merkezi](https://help.shopier.com/help/hesabimin-guvenligini-nasil-artirabilirim)
8. [Dükkan adımı nasıl değiştirebilirim? — Shopier Yardım Merkezi](https://help.shopier.com/help/dukkan-adimi-nasil-degistirebilirim)
9. [Dükkanıma nasıl logo ve banner ekleyebilirim? — Shopier Yardım Merkezi](https://help.shopier.com/help/dukkanima-nasil-logo-ve-banner-ekleyebilirim)
10. [Ürünlerimi nasıl kategorilendirebilirim? — Shopier Yardım Merkezi](https://help.shopier.com/help/urunlerimi-nasil-kategorilendirebilirim)
11. [Ürün listelemek istiyorum — Shopier Yardım Merkezi](https://help.shopier.com/help/urun-listelemek-istiyorum)
12. [Ürün listelerken ek seçenekler nelerdir? — Shopier Yardım Merkezi](https://help.shopier.com/help/urun-listelerken-ek-secenekler-nelerdir)
13. [Bir ürünüme varyasyon/seçenek eklemek istiyorum — Shopier Yardım Merkezi](https://help.shopier.com/help/bir-urunume-varyasyon-secenek-eklemek-istiyorum)
14. [Varyasyonlara nasıl görsel, fiyat ve stok eklerim? — Shopier Yardım Merkezi](https://help.shopier.com/help/varyasyonlar-nasil-gorsel-fiyat-ve-stok-eklerim)
15. [Müşterilerim ürünlerimi nasıl görebilir? — Shopier Yardım Merkezi](https://help.shopier.com/help/musterilerim-urunlerimi-nasil-gorebilir)
16. [Siparişimi nasıl kargolayabilirim? — Shopier Yardım Merkezi](https://help.shopier.com/help/siparisimi-nasil-kargolayabilirim)
17. [Anlaşmalı kargo hizmetini nasıl kullanabilirim? — Shopier Yardım Merkezi](https://help.shopier.com/help/anlasmali-kargo-hizmetini-nasil-kullanabilirim)
18. [Kargo ücretinin satıcı veya alıcı tarafından karşılanması — Shopier Yardım Merkezi](https://help.shopier.com/help/kargo-ucretinin-satici-veya-alici-tarafindan-karsilanmasi)
19. [Sipariş durumu nedir? — Shopier Yardım Merkezi](https://help.shopier.com/help/siparis-durumu-nedir)
20. [Müşterilerim siparişlerinin güncel durumunu nasıl öğrenebilirler? — Shopier Yardım Merkezi](https://help.shopier.com/help/musterilerim-siparislerinin-guncel-durumunu-nasil-ogrenebilirler)
21. [Ödemelerim benim hesabıma nasıl yatıyor? — Shopier Yardım Merkezi](https://help.shopier.com/help/odemelerim-benim-hesabima-nasil-yatiyor)
22. [Shopier’in ücretlendirmesi nasıl? — Shopier Yardım Merkezi](https://help.shopier.com/help/shopier-ucretlendirmesi-nasil)
23. [Bir siparişi nasıl iade edebilirim? — Shopier Yardım Merkezi](https://help.shopier.com/help/bir-siparisi-nasil-iade-edebilirim)
24. [İade müşterime ne şekilde ve ne zaman yapılır? — Shopier Yardım Merkezi](https://help.shopier.com/help/iade-musterime-ne-sekilde-ve-ne-zaman-yapilir)
25. [Mükelleflerin İşe Başlama ve İşi Bırakma Ödevleri — Gelir İdaresi Başkanlığı](https://gib.gov.tr/vergi-konulari/2_isletme_ve_girisimci/13_mukelleflerin_ise_baslama_ve_isi_birakma_odevleri/13)
26. [ETBİS SSS: Aracı hizmet sağlayıcı üzerinden satış — Ticaret Bakanlığı](https://etbis.ticaret.gov.tr/tr/SSSAra?id=11c1fccb-cc29-482a-806d-58d497117c00)
27. [Mesafeli Sözleşmeler Hakkında Bilgilendirme — Ticaret Bakanlığı](https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/mesafeli-sozlesmeler-hakkinda-bilgilendirme)
28. [Did I purchase fake or counterfeit cards? — Pokémon Support](https://support.pokemon.com/hc/en-us/articles/360002068953-Did-I-purchase-fake-or-counterfeit-cards)
29. [Pokémon isim ve görsellerinin proje kullanımı hakkında resmî destek açıklaması](https://support.pokemon.com/hc/es/articles/360000634094--Puedo-utilizar-los-nombres-e-im%C3%A1genes-de-Pok%C3%A9mon-en-mi-proyecto)
30. [Çerez Uygulamaları Hakkında Rehber — Kişisel Verileri Koruma Kurumu](https://www.kvkk.gov.tr/Icerik/7353/Cerez-Uygulamalari-Hakkinda-Rehber)
31. [Shopier Ücretsiz Hesap Oluşturma Ekranı](https://www.shopier.com/m/signup.php?locale=tr)
32. [Shopier Resmî Ana Sayfası — Anlaşmalı Kargo Bilgisi](https://www.shopier.com/)
