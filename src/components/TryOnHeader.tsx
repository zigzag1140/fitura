import { Icon } from './Icon'
import logo from '../assets/logo.png'

type TryOnHeaderProps = {
  onBack: () => void
}

export function TryOnHeader({ onBack }: TryOnHeaderProps) {
  return (
    <header className="tryon-topbar">
      <button className="tryon-back" aria-label="Kembali ke katalog" onClick={onBack}>
        <Icon name="back" size={20} />
      </button>
      <div className="tryon-title">
        <img className="feature-brand-logo" src={logo} alt="FITURA" />
        <strong>Full Try-On 1 Set</strong>
      </div>
      <div className="tryon-actions">
        <button aria-label="Buka keranjang"><Icon name="cart" size={18} /></button>
      </div>
    </header>
  )
}
