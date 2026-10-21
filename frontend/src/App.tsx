import { useState, useEffect } from "react";
import "./App.css";
import type { Category } from "./types/campus-event";
import EventList from "./components/events/EventList";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";
import type { PageName } from "./types/page";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const upcoming = [...events]
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 2);

const headerTexts: Partial<Record<PageName, string>> = {
  home: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
  events: "Ekim ayında kampüste düzenlenen etkinlikler.",
};
function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const showDetail = (id: string) => go("detail", id);
  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(
    searchEvents(events, searchText),
    category
  );
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const pageTitles: Record<PageName, string> = {
    home: "Ana Sayfa",
    events: "Tüm Etkinlikler",
    add: "Etkinlik Ekle",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    update: "Etkinlik Güncelle",
  };
  const title = pageTitles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <Header
        title={page === "home" ? "Kampüs Etkinlikleri" : title}
        text={headerTexts[page]}
      />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={showDetail} />
            <a
              href="#"
              className="buton"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              Tüm etkinlikleri gör
            </a>
          </section>
        )}
        {page === "events" && (
          <section>
            <h2>Etkinlikler</h2>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />

            {filtered.length > 0 && (
              <p id="sonuc">{filtered.length} etkinlik listeleniyor.</p>
            )}
            <EventList
              events={filtered}
              onShowDetail={showDetail}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
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
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <section>
            <EventForm
              onSubmit={() => window.scrollTo(0, 0)}
            />
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}

export default App;