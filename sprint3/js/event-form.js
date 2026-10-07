import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

// Güncelleme modu mu kontrol et (Adım 11'de kullanılacak)
if (form.dataset.mode === "guncelle") {
    doldurGuncellemeFormu();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
        title: fd.get("ad").trim(),
        category: fd.get("kategori"),
        date: fd.get("tarih"),
        time: fd.get("saat"),
        location: fd.get("yer").trim(),
        capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
        description: fd.get("aciklama").trim(),
    };

    const errors = dogrula(data);
    goster(errors);

    if (Object.keys(errors).length > 0) {
        mesajKutusu.innerHTML = `<p class="hata-metni">Formda hatalı alanlar var.</p>`;
        return;
    }

    const basariMetni = form.dataset.mode === "guncelle"
        ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
        : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

    mesajKutusu.innerHTML = `
        <div class="basari-kutusu">
            <p>${basariMetni}</p>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
    `;
});

function dogrula(data) {
    const errors = {};

    if (data.title.length < 3) {
        errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    }
    if (!data.category) {
        errors.kategori = "Bir kategori seçin.";
    }
    if (!data.date) {
        errors.tarih = "Tarih seçin.";
    }
    if (!data.time) {
        errors.saat = "Saat seçin.";
    }
    if (!data.location) {
        errors.yer = "Yer bilgisini yazın.";
    }
    if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
        errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
    }

    return errors;
}

function goster(errors) {
    const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

    alanlar.forEach((alanAdi) => {
        const alan = form.elements[alanAdi];
        const hataSpan = document.querySelector(`#${alanAdi}-hata`);

        if (errors[alanAdi]) {
            hataSpan.textContent = errors[alanAdi];
            alan.setAttribute("aria-invalid", "true");
        } else {
            hataSpan.textContent = "";
            alan.removeAttribute("aria-invalid");
        }
    });
}

function doldurGuncellemeFormu() {
    const id = new URLSearchParams(location.search).get("id");
    const etkinlik = events.find((e) => e.id === id);

    if (etkinlik) {
        form.elements.ad.value = etkinlik.title;
        form.elements.kategori.value = etkinlik.category;
        form.elements.tarih.value = etkinlik.date.split("-").reverse().join("-");
        form.elements.saat.value = etkinlik.time;
        form.elements.yer.value = etkinlik.location;
        form.elements.kontenjan.value = etkinlik.capacity;
        form.elements.aciklama.value = etkinlik.description;
    } else {
        form.outerHTML = `
            <div class="hata-kutusu">
                <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
            </div>
            <a href="etkinlikler.html">Etkinliklere git</a>
        `;
    }
}