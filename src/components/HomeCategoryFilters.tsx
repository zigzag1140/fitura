import kaosHitam from '../assets/tshirt/tshirt_hitam.webp'

type HomeCategoryFiltersProps = {
  onBrowse: () => void
}

const categories = [
  { label: 'Pria', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=160&q=85' },
  { label: 'Wanita', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=160&q=85' },
  { label: 'Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=160&q=85' },
  { label: 'Kaos', image: kaosHitam },
  { label: 'Sports', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=160&q=85' },
  { label: 'Kemeja', image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=160&q=85' },
  { label: 'Celana', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=160&q=85' },
]

export function HomeCategoryFilters({ onBrowse }: HomeCategoryFiltersProps) {
  return (
    <section className="home-categories">
      <div className="home-section-heading">
        <div><span className="eyebrow accent">EXPLORE BY CATEGORY</span><h2>Temukan gayamu</h2></div>
        <button onClick={onBrowse}>Lihat semua <span>→</span></button>
      </div>
      <div className="home-category-track">
        {categories.map((category) => (
          <button className="home-category" key={category.label} onClick={onBrowse}>
            <span><img src={category.image} alt="" /></span>
            <strong>{category.label}</strong>
          </button>
        ))}
      </div>
    </section>
  )
}
