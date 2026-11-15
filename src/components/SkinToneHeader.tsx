import { Icon } from './Icon'
import logo from '../assets/logo.png'

type SkinToneHeaderProps = {
  onBack: () => void
}

export function SkinToneHeader({ onBack }: SkinToneHeaderProps) {
  return (
    <header className="skintone-topbar">
      <button className="skintone-back" aria-label="Kembali ke katalog" onClick={onBack}>
        <Icon name="back" size={20} />
      </button>
      <div className="skintone-brand">
        <img className="feature-brand-logo" src={logo} alt="FITURA" />
        <div>
          <strong>Analisis Warna Kulit=</strong>
          
        </div>
      </div>
      <button className="skintone-menu" aria-label="Buka menu"><span /></button>
    </header>
  )
}
