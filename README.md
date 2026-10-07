# Kampüs Etkinlikleri

https://kampus-etkinlik-green.vercel.app/

Web Teknolojileri ve Programlama dersi kapsamında geliştirilen, kampüs 
içindeki seminer, atölye ve etkinlikleri takip etmeyi sağlayan uygulama.

## Sprint 3 — JavaScript ve DOM

Veri tek bir yerde (`js/data.js`) tutuluyor, sayfalar ondan üretiliyor.

- `js/data.js` — 6 etkinliğin bulunduğu veri dizisi
- `js/event-list.js` — ana sayfa ve etkinlikler sayfasındaki kartları 
  üretir; arama ve kategori filtresini çalıştırır
- `js/event-detail.js` — adres çubuğundaki `?id=` değerine göre doğru 
  etkinliğin detayını gösterir, geçersiz id'de hata mesajı verir
- `js/event-form.js` — ekleme ve güncelleme formlarını yakalar, verileri 
  doğrular, hata/başarı mesajını gösterir (veri kaydedilmez)

Hiçbir sayfada elle yazılmış etkinlik kartı yok; hepsi JavaScript ile 
`data.js`'ten üretiliyor. `localStorage`, framework veya jQuery kullanılmadı.

## Sprint 2 — CSS ve Responsive Tasarım

Sprint 1'deki HTML iskeleti bozulmadan CSS eklendi. Tüm renk ve boşluk 
değerleri `css/2416501425.css` dosyasında CSS custom property (`:root`) 
olarak tanımlı.

- Numara: 2416501425 → renk tonu numaradan hesaplanıyor
- Font: son hane 5 → Times New Roman
- `display: grid` ile telefonda tek sütun, geniş ekranda çoklu sütun
- Etkinlik detay sayfasında afiş ve künye telefonda alt alta, geniş 
  ekranda yan yana (flex düzeni)

## Sayfalar

- `index.html` — Ana sayfa, tarihi en yakın 2 etkinlik
- `etkinlikler.html` — Tüm etkinlikler, arama ve kategori filtresi
- `etkinlik-detay.html` — `?id=` ile açılan etkinlik detayı
- `etkinlik-ekle.html` — Yeni etkinlik ekleme formu
- `etkinlik-guncelle.html` — Var olan etkinliği güncelleme formu (yalnızca 
  detay sayfasındaki "Bu etkinliği güncelle" butonuyla açılır)

## Geliştirici

Abdullah Ahmet Şen · 2416501425