# Kampüs Etkinlikleri

https://kampus-etkinlik-green.vercel.app/

Web Teknolojileri ve Programlama dersi kapsamında geliştirilen, kampüs 
içindeki seminer, atölye ve etkinlikleri takip etmeyi sağlayan uygulama.

## Sprint 4: frontend/ klasörü

- `package.json`: Proje adı, komutlar (dev, build) ve paket listesi.
- `package-lock.json`: Yüklenen paketlerin tam sürümleri.
- `node_modules/`: İndirilen paketler; GitHub'a gitmez.
- `tsconfig*.json`: TypeScript ayarları.
- `vite.config.ts`: Vite ayarları ve React eklentisi.
- `index.html`: İçinde boş `div#root` olan tek HTML dosyası.
- `src/main.tsx`: React'i başlatır, `App`'i root'a çizer.
- `src/App.tsx`: Uygulamanın ana bileşeni; 5 sayfa burada state ile değişir.
- `src/App.css`: Sprint 3 CSS'i (numaraya göre renk ve font).
- `src/index.css`: Genel stil; bu sprintte boş.
- `src/types/campus-event.ts`: `CampusEvent` ve `Category` tipleri.
- `src/data/events.ts`: Tipli 6 etkinlik verisi.
- `src/utils/filter-events.ts`: Arama, kategori filtresi ve id ile bulma saf fonksiyonları.
- `public/`: Olduğu gibi kopyalanan dosyalar (afiş).
  
## Geliştirici

Abdullah Ahmet Şen · 2416501425