import type { CampusEvent } from "./campus-event";

export type PageName = "home" | "events" | "add" | "detail" | "update";

const headerTexts: Partial<Record<PageName, string>> = {
  home: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
  events: "Ekim ayında kampüste düzenlenen etkinlikler.",
};

export function getHeaderText(page: PageName): string | undefined {
  return headerTexts[page];
}

export function getPageTitle(page: PageName, selected?: CampusEvent): string {
  const titles: Record<PageName, string> = {
    home: "Ana Sayfa",
    events: "Tüm Etkinlikler",
    add: "Etkinlik Ekle",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    update: "Etkinlik Güncelle",
  };
  return titles[page];
}