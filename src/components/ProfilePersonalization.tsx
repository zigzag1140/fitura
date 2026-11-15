import { Icon } from './Icon'

type ProfilePersonalizationProps = {
  onSmartSizing: () => void
  onWishlist: () => void
  onFittingRoom: () => void
}

export function ProfilePersonalization({ onSmartSizing, onWishlist, onFittingRoom }: ProfilePersonalizationProps) {
  return (
    <section className="profile-personalization">
      <div className="profile-section-heading">
        <div><span className="eyebrow">PERSONALISASI AKTIF</span><h2>Profil gayamu</h2></div>
        <Icon name="sparkles" size={18} />
      </div>
      <div className="personalization-grid">
        <div className="personalization-stat"><small>UKURAN REKOMENDASI</small><strong>L / 32</strong><span>Atasan &amp; bawahan</span></div>
        <div className="personalization-stat"><small>GAYA UTAMA</small><strong>Casual</strong><span>Minimal &amp; relaxed</span></div>
        <div className="personalization-stat"><small>WARNA FAVORIT</small><strong>Earthy</strong><span>Olive, cream, brown</span></div>
      </div>
      <div className="profile-quick-actions">
        <button onClick={onSmartSizing}><Icon name="filter" size={15} /> Perbarui ukuran</button>
        <button onClick={onWishlist}><Icon name="bookmark" size={15} /> Lihat wishlist</button>
        <button onClick={onFittingRoom}><Icon name="layers" size={15} /> Fitting room</button>
      </div>
    </section>
  )
}
