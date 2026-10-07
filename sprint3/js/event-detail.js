import { events } from "./data.js";

const container = document.querySelector("#detay");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
    container.innerHTML = `
        <div class="hata-kutusu">
            <p>"${id ?? ""}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
        </div>
        <a href="etkinlikler.html">← Listeye dön</a>
    `;
} else {
    const tarih = new Date(
        event.date.split("-").reverse().join("-")
    ).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

    document.title = `${event.title} - Kampüs Etkinlikleri`;

    container.innerHTML = `
        <h1>${event.title}</h1>

        <div class="detay-icerik">
            <figure>
                <img src="afis.jpg" alt="${event.title} etkinlik afişi">
                <figcaption>Şekil: ${event.title} afişi</figcaption>
            </figure>

            <dl>
                <dt>Tarih</dt>
                <dd>${tarih}, ${event.time}</dd>

                <dt>Yer</dt>
                <dd>${event.location}</dd>

                <dt>Kategori</dt>
                <dd>${event.category}</dd>

                <dt>Kontenjan</dt>
                <dd>${event.capacity}</dd>
            </dl>
        </div>

        <h2>Açıklama</h2>
        <p>${event.description}</p>

    <a href="etkinlikler.html" class="buton buton-ikincil">← Listeye dön</a>
    <a href="etkinlik-guncelle.html?id=${event.id}" class="buton">Bu etkinliği güncelle</a>
    `;
}