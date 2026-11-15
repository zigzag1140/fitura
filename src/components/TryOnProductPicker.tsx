import { useState } from 'react'

export type TryOnProduct = {
  id: string
  name: string
  price: string
  image: string
  size: string
}

type TryOnProductPickerProps = {
  title: string
  recommendation: string
  products: TryOnProduct[]
  selectedId?: string
  filters: string[]
  onSelect: (product: TryOnProduct) => void
}

export function TryOnProductPicker({ title, recommendation, products, selectedId, filters, onSelect }: TryOnProductPickerProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0])
  const [page, setPage] = useState(1)
  const filteredProducts = activeFilter === filters[0] ? products : products.filter((product) => product.name.toLowerCase().includes(activeFilter.toLowerCase()))
  const pageSize = 3
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const visibleProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize)

  const selectFilter = (filter: string) => {
    setActiveFilter(filter)
    setPage(1)
  }

  return (
    <section className="tryon-picker">
      <div className="tryon-section-title">
        <div>
          <strong>{title}</strong>
          <span>• {recommendation}</span>
        </div>
        <span className="required-pill">Pilih 1</span>
      </div>
      <div className="tryon-filter-list" aria-label={`Filter ${title}`}>
        {filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'active' : ''} onClick={() => selectFilter(filter)}>{filter}</button>)}
      </div>
      <div className="tryon-product-track">
        {visibleProducts.map((product) => {
          const selected = selectedId === product.id
          return (
            <article className={`tryon-product ${selected ? 'selected' : ''}`} key={product.id}>
              <div className="tryon-product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <strong>{product.name}</strong>
              <b>{product.price}</b>
              <button onClick={() => onSelect(product)}>
                {selected ? 'Terpilih' : 'Pilih'}
              </button>
            </article>
          )
        })}
      </div>
      {pageCount > 1 && <div className="tryon-pagination">
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} className={page === pageNumber ? 'active' : ''} onClick={() => setPage(pageNumber)}>{pageNumber}</button>)}
      </div>}
    </section>
  )
}
