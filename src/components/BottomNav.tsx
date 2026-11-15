import { Icon, type IconName } from './Icon'

const items: { label: string; icon: IconName }[] = [
  { label: 'Beranda', icon: 'home' },
  { label: 'Katalog', icon: 'bag' },
  { label: 'Simpan', icon: 'bookmark' },
  { label: 'Profil', icon: 'profile' },
]

type BottomNavProps = {
  activePage: string
  onNavigate: (page: string) => void
}

export function BottomNav({ activePage, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      {items.map((item) => (
        <button className={`nav-item ${activePage === item.label.toLowerCase() ? 'selected' : ''}`} key={item.label} onClick={() => onNavigate(item.label.toLowerCase())}>
          <Icon name={item.icon} size={19} />
          {activePage === item.label.toLowerCase() && <span>{item.label}</span>}
        </button>
      ))}
    </nav>
  )
}
