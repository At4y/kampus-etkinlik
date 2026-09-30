# Kampüs Etkinlikleri

Web Teknolojileri ve Programlama dersi kapsamında geliştirilen, kampüs 
içindeki seminer, atölye ve etkinlikleri takip etmeyi sağlayan uygulama.

## Canlı Adres

https://kampus-etkinlik-green.vercel.app/

## Sprint 2 — CSS ve Responsive Tasarım

Sprint 1'deki HTML iskeleti bozulmadan CSS eklendi. Tüm renk ve boşluk 
değerleri `css/2416501425.css` dosyasında CSS custom property (`:root`) 
olarak tanımlı.

- Numara: 2416501425 → renk tonu numaradan hesaplanıyor
- Font: son hane 5 → Times New Roman
- Etkinlik listesi tablodan `section > article` kart yapısına çevrildi
- `display: grid` ile telefonda tek sütun, geniş ekranda çoklu sütun
- Etkinlik detay sayfasında afiş ve künye telefonda alt alta, geniş 
  ekranda yan yana (flex düzeni)
- Form alanlarında `required` doğrulaması aktif

## Sayfalar

- `index.html` — Ana sayfa, uygulama tanıtımı ve öne çıkan etkinlikler
- `etkinlikler.html` — Tüm etkinliklerin kart listesi
- `etkinlik-detay.html` — Bir etkinliğin ayrıntılı bilgisi
- `etkinlik-ekle.html` — Yeni etkinlik ekleme formu
- `etkinlik-guncelle.html` — Var olan etkinliği güncelleme formu

## Geliştirici

Abdullah Ahmet Şen · 2416501425