import { Icon } from './Icon'
import logo from '../assets/logo.png'

type ProductDetailHeaderProps = {
  onBack: () => void
}

export function ProductDetailHeader({ onBack }: ProductDetailHeaderProps) {
  return (
    <header className="detail-topbar">
      <button aria-label="Kembali ke katalog" onClick={onBack}><Icon name="back" size={20} /></button>
      <div className="detail-brand"><img className="detail-brand-logo" src={logo} alt="FITURA" /><strong>Detail Produk</strong></div>
      <div className="detail-actions">
        <button aria-label="Buka keranjang"><Icon name="cart" size={18} /></button>
        
      </div>
    </header>
  )
}
