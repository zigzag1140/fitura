import { Icon } from './Icon'

type CatalogAssistantCardProps = {
  onStart: () => void
}

export function CatalogAssistantCard({ onStart }: CatalogAssistantCardProps) {
  return (
    <aside className="catalog-assistant">
      <span className="assistant-icon"><Icon name="sparkles" size={18} /></span>
      <div>
        <strong>Bingung dengan ukuran pakaian?</strong>
        <small>Ayo coba fitur kami</small>
      </div>
      <button onClick={onStart}>MULAI</button>
    </aside>
  )
}
