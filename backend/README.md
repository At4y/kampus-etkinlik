# Kampüs Etkinlikleri API

Express ve Mongoose ile yazılmış, etkinlikleri JSON olarak veren REST API. Veriler MongoDB'de saklanır, sunucu yeniden başlasa da kayıtlar silinmez. Etkinlikler listelenir, aranır, güncellenir ve silinir.

## Çalıştırma

    cd backend
    npm install
    cp .env.example .env
    npm run seed
    npm run dev

Windows PowerShell'de `cp` yerine `Copy-Item .env.example .env` kullanılabilir.
`.env` içindeki `MONGODB_URI` değerini kendi veritabanı adresinle değiştir (yerel MongoDB ya da Atlas). `.env` dosyası git'e girmez, gerçek adres repoda bulunmaz.
Sunucu varsayılan olarak `http://localhost:3000` adresinde açılır.

## Komutlar

| Komut | Ne yapar |
|---|---|
| npm run dev | Sunucuyu dosya değişikliklerini izleyerek başlatır |
| npm start | Sunucuyu başlatır |
| npm run seed | Koleksiyonu boşaltıp 6 örnek etkinlik ekler, tekrar çalıştırınca yine 6 kayıt kalır |

## Ortam değişkenleri

| Değişken | Açıklama | Varsayılan |
|---|---|---|
| PORT | Sunucunun dinleyeceği port | 3000 |
| MONGODB_URI | MongoDB bağlantı adresi (sonunda veritabanı adı `kampus`) | yok, zorunlu |

## Veri modeli

Etkinlikler `kampus` veritabanındaki `events` koleksiyonunda durur.

| Alan | Tip | Kural |
|---|---|---|
| title | metin | zorunlu, 3-100 karakter |
| category | metin | zorunlu, Seminer / Atölye / Söyleşi / Yarışma |
| date | tarih | zorunlu, istekte ve yanıtta `GG-AA-YYYY` (örnek: `15-10-2026`) |
| capacity | sayı | en az 0, varsayılan 0 |
| time | metin | varsayılan boş |
| location | metin | varsayılan boş |
| description | metin | en fazla 500 karakter, varsayılan boş |

Kayıt kimliği MongoDB'nin verdiği `_id` değeridir. `createdAt` ve `updatedAt` alanları otomatik eklenir. Tarih veritabanında gerçek bir tarih olarak durur, bu yüzden sıralama ve karşılaştırma doğru çalışır. `31-02-2026` gibi olmayan günler ve başka biçimler 400 döner.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /events | Listeyi getir (`?search=` ve `?category=` ile süzülür) | 200 | — | Çalışıyor |
| GET | /events/upcoming | Bugün ve sonrasındaki etkinlikler, tarihe göre sıralı | 200 | — | Çalışıyor |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Çalışıyor |
| POST | /events | Yeni etkinlik | 201 | 400 | Çalışıyor |
| PATCH | /events/:id | Gönderilen alanları güncelle | 200 | 400, 404 | Çalışıyor |
| DELETE | /events/:id | Sil | 204 | 404 | Çalışıyor |

Ek olarak `GET /health` sunucunun ayakta olduğunu gösterir (200, `status`, `time`, `student`).
`/events/upcoming` adresi `/events/:id`'den önce tanımlıdır, yoksa "upcoming" bir id sanılırdı.
Geçersiz biçimli ya da olmayan `:id` değerleri her yerde 404 döner.

## Sorgu parametreleri

| Parametre | Ne yapar | Örnek |
|---|---|---|
| search | Başlıkta büyük/küçük harf fark etmeden arar | `/events?search=git` |
| category | Kategoriye göre süzer | `/events?category=Atölye` |

İkisi birlikte kullanılabilir: `/events?search=git&category=Atölye`.

## PATCH kuralları

- Sadece gönderilen alanlar değişir, diğerleri aynı kalır.
- Yanıtta güncellenmiş kayıt döner.
- Boş body 400 döner (`Body is empty`).
- `_id`, `createdAt`, `updatedAt` ve `__v` değiştirilemez, denenirse 400 döner.
- Schema kuralları güncellemede de çalışır, örneğin geçersiz kategori 400 döner.

## Status code'lar

- 200 tamam
- 201 oluşturuldu
- 204 içerik yok (silme başarılı, yanıt gövdesi boş)
- 400 eksik/yanlış veri
- 404 bulunamadı
- 500 beklenmeyen sunucu hatası

## Hata biçimi

Bütün hatalar aynı biçimdedir:

    { "error": { "message": "Event not found" } }

Eksik veride `message` alanında doğrulama hatasının açıklaması gelir. Beklenmeyen hatalarda kullanıcıya sadece `Server error` gider, ayrıntı terminale yazılır.