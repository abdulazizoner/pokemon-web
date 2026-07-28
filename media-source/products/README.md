# Gerçek ürün fotoğrafları

Her ürün için slug adıyla bir klasör oluşturulur. Kaynak dosyalar `front.jpg` ve `back.jpg`
olarak adlandırılır. İsteğe bağlı detaylar `detail-01.jpg` biçimindedir.

Kaynak görseller büyük olabileceği ve işletme varlığı sayıldığı için Git'e eklenmez. Natro'ya
yalnız `pnpm media:optimize` komutunun `public/products` altında ürettiği web türevleri gider.
