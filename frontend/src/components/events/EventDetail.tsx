import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
    event: CampusEvent;
    onBack: () => void;
    onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
    return (
        <article>
            <div className="detay-icerik">
                {event.image && (
                    <figure>
                        <img src={event.image} alt={`${event.title} etkinlik afişi`} />
                        <figcaption>{event.title} afişi</figcaption>
                    </figure>
                )}
                <section className="kunye">
                    <h2>Etkinlik Künyesi</h2>
                    <dl>
                        <dt>Tarih</dt>
                        <dd>
                            {formatDate(event.date)}, {event.time}
                        </dd>
                        <dt>Yer</dt>
                        <dd>{event.location}</dd>
                        <dt>Kategori</dt>
                        <dd>{event.category}</dd>
                        <dt>Kontenjan</dt>
                        <dd>{event.capacity} kişi</dd>
                    </dl>
                </section>

            </div>

            <h2>Açıklama</h2>
            <p>{event.description}</p>

            <a
                href="#"
                className="buton buton-ikincil"
                onClick={(e) => {
                    e.preventDefault();
                    onBack();
                }}
            >
                ← Listeye dön
            </a>
            <a
                href="#"
                className="buton"
                onClick={(e) => {
                    e.preventDefault();
                    onEdit(event.id);
                }}
            >
                Bu etkinliği güncelle
            </a>
        </article>
    );
}

export default EventDetail;