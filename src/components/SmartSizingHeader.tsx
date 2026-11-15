import { Icon } from './Icon'
import logo from '../assets/logo.png'

type SmartSizingHeaderProps = {
  onBack: () => void
}

export function SmartSizingHeader({ onBack }: SmartSizingHeaderProps) {
  return (
    <header className="smart-topbar">
      <button aria-label="Kembali ke katalog" onClick={onBack}><Icon name="back" size={20} /></button>
      <div className="smart-brand"><img className="feature-brand-logo" src={logo} alt="FITURA" /><strong>Smart Sizing</strong></div>
      <div className="smart-actions"><button aria-label="Buka keranjang"><Icon name="cart" size={18} /></button><button className="smart-avatar" aria-label="Profil">A</button></div>
    </header>
  )
}
