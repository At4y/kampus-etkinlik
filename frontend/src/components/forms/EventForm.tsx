interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
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

        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}

export default EventForm;