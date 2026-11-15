import { Icon } from './Icon'

type ProfileHeaderProps = {
  onSettings: () => void
}

export function ProfileHeader({ onSettings }: ProfileHeaderProps) {
  return (
    <div className="profile-heading">
      <div>
        <h1>PROFILE SAYA</h1>
      </div>
      <button aria-label="Pengaturan profil" onClick={onSettings}><Icon name="layers" size={17} /></button>
    </div>
  )
}
