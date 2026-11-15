import { Icon } from './Icon'
import { ProductCard, type Product } from './ProductCard'
import { isBottomProduct, products } from '../data/products'

const featuredProducts = [
  ...products.filter((product) => product.category.includes('KAOS')).slice(0, 2),
  ...products.filter((product) => product.category.includes('HOODIE')).slice(0, 2),
  ...products.filter((product) => product.category.includes('JAKET') || product.category.includes('KEMEJA')).slice(0, 2),
  ...products.filter(isBottomProduct).slice(0, 2),
]

type ProductGridProps = {
  onProductOpen?: (product: Product) => void
  onBrowse?: () => void
  wishlist: Product[]
  onToggleWishlist: (product: Product) => void
}

export function ProductGrid({ onProductOpen, onBrowse, wishlist, onToggleWishlist }: ProductGridProps) {
  return (
    <section className="collection-section">
      <div className="collection-heading">
        <div>
          <span className="eyebrow">KOLEKSI PILIHAN</span>
          <h2>Pilihan untukmu</h2>
        </div>
        <button className="text-button" onClick={onBrowse}>Lihat semua <Icon name="arrow" size={15} /></button>
      </div>
      <div className="product-grid">
        {featuredProducts.map((product) => <ProductCard key={product.name} product={product} onOpen={onProductOpen} liked={wishlist.some((item) => item.name === product.name)} onToggleLike={onToggleWishlist} />)}
      </div>
      {onBrowse && <button className="home-explore-button" onClick={onBrowse}>Jelajahi lebih lanjut <Icon name="arrow" size={16} /></button>}
    </section>
  )
}
