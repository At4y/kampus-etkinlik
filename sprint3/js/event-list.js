import { events } from "./data.js";

function createCard(event) {
    const tarih = new Date(
        event.date.split("-").reverse().join("-")
    ).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

    return `<article>
        <h3>${event.title}</h3>
        <p>${event.category} · ${tarih} · ${event.location}</p>
        <a href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a>
    </article>`;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
    list.innerHTML = dizi.map(createCard).join("");
}

if (list.dataset.limit) {
    const yaklasan = [...events]
        .sort((a, b) => {
            const ta = a.date.split("-").reverse().join("-");
            const tb = b.date.split("-").reverse().join("-");
            return ta.localeCompare(tb);
        })
        .slice(0, Number(list.dataset.limit));
    render(yaklasan);
} else {
    render(events);
}

const aramaKutusu = document.querySelector("#arama");
const kategoriSecim = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

if (aramaKutusu && kategoriSecim) {
    // Kategori seçeneklerini veriden üret, her biri bir kez
    const kategoriler = [...new Set(events.map((e) => e.category))];
    kategoriler.forEach((kategori) => {
        const option = document.createElement("option");
        option.value = kategori;
        option.textContent = kategori;
        kategoriSecim.appendChild(option);
    });

    aramaKutusu.addEventListener("input", filtrele);
    kategoriSecim.addEventListener("change", filtrele);

    function filtrele() {
        const aranan = aramaKutusu.value.toLocaleLowerCase("tr-TR");
        const seciliKategori = kategoriSecim.value;

        const sonuc = events.filter((e) => {
            const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
            const kategoriUyuyor = seciliKategori === "" || e.category === seciliKategori;
            return metinUyuyor && kategoriUyuyor;
        });

        render(sonuc);

        if (sonuc.length === 0) {
            sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
        } else {
            sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
        }
    }

    // Sayfa açılışında da sonuç satırını doldur
    sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
}