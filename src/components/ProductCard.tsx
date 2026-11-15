import { useState } from 'react'
import { Icon } from './Icon'

export type ProductColorTag = 'Warm' | 'Cool' | 'Neutral'

export type Product = {
  name: string
  category: string
  price: string
  image: string
  color_tag?: ProductColorTag
  badge?: string
}

type ProductCardProps = {
  product: Product
  onOpen?: (product: Product) => void
  liked?: boolean
  onToggleLike?: (product: Product) => void
}

export function ProductCard({ product, onOpen, liked: controlledLiked, onToggleLike }: ProductCardProps) {
  const [localLiked, setLocalLiked] = useState(false)
  const liked = controlledLiked ?? localLiked

  return (
    <article className="product-card" onClick={() => onOpen?.(product)}>
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} />
        {product.badge && <span className="product-badge"><Icon name="sparkles" size={12} />{product.badge}</span>}
        <button
          className={`favorite-button ${liked ? 'liked' : ''}`}
          onClick={(event) => {
            event.stopPropagation()
            if (onToggleLike) onToggleLike(product)
            else setLocalLiked((current) => !current)
          }}
          aria-label={liked ? `Hapus ${product.name} dari favorit` : `Tambah ${product.name} ke favorit`}
        >
          <Icon name="heart" size={17} />
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <strong className="product-price">{product.price}</strong>
      </div>
    </article>
  )
}
