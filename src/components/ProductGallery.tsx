import { useState } from 'react'
import { Icon } from './Icon'
import type { Product } from './ProductCard'

type ProductGalleryProps = {
  product: Product
  onTryOn: () => void
}

export function ProductGallery({ product, onTryOn }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)
  const images = Array.from({ length: 5 }, () => product.image)

  return (
    <>
      <section className="detail-gallery">
        <img className="detail-main-image" src={images[activeImage]} alt={product.name} />
        <span className="new-pill">RILIS BARU</span>
        <button className="detail-heart" aria-label="Simpan produk"><Icon name="heart" size={18} /></button>
        <div className="gallery-dots">{images.map((_, index) => <i className={index === activeImage ? 'active' : ''} key={index} />)}</div>
      </section>
      <div className="detail-gallery-row">
        <div className="thumbnail-list">
          {images.map((image, index) => (
            <button className={index === activeImage ? 'active' : ''} onClick={() => setActiveImage(index)} key={index}>
              <img src={image} alt={`Tampilan ${index + 1}`} />
            </button>
          ))}
        </div>
        <button className="virtual-cta" onClick={onTryOn}><Icon name="layers" size={16} /> Coba Virtual</button>
      </div>
    </>
  )
}
