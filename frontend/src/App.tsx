import { useState, useEffect } from "react";
import "./App.css";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";

type PageName = "home" | "events" | "add" | "detail" | "update";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const upcoming = [...events]
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 2);

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(
    searchEvents(events, searchText),
    category
  );
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const pageTitles: Record<PageName, string> = {
    home: "Ana Sayfa",
    events: "Etkinlikler",
    add: "Etkinlik Ekle",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    update: "Etkinlik Güncelle",
  };
  const title = pageTitles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);
  
  function renderCard(event: CampusEvent) {
    return (
      <article key={event.id}>
        <h2>{event.title}</h2>
        <p>
          {event.category} · {formatDate(event.date)}, {event.time}
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör →
        </a>
      </article>
    );
  }
  

  return (
    <>
      <header>
        <h1>{page === "home" ? "Kampüs Etkinlikleri" : title}</h1>
        <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
        <nav>
          {menuItems.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
              <div className="kart-grid">{upcoming.map(renderCard)}</div>
          </section>
        )}
        {page === "events" && (
          <section>
            <h2>Etkinlikler</h2>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  id="arama"
                  type="search"
                  placeholder="Örn. atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <p id="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <div className="kart-grid">{filtered.map(renderCard)}</div>
          </section>
        )}
        {page === "detail" && !selected && (
          <section>
            <div className="hata-kutusu">
              <p>
                "{selectedId ?? ""}" numaralı bir etkinlik yok. Listeden bir
                etkinlik seçin.
              </p>
            </div>
            <a
              href="#"
              className="buton buton-ikincil"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
          </section>
        )}

        {page === "detail" && selected && (
          <article>
            <div className="detay-icerik">
              {selected.image && (
                <figure>
                  <img
                    src={selected.image}
                    alt={`${selected.title} etkinlik afişi`}
                  />
                  <figcaption>Şekil: {selected.title} afişi</figcaption>
                </figure>
              )}
              <dl>
                <dt>Tarih</dt>
                <dd>
                  {formatDate(selected.date)}, {selected.time}
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </div>

            <h2>Açıklama</h2>
            <p>{selected.description}</p>

            <a
              href="#"
              className="buton buton-ikincil"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
            <a
              href="#"
              className="buton"
              onClick={(e) => {
                e.preventDefault();
                go("update", selected.id);
              }}
            >
              Bu etkinliği güncelle
            </a>
          </article>
        )}
        {(page === "add" || page === "update") && (
          <section>
            <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <p>
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  type="text"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri 2026"
                />
              </p>

              <p>
                <label htmlFor="category">Kategori</label>
                <select id="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </p>

              <p>
                <label htmlFor="date">Tarih</label>
                <input id="date" type="date" />
              </p>

              <p>
                <label htmlFor="time">Saat</label>
                <input id="time" type="time" />
              </p>

              <p>
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  type="text"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </p>

              <p>
                <label htmlFor="capacity">Kontenjan</label>
                <input id="capacity" type="number" min={1} max={1000} />
              </p>

              <p>
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" rows={5}></textarea>
              </p>

              <button type="submit">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Abdullah Ahmet Şen · 2416501425 · 2026</p>
      </footer>
    </>
  );
}

export default App;