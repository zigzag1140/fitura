import { useRef, type ChangeEvent } from 'react'
import { Icon } from './Icon'

type SkinScanCardProps = {
  imageUrl?: string
  onImageChange: (url: string) => void
  onConfirm: () => void
}

export function SkinScanCard({ imageUrl, onImageChange, onConfirm }: SkinScanCardProps) {
  const fileInput = useRef<HTMLInputElement>(null)
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onImageChange(URL.createObjectURL(file))
  }

  return (
    <section className="skin-scan-card">
      <div className="skin-scan-image">
        {imageUrl ? <img src={imageUrl} alt="Foto kulit pengguna untuk analisis" /> : <div className="skin-upload-empty"><Icon name="profile" size={32} /><strong>Tambahkan foto</strong><small>Gunakan foto dengan pencahayaan natural</small></div>}
      </div>
      <div className="skin-upload-actions">
        <button onClick={() => fileInput.current?.click()}><Icon name="search" size={15} /> Kamera / Galeri</button>
        <input ref={fileInput} type="file" accept="image/*" onChange={handleFile} hidden />
        <button className="skin-confirm" disabled={!imageUrl} onClick={onConfirm}><Icon name="check" size={15} /> Konfirmasi Analisis</button>
      </div>
      <div className="skin-upload-note">
        <Icon name="sparkles" size={15} /><span>Foto hanya digunakan untuk membaca tone warna kulit dan rekomendasi pakaian.</span>
      </div>
    </section>
  )
}
