import { useMemo, useState } from 'react'
import { Icon } from './Icon'
import { ProductCard, type Product } from './ProductCard'
import { SearchBar } from './SearchBar'
import { isBottomProduct, products } from '../data/products'
import { Header } from './Header'

type CatalogPageProps = {
  onProductOpen: (product: Product) => void
  onProfile: () => void
  wishlist: Product[]
  onToggleWishlist: (product: Product) => void
}

const categories = ['Semua', 'Pria', 'Wanita', 'Hoodie', 'Kaos', 'Jaket', 'Kemeja', 'Celana']

function ProductRail({ title, eyebrow, items, onProductOpen, wishlist, onToggleWishlist }: { title: string; eyebrow: string; items: Product[]; onProductOpen: (product: Product) => void; wishlist: Product[]; onToggleWishlist: (product: Product) => void }) {
  if (items.length === 0) return null

  return (
    <section className="catalog-rail">
      <div className="catalog-results-heading">
        <div><span className="eyebrow accent">{eyebrow}</span><h2>{title}</h2></div>
        <span>{items.length} item</span>
      </div>
      <div className="catalog-rail-track">
        {items.map((product) => <ProductCard key={product.name} product={product} onOpen={onProductOpen} liked={wishlist.some((item) => item.name === product.name)} onToggleLike={onToggleWishlist} />)}
      </div>
    </section>
  )
}

export function CatalogPage({ onProductOpen, onProfile, wishlist, onToggleWishlist }: CatalogPageProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua')
  const [sort, setSort] = useState('Relevan')

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const result = products.filter((product) => {
      const searchable = `${product.name} ${product.category}`.toLowerCase()
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery)
      const matchesCategory = category === 'Semua' || searchable.includes(category.toLowerCase())
      return matchesQuery && matchesCategory
    })
    return [...result].sort((a, b) => {
      const bottomPriority = Number(isBottomProduct(a)) - Number(isBottomProduct(b))
      if (bottomPriority !== 0) return bottomPriority

      return sort === 'Harga terendah'
        ? Number(a.price.replace(/\D/g, '')) - Number(b.price.replace(/\D/g, ''))
        : a.name.localeCompare(b.name)
    })
  }, [category, query, sort])

  return (
    <>
      <Header onProfile={onProfile} />
      <header className="catalog-header">
        <div className="catalog-header-copy">
          <span className="eyebrow accent">EXPLORE COLLECTION</span>
          <h1>Katalog Produk</h1>
          <p>Temukan item yang paling pas untuk gaya dan profil tubuhmu.</p>
        </div>
        <button className="catalog-filter-button" aria-label="Buka filter"><Icon name="filter" size={18} /></button>
      </header>
      <main className="catalog-page-content">
        <SearchBar value={query} onChange={setQuery} placeholder="Cari produk, kategori, atau gaya..." />
        <div className="catalog-toolbar">
          <div className="catalog-count"><strong>{filteredProducts.length} produk</strong><span> siap dieksplor</span></div>
          <label>Urutkan
            <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Urutkan produk">
              <option>Relevan</option>
              <option>Harga terendah</option>
            </select>
          </label>
        </div>
        <div className="catalog-categories" aria-label="Filter kategori">
          {categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <section className="catalog-results">
          <ProductRail title="Pilihan untukmu" eyebrow="KOLEKSI TERBARU" items={filteredProducts} onProductOpen={onProductOpen} wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
          <ProductRail title="Koleksi Wanita" eyebrow="WOMEN'S EDIT" items={filteredProducts.filter((product) => product.category.includes('WANITA') && !isBottomProduct(product))} onProductOpen={onProductOpen} wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
          <ProductRail title="Koleksi Pria" eyebrow="MEN'S EDIT" items={filteredProducts.filter((product) => product.category.includes('PRIA') && !isBottomProduct(product))} onProductOpen={onProductOpen} wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
          <ProductRail title="Koleksi Kaos" eyebrow="CASUAL ESSENTIALS" items={filteredProducts.filter((product) => product.category.includes('KAOS'))} onProductOpen={onProductOpen} wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
          <ProductRail title="Hoodie & Sweatshirt" eyebrow="CASUAL ESSENTIALS" items={filteredProducts.filter((product) => product.category.includes('HOODIE') || product.name.toLowerCase().includes('sweater'))} onProductOpen={onProductOpen} wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
          <ProductRail title="Celana Favorit" eyebrow="BOTTOMS" items={filteredProducts.filter((product) => product.category.includes('CELANA') || product.category.includes('BAWAHAN'))} onProductOpen={onProductOpen} wishlist={wishlist} onToggleWishlist={onToggleWishlist} />
          {filteredProducts.length > 0
            ? null
            : <div className="catalog-empty"><Icon name="search" size={24} /><strong>Produk tidak ditemukan</strong><span>Coba kata kunci atau kategori lain.</span></div>}
          {filteredProducts.length > 0 && <nav className="catalog-pagination" aria-label="Halaman katalog">
            <button className="current" aria-current="page">1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button aria-label="Halaman berikutnya">→</button>
          </nav>}
        </section>
      </main>
    </>
  )
}
