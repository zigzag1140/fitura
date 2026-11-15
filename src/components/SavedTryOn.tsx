import { useState } from 'react'
import { Icon } from './Icon'

type SavedTryOnProps = {
  onOpenFittingRoom: () => void
}

const filters = ['Semua Tampilan', 'Hoodie & Jaket', 'Celana', 'Setelan Lengkap']

export function SavedTryOn({ onOpenFittingRoom }: SavedTryOnProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0])

  return (
    <section className="saved-tryon">
      <div className="saved-heading"><h2>Hasil Coba Virtual Tersimpan</h2><span>3 Tampilan Siap</span></div>
      <div className="saved-filters">{filters.map((filter) => <button className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}</div>
      <article className="saved-look" onClick={onOpenFittingRoom}>
        <div className="saved-look-image">
          <img src="/images/futura-example.jpg" alt="Preview AI fitting outfit" />
          <small>Simulasi pada Model Atletis 178 cm</small>
        </div>
        <div className="saved-look-info">
          <div><span>PAKAIAN LUAR + CELANA</span><strong>Casual Hoodie Hitam + Celana Cargo</strong></div>
          <b>Rp 1.420.000</b>
        </div>
        <div className="saved-look-fit">
          <span><Icon name="shirt" size={14} /> Atasan: Ukuran L</span>
          <span><Icon name="check" size={14} /> Celana: Ukuran 32</span>
          <small>Dikalibrasi untuk kenyamanan lengan +2,4 cm</small>
        </div>
        <div className="saved-look-action"><span><Icon name="layers" size={15} /> Lihat AI Fitting Room</span><Icon name="arrow" size={17} /></div>
      </article>
    </section>
  )
}
