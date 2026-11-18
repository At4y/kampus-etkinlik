# Kampüs Etkinlikleri API

Express ve Mongoose ile yazılmış, etkinlikleri JSON olarak veren REST API. Veriler MongoDB'de saklanır, sunucu yeniden başlasa da kayıtlar silinmez.

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
| date | metin | zorunlu |
| capacity | sayı | en az 0, varsayılan 0 |
| time | metin | varsayılan boş |
| location | metin | varsayılan boş |
| description | metin | en fazla 500 karakter, varsayılan boş |

Kayıt kimliği MongoDB'nin verdiği `_id` değeridir. `createdAt` ve `updatedAt` alanları otomatik eklenir.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /events | Listeyi getir (`?category=` ile süzülür) | 200 | — | Bu sprint |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | /events | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

Ek olarak `GET /health` sunucunun ayakta olduğunu gösterir (200, `status`, `time`, `student`).
Geçersiz biçimli `:id` değerleri de kayıt bulunamamış gibi 404 döner.

## Status code'lar

- 200 tamam
- 201 oluşturuldu
- 204 içerik yok
- 400 eksik/yanlış veri
- 404 bulunamadı
- 500 beklenmeyen sunucu hatası

## Hata biçimi

Bütün hatalar aynı biçimdedir:

    { "error": { "message": "Event not found" } }

Eksik veride `message` alanında doğrulama hatasının açıklaması gelir. Beklenmeyen hatalarda kullanıcıya sadece `Server error` gider, ayrıntı terminale yazılır.