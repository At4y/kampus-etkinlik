import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import type { CampusEvent } from "../../types/campus-event";
import { findEventById } from "../../utils/filter-events";

interface HeaderInfo {
  title: string;
  text?: string;
}

function getHeaderInfo(pathname: string, events: CampusEvent[]): HeaderInfo {
  if (pathname === "/")
    return {
      title: "Kampüs Etkinlikleri",
      text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
    };
  if (pathname === "/events")
    return {
      title: "Tüm Etkinlikler",
      text: "Ekim ayında kampüste düzenlenen etkinlikler.",
    };

  const detail = matchPath("/events/:id", pathname);
  if (detail) {
    const event = findEventById(events, detail.params.id ?? "");
    if (event)
      return { title: event.title, text: `${event.category} · ${event.location}` };
  }

  if (pathname === "/admin") return { title: "Etkinlik Yönetimi" };
  if (pathname === "/admin/new") return { title: "Etkinlik Ekle" };

  const edit = matchPath("/admin/:id/edit", pathname);
  if (edit && findEventById(events, edit.params.id ?? ""))
    return { title: "Etkinlik Güncelle" };

  if (pathname === "/login") return { title: "Giriş Yap" };
  if (pathname === "/register") return { title: "Kayıt Ol" };
  if (pathname === "/forgot-password") return { title: "Şifremi Unuttum" };

  return { title: "Sayfa bulunamadı" };
}

function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();
  const info = getHeaderInfo(pathname, events);

  useEffect(() => {
    document.title =
      info.title === "Kampüs Etkinlikleri"
        ? "Kampüs Etkinlikleri"
        : `Kampüs Etkinlikleri — ${info.title}`;
  }, [info.title]);

  return (
    <header>
      <h1>{info.title}</h1>
      {info.text && <p>{info.text}</p>}
    </header>
  );
}

export default Header;