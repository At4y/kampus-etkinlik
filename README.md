# Kampüs Etkinlikleri

https://abdullahahmetsen-frontend.vercel.app

Web Teknolojileri ve Programlama dersi kapsamında geliştirilen, kampüs
içindeki seminer, atölye ve etkinlikleri takip etmeyi sağlayan uygulama.

## Kurulum

    cd frontend
    npm install
    npm run dev

## Route listesi

| Adres | Sayfa |
|---|---|
| / | HomePage |
| /events | EventsPage |
| /events/:id | EventDetailPage |
| /login | LoginPage |
| /register | RegisterPage |
| /forgot-password | ForgotPasswordPage |
| /admin | AdminPage |
| /admin/new | AddEventPage |
| /admin/:id/edit | EditEventPage |
| * | NotFoundPage |

## frontend/ klasörü

- `package.json`: Proje adı, komutlar (dev, build) ve paket listesi.
- `package-lock.json`: Yüklenen paketlerin tam sürümleri.
- `node_modules/`: İndirilen paketler; GitHub'a gitmez.
- `tsconfig*.json`: TypeScript ayarları.
- `vite.config.ts`: Vite ayarları ve React eklentisi.
- `vercel.json`: Adreslerin yenilemede açılması için yönlendirme ayarı.
- `index.html`: İçinde boş `div#root` olan tek HTML dosyası.
- `src/main.tsx`: React'i başlatır; `BrowserRouter` ve `EventsProvider` ile `App`'i çizer.
- `src/App.tsx`: Header, Navigation, `Routes` ve Footer; sayfayı adres belirler.
- `src/App.css`: Sprint 3 CSS'i (numaraya göre renk ve font) ve tablo stilleri.
- `src/index.css`: Genel stil; boş.
- `src/pages/`: Her route için bir sayfa (10 sayfa).
- `src/context/EventsContext.tsx`: Etkinlik listesi ve ekle/güncelle/sil fonksiyonları.
- `src/components/`: layout, events ve forms bileşenleri.
- `src/types/campus-event.ts`: `CampusEvent`, `Category`, `EventFormData` tipleri.
- `src/data/events.ts`: Tipli 6 etkinlik verisi.
- `src/utils/filter-events.ts`: Arama, kategori filtresi ve id ile bulma fonksiyonları.
- `src/utils/validate-event.ts`: Etkinlik formu doğrulama kuralları.
- `public/`: Olduğu gibi kopyalanan dosyalar (afiş).

## Geliştirici

Abdullah Ahmet Şen · 2416501425