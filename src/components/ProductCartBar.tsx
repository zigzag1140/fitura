import { Icon } from './Icon'
import { useState } from 'react'

type ProductCartBarProps = {
  price: string
}

export function ProductCartBar({ price }: ProductCartBarProps) {
  const [liked, setLiked] = useState(false)

  return (
    <footer className="detail-cart-bar">
      <button className={`cart-icon-button wishlist-cart-button ${liked ? 'liked' : ''}`} onClick={() => setLiked((current) => !current)} aria-label={liked ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}><Icon name="heart" size={19} /></button>
      <button className="add-cart-button"><span><Icon name="cart" size={19} /> Tambah ke<br />Keranjang</span><strong>{price}</strong></button>
    </footer>
  )
}
