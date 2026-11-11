# Kampüs Etkinlikleri API

Express ile yazılmış, etkinlikleri JSON olarak veren REST API. Veriler şimdilik bellekte tutulur; sunucu yeniden başlayınca POST ile eklenenler kaybolur.

## Çalıştırma

    cd backend
    npm install
    cp .env.example .env
    npm run dev

Windows PowerShell'de `cp` yerine `Copy-Item .env.example .env` kullanılabilir.
Sunucu varsayılan olarak `http://localhost:3000` adresinde açılır.

## Ortam değişkenleri

| Değişken | Açıklama | Varsayılan |
|---|---|---|
| PORT | Sunucunun dinleyeceği port | 3000 |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /events | Listeyi getir | 200 | — | Bu sprint |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | /events | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

Ek olarak `GET /health` sunucunun ayakta olduğunu gösterir (200, `status`, `time`, `student`).

## Status code'lar

- 200 tamam
- 201 oluşturuldu
- 204 içerik yok
- 400 eksik/yanlış veri
- 404 bulunamadı

## Hata biçimi

Bütün hatalar aynı biçimdedir:

    { "error": { "message": "Event not found" } }