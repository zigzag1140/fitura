import { useRef, useState, type ChangeEvent } from 'react'
import { Icon } from './Icon'
import type { Product } from './ProductCard'

type ProductTryOnModalProps = {
  product: Product
  onClose: () => void
  onConfirm: (photoUrl: string) => void
}

export function ProductTryOnModal({ product, onClose, onConfirm }: ProductTryOnModalProps) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [photoUrl, setPhotoUrl] = useState('')

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setPhotoUrl(URL.createObjectURL(file))
  }

  return (
    <div className="tryon-modal-backdrop" role="presentation" onClick={onClose}>
      <section className="product-tryon-modal" role="dialog" aria-modal="true" aria-labelledby="product-tryon-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Tutup"><Icon name="close" size={18} /></button>
        <span className="eyebrow accent">AI PRODUCT TRY-ON</span>
        <h2 id="product-tryon-title">Coba {product.name}</h2>
        <p>Upload foto seluruh badan untuk melihat bagaimana <strong>{product.name}</strong> terlihat saat dipakai. Disarankan menggunakan baju lengan pendek dan berdiri tegak agar hasil lebih presisi.</p>
        <button className={`tryon-photo-drop ${photoUrl ? 'has-photo' : ''}`} onClick={() => fileInput.current?.click()}>
          {photoUrl ? <img src={photoUrl} alt="Foto pengguna yang diunggah" /> : <><Icon name="profile" size={28} /><strong>Tambah foto pengguna</strong><small>Gunakan foto dari kamera atau galeri</small></>}
        </button>
        <input ref={fileInput} type="file" accept="image/*" capture="user" onChange={handlePhoto} hidden />
        <div className="modal-upload-actions">
          <button onClick={() => fileInput.current?.click()}><Icon name="search" size={15} /> Kamera</button>
          <button onClick={() => fileInput.current?.click()}><Icon name="layers" size={15} /> Galeri</button>
        </div>
        <button className="modal-confirm" disabled={!photoUrl} onClick={() => onConfirm(photoUrl)}><Icon name="sparkles" size={17} /> Konfirmasi &amp; Generate</button>
        <small className="modal-disclaimer">Foto diproses untuk simulasi try-on dan dapat diganti saat integrasi AI aktif.</small>
      </section>
    </div>
  )
}
